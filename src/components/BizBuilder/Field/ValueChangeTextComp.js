import * as PropTypes from 'prop-types';
import React from 'react';
import { Input } from 'antd';
import { debounce } from 'lodash';

class TextComp extends React.Component {
  constructor(props) {
    super(props);
    this.handleOnChange = debounce(this.handleOnChange, 50);
  }

  componentWillUpdate(nextProps) {
    const { colData } = nextProps;
    if (this.props.colData && this.props.colData !== colData) {
      return true;
    }
    return false;
  }

  handleOnChange = value => {
    const { sagaKey: id, COMP_FIELD, CONFIG, changeFormData, changeValidationData } = this.props;
    changeFormData(id, COMP_FIELD, value);
  };

  render() {
    const { CONFIG, colData, readOnly, visible, isSearch, searchCompRenderer } = this.props;
    if (isSearch && visible && CONFIG.property.searchType !== 'CUSTOM') {
      return searchCompRenderer(this.props);
    }
    return visible ? (
      <Input
        value={colData}
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
