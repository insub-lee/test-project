import React from 'react';
import PropTypes from 'prop-types';
import DragM from 'dragm';

class BuildTitle extends React.Component {
  componentDidMount() {
    this.modalDom = document.getElementsByClassName('ant-modal-wrap')[this.props.num];
  }

  updateTransform = transformStr => {
    this.modalDom.style.transform = transformStr;
  };

  render() {
    const { title } = this.props;
    return (
      <DragM updateTransform={this.updateTransform}>
        <div>{title}</div>
      </DragM>
    );
  }
}

BuildTitle.propTypes = {
  title: PropTypes.string, //eslint-disable-line
  num: PropTypes.number, //eslint-disable-line
};

export default BuildTitle;
