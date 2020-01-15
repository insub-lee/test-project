import React, { Component } from 'react';

import RadioCharComp from './RadioCharComp';
class FmeaFlagRadioCharComp extends Component {
  componentDidMount = () => {
    const { isManage, formData, rowClass } = this.props;
    const isDisplay =
      formData.DOCNUMBER &&
      (formData.DOCNUMBER.indexOf('MBA') === 0 ||
        formData.DOCNUMBER.indexOf('MBB') === 0 ||
        formData.DOCNUMBER.indexOf('MBC') === 0 ||
        formData.DOCNUMBER.indexOf('MBF') === 0 ||
        formData.DOCNUMBER.indexOf('MBG') === 0 ||
        formData.DOCNUMBER.indexOf('MBH') === 0 ||
        formData.DOCNUMBER.indexOf('MBI') === 0);
    if (!isManage && rowClass && !isDisplay) {
      const rowNode = document.querySelector(`.${rowClass}`);
      rowNode.style.display = 'none';
    }
  };

  render = () => {
    const { isManage, visible, formData } = this.props;
    return isManage ||
      (visible &&
        formData.DOCNUMBER &&
        (formData.DOCNUMBER.indexOf('MBA') === 0 ||
          formData.DOCNUMBER.indexOf('MBB') === 0 ||
          formData.DOCNUMBER.indexOf('MBC') === 0 ||
          formData.DOCNUMBER.indexOf('MBF') === 0 ||
          formData.DOCNUMBER.indexOf('MBG') === 0 ||
          formData.DOCNUMBER.indexOf('MBH') === 0 ||
          formData.DOCNUMBER.indexOf('MBI') === 0)) ? (
      <RadioCharComp {...this.props} />
    ) : (
      ''
    );
  };
}

export default FmeaFlagRadioCharComp;
