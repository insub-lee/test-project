import * as PropTypes from 'prop-types';
import React from 'react';
import { Input, TreeSelect, Select } from 'antd';
import { debounce } from 'lodash';
const { Option } = Select;

class TextComp extends React.Component {
  constructor(props) {
    super(props);
    this.handleOnChangeSearch = debounce(this.handleOnChangeSearch, 300);
  }

  handleOnChangeSearch = value => {
    const { sagaKey, COMP_FIELD, changeSearchData, CONFIG } = this.props;
    let searchText = '';
    if (value && (value.length > 0 || value > 0)) {
      let searchVal = '';
      switch (CONFIG.property.searchDataType) {
        case 'STRING':
          searchVal = `'${value}'`;
          break;
        case 'NUMBER':
          searchVal = value;
          break;
        default:
      }
      switch (CONFIG.property.searchCondition) {
        case '=':
          searchText = `AND W.${COMP_FIELD} = ${searchVal}`;
          break;
        case 'LIKE':
          searchText = `AND W.${COMP_FIELD} LIKE '%${value}%'`;
          break;
        default:
      }
    }
    changeSearchData(sagaKey, COMP_FIELD, searchText);
  };

  render() {
    const { CONFIG, isSearch, searchTreeData, searchSelectData } = this.props;
    if (isSearch) {
      switch (CONFIG.property.searchType) {
        case 'INPUT':
          return <Input onChange={e => this.handleOnChangeSearch(e.target.value)} className={CONFIG.property.className || ''} />;
        case 'SELECT':
          return (
            <Select
              allowClear
              style={{ width: '100%', marginRight: 10 }}
              onChange={value => {
                this.handleOnChangeSearch(value);
              }}
              className={CONFIG.property.className || ''}
            >
              {searchSelectData &&
                searchSelectData.map(item => (
                  <Option key={`selectMap_${item.NODE_ID}`} value={item.NODE_ID}>
                    {item.NAME_KOR}
                  </Option>
                ))}
            </Select>
          );
        case 'TREESELECT':
          return (
            <TreeSelect
              allowClear
              style={{ width: '100%' }}
              dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
              treeData={searchTreeData}
              onChange={value => this.handleOnChangeSearch(value)}
              className={CONFIG.property.className || ''}
            />
          );
        default:
          return '';
      }
    }
    return '';
  }
}

TextComp.propTypes = {
  COMP_FIELD: PropTypes.any,
  CONFIG: PropTypes.any,
  isSearch: PropTypes.any,
  sagaKey: PropTypes.any,
  changeSearchData: PropTypes.any,
};

export default TextComp;
