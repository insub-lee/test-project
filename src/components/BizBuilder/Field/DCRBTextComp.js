import * as PropTypes from 'prop-types';
import React from 'react';
import { Input } from 'antd';
import { debounce } from 'lodash';

class DCRBTextComp extends React.Component {
  constructor(props) {
    super(props);
    this.handleOnChange = debounce(this.handleOnChange, 300);
  }

  componentDidMount = () => {
    const { formData, rowClass, isManage } = this.props;
    const isDisplay =
      formData.DOCNUMBER &&
      formData.DOCNUMBER.indexOf('ME') === 0 &&
      (formData.DOCNUMBER.substr(3, 1) === 'B' ||
        formData.DOCNUMBER.substr(3, 1) === 'C' ||
        formData.DOCNUMBER.substr(3, 1) === 'J' ||
        formData.DOCNUMBER.substr(3, 1) === 'K');
    if (!isManage && !isDisplay && rowClass) {
      const rowNode = document.querySelector(`.${rowClass}`);
      rowNode.style.display = 'none';
    }
  };

  handleOnChange = (value, key) => {
    const { sagaKey: id, COMP_FIELD, NAME_KOR, CONFIG, changeFormData, changeValidationData, colData } = this.props;
    let tempData = [];
    let retValue = '';
    if (colData && colData.length > 0) {
      tempData = colData.split('-');
      tempData[key] = value;
      retValue = tempData.join('-');
    } else {
      retValue = key === 1 ? `${value}-` : `-${value}`;
    }
    if (CONFIG.property.isRequired) {
      changeValidationData(id, COMP_FIELD, retValue.trim().length > 0, retValue.trim().length > 0 ? '' : `${NAME_KOR}항목은 필수 입력입니다.`);
    }
    changeFormData(id, COMP_FIELD, retValue);
  };

  render() {
    const { CONFIG, colData, readOnly, visible, isManage, formData } = this.props;
    let value1 = '';
    let value2 = '';
    if (colData && colData.length > 0) {
      const splitData = colData.split('-');
      if (splitData.length === 2) {
        value1 = splitData[0];
        value2 = splitData[1];
      } else if (splitData.length === 1) {
        if (colData.indexOf('-') === 0) value2 = splitData[0];
        else value1 = splitData[0];
      }
    }
    return isManage ||
      (visible &&
        formData.DOCNUMBER &&
        formData.DOCNUMBER.indexOf('ME') === 0 &&
        (formData.DOCNUMBER.substr(3, 1) === 'B' ||
          formData.DOCNUMBER.substr(3, 1) === 'C' ||
          formData.DOCNUMBER.substr(3, 1) === 'J' ||
          formData.DOCNUMBER.substr(3, 1) === 'K')) ? (
      <>
        <Input
          defaultValue={value1}
          maxLength={6}
          placeholder={CONFIG.property.placeholder}
          onChange={e => this.handleOnChange(e.target.value, 0)}
          readOnly={readOnly || CONFIG.property.readOnly}
          style={{ width: '70px' }}
        />{' '}
        -{' '}
        <Input
          defaultValue={value2}
          maxLength={3}
          placeholder={CONFIG.property.placeholder}
          onChange={e => this.handleOnChange(e.target.value, 1)}
          readOnly={readOnly || CONFIG.property.readOnly}
          style={{ width: '50px' }}
        />
      </>
    ) : (
      ''
    );
  }
}

DCRBTextComp.propTypes = {
  COMP_FIELD: PropTypes.any,
  NAME_KOR: PropTypes.any,
  CONFIG: PropTypes.any,
  colData: PropTypes.any,
  changeFormData: PropTypes.any,
  sagaKey: PropTypes.any,
  changeValidationData: PropTypes.any,
  readOnly: PropTypes.any,
  compProp: PropTypes.any,
};

export default DCRBTextComp;
