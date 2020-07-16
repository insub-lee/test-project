import * as PropTypes from 'prop-types';
import React from 'react';
import { InputNumber } from 'antd';
import { debounce } from 'lodash';

class NumberComp extends React.Component {
  constructor(props) {
    super(props);
    this.handleOnChange = debounce(this.handleOnChange, 300);
  }

  handleOnChange = value => {
    const { sagaKey: id, COMP_FIELD, NAME_KOR, CONFIG, changeFormData, changeValidationData } = this.props;
    if (CONFIG.property.isRequired) {
      changeValidationData(id, COMP_FIELD, !!value, !value ? '' : `${NAME_KOR}항목은 필수 입력입니다.`);
    }
    changeFormData(id, COMP_FIELD, value);
  };

  render() {
    const { CONFIG, colData, readOnly, visible } = this.props;
    return visible ? (
      <InputNumber
        defaultValue={colData}
        max={10 ** CONFIG.info.size}
        placeholder={CONFIG.property.placeholder}
        onChange={value => this.handleOnChange(value)}
        style={{ width: '100%' }}
        readOnly={readOnly || CONFIG.property.readOnly}
        className={CONFIG.property.className || ''}
      />
    ) : (
      ''
    );
  }
}

NumberComp.propTypes = {
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

export default NumberComp;
