import React, { Component } from 'react';
import { getTreeFromFlatData } from 'react-sortable-tree';
import { TreeSelect } from 'antd';

const getCategoryMapListAsTree = (flatData, flag) =>
  getTreeFromFlatData({
    flatData: flatData.map(item => ({
      title: item.NAME_KOR,
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
    const { getExtraApiData, id, CONFIG } = this.props;
    getExtraApiData(id, CONFIG.property.apiArray);
  }

  onChangeHandler = value => {
    const { changeFormData, id, CONFIG, changeValidationData } = this.props;
    const { isRequired, COMP_FIELD } = CONFIG.property;
    if (isRequired) {
      changeValidationData(id, COMP_FIELD, value !== ' ', value !== ' ' ? '' : `${CONFIG.property.NAME_KOR}항목은 필수 입력입니다.`);
    }

    changeFormData(id, COMP_FIELD, value);
  };

  render() {
    const {
      CONFIG,
      CONFIG: {
        property: { apiKey, selectParent, defaultValue, placeholder },
      },
      colData,
      extraApiData,
      readOnly,
    } = this.props;
    const apiData = extraApiData[apiKey];
    const categoryData =
      apiData && apiData.categoryMapList && getCategoryMapListAsTree(apiData.categoryMapList.filter(x => x.USE_YN === 'Y')).length > 0
        ? getCategoryMapListAsTree(apiData.categoryMapList.filter(x => x.USE_YN === 'Y'), selectParent)[0]
        : [];
    return (
      <TreeSelect
        style={{ width: 300, marginRight: 10 }}
        value={colData === ' ' || colData === 0 ? undefined : colData}
        dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
        treeData={categoryData.children}
        disabled={readOnly || CONFIG.property.readOnly}
        onChange={value => this.onChangeHandler(value)}
        placeholder={placeholder}
      />
    );
  }
}

export default TreeSelectComp;
