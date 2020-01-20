import React, { Component } from 'react';
import PropTypes from 'prop-types';

import CheckListComp from './CheckListComp';

class DwCheckListComp extends Component {
  state = {
    type: '',
  };

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

  onOkHandler = () => {
    const { changeFormData, sagaKey: id } = this.props;
    const { type } = this.state;
    changeFormData(id, 'LB_TYPE', type);
  };

  render() {
    const { visible, isManage, formData } = this.props;
    return isManage || (visible && formData.DOCNUMBER && formData.DOCNUMBER.substr(0, 4) !== 'MBKH') ? (
      <CheckListComp
        {...this.props}
        isCustom
        customOnChangeHandler={value => {
          this.setState({ type: value });
        }}
        customOnOkHandler={this.onOkHandler}
      ></CheckListComp>
    ) : (
      ''
    );
  }
}

export default DwCheckListComp;

DwCheckListComp.propTypes = {
  id: PropTypes.string,
  changeFormData: PropTypes.func,
};
