import React, { Component } from 'react';
import PropTypes from 'prop-types';

const key = {
  fullscreenEnabled: 0,
  fullscreenElement: 1,
  requestFullscreen: 2,
  exitFullscreen: 3,
  fullscreenchange: 4,
  fullscreenerror: 5,
};

const webkit = [
  'webkitFullscreenEnabled',
  'webkitFullscreenElement',
  'webkitRequestFullscreen',
  'webkitExitFullscreen',
  'webkitfullscreenchange',
  'webkitfullscreenerror',
];

const moz = [
  'mozFullScreenEnabled',
  'mozFullScreenElement',
  'mozRequestFullScreen',
  'mozCancelFullScreen',
  'mozfullscreenchange',
  'mozfullscreenerror',
];

const ms = [
  'msFullscreenEnabled',
  'msFullscreenElement',
  'msRequestFullscreen',
  'msExitFullscreen',
  'MSFullscreenChange',
  'MSFullscreenError',
];

const style = {
  unActive: { position: 'relative', marginLeft: '55px' },
  active: {
    minHeight: '100%', width: '100%', overflowY: 'auto', position: 'relative',
  },
};

const defaultStyle = {
  minHeight: 'calc(100vh)',
  overflowY: 'auto',
  position: 'relative',
};


let isEvent = false;

// so it doesn't throw if no window or document
const document = typeof window !== 'undefined' && typeof window.document !== 'undefined' ? window.document : {};

const vendor = (
  ('fullscreenEnabled' in document && Object.keys(key)) ||
  (webkit[0] in document && webkit) ||
  (moz[0] in document && moz) ||
  (ms[0] in document && ms) ||
  []
);

class fscreen {
  static requestFullscreen(element) { return element[vendor[key.requestFullscreen]](); }
  static requestFullscreenFunction(element) { return element[vendor[key.requestFullscreen]]; }
  static get exitFullscreen() {
    return document[vendor[key.exitFullscreen]].bind(document);
  }
  static addEventListener(type, handler, options) { return document.addEventListener(vendor[key[type]], handler, options); }
  static removeEventListener(type, handler, options) { return document.removeEventListener(vendor[key[type]], handler, options); }
  static get fullscreenEnabled() {
    return Boolean(document[vendor[key.fullscreenEnabled]]);
  }
  static set fullscreenEnabled(val) {
  }
  static get fullscreenElement() {
    return document[vendor[key.fullscreenElement]];
  }
  static set fullscreenElement(val) {
  }
  static get onfullscreenchange() {
    return document[`on${vendor[key.fullscreenchange]}`.toLowerCase()];
  }
  static set onfullscreenchange(handler) {
    document[`on${vendor[key.fullscreenchange]}`.toLowerCase()] = handler;
  }
  static get onfullscreenerror() {
    return document[`on${vendor[key.fullscreenerror]}`.toLowerCase()];
  }
  static set onfullscreenerror(handler) {
    document[`on${vendor[key.fullscreenerror]}`.toLowerCase()] = handler;
  }
}

class FullScreen extends Component {
  componentDidMount() {
    fscreen.addEventListener('fullscreenchange', this.detectFullScreen, {});
    if (this.props.view === 'Mobile' || (this.props.view === 'Tablet' && !isEvent)) {
      isEvent = true;

      document.addEventListener('touchstart', this.myTouchHandler, {
        capture: true,
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    this.handleProps(nextProps);
    if ((nextProps.view === 'Mobile' || nextProps.view === 'Tablet') && this.props.view !== nextProps.view && !isEvent) {
      isEvent = true;

      document.addEventListener('touchstart', this.myTouchHandler, {
        capture: true,
      });
    } else if (nextProps.view !== 'Mobile' && nextProps.view !== 'Tablet' && isEvent) {
      document.removeEventListener('touchstart', this.myTouchHandler, {});
    }
  }

  componentWillUnmount() {
    fscreen.removeEventListener('fullscreenchange', this.detectFullScreen, {});
    document.removeEventListener('touchstart', this.myTouchHandler, {});
  }

  setNode = (node) => {
    this.node = node;
  };

  handleProps(props) {
    const enabled = fscreen.fullscreenElement;
    if (enabled && !props.enabled) {
      this.leaveFullScreen();
    } else if (!enabled && props.enabled) {
      this.enterFullScreen();
    }
  }

  detectFullScreen = () => {
    const { onChange, onOpen, onClose } = this.props;
    if (onChange) {
      onChange(!!fscreen.fullscreenElement);
    }
    if (onOpen && !!fscreen.fullscreenElement) {
      onOpen();
    }
    if (onClose && !fscreen.fullscreenElement) {
      onClose();
    }
  };

  enterFullScreen = () => {
    fscreen.requestFullscreen(this.node);
  };

  leaveFullScreen = () => {
    fscreen.exitFullscreen();
  };

  myTouchHandler = (event) => {
    if (event.target.value === 'exitDockItem') {
      this.props.exitDockItem(Number(event.target.id));
    } else if (event.target.value === 'fixDockItem') {
      this.props.fixDockItem(Number(event.target.id));
    } else if (event.target.value === 'unfixDockItem') {
      this.props.unfixDockItem(Number(event.target.id));
    }
    this.props.setIsCloseToFalse();
  };

  render() {
    const {
      dockFixedYn, dockIconType, setMyMenuData, view, enabled,
    } = this.props;
    let width = '100%';
    if (view !== 'Tablet' && view !== 'Mobile' && dockFixedYn === 'Y') {
      /*
        현재 내부서비스의 경우 100%에서 독 넓이인 90px을 뺀 수치를 width값으로 두면 8px정도가 벌어짐..
        임시 방편으로 아래와 같이 처리..
      */
      if (dockIconType === 'MAX') {
        // width = `calc(100% - ${setMyMenuData.INTL_TYPE === 'Y' ? '98px' : '90px'})`;
        width = `calc(100% - ${setMyMenuData.INTL_TYPE === 'Y' ? '98px' : '155px'})`;
      } else {
        width = `calc(100% - ${setMyMenuData.INTL_TYPE === 'Y' ? '50px' : '42px'})`;
      }
    }
    return (
      <div
        className={`FullScreen ${enabled ? 'Active' : ''}`}
        ref={this.setNode}
        // style={enabled ? { ...style.active } : { ...style.unActive, width }}
        style={defaultStyle}
      >
        {this.props.children}
      </div>
    );
  }
}

FullScreen.propTypes = {
  onClose: PropTypes.func,
  onOpen: PropTypes.func,
  onChange: PropTypes.func,
  exitDockItem: PropTypes.func,
  fixDockItem: PropTypes.func,
  unfixDockItem: PropTypes.func,
  view: PropTypes.string,
  enabled: PropTypes.bool,
  dockFixedYn: PropTypes.string,
  dockIconType: PropTypes.string,
  setMyMenuData: PropTypes.object.isRequired,
};

FullScreen.defaultProps = {
  onClose: () => false,
  onOpen: () => false,
  onChange: () => false,
  exitDockItem: () => false,
  fixDockItem: () => false,
  unfixDockItem: () => false,
  view: '',
  enabled: false,
  dockFixedYn: '',
  dockIconType: '',
};

export default FullScreen;
