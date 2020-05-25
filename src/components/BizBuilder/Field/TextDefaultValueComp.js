import * as PropTypes from 'prop-types';
import React from 'react';
import { Input } from 'antd';
import { debounce } from 'lodash';

class TextDefaultValueComp extends React.Component {
  constructor(props) {
    super(props);
    this.handleOnChange = debounce(this.handleOnChange, 300);
    // this.handleOnChangeSearch = debounce(this.handleOnChangeSearch, 300);
  }

  componentDidMount() {
    const { CONFIG } = this.props;
    const defaultValue = (CONFIG && CONFIG.property && CONFIG.property.defaultValue) || '';

    if (defaultValue) this.handleOnChange(defaultValue, 'init');
  }

  handleOnChange = (value, flag) => {
    const {
      sagaKey: id,
      COMP_FIELD,
      CONFIG,
      changeFormData,
      changeValidationData,
      CONFIG: {
        property: { isRequired },
      },
      NAME_KOR,
    } = this.props;
    if (isRequired && flag) {
      changeValidationData(id, COMP_FIELD, true, '');
    } else if (isRequired) {
      // 기본값인지 체크
      changeValidationData(id, COMP_FIELD, value.toString().trim() !== '', value.toString().trim() !== '' ? '' : `${NAME_KOR}항목은 필수 입력입니다.`);
    }
    changeFormData(id, COMP_FIELD, value);
  };

  render() {
    const { CONFIG, colData, readOnly, visible, isSearch, searchCompRenderer } = this.props;
    if (isSearch && visible && CONFIG.property.searchType !== 'CUSTOM') {
      return searchCompRenderer(this.props);
    }
    const defaultValue = (CONFIG && CONFIG.property && CONFIG.property.defaultValue) || '';

    return visible ? (
      <Input
        defaultValue={colData || defaultValue || ''}
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

TextDefaultValueComp.propTypes = {
  COMP_FIELD: PropTypes.any,
  NAME_KOR: PropTypes.any,
  CONFIG: PropTypes.any,
  colData: PropTypes.any,
  changeFormData: PropTypes.any,
  sagaKey: PropTypes.string,
  changeValidationData: PropTypes.any,
  readOnly: PropTypes.any,
};

export default TextDefaultValueComp;
