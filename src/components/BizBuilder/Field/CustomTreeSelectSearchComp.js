import React, { Component } from 'react';
import * as PropTypes from 'prop-types';

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

class CustomTreeSelectSearchComp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categoryData: [],
    };
  }

  componentDidMount() {
    const {
      getExtraApiData,
      sagaKey: id,
      CONFIG: {
        property: { mapId },
      },
      viewType,
      colData,
    } = this.props;
    const apiArray = [{ key: `treeSelect_${mapId}`, url: `/api/admin/v1/common/categoryMapList?MAP_ID=${mapId}`, type: 'GET' }];
    if (mapId) getExtraApiData(id, apiArray, this.appStart);
  }

  appStart = () => {
    const {
      extraApiData,
      CONFIG: {
        property: { mapId, selectableFlag, viewLang },
      },
    } = this.props;
    const apiData = extraApiData[`treeSelect_${mapId}`];

    const tempData =
      (apiData &&
        apiData.categoryMapList &&
        getCategoryMapListAsTree(
          apiData.categoryMapList.filter(x => x.USE_YN === 'Y'),
          selectableFlag,
          viewLang,
        )) ||
      [];

    const categoryData = tempData.length > 0 ? tempData[0] : [];
    this.setState({ categoryData: categoryData && categoryData.children });
  };

  onChangeSearchHandler = value => {
    const {
      changeSearchData,
      sagaKey: id,
      COMP_FIELD,
      extraApiData,
      CONFIG: {
        property: { mapId, searchDataType },
      },
    } = this.props;

    console.debug('this.props [ ', this.props, ' ]');
    const apiData = extraApiData[`treeSelect_${mapId}`];
    let searchText = '';
    apiData &&
      apiData.categoryMapList &&
      apiData.categoryMapList.forEach(a => {
        if (a.FULLPATH.indexOf(String(value)) != -1) {
          if (!searchText) {
            searchText += `('${a.NODE_ID}'`;
          } else {
            searchText += `, '${a.NODE_ID}'`;
          }
        }
      });

    if (searchText) {
      searchText += ' )';
      searchDataType === 'STRING'
        ? changeSearchData(id, COMP_FIELD, `AND W.${COMP_FIELD} IN ${searchText}`)
        : changeSearchData(id, COMP_FIELD, `AND W.${COMP_FIELD} IN ${searchText.replace(/\'/gi, '')}`);
    } else {
      changeSearchData(id, COMP_FIELD, '');
    }
  };

  render() {
    const {
      CONFIG,
      CONFIG: {
        property: { placeholder },
      },
      readOnly,
      visible,
      searchCompRenderer,
      isSearch,
    } = this.props;

    const { categoryData } = this.state;

    if (isSearch && visible && CONFIG.property.searchType === 'CUSTOM') {
      return (
        <TreeSelect
          style={{ width: '100%' }}
          dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
          treeData={categoryData}
          onChange={this.onChangeSearchHandler}
          placeholder={placeholder}
          className={CONFIG.property.className || ''}
        />
      );
    }
    return '';
  }
}

CustomTreeSelectSearchComp.propTypes = {};

CustomTreeSelectSearchComp.defaultProps = {};

export default CustomTreeSelectSearchComp;
