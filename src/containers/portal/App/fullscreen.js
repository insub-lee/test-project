const __extends =
  (this && this.__extends) ||
  (function() {
    const extendStatics =
      Object.setPrototypeOf ||
      ({ __proto__: [] } instanceof Array &&
        function(d, b) {
          d.__proto__ = b;
        }) ||
      function(d, b) {
        for (const p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
      };
    return function(d, b) {
      extendStatics(d, b);
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : ((__.prototype = b.prototype), new __());
    };
  })();
Object.defineProperty(exports, '__esModule', { value: true });
const React = require('react');
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
const moz = ['mozFullScreenEnabled', 'mozFullScreenElement', 'mozRequestFullScreen', 'mozCancelFullScreen', 'mozfullscreenchange', 'mozfullscreenerror'];
const ms = ['msFullscreenEnabled', 'msFullscreenElement', 'msRequestFullscreen', 'msExitFullscreen', 'MSFullscreenChange', 'MSFullscreenError'];
let isEvent = false;
const document = typeof window !== 'undefined' && typeof window.document !== 'undefined' ? window.document : {};
const vendor =
  ('fullscreenEnabled' in document && Object.keys(key)) || (webkit[0] in document && webkit) || (moz[0] in document && moz) || (ms[0] in document && ms) || [];
const fscreen = (function() {
  function fscreen() {}
  fscreen.requestFullscreen = function(element) {
    return element[vendor[key.requestFullscreen]]();
  };
  fscreen.requestFullscreenFunction = function(element) {
    return element[vendor[key.requestFullscreen]];
  };
  Object.defineProperty(fscreen, 'exitFullscreen', {
    get() {
      return document[vendor[key.exitFullscreen]].bind(document);
    },
    enumerable: true,
    configurable: true,
  });
  fscreen.addEventListener = function(type, handler, options) {
    return document.addEventListener(vendor[key[type]], handler, options);
  };
  fscreen.removeEventListener = function(type, handler, options) {
    return document.removeEventListener(vendor[key[type]], handler, options);
  };
  Object.defineProperty(fscreen, 'fullscreenEnabled', {
    get() {
      return Boolean(document[vendor[key.fullscreenEnabled]]);
    },
    set(val) {},
    enumerable: true,
    configurable: true,
  });
  Object.defineProperty(fscreen, 'fullscreenElement', {
    get() {
      return document[vendor[key.fullscreenElement]];
    },
    set(val) {},
    enumerable: true,
    configurable: true,
  });
  Object.defineProperty(fscreen, 'onfullscreenchange', {
    get() {
      return document[`on${vendor[key.fullscreenchange]}`.toLowerCase()];
    },
    set(handler) {
      document[`on${vendor[key.fullscreenchange]}`.toLowerCase()] = handler;
    },
    enumerable: true,
    configurable: true,
  });
  Object.defineProperty(fscreen, 'onfullscreenerror', {
    get() {
      return document[`on${vendor[key.fullscreenerror]}`.toLowerCase()];
    },
    set(handler) {
      document[`on${vendor[key.fullscreenerror]}`.toLowerCase()] = handler;
    },
    enumerable: true,
    configurable: true,
  });
  return fscreen;
})();
const FullScreen = (function(_super) {
  __extends(FullScreen, _super);
  function FullScreen(props) {
    const _this = _super.call(this, props) || this;
    _this.detectFullScreen = function() {
      if (_this.props.onChange) {
        _this.props.onChange(!!fscreen.fullscreenElement);
      }
      if (_this.props.onOpen && !!fscreen.fullscreenElement) {
        _this.props.onOpen();
      }
      if (_this.props.onClose && !fscreen.fullscreenElement) {
        _this.props.onClose();
      }
    };
    _this.enterFullScreen = function() {
      fscreen.requestFullscreen(_this.node);
    };
    _this.leaveFullScreen = function() {
      fscreen.exitFullscreen();
    };
    _this.myTouchHandler = event => {
      if (event.target.value === 'exitDockItem') {
        this.props.exitDockItem(Number(event.target.id));
      } else if (event.target.value === 'fixDockItem') {
        this.props.fixDockItem(Number(event.target.id));
      } else if (event.target.value === 'unfixDockItem') {
        this.props.unfixDockItem(Number(event.target.id));
      }
      this.props.setIsCloseToFalse();
    };
    return _this;
  }
  FullScreen.prototype.componentDidMount = function() {
    fscreen.addEventListener('fullscreenchange', this.detectFullScreen, {});
    if (this.props.view === 'Mobile' || (this.props.view === 'Tablet' && !isEvent)) {
      isEvent = true;

      document.addEventListener('touchstart', this.myTouchHandler, {
        capture: true,
      });
    }
  };
  FullScreen.prototype.componentWillUnmount = function() {
    fscreen.removeEventListener('fullscreenchange', this.detectFullScreen, {});
    document.removeEventListener('touchstart', this.myTouchHandler, {});
  };
  FullScreen.prototype.componentWillReceiveProps = function(nextProps) {
    this.handleProps(nextProps);

    if ((nextProps.view === 'Mobile' || nextProps.view === 'Tablet') && this.props.view !== nextProps.view && !isEvent) {
      isEvent = true;

      document.addEventListener('touchstart', this.myTouchHandler, {
        capture: true,
      });
    } else if (nextProps.view !== 'Mobile' && nextProps.view !== 'Tablet' && isEvent) {
      document.removeEventListener('touchstart', this.myTouchHandler, {});
    }
  };
  FullScreen.prototype.handleProps = function(props) {
    const enabled = fscreen.fullscreenElement;
    if (enabled && !props.enabled) {
      this.leaveFullScreen();
    } else if (!enabled && props.enabled) {
      this.enterFullScreen();
    }
  };
  FullScreen.prototype.render = function() {
    const _this = this;
    const { dockFixedYn, dockIconType, setMyMenuData } = _this.props;
    // 모바일이나 테블릿일 때는 width = '100%'
    let width = '100%';
    if (this.props.view !== 'Tablet' && this.props.view !== 'Mobile' && dockFixedYn === 'Y') {
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
    if (_this.props.enabled === false) {
      return React.createElement(
        'div',
        {
          className: 'FullScreen',
          ref(node) {
            return (_this.node = node);
          },
          style: { width, position: 'relative', marginLeft: _this.props.isPreview ? '0px' : '55px' },
        },
        this.props.children,
      );
    }
    return React.createElement(
      'div',
      {
        className: 'FullScreen Active',
        ref(node) {
          return (_this.node = node);
        },
        style: { minHeight: '100%', width: '100%', overflowY: 'auto', position: 'relative' },
      },
      this.props.children,
    );
  };
  FullScreen.defaultProps = {
    enabled: false,
    isPreview: false,
  };
  return FullScreen;
})(React.Component);
exports.default = FullScreen;
