import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getTreeFromFlatData } from 'react-sortable-tree';
import { TreeSelect } from 'antd';

const getCategoryMapListAsTree = (flatData, flag, viewLang, rootkey) =>
  getTreeFromFlatData({
    flatData: flatData.map(item => ({
      title: item[`NAME_${viewLang && viewLang.length > 0 ? viewLang : 'KOR'}`],
      value: item.NODE_ID,
      key: item.NODE_ID,
      parentValue: item.PARENT_NODE_ID,
      selectable: flag === 'Y' || item.CHILDREN_CNT === 0,
    })),

    getKey: node => node.key,
    getParentKey: node => node.parentValue,
    rootKey: rootkey || 0,
  });

class TreeSelectComp extends Component {
  componentDidMount() {
    const {
      getExtraApiData,
      sagaKey: id,
      CONFIG: {
        property: { rootkey, customChangeForm },
      },
      viewPageData,
      colData,
      changeFormData,
      COMP_FIELD,
      compProps,
    } = this.props;
    const { viewType } = viewPageData;
    const apiArray = [
      {
        key: viewType !== 'VIEW' ? `treeSelect_${rootkey}` : `treeSelect_${colData}`,
        url: `/api/admin/v1/common/categoryChildrenListUseYn`,
        type: 'POST',
        params: { PARAM: { NODE_ID: Number(rootkey), USE_YN: 'Y' } },
      },
    ];
    if (colData && colData.length > 0) getExtraApiData(id, apiArray);
    else if (viewType !== 'VIEW') getExtraApiData(id, apiArray);
    // builderBase 최상단에서 데이터를 넘겨주고 싶을 때 사용 ex) saveTask 후에 formData를 index에 state로 가지고 있다가 내려주는용도
    if (compProps && compProps[COMP_FIELD]) {
      changeFormData(id, COMP_FIELD, compProps[COMP_FIELD]);
    }
  }

  onChangeHandler = value => {
    const { changeFormData, sagaKey: id, CONFIG, changeValidationData, COMP_FIELD, NAME_KOR } = this.props;
    const { isRequired } = CONFIG.property;
    if (isRequired) {
      changeValidationData(id, COMP_FIELD, value !== ' ', value !== ' ' ? '' : `${NAME_KOR}항목은 필수 입력입니다.`);
    }
    changeFormData(id, COMP_FIELD, value);
  };

  render() {
    const {
      CONFIG,
      CONFIG: {
        property: { selectableFlag, placeholder, viewLang, rootkey },
      },
      colData,
      extraApiData,
      readOnly,
      visible,
      searchCompRenderer,
      isSearch,
      viewPageData,
    } = this.props;
    const { viewType } = viewPageData;
    const apiData = viewType !== 'VIEW' ? extraApiData[`treeSelect_${rootkey}`] : extraApiData[`treeSelect_${colData}`];
    let categoryData;
    if (readOnly || CONFIG.property.readOnly) {
      categoryData = apiData && apiData.categoryMapList && apiData.categoryMapList.find(item => item.NODE_ID === Number(colData));
    } else {
      categoryData =
        (apiData &&
          apiData.categoryMapList &&
          getCategoryMapListAsTree(
            apiData.categoryMapList.filter(x => x.USE_YN === 'Y'),
            selectableFlag,
            viewLang,
            rootkey,
          )) ||
        [];
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
              <TreeSelect
                style={{ width: '100%' }}
                value={colData === 0 || (typeof colData === 'string' && colData.trim() === '') ? undefined : colData}
                dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                treeData={categoryData}
                onChange={value => this.onChangeHandler(value)}
                placeholder={placeholder}
                className={CONFIG.property.className || ''}
              />
            )}
          </>
        ) : (
          <TreeSelect style={{ width: '100%' }} value={undefined} placeholder="TreeSelect" className={CONFIG.property.className || ''}></TreeSelect>
        )}
      </>
    ) : (
      ''
    );
  }
}

TreeSelectComp.propTypes = {
  CONFIG: PropTypes.object,
  COMP_FIELD: PropTypes.string,
  colData: PropTypes.string,
  sagaKey: PropTypes.string,
  NAME_KOR: PropTypes.string,
  readOnly: PropTypes.bool,
  visible: PropTypes.bool,
  changeFormData: PropTypes.func,
  extraApiData: PropTypes.func,
  searchCompRenderer: PropTypes.func,
  getExtraApiData: PropTypes.func,
  changeValidationData: PropTypes.func,
  isSearch: PropTypes.bool,
  viewPageData: PropTypes.object,
};

TreeSelectComp.defaultProps = {};

export default TreeSelectComp;
