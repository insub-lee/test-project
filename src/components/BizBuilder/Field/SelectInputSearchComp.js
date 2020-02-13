import * as PropTypes from 'prop-types';
import React from 'react';
import { Input, Select } from 'antd';
import { debounce } from 'lodash';

const { Option } = Select;

class SelectInputSearchComp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchType: '',
      searchText: '',
    };
    this.handleOnChangeSearch = debounce(this.handleOnChangeSearch, 300);
  }

  componentDidMount() {
    const {
      getExtraApiData,
      sagaKey: id,
      CONFIG: {
        property: { mapId },
      },
    } = this.props;
    const apiArray = [{ key: `select_${mapId}`, url: `/api/admin/v1/common/categoryMapList?MAP_ID=${mapId}`, type: 'GET' }];
    getExtraApiData(id, apiArray);
  }

  // custom search 예제
  handleOnChangeSearch = value => {
    const { sagaKey, COMP_FIELD, changeSearchData } = this.props;
    const { searchType } = this.state;
    const searchText = value.length > 0 ? `AND W.${searchType} LIKE '%${value}%'` : '';
    changeSearchData(sagaKey, COMP_FIELD, searchText);
  };

  onChangeHandler = value => {
    const search = value.split('||');
    this.setState({
      searchType: search[0],
      searchText: search[1],
    });
  };

  render() {
    const {
      CONFIG,
      readOnly,
      visible,
      isSearch,
      searchCompRenderer,
      extraApiData,
      CONFIG: {
        property: { mapId, defaultValue, placeholder },
      },
    } = this.props;
    const { searchText } = this.state;
    const apiData = extraApiData[`select_${mapId}`];

    if (isSearch && visible && CONFIG.property.searchType !== 'CUSTOM') {
      return searchCompRenderer(this.props);
    }
    return (
      <>
        <Select
          value={searchText || ''}
          placeholder={placeholder}
          style={{ width: 300, marginRight: 10 }}
          onChange={value => {
            this.onChangeHandler(value);
          }}
          disabled={readOnly || CONFIG.property.readOnly}
          className={CONFIG.property.className || ''}
        >
          {apiData &&
            apiData.categoryMapList &&
            apiData.categoryMapList
              .filter(x => x.LVL > 0 && x.USE_YN === 'Y')
              .map(item => (
                <Option key={`selectMap_${item.NODE_ID}`} value={`${item.CODE}||${item.NAME_KOR}`}>
                  {item.NAME_KOR}
                </Option>
              ))}
        </Select>
        <Input style={{ width: 300, marginRight: 10 }} onChange={e => this.handleOnChangeSearch(e.target.value)} className={CONFIG.property.className || ''} />
      </>
    );
  }
}

SelectInputSearchComp.propTypes = {
  COMP_FIELD: PropTypes.any,
  NAME_KOR: PropTypes.any,
  CONFIG: PropTypes.any,
  changeFormData: PropTypes.any,
  id: PropTypes.any,
  changeValidationData: PropTypes.any,
  readOnly: PropTypes.any,
  compProp: PropTypes.any,
  changeSearchData: PropTypes.any,
};

export default SelectInputSearchComp;
