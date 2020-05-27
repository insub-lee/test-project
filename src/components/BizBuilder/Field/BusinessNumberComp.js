import * as PropTypes from 'prop-types';
import React from 'react';
import { Input } from 'antd';
import { debounce } from 'lodash';

class BusinessNumberComp extends React.Component {
  constructor(props) {
    super(props);
    this.handleOnChange = debounce(this.handleOnChange, 300);
    // this.handleOnChangeSearch = debounce(this.handleOnChangeSearch, 300);
  }

  handleOnChange = value => {
    const { sagaKey: id, COMP_FIELD, NAME_KOR, CONFIG, changeFormData, changeValidationData } = this.props;
    if (CONFIG.property.isRequired) {
      changeValidationData(id, COMP_FIELD, value.trim().length > 0, value.trim().length > 0 ? '' : `${NAME_KOR}항목은 필수 입력입니다.`);

      if (!this.handleBusinessNumberCheck(value.replace(/-/gi, ''))) {
        changeValidationData(id, COMP_FIELD, false, '사업자번호등록번호가 맞지 않습니다');
      }
    }
    changeFormData(id, COMP_FIELD, value);
  };

  handleBusinessNumberCheck = bNum => {
    let sum = 0;
    const getlist = new Array(10);
    const chkvalue = new Array('1', '3', '7', '1', '3', '7', '1', '3', '5');

    for (let i = 0; i < 10; i++) {
      getlist[i] = bNum.substring(i, i + 1);
    }

    for (let i = 0; i < 9; i++) {
      sum += getlist[i] * chkvalue[i];
    }
    sum += parseInt((getlist[8] * 5) / 10);
    const sidliy = sum % 10;
    let sidchk = 0;

    if (sidliy != 0) {
      sidchk = 10 - sidliy;
    } else {
      sidchk = 0;
    }
    if (sidchk != getlist[9]) {
      return false;
    }
    return true;
  };

  render() {
    const { CONFIG, colData, readOnly, visible, isSearch, searchCompRenderer } = this.props;
    if (isSearch && visible && CONFIG.property.searchType !== 'CUSTOM') {
      return searchCompRenderer(this.props);
    }
    return visible ? (
      <Input
        defaultValue={colData}
        style={{ width: '100%' }}
        placeholder={CONFIG.property.placeholder}
        onChange={e => this.handleOnChange(e.target.value)}
        readOnly={readOnly || CONFIG.property.readOnly}
        className={CONFIG.property.className || ''}
      />
    ) : (
      ''
    );
  }
}

BusinessNumberComp.propTypes = {
  COMP_FIELD: PropTypes.any,
  NAME_KOR: PropTypes.any,
  CONFIG: PropTypes.any,
  colData: PropTypes.any,
  changeFormData: PropTypes.any,
  id: PropTypes.any,
  changeValidationData: PropTypes.any,
  readOnly: PropTypes.any,
  compProp: PropTypes.any,
  changeSearchData: PropTypes.any,
};

export default BusinessNumberComp;
