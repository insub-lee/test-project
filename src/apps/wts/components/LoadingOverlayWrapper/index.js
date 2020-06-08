/* eslint-disable */
import React, { Children } from "react";
import PropTypes from "prop-types";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import styled, { keyframes } from "styled-components";

import logoImg from "apps/wts/images/logo_login.png";

const FirstChild = props => Children.toArray(props.children)[0] || null;

class LoadingOverlayWrapper extends React.Component {
  componentWillReceiveProps(nextProps) {
    const s = nextProps.style;
    if (nextProps.active && (s.overflow || s.overflowY || s.overflowX)) {
      this.wrapper.scrollTop = 0;
    }
  }

  render() {
    const { active, animate, spinner } = this.props;
    let loadNode = active && (
      <LoadingOverlay key="the_dimmer" {...this.props} />
    );
    if (animate || spinner) {
      loadNode = (
        <CSSTransition
          classNames="_loading-overlay-transition"
          timeout={{
            exit: 500,
            enter: 500
          }}
          appear
        >
          <TransitionGroup component={FirstChild}>
            <React.Fragment>{loadNode}</React.Fragment>
          </TransitionGroup>
        </CSSTransition>
      );
    }

    const styles = {
      position: "relative",
      ...this.props.style
    };
    if (active) {
      if (styles.overflow) styles.overflow = "hidden";
      if (styles.overflowY) styles.overflowY = "hidden";
      if (styles.overflowX) styles.overflowX = "hidden";
    }
    return (
      <div
        ref={n => {
          this.wrapper = n;
        }}
        className={this.props.className}
        style={styles}
      >
        {loadNode}
        {this.props.children}
      </div>
    );
  }
}

LoadingOverlayWrapper.propTypes = {
  active: PropTypes.bool,
  text: PropTypes.string,
  spinner: PropTypes.bool,
  spinnerSize: PropTypes.string,
  className: PropTypes.string,
  background: PropTypes.string,
  color: PropTypes.string,
  zIndex: PropTypes.number,
  animate: PropTypes.bool,
  onClick: PropTypes.func
};

LoadingOverlayWrapper.defaultProps = {
  active: false,
  className: "_loading-overlay",
  background: "rgba(0, 0, 0, 0.7)",
  spinnerSize: "50px",
  color: "#FFF",
  zIndex: 800,
  animate: false,
  style: {}
};

const Overlay = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0px;
  left: 0px;
  background: ${props => props.background};
  color: ${props => props.color};
  transition: opacity ${props => props.speed}ms ease-out;
  display: flex;
  text-align: center;
  font-size: 1.2em;
  z-index: ${props => props.zIndex};
  &._loading-overlay-transition-appear,
  &._loading-overlay-transition-enter {
    opacity: 0.01;
  }
  &._loading-overlay-transition-appear._loading-overlay-transition-appear-active,
  &._loading-overlay-transition-enter._loading-overlay-transition-enter-active {
    opacity: 1;
    transition: opacity 0.5s ease-in;
  }
  &._loading-overlay-transition-leave {
    opacity: 1;
  }
  &._loading-overlay-transition-leave._loading-overlay-transition-leave-active {
    opacity: 0;
    transition: opacity 0.5s ease-in;
  }
`;

const Spinner = styled.div`
  position: relative;
  margin: 0px auto 10px auto;
  width: ${props => props.spinnerSize};
  max-height: 100%;
  &:before {
    content: "";
    display: block;
    padding-top: 100%;
  }
`;

const Content = styled.div`
  margin: auto;
  display: flex;
  align-items: center;
`;

const bounce = keyframes`
  from {
    transform: translate3d(0, 0, 0);
  }
  to {
    transform: translate3d(0, 50px, 0);
  }
`;

const rotate360 = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const spinnerDash = keyframes`
  0% {
    stroke-dasharray: 1,200;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 89,200;
    stroke-dashoffset: -35px;
  }
  100% {
    stroke-dasharray: 89,200;
    stroke-dashoffset: -124px;
  }
`;

const Svg = styled.svg`
  animation: ${rotate360} 2s linear infinite;
  height: 100%;
  transform-origin: center center;
  width: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
`;

const Circle = styled.circle`
  animation: ${spinnerDash} 1.5s ease-in-out infinite;
  stroke-dasharray: 1, 200;
  stroke-dashoffset: 0;
  stroke-linecap: round;
  stroke: ${props => props.color};
`;

const Logo = styled.div`
  margin: auto;
  h1 {
    display: block;
    width: 100%;

    img {
      display: block;
      margin: 0 auto 10px auto;
      animation: ${bounce} 0.5s;
      animation-direction: alternate;
      animation-timing-function: cubic-bezier(0.5, 0.05, 1, 0.5);
      animation-iteration-count: infinite;
    }
  }
`;

class LoadingOverlay extends React.Component {
  render() {
    let spinnerNode = null;
    let logoNode = null;
    if (this.props.spinner) {
      spinnerNode = (
        <Spinner spinnerSize={this.props.spinnerSize}>
          <Svg viewBox="25 25 50 50">
            <Circle
              color={this.props.color}
              cx="50"
              cy="50"
              r="20"
              fill="none"
              strokeWidth="2"
              strokeMiterlimit="10"
            />
          </Svg>
        </Spinner>
      );
    }
    if (this.props.logo) {
      logoNode = (
        <Logo>
          <h1>
            <img src={logoImg} alt="MagnaChip" />
          </h1>
        </Logo>
      );
    }

    let textNode = null;
    if (this.props.text) textNode = <div>{this.props.text}</div>;

    let contentNode = null;
    if (this.props.text || this.props.spinner || this.props.logo) {
      contentNode = (
        <Content>
          {logoNode}
          {spinnerNode}
          {textNode}
        </Content>
      );
    }

    return (
      <Overlay
        background={this.props.background}
        color={this.props.color}
        speed={this.props.speed}
        zIndex={this.props.zIndex}
        key="dimmer"
        onClick={this.props.onClick}
      >
        {contentNode}
      </Overlay>
    );
  }
}

LoadingOverlay.defaultProps = {
  text: null,
  spinner: false,
  logo: false,
  onClick: null
};

export default LoadingOverlayWrapper;
