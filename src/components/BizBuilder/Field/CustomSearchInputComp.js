import * as PropTypes from 'prop-types';
import React from 'react';
import { Input } from 'antd';
import { debounce } from 'lodash';

class CustomSearchInputComp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleOnChangeSearch = debounce(this.handleOnChangeSearch, 300);
  }

  // custom search 예제
  handleOnChangeSearch = value => {
    const {
      sagaKey,
      changeSearchData,
      CONFIG: {
        property: { targetField, searchCondition, searchDataType },
      },
    } = this.props;
    let result = '';
    if (searchDataType === 'Number') {
      result = value.length > 0 ? `AND ${targetField} ${searchCondition} ${value}` : '';
    } else if (searchCondition === 'LIKE') {
      result = value.length > 0 ? `AND ${targetField}::varchar ${searchCondition} '%${value}%'` : '';
    } else {
      result = value.length > 0 ? `AND ${targetField}::varchar ${searchCondition} '${value}'` : '';
    }

    changeSearchData(sagaKey, targetField, result);
  };

  render() {
    const {
      CONFIG,
      readOnly,
      visible,
      CONFIG: {
        property: { placeholder },
      },
    } = this.props;
    return visible ? (
      <>
        <Input
          style={{ width: '100%' }}
          readOnly={readOnly || CONFIG.property.readOnly}
          placeholder={placeholder || ''}
          className={CONFIG.property.className || ''}
          onChange={e => this.handleOnChangeSearch(e.target.value)}
        />
      </>
    ) : (
      ''
    );
  }
}

CustomSearchInputComp.propTypes = {
  CONFIG: PropTypes.any,
  sagaKey: PropTypes.string,
  readOnly: PropTypes.any,
  changeSearchData: PropTypes.any,
  visible: PropTypes.bool,
};

export default CustomSearchInputComp;
