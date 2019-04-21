var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var key = {
    fullscreenEnabled: 0,
    fullscreenElement: 1,
    requestFullscreen: 2,
    exitFullscreen: 3,
    fullscreenchange: 4,
    fullscreenerror: 5,
};
var webkit = [
    'webkitFullscreenEnabled',
    'webkitFullscreenElement',
    'webkitRequestFullscreen',
    'webkitExitFullscreen',
    'webkitfullscreenchange',
    'webkitfullscreenerror',
];
var moz = [
    'mozFullScreenEnabled',
    'mozFullScreenElement',
    'mozRequestFullScreen',
    'mozCancelFullScreen',
    'mozfullscreenchange',
    'mozfullscreenerror',
];
var ms = [
    'msFullscreenEnabled',
    'msFullscreenElement',
    'msRequestFullscreen',
    'msExitFullscreen',
    'MSFullscreenChange',
    'MSFullscreenError',
];
var isEvent = false;
var document = typeof window !== 'undefined' && typeof window.document !== 'undefined' ? window.document : {};
var vendor = (('fullscreenEnabled' in document && Object.keys(key)) ||
    (webkit[0] in document && webkit) ||
    (moz[0] in document && moz) ||
    (ms[0] in document && ms) ||
    []);
var fscreen = (function () {
    function fscreen() {
    }
    fscreen.requestFullscreen = function (element) { return element[vendor[key.requestFullscreen]](); };
    ;
    fscreen.requestFullscreenFunction = function (element) { return element[vendor[key.requestFullscreen]]; };
    ;
    Object.defineProperty(fscreen, "exitFullscreen", {
        get: function () {
            return document[vendor[key.exitFullscreen]].bind(document);
        },
        enumerable: true,
        configurable: true
    });
    ;
    fscreen.addEventListener = function (type, handler, options) { return document.addEventListener(vendor[key[type]], handler, options); };
    ;
    fscreen.removeEventListener = function (type, handler, options) { return document.removeEventListener(vendor[key[type]], handler, options); };
    ;
    Object.defineProperty(fscreen, "fullscreenEnabled", {
        get: function () {
            return Boolean(document[vendor[key.fullscreenEnabled]]);
        },
        set: function (val) {
        },
        enumerable: true,
        configurable: true
    });
    ;
    ;
    Object.defineProperty(fscreen, "fullscreenElement", {
        get: function () {
            return document[vendor[key.fullscreenElement]];
        },
        set: function (val) {
        },
        enumerable: true,
        configurable: true
    });
    ;
    ;
    Object.defineProperty(fscreen, "onfullscreenchange", {
        get: function () {
            return document[("on" + vendor[key.fullscreenchange]).toLowerCase()];
        },
        set: function (handler) {
            document[("on" + vendor[key.fullscreenchange]).toLowerCase()] = handler;
        },
        enumerable: true,
        configurable: true
    });
    ;
    ;
    Object.defineProperty(fscreen, "onfullscreenerror", {
        get: function () {
            return document[("on" + vendor[key.fullscreenerror]).toLowerCase()];
        },
        set: function (handler) {
            document[("on" + vendor[key.fullscreenerror]).toLowerCase()] = handler;
        },
        enumerable: true,
        configurable: true
    });
    ;
    ;
    return fscreen;
}());
;
var FullScreen = (function (_super) {
    __extends(FullScreen, _super);
    function FullScreen(props) {
        var _this = _super.call(this, props) || this;
        _this.detectFullScreen = function () {
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
        _this.enterFullScreen = function () {
            fscreen.requestFullscreen(_this.node);
        };
        _this.leaveFullScreen = function () {
            fscreen.exitFullscreen();
        };
        _this.myTouchHandler = (event) => {
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
    FullScreen.prototype.componentDidMount = function () {
        fscreen.addEventListener('fullscreenchange', this.detectFullScreen, {});
        if (this.props.view === 'Mobile' || this.props.view === 'Tablet' && !isEvent) {

            isEvent = true;

            document.addEventListener('touchstart', this.myTouchHandler, {
                capture: true,
            });
        }
    };
    FullScreen.prototype.componentWillUnmount = function () {
        fscreen.removeEventListener('fullscreenchange', this.detectFullScreen, {});
        document.removeEventListener('touchstart', this.myTouchHandler, {});
    };
    FullScreen.prototype.componentWillReceiveProps = function (nextProps) {
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
    FullScreen.prototype.handleProps = function (props) {
        var enabled = fscreen.fullscreenElement;
        if (enabled && !props.enabled) {
            this.leaveFullScreen();
        }
        else if (!enabled && props.enabled) {
            this.enterFullScreen();
        }
    };
    FullScreen.prototype.render = function () {
        var _this = this;
        const { dockFixedYn, dockIconType } = _this.props;
        let width = '100%';
        if (this.props.view !== 'Tablet' && this.props.view !== 'Mobile' && dockFixedYn === 'Y') {
            if (dockIconType === 'MAX') {
                width = 'calc(100% - 90px)';
            } else {
                width = 'calc(100% - 42px)';
            }
        }
        if(_this.props.enabled === false){
            return (React.createElement("div", { className: "FullScreen", ref: function (node) { return (_this.node = node); }, style: { width, position: 'relative' } }, this.props.children));
        }else{
            return (React.createElement("div", { className: "FullScreen Active", ref: function (node) { return (_this.node = node); }, style: { minHeight: '100%', width: '100%', overflowY: 'auto', position: 'relative' } }, this.props.children));
        }
    };
    FullScreen.defaultProps = {
        enabled: false,
    };
    return FullScreen;
}(React.Component));
exports.default = FullScreen;