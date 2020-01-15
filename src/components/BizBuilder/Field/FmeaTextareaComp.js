import React, { Component } from 'react';

import TextareaComp from './TextareaComp';

class FmeaTextareaComp extends Component {
  componentDidMount = () => {
    const { isManage, formData, rowClass } = this.props;
    if (!isManage && rowClass && Number(formData.FMEA_FLAG) !== 195) {
      const rowNode = document.querySelector(`.${rowClass}`);
      rowNode.style.display = 'none';
    }
  };

  render = () => {
    const { isManage, formData, visible } = this.props;
    return isManage || (visible && Number(formData.FMEA_FLAG) === 195) ? <TextareaComp {...this.props} /> : '';
  };
}

export default FmeaTextareaComp;
