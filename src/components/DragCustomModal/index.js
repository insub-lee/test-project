import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Modal } from 'antd';
import { CSSTransition } from 'react-transition-group';

class DragCustomModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isDragging: false,
      isResizing: false,
      top:
        this.props.top !== undefined
          ? this.props.top
          : this.props.initHeight
          ? window.innerHeight / 2 - this.props.initHeight / 2 - 50
          : window.innerHeight / 2 - 400 / 2 - 50,
      left:
        this.props.left !== undefined
          ? this.props.left
          : this.props.initWidth
          ? window.innerWidth / 2 - this.props.initWidth / 2 - 21
          : window.innerWidth / 2 - 800 / 2 - 21,
    };

    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
    this.onMouseDown = this.onMouseDown.bind(this);
  }
  onMouseDown(e) {
    // only left mouse button
    document.addEventListener('mousemove', this.onMouseMove);
    if (e.button !== 0) return;
    var pos = ReactDOM.findDOMNode(this.node_modal);
    this.setState({
      isDragging: true,
      rel: {
        x: e.pageX - pos.offsetLeft,
        y: e.pageY - pos.offsetTop,
      },
    });
    e.stopPropagation();
    e.preventDefault();
  }

  onMouseUp(e) {
    console.debug('mouseUp!!!');
    document.removeEventListener('mousemove', this.onMouseMove);
    this.setState({ isDragging: false });
    e.stopPropagation();
    e.preventDefault();
  }

  onMouseMove = e => {
    if (this.state.isDragging) {
      const dragDom = document.getElementsByClassName('drag-custom-modal')[0];
      // const top = e.pageY - this.state.rel.y;
      const left = e.pageX - this.state.rel.x;
      // dragDom.style.top = `${top}px`;
      dragDom.style.left = `${left}px`;
      console.debug(e.pageX, e.clientX, left);
    }

    e.stopPropagation();
    e.preventDefault();
  };

  render() {
    const { visible } = this.props;
    const titleElement = (
      <div className="ant-design-draggable-modal-title" onMouseDown={this.onMouseDown} onMouseMove={this.onMouseMove} onMouseUp={this.onMouseUp}>
        타이틀
      </div>
    );
    return (
      <Modal
        wrapClassName="drag-custom-modal"
        visible={visible}
        mask={false}
        title={titleElement}
        ref={node => {
          this.node_modal = node;
        }}
      >
        {this.props.children}
      </Modal>
    );
  }
}

export default DragCustomModal;
