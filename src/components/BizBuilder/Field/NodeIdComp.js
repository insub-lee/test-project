import React, { Component } from 'react';
import PropTypes from 'prop-types';

class NodeIdComp extends Component {
  componentDidMount = () => {
    const { sagaKey: id, COMP_FIELD, compProps, changeFormData } = this.props;
    if (compProps && compProps.NODE_ID) {
      changeFormData(id, COMP_FIELD, compProps.NODE_ID);
    }
  };

  render = () => {
    const { colData, visible, CONFIG } = this.props;
    return visible ? <span className={CONFIG.property.className || ''}>{colData}</span> : '';
  };
}

NodeIdComp.propTypes = {
  colData: PropTypes.number,
  visible: PropTypes.bool,
};

export default NodeIdComp;
