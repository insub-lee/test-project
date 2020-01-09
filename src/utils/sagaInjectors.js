import isEmpty from 'lodash/isEmpty';
import isFunction from 'lodash/isFunction';
import isString from 'lodash/isString';
import invariant from 'invariant';
import conformsTo from 'lodash/conformsTo';

import checkStore from './checkStore';
import { DAEMON, ONCE_TILL_UNMOUNT, RESTART_ON_REMOUNT } from './constants';

const allowedModes = [RESTART_ON_REMOUNT, DAEMON, ONCE_TILL_UNMOUNT];

const checkKey = key => invariant(isString(key) && !isEmpty(key), '(app/utils...) injectSaga: Expected `key` to be a non empty string');

const checkDescriptor = descriptor => {
  const shape = {
    saga: isFunction,
    mode: mode => isString(mode) && allowedModes.includes(mode),
  };
  invariant(conformsTo(descriptor, shape), '(app/utils...) injectSaga: Expected a valid saga descriptor');
};

const buildKey = (originKey, subKey) => (subKey ? `${originKey}-${subKey}` : originKey);

export function injectSagaFactory(store, isValid) {
  return function injectSaga(key, descriptor = {}, args) {
    if (!isValid) checkStore(store);
    // console.debug('ARGS', args);
    const builtKey = buildKey(key, args.sagaKey);

    const newDescriptor = { ...descriptor, mode: descriptor.mode || RESTART_ON_REMOUNT };
    const { saga, mode } = newDescriptor;

    checkKey(builtKey);
    checkDescriptor(newDescriptor);

    let hasSaga = Reflect.has(store.injectedSagas, builtKey);

    if (process.env.NODE_ENV !== 'production') {
      const oldDescriptor = store.injectedSagas[builtKey];
      // enable hot reloading of daemon and once-till-unmount sagas
      if (hasSaga && oldDescriptor.saga !== saga) {
        // oldDescriptor.task.cancel();
        hasSaga = false;
      }
    }

    if (!hasSaga || (hasSaga && mode !== DAEMON && mode !== ONCE_TILL_UNMOUNT)) {
      // eslint-disable-next-line no-param-reassign
      store.injectedSagas[builtKey] = {
        ...newDescriptor,
        task: store.runSaga(saga, args),
      };
      // if (!store.injectedSagas[sagaKey] || store.injectedSagas[sagaKey] === 'done') {
      //   store.injectedSagas[sagaKey] = {
      //     // eslint-disable-line no-param-reassign
      //     ...newDescriptor,
      //     task: store.runSaga(saga, args),
      //   };
      // }
    }
  };
}

export function ejectSagaFactory(store, isValid) {
  return function ejectSaga(key, args) {
    const builtKey = buildKey(key, args.sagaKey);
    if (!isValid) checkStore(store);

    checkKey(builtKey);

    if (Reflect.has(store.injectedSagas, builtKey)) {
      const descriptor = store.injectedSagas[builtKey];
      if (descriptor.mode && descriptor.mode !== DAEMON) {
        descriptor.task.cancel();
        // Clean up in production; in development we need `descriptor.saga` for hot reloading
        if (process.env.NODE_ENV === 'production') {
          // Need some value to be able to detect `ONCE_TILL_UNMOUNT` sagas in `injectSaga`
          store.injectedSagas[builtKey] = 'done'; // eslint-disable-line no-param-reassign
        }
      }
    }
  };
}

export default function getInjectors(store) {
  checkStore(store);

  return {
    injectSaga: injectSagaFactory(store, true),
    ejectSaga: ejectSagaFactory(store, true),
  };
}
