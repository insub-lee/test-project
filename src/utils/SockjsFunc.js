import EventBus from 'vertx3-eventbus-client';
import { eventChannel } from 'redux-saga';
import * as routesConstants from 'containers/common/Routes/constants';
import notify from 'components/Notification';
import { Cookies } from 'react-cookie';
import _ from 'lodash';

let eventBus = null;

const EVENT_ROOT = '/eventbus';

const notifyCallback = emitter => (
  (error, message) => {
    console.log('SERVER PUSH', message.body);
    const msg = message.body;
    emitter(msg);
  }
);

const loginCallback = (emitter, data) => {
  const payload = data;
  console.log('LOGIN CALLBACK', payload);
  return (req, res) => {
    const message = res.body;
    if (message.code !== 200) {
      return emitter({ type: 'LOG_OUT' });
    }
    payload.uuid = message.sKey; // secure key
    if (message.sKey === undefined || message.sKey === null) {
      emitter({ type: 'LOG_OUT' });
    } else {
      const PROFILE = message.profile;
      const cookies = new Cookies();
      const SMSESSION = cookies.get('SMSESSION');

      eventBus.registerHandler(`address.client.${message.sKey}`, _.pick(payload, ['uuid', 'client']), notifyCallback(emitter));
      eventBus.registerHandler(`address.site.${PROFILE.SITE_ID}`, _.pick(payload, ['uuid', 'client']), notifyCallback(emitter));
      
      emitter({
        type: payload.type,
        token: message.sKey,
        profile: PROFILE,
        UNREAD_CNT: message.UNREAD_CNT,
        SMSESSION,
      });
    }
    return () => {};
  };
};

const connect = payload => (
  eventChannel((emitter) => {
    const data = payload;
    console.log('EB CONNECT :', data);
    if (data.client === undefined) data.client = 0;
    /* init EventBus when eventBus is null or state is closed */
    if (eventBus === null || eventBus.state === EventBus.CLOSED) {
      const options = {
        vertxbus_ping_interval: 3000,
      };
      eventBus = new EventBus(EVENT_ROOT, options);
      // Override methods... [unregisterHandler, onopen, onerror, onclose]
      eventBus.unregisterHandler = (address, headers) => {
        let hd = headers;
        if (this.state !== EventBus.OPEN) {
          throw new Error('INVALID_STATE_ERR');
        }
        const handler = this.handlers[address];
        if (handler !== undefined) {
          if (typeof hd === 'function') {
            hd = {};
          }
          this.sockJSConn.send(JSON.stringify({
            type: 'unregister',
            address,
            headers: hd,
          }));

          delete this.handlers[address];
        }
      };
      eventBus.onopen = () => {
        const ebHeaders = data.headers;
        const ebBodys = _.pick(data, ['uuid', 'client']);
        eventBus.send('eventbus.auth.login', ebBodys, ebHeaders, loginCallback(emitter, data));
        console.log('Connection Opened by eventbus.onopen');
        return () => {};
      };
      eventBus.onerror = (json) => {
        console.log('Error Type', json.type);
        switch (json.type) {
          case 'err':
            console.log('Error');
            // Try Reconnect....
            return connect(payload);
          default:
            return emitter({ type: 'LOG_OUT' });
        }
      };
      eventBus.onclose = () => {
        console.log('Connection Closed by eventbus.onclose');
        // const payload = {
        //   uuid: data.uuid_, // _.pick(data, ['uuid']),
        // }
        // emitter({ type: routesConstants.AUTH_RECONNECT_UUID, payload });
        emitter({ type: routesConstants.AUTH_RECONNECT_UUID });
      };
    }
    return () => {
      // console.log('fail...');
    };
  })
);

const sendCallback = (emitter, data) => {
  const payload = data;
  console.log('SEND CALLBACK', payload);
  return (req, res) => {
    const message = res.body;
    if (message.code !== 200) {
      return emitter({ type: 'LOG_OUT' });
    }
    return emitter({ message });
  };
};

const send = payload => (
  eventChannel((emitter) => {
    const data = payload;
    console.log('EB SEND :', eventBus, data);
    if (data.client === undefined) data.client = 0;
    /* init EventBus when eventBus is null or state is closed */
    if (eventBus === null || eventBus.state === EventBus.CLOSED) {
      return emitter({ type: 'reconnect' });
    }
    const eBHeader = data.headers;
    const ebBodys = payload.body;
    eventBus.send(payload.address, ebBodys, eBHeader, sendCallback(emitter, data));
    return () => {
      // console.log('fail...');
    };
  })
);

const registerCallback = emitter => (
  (error, message) => {
    console.info(`received a message from article.view: ${JSON.stringify(message)}`);
    if (message !== undefined && message.type !== 'error') {
      emitter({ message });
    }
  }
);

const register = payload => (
  eventChannel((emitter) => {
    const data = payload;
    const eBHeader = data.headers;
    console.log('EB REGISTER :', eventBus, data, eBHeader);
    /* init EventBus when eventBus is null or state is closed */
    if (eventBus === null || eventBus.state === EventBus.CLOSED) {
      return emitter({ type: 'reconnect' });
    }
    eventBus.registerHandler(payload.address, eBHeader, notifyCallback(emitter));
    return () => {
      // console.log('fail...');
    };
  })
);

const unregister = payload => (
  eventChannel((emitter) => {
    const data = payload;
    console.log('EB UNREGISTER :', eventBus, data);
    if (data.client === undefined) data.client = 0;
    /* init EventBus when eventBus is null or state is closed */
    if (eventBus === null || eventBus.state === EventBus.CLOSED) {
      return emitter({ type: 'reconnect' });
    }
    eventBus.unregisterHandler(payload.address);
    return () => {
      // console.log('fail...');
    };
  })
);

const status = () => {
  if (eventBus === null || eventBus.state === EventBus.CLOSED) {
    return 0;
  } else {
    return eventBus.state;
  }
}
export const EB = {
  connect: payload => connect(payload),
  register: payload => register(payload),
  unregister: payload => unregister(payload),
  send: payload => send(payload),
  status: () => status(),
};

export default EB;
