import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Select, Input } from 'antd';
import { debounce } from 'lodash';

const Option = Select;

class SRDReqCustomSelectComp extends Component {
  constructor(props) {
    super(props);
    this.onChangeInputHandler = debounce(this.onChangeInputHandler, 300);
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

  onChangeHandler = value => {
    const { changeFormData, sagaKey: id, CONFIG, changeValidationData, COMP_FIELD, NAME_KOR } = this.props;
    const { isRequired } = CONFIG.property;
    if (isRequired) {
      changeValidationData(id, COMP_FIELD, value !== ' ', value !== ' ' ? '' : `${NAME_KOR}항목은 필수 입력입니다.`);
    }
    changeFormData(id, COMP_FIELD, value);
  };

  onChangeInputHandler = value => {
    const { changeFormData, sagaKey: id } = this.props;
    changeFormData(id, 'ITEM_NM_ETC', value);
  };

  render() {
    const {
      CONFIG,
      CONFIG: {
        property: { mapId, placeholder, rootkey },
      },
      colData,
      extraApiData,
      readOnly,
      visible,
      searchCompRenderer,
      isSearch,
    } = this.props;

    const apiData = extraApiData[`select_${mapId}`];
    let categoryData;
    if (readOnly || CONFIG.property.readOnly) {
      categoryData = apiData && apiData.categoryMapList.find(f => f.NODE_ID === colData);
    } else {
      categoryData = apiData && apiData.categoryMapList.filter(f => f.PARENT_NODE_ID === rootkey);
    }

    if (isSearch && visible && CONFIG.property.searchType !== 'CUSTOM') {
      return searchCompRenderer({ ...this.props, searchTreeData: categoryData });
    }
    return visible ? (
      <>
        {colData !== undefined ? (
          <>
            {readOnly || CONFIG.property.readOnly ? (
              <span>{categoryData && categoryData.NAME_KOR}</span>
            ) : (
              <Select
                style={{ width: '50%' }}
                value={colData === 0 || (typeof colData === 'string' && colData.trim() === '') ? undefined : colData}
                onChange={value => this.onChangeHandler(value)}
                placeholder={placeholder}
                className={CONFIG.property.className || ''}
              >
                {categoryData && categoryData.map(item => <Option value={item.NODE_ID}>{item.NAME_KOR}</Option>)}
              </Select>
            )}
            {colData === '1338' || colData === 1338 ? (
              <Input style={{ width: '50%' }} defaultValue={FormData.ITEM_NM_ETC} onChange={e => this.onChangeInputHandler(e.target.value)}></Input>
            ) : (
              ''
            )}
          </>
        ) : (
          <Select style={{ width: '100%' }} value={undefined} placeholder="Select" className={CONFIG.property.className || ''}></Select>
        )}
      </>
    ) : (
      ''
    );
  }
}

SRDReqCustomSelectComp.propTypes = {
  CONFIG: PropTypes.any,
  isSearch: PropTypes.any,
  extraApiData: PropTypes.any,
  readOnly: PropTypes.bool,
  colData: PropTypes.string,
  sagaKey: PropTypes.string,
  COMP_FIELD: PropTypes.string,
  visible: PropTypes.bool,
  changeFormData: PropTypes.func,
  getExtraApiData: PropTypes.func,
  searchCompRenderer: PropTypes.any,
  changeValidationData: PropTypes.func,
  NAME_KOR: PropTypes.string,
};

SRDReqCustomSelectComp.defaultProps = {};

export default SRDReqCustomSelectComp;
