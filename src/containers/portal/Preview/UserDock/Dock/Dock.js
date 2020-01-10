import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { debounce } from 'lodash';
import autoprefix from './autoprefix';
import dockCloseIcon from '../../../../../images/portal/dock-close.png';
import dockOpenIcon from '../../../../../images/portal/dock-open.png';
import mobileDockOpenIcon from '../../../../../images/portal/mobile-dock-open.png';
import mobileDockCloseIcon from '../../../../../images/portal/mobile-dock-close.png';

function autoprefixes(styles) {
  return Object.keys(styles).reduce((obj, key) => ((obj[key] = autoprefix(styles[key])), obj), {});
}

const styles = autoprefixes({
  wrapper: {
    position: 'fixed',
    width: 0,
    height: 0,
    top: 0,
    left: 0,
  },

  dim: {
    position: 'fixed',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    zIndex: 0,
    background: 'rgba(0, 0, 0, 0.2)',
    opacity: 1,
  },

  dimAppear: {
    opacity: 0,
  },

  dimTransparent: {
    pointerEvents: 'none',
  },

  dimHidden: {
    opacity: 0,
  },

  dock: {
    position: 'fixed',
    zIndex: 1,
    background: 'rgba(0, 0, 0, 0.2)',
    left: 0,
    bottom: 0,
    width: '90px',
    height: window.innerHeight - 20,
    paddingBottom: '20px',
  },

  dockHidden: {
    opacity: 0,
  },

  dockResizing: {
    transition: 'none',
  },

  dockContent: {
    width: '100%',
    height: '100%',
    overflow: 'auto',
  },

  resizer: {
    position: 'absolute',
    zIndex: 2,
    opacity: 0,
  },
});

function getTransitions(duration) {
  return ['left', 'top', 'width', 'height'].map(p => `${p} ${duration / 1000}s ease-out`);
}

function getDockStyles({ fluid, dockStyle, dockHiddenStyle, duration, position, isVisible }, { size, isResizing, fullWidth, fullHeight, isOpen }, dockFixedYn) {
  let posStyle;
  const absSize = fluid ? `${size * 100}%` : `${size}px`;

  function getRestSize(fullSize) {
    return fluid ? `${100 - size * 100}%` : `${fullSize - size}px`;
  }

  switch (position) {
    case 'right':
      if (isOpen) {
        posStyle = {
          // left: isVisible ? getRestSize(fullWidth) : fullWidth,
          left: `calc(100% - ${size}px)`,
          width: absSize,
          transitionProperty: 'left',
          transitionDuration: '0.1s',
          opacity: 1,
        };
      } else {
        posStyle = {
          width: absSize,
          // 독 자동 숨김일 때, 독이 다시 보이기 위해 마우스 오버할 영역의 넓이 지정
          left: dockFixedYn === 'A' ? `calc(100% - 5px)` : '100%',
          opacity: dockFixedYn === 'A' ? 0 : 1,
          transitionProperty: 'left',
          transitionDuration: '0.1s',
        };
      }
      dockStyle = {
        height: window.innerHeight - 90,
      };
      break;
    case 'bottom':
      posStyle = {
        top: isVisible ? getRestSize(fullHeight) : fullHeight,
        height: absSize,
        transitionProperty: 'top',
        transitionDuration: '0.1s',
      };

      if (!isOpen) {
        posStyle = {
          top: '100%',
          transitionProperty: 'top',
          transitionDuration: '0.1s',
        };
      }

      dockStyle = {
        width: window.innerWidth,
      };
      break;
  }

  const transitions = getTransitions(duration);

  return [
    styles.dock,
    autoprefix({
      transition: [...transitions, !isVisible && `opacity 0.01s linear ${duration / 1000}s`].filter(t => t).join(','),
    }),
    autoprefix(dockStyle),
    autoprefix(posStyle),
    isResizing && styles.dockResizing,
    !isVisible && styles.dockHidden,
    !isVisible && dockHiddenStyle,
  ];
}

function getDimStyles({ dimMode, dimStyle, duration, isVisible }, { isTransitionStarted }) {
  return [
    styles.dim,
    autoprefix({
      transition: `opacity ${duration / 1000}s ease-out`,
    }),
    dimStyle,
    dimMode === 'transparent' && styles.dimTransparent,
    !isVisible && styles.dimHidden,
    isTransitionStarted && isVisible && styles.dimAppear,
    isTransitionStarted && !isVisible && styles.dimDisappear,
  ];
}

function getResizerStyles(position, isOpen, dockFixedYn, appYn) {
  let resizerStyle;
  const size = 10;
  const fullHeight = typeof window !== 'undefined' && window.innerHeight;
  const fullWidth = typeof window !== 'undefined' && window.innerWidth;

  switch (position) {
    case 'right':
      resizerStyle = {
        left: -size,
        top: `${fullHeight / 2 - 66}px`,
        height: '65px',
        cursor: 'pointer',
        width: '10px',
        borderTopLeftRadius: 3,
        borderBottomLeftRadius: 3,
        opacity: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        backgroundImage: `url(${dockCloseIcon})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: '50% 50%',
      };
      if (!isOpen) {
        if (dockFixedYn === 'A') {
          resizerStyle.opacity = 0;
          resizerStyle.width = 0;
        } else {
          resizerStyle.backgroundImage = `url(${dockOpenIcon})`;
        }
      } else if (dockFixedYn === 'A') {
        resizerStyle.display = 'none';
      }

      if (dockFixedYn === 'Y') {
        resizerStyle.display = 'none';
      }
      break;
    case 'bottom':
      resizerStyle = {
        top: -size,
        height: '10px',
        left: `${fullWidth / 2 - 32.5}px`,
        width: '65px',
        cursor: 'row-resize',
        opacity: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        backgroundImage: `url(${mobileDockOpenIcon})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: '50% 70%',
        backgroundSize: '15%',
        cursor: 'pointer',
      };

      if (isOpen) {
        resizerStyle.backgroundImage = `url(${mobileDockCloseIcon})`;
      }

      // 모바일 독 고정 설정 여부에 따라 처리
      // if (dockFixedYn === 'Y') {
      //   resizerStyle.display = 'none';
      // }

      break;
  }

  return [styles.resizer, autoprefix(resizerStyle)];
}

function getFullSize(position, fullWidth, fullHeight) {
  return position === 'left' || position === 'right' ? fullWidth : fullHeight;
}

export default class Dock extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isControlled: typeof props.size !== 'undefined',
      size: props.size,
      isDimHidden: !props.isVisible,
      fullWidth: typeof window !== 'undefined' && window.innerWidth,
      fullHeight: typeof window !== 'undefined' && window.innerHeight,
      isTransitionStarted: false,
      isWindowResizing: false,
      isOpen: true,
    };
  }

  static propTypes = {
    position: PropTypes.oneOf(['left', 'right', 'top', 'bottom']),
    zIndex: PropTypes.number,
    fluid: PropTypes.bool,
    size: PropTypes.number,
    defaultSize: PropTypes.number,
    dimMode: PropTypes.oneOf(['none', 'transparent', 'opaque']),
    isVisible: PropTypes.bool,
    onVisibleChange: PropTypes.func,
    onSizeChange: PropTypes.func,
    dimStyle: PropTypes.object,
    dockStyle: PropTypes.object,
    duration: PropTypes.number,
  };

  static defaultProps = {
    position: 'right',
    zIndex: 1000,
    fluid: false,
    defaultSize: 90, // dock 초기 너비값
    dimMode: 'opaque',
    duration: 200,
  };

  componentDidMount() {
    window.addEventListener('mouseup', this.handleMouseUp);
    window.addEventListener('mousemove', this.handleMouseMove);
    window.addEventListener('resize', this.handleResize);

    if (!window.fullWidth) {
      this.updateWindowSize();
    }
  }

  componentWillUnmount() {
    window.removeEventListener('mouseup', this.handleMouseUp);
    window.removeEventListener('mousemove', this.handleMouseMove);
    window.removeEventListener('resize', this.handleResize);
  }

  componentWillReceiveProps(nextProps) {
    const isControlled = typeof nextProps.size !== 'undefined';

    this.setState({ isControlled });

    if (isControlled && this.props.size !== nextProps.size) {
      this.setState({ size: nextProps.size });
    } else if (this.props.fluid !== nextProps.fluid) {
      this.updateSize(nextProps);
    }

    if (this.props.isVisible !== nextProps.isVisible) {
      this.setState({
        isTransitionStarted: true,
      });
    }
  }

  updateSize(props) {
    const { fullWidth, fullHeight } = this.state;

    this.setState({
      size: props.fluid
        ? this.state.size / getFullSize(props.position, fullWidth, fullHeight)
        : getFullSize(props.position, fullWidth, fullHeight) * this.state.size,
    });
  }

  componentDidUpdate(prevProps) {
    const { dockFixedYn } = this.props;

    if (dockFixedYn !== prevProps.dockFixedYn) {
      this.setState({
        isOpen: this.props.dockFixedYn !== 'A',
      });
    }

    if (this.props.isVisible !== prevProps.isVisible) {
      if (!this.props.isVisible) {
        window.setTimeout(() => this.hideDim(), this.props.duration);
      } else {
        this.setState({ isDimHidden: false });
      }

      window.setTimeout(() => this.setState({ isTransitionStarted: false }), 0);
    }
  }

  transitionEnd = () => {
    this.setState({ isTransitionStarted: false });
  };

  hideDim = () => {
    if (!this.props.isVisible) {
      this.setState({ isDimHidden: true });
    }
  };

  onMouseEnterInvisibleDock = e => {
    const { setFloattingClassShow, dockFixedYn } = this.props;

    if (dockFixedYn === 'A') {
      const { isOpen } = this.state;

      if (!isOpen) {
        this.setState(
          {
            isOpen: true,
          },
          () => {
            setFloattingClassShow();
          },
        );
      }
    } else {
      setFloattingClassShow();
    }
  };

  onMouseLeaveVisibleDock = e => {
    const { setFloattingClassHidden, dockFixedYn } = this.props;

    if (dockFixedYn === 'A') {
      const { isOpen } = this.state;

      if (isOpen) {
        this.setState(
          {
            isOpen: false,
          },
          () => {
            setFloattingClassHidden();
          },
        );
      }
    } else {
      setFloattingClassHidden();
    }
  };

  render() {
    const { children, zIndex, dimMode, position, dockFixedYn, appYn } = this.props;
    const { isDimHidden, isOpen } = this.state;

    const dimStyles = Object.assign({}, ...getDimStyles(this.props, this.state));
    const dockStyles = Object.assign({}, ...getDockStyles(this.props, this.state, dockFixedYn));
    const resizerStyles = Object.assign({}, ...getResizerStyles(position, isOpen, dockFixedYn, appYn));

    return (
      <div style={{ ...styles.wrapper, zIndex }} className="dockPos">
        {dimMode !== 'none' && !isDimHidden && <div style={dimStyles} onClick={this.handleDimClick} />}
        <div style={dockStyles} onMouseLeave={this.onMouseLeaveVisibleDock} onMouseEnter={dockFixedYn === 'A' ? this.onMouseEnterInvisibleDock : () => {}}>
          {/* 리사이즈 막기 */}
          {/* <div style={resizerStyles} onMouseDown={this.handleMouseDown} /> */}
          <div style={resizerStyles} onClick={dockFixedYn === 'N' ? this.handleClick : () => {}} />
          <div style={styles.dockContent} onMouseEnter={this.onMouseEnterInvisibleDock}>
            {typeof children === 'function' ? children() : children}
          </div>
        </div>
      </div>
    );
  }

  handleDimClick = () => {
    if (this.props.dimMode === 'opaque') {
      this.props.onVisibleChange && this.props.onVisibleChange(false);
    }
  };

  handleResize = () => {
    if (window.requestAnimationFrame) {
      window.requestAnimationFrame(this.updateWindowSize.bind(this, true));
    } else {
      this.updateWindowSize(true);
    }
  };

  updateWindowSize = windowResize => {
    const sizeState = {
      fullWidth: window.innerWidth,
      fullHeight: window.innerHeight,
    };

    if (windowResize) {
      this.setState({
        ...sizeState,
        isResizing: true,
        isWindowResizing: windowResize,
      });

      this.debouncedUpdateWindowSizeEnd();
    } else {
      this.setState(sizeState);
    }
  };

  updateWindowSizeEnd = () => {
    this.setState({
      isResizing: false,
      isWindowResizing: false,
    });
  };

  debouncedUpdateWindowSizeEnd = debounce(this.updateWindowSizeEnd, 30);

  handleWrapperLeave = () => {
    this.setState({ isResizing: false });
  };

  handleMouseDown = () => {
    this.setState({ isResizing: true });
  };

  handleMouseUp = () => {
    this.setState({ isResizing: false });
  };

  handleClick = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  handleMouseMove = e => {
    if (!this.state.isResizing || this.state.isWindowResizing) return;
    e.preventDefault();

    const { position, fluid } = this.props;
    const { fullWidth, fullHeight, isControlled } = this.state;
    const { clientX: x, clientY: y } = e;
    let size;

    switch (position) {
      case 'left':
        size = fluid ? x / fullWidth : x;
        break;
      case 'right':
        size = fluid ? (fullWidth - x) / fullWidth : fullWidth - x;
        break;
      case 'top':
        size = fluid ? y / fullHeight : y;
        break;
      case 'bottom':
        size = fluid ? (fullHeight - y) / fullHeight : fullHeight - y;
        break;
    }

    this.props.onSizeChange && this.props.onSizeChange(size);

    if (!isControlled) {
      this.setState({ size });
    }
  };
}
