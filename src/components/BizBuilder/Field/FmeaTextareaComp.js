import React, { Component } from 'react';

import message from 'components/Feedback/message';
import TextareaComp from './TextareaComp';

class FmeaTextareaComp extends Component {
  componentDidMount = () => {
    const { rowClass } = this.props;
    const rowNode = document.querySelector(`.${rowClass}`);
    rowNode.style.display = 'none';
  };

  componentDidUpdate = prevProps => {
    const { formData, rowClass } = this.props;
    const { formData: preFormData } = prevProps;
    if (formData.FMEA_FLAG !== preFormData.FMEA_FLAG) {
      const rowNode = document.querySelector(`.${rowClass}`);
      console.debug(formData.FMEA_FLAG);
      if (formData.FMEA_FLAG === 195) {
        rowNode.style.display = '';
        message.success('Description of FMEA를 입력해주세요', 2);
      } else {
        rowNode.style.display = 'none';
      }
    }
  };

  render = () => {
    const { isManage, formData, visible } = this.props;
    return <TextareaComp {...this.props} />;
  };
}

export default FmeaTextareaComp;
