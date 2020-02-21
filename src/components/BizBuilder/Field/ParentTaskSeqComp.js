import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ParentTaskSeqComp extends Component {
  componentDidMount = () => {
    const { sagaKey: id, changeFormData, COMP_FIELD, compProps } = this.props;
    changeFormData(id, COMP_FIELD, (compProps && compProps.PARENT_TASK_SEQ) || ''); // 부모키
    changeFormData(id, 'TITLE', (compProps && compProps.TITLE) || ''); // 부모 데이터 제목
    changeFormData(id, 'TYPE', (compProps && compProps.TYPE) || ''); // 부모 데이터 종류
  };

  render = () => {
    const { CONFIG, colData, visible } = this.props;

    return visible ? <span className={CONFIG.property.className || ''}>{colData}</span> : '';
  };
}

ParentTaskSeqComp.propTypes = {
  colData: PropTypes.any,
  visible: PropTypes.bool,
};

export default ParentTaskSeqComp;
