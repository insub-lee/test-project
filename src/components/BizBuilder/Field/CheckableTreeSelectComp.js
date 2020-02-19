import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getTreeFromFlatData } from 'react-sortable-tree';

import { TreeSelect } from 'antd';
const { SHOW_PARENT } = TreeSelect;

class CheckableTreeSelectComp extends Component {
  state = {
    scopeTreeData: [],
  };

  componentDidMount() {
    const { sagaKey, getExtraApiData, apiArys } = this.props;
    getExtraApiData(sagaKey, apiArys, this.initDatBind);
    console.debug(this.props);
  }

  getTreeData = (categoryMapList, rootId) =>
    categoryMapList.length > 0
      ? getTreeFromFlatData({
          flatData: categoryMapList
            .filter(filterItem => filterItem.USE_YN === 'Y')
            .map(item => ({
              title: item.NAME_KOR,
              value: item.NODE_ID,
              key: item.NODE_ID,
              parentValue: item.PARENT_NODE_ID,
            })),
          getKey: node => node.key,
          getParentKey: node => node.parentValue,
          rootKey: rootId,
        })
      : [];

  initDatBind = sagaKey => {
    const {
      extraApiData: {
        list: { categoryMapList: scopeList },
      },
    } = this.props;

    const scopeTreeData = scopeList
      .filter(f => f.LVL === 1)
      .map(scope => ({
        title: scope.NAME_KOR,
        value: scope.NODE_ID,
        key: scope.NODE_ID,
        parentValue: scope.PARENT_NODE_ID,
        children: this.getTreeData(scopeList, scope.NODE_ID),
      }));
    this.setState({ scopeTreeData });
  };

  onChangeTree = nodeIds => {
    const { changeFormData, COMP_FIELD, sagaKey } = this.props;
    changeFormData(sagaKey, COMP_FIELD, nodeIds.join());
  };

  render() {
    const { scopeTreeData } = this.state;
    return <TreeSelect onChange={this.onChangeTree} treeData={scopeTreeData} treeCheckable />;
  }
}

CheckableTreeSelectComp.propTypes = {
  apiArys: PropTypes.array,
  treeData: PropTypes.object,
};

CheckableTreeSelectComp.defaultProps = {
  apiArys: [
    {
      key: 'list',
      url: `/api/admin/v1/common/categoryMapList`,
      type: 'POST',
      params: { PARAM: { NODE_ID: 94 } },
    },
  ],
  treeData: {},
};

export default CheckableTreeSelectComp;
