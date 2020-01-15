import React, { Component } from 'react';

import TextareaComp from './TextareaComp';

class IFoundryTextareaComp extends Component {
  componentDidMount = () => {
    const { isManage, formData, rowClass } = this.props;
    if (!isManage && rowClass && formData.DOCNUMBER.indexOf('ME') !== 0) {
      const rowNode = document.querySelector(`.${rowClass}`);
      rowNode.style.display = 'none';
    }
  };

  render = () => {
    const { isManage, formData, visible } = this.props;
    return isManage || (visible && formData.DOCNUMBER && formData.DOCNUMBER.indexOf('ME') === 0) ? <TextareaComp {...this.props} /> : '';
  };
}

export default IFoundryTextareaComp;
