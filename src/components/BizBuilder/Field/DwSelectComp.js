import React, { Component } from 'react';

import SelectComp from './SelectComp';

class DwSelectComp extends Component {
  componentDidMount = () => {
    const { isManage, formData, rowClass } = this.props;
    if (!isManage && rowClass && formData.DOCNUMBER && formData.DOCNUMBER.substr(0, 4) === 'MBKH') {
      const rowNode = document.querySelector(`.${rowClass}`);
      rowNode.style.display = 'none';
    }
  };

  componentDidUpdate = prevProps => {
    const { isManage, formData, rowClass } = this.props;
    const { formData: prevFormData } = prevProps;
    if (formData.DOCNUMBER && prevFormData.DOCNUMBER && formData.DOCNUMBER !== prevFormData.DOCNUMBER) {
      if (!isManage && rowClass && formData.DOCNUMBER.substr(0, 4) === 'MBKH') {
        const rowNode = document.querySelector(`.${rowClass}`);
        rowNode.style.display = 'none';
      } else if (rowClass) {
        const rowNode = document.querySelector(`.${rowClass}`);
        rowNode.style.display = '';
      }
    }
  };

  render = () => {
    const { isManage, visible, formData } = this.props;
    return isManage || (visible && formData.DOCNUMBER.substr(0, 4) !== 'MBKH') ? <SelectComp {...this.props} /> : '';
  };
}
export default DwSelectComp;
