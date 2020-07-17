import * as PropTypes from 'prop-types';
import React from 'react';
import { Input } from 'antd';
import { debounce } from 'lodash';

class TextComp extends React.Component {
  constructor(props) {
    super(props);
    this.handleOnChange = debounce(this.handleOnChange, 300);
    // this.handleOnChangeSearch = debounce(this.handleOnChangeSearch, 300);
  }

  handleOnChange = value => {
    const { sagaKey: id, COMP_FIELD, CONFIG, changeFormData, changeValidationData } = this.props;
    // if (CONFIG.property.isRequired) {
    //   changeValidationData(id, COMP_FIELD, value.trim().length > 0, value.trim().length > 0 ? '' : `${COMP_FIELD}항목은 필수 입력입니다.`);
    // }
    changeFormData(id, COMP_FIELD, value);
  };

  // custom search 예제
  // handleOnChangeSearch = value => {
  //   const { sagaKey, COMP_FIELD, changeSearchData } = this.props;
  //   const searchText = value.length > 0 ? `AND W.${COMP_FIELD} LIKE '%${value}%'` : '';
  //   changeSearchData(sagaKey, COMP_FIELD, searchText);
  // };

  render() {
    const { CONFIG, colData, readOnly, visible, isSearch, searchCompRenderer } = this.props;
    if (isSearch && visible && CONFIG.property.searchType !== 'CUSTOM') {
      return searchCompRenderer(this.props);
    }
    // custom search 예제
    // } else {
    // return <Input onChange={e => this.handleOnChangeSearch(e.target.value)} className={CONFIG.property.className || ''} />;
    // }
    return visible ? (
      <Input
        defaultValue={colData}
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

TextComp.propTypes = {
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

export default TextComp;
