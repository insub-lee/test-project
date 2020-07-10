import React, { Component, Fragment } from 'react';
import { CSSTransition } from 'react-transition-group';

class Modal extends Component {
  render() {
    return (
      <>
        <CSSTransition>
          <div>{this.props.children}</div>
        </CSSTransition>
      </>
    );
  }
}

export default Modal;
