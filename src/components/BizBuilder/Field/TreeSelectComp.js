import React, { Component } from 'react';
import { getTreeFromFlatData } from 'react-sortable-tree';
import { TreeSelect } from 'antd';

const getCategoryMapListAsTree = (flatData, flag, viewLang) =>
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
    rootKey: 0,
  });

class TreeSelectComp extends Component {
  componentDidMount() {
    const {
      getExtraApiData,
      id,
      CONFIG: {
        property: { mapId },
      },
      viewType,
      colData,
    } = this.props;
    const apiArray = [{ key: `treeSelect_${mapId}`, url: `/api/admin/v1/common/categoryMapList?MAP_ID=${mapId}`, type: 'GET' }];
    if (colData && colData.length > 0) getExtraApiData(id, apiArray);
    else if (viewType !== 'VIEW') getExtraApiData(id, apiArray);
  }

  onChangeHandler = value => {
    const { changeFormData, id, CONFIG, changeValidationData, COMP_FIELD, NAME_KOR } = this.props;
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
        property: { mapId, selectParent, placeholder, viewLang },
      },
      colData,
      extraApiData,
      readOnly,
      visible,
    } = this.props;
    const apiData = extraApiData[`treeSelect_${mapId}`];
    const tempData =
      (apiData &&
        apiData.categoryMapList &&
        getCategoryMapListAsTree(
          apiData.categoryMapList.filter(x => x.USE_YN === 'Y'),
          selectParent,
          viewLang,
        )) ||
      [];
    const categoryData = tempData.length > 0 ? tempData[0] : [];
    return visible ? (
      <>
        {colData !== undefined ? (
          <TreeSelect
            style={{ width: '100%' }}
            value={colData === ' ' || colData === 0 ? undefined : colData}
            dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
            treeData={categoryData.children}
            disabled={readOnly || CONFIG.property.readOnly}
            onChange={value => this.onChangeHandler(value)}
            placeholder={placeholder}
          />
        ) : (
          <TreeSelect style={{ width: '100%' }} value={undefined} placeholder="TreeSelect"></TreeSelect>
        )}
      </>
    ) : (
      ''
    );
  }
}

export default TreeSelectComp;
