import React, { Component } from 'react';
// import SortableTree, { getTreeFromFlatData, getFlatDataFromTree } from 'react-sortable-tree';
import { SortableTreeWithoutDndContext as SortableTree, getTreeFromFlatData, getFlatDataFromTree } from 'react-sortable-tree';
import PropTypes from 'prop-types';
import { Popover } from 'antd';
import { lang, intlObj } from 'utils/commonUtils';
import message from 'components/Feedback/message';
import * as feed from 'components/Feedback/functions';
import ScrollBar from 'react-custom-scrollbars';
import 'style/sortable-tree-biz.css';
import messages from './messages';

import CustomTheme from './theme';
import StyleMyAppTree, { AddCtgBtn, DeleteCtgBtn } from './StyleMyAppTree';

const replaceSpecialCharacter = str => {
  const regExp = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gi;
  return str.replace(regExp, '');
};

const getTreeData = flatData =>
  getTreeFromFlatData({
    flatData,
    getKey: node => node.NODE_ID,
    getParentKey: node => node.PARENT_NODE_ID,
    rootKey: 0,
  });

class Tree extends Component {
  constructor(props) {
    super(props);
    this.state = {
      onHoverNodeId: -1,
      showInsert: false,
      showUpdate: false,
    };
  }

  // 마우스 오버
  onHover = key => {
    if (!this.state.showInsert && !this.state.showUpdate) {
      this.setState({
        onHoverNodeId: key,
      });
    }
  };

  // 노트명 클릭
  onNodeClick = node => {
    this.props.setSelectedNode(node);
    this.props.setIsAdd(false);
  };

  // 트리 클릭 시 하위 트리 노출
  updateTreeData = treeData => {
    const categoryMapList = getFlatDataFromTree({
      treeData,
      getNodeKey: ({ node }) => node.NODE_ID,
      ignoreCollapsed: false,
    }).map(({ node, path }) => {
      const temp = { ...node };
      delete temp.children;
      return {
        ...temp,
        PARENT_NODE_ID: path.length > 1 ? path[path.length - 2] : 0,
        expanded: temp.expanded || false,
      };
    });

    this.props.setCategoryMapList(categoryMapList);
  };

  // 노드 hover +버튼 클릭
  cateInsert = rowInfo => {
    this.props.setIsAdd(true);
    this.props.setSelectedNode(rowInfo.node);
    this.props.initAddNodeInfo();
  };

  // 노드 hover 삭제버튼 클릭
  cateDelete = rowInfo => {
    this.props.deleteCategoryMap(rowInfo.node);
  };

  // 트리 render
  renderTreeNode = rowInfo => {
    const { node } = rowInfo;

    const titleInner = lang.get('NAME', node); // 트리 노드 제목
    let buttons = []; // 트리 노드 마우스 오버시 노출 될 버튼

    // 버튼 노출 조건(아이콘 별)
    // 1. 카테고리 추가는 전부 노출
    const btnCondition1 = true; // 마지막노드X 업무그룹X
    // 2. 카테고리 수정는 자신 것만, 최상위는 제외
    // const btnCondition4 = node.MYCATE === '1' && node.LVL !== 0;
    const btnCondition4 = false;
    // 3. 카테고리 삭제는 자신 것만, 사용하는 앱이 없고, 하위 카테고리가 없는 것만 삭제 가능 , 최상위는 제외
    // const btnCondition3 = node.MYCATE === '1' && node.APPCNT === '0' && node.CATGCNT === '0' && node.LVL !== 0;
    // const btnCondition3 = node.APPCNT === '0' && node.CATGCNT === '0' && node.LVL !== 0;
    const btnCondition3 = (node.children === undefined || node.children.length === 0) && node.LVL !== 0;

    // 노드에 마우스 오버했을 때
    if (this.state.onHoverNodeId === node.NODE_ID) {
      buttons = [
        <li key="btnInsert">
          <AddCtgBtn onClick={() => this.cateInsert(rowInfo)} />
        </li>,
        btnCondition3 && (
          <li key="btnDelete">
            <DeleteCtgBtn onClick={() => this.cateDelete(rowInfo)} />
          </li>
        ),
      ];

      // div 감쌈
      buttons = <ul className="btnsWrapper">{buttons}</ul>;
    }

    return {
      title: (
        <div>
          <Popover placement="right" content={buttons} trigger="hover" overlayClassName="myappTreePopupMenu">
            <button
              type="button"
              className={`${node.NODE_ID === this.props.selectedNode.NODE_ID ? 'active' : ''}`}
              onClick={() => this.onNodeClick(node)}
              onMouseOver={() => this.onHover(node.NODE_ID)}
              style={{ cursor: 'pointer' }}
              key={node.NODE_ID}
            >
              {titleInner}
            </button>
          </Popover>
        </div>
      ),
    };
  };

  // 노드이동
  onMoveNode = rowInfo => {
    const { nextParentNode } = rowInfo;
    const { treeData } = this.props;
    const categoryMapList = getFlatDataFromTree({
      treeData,
      getNodeKey: ({ node }) => node.NODE_ID,
      ignoreCollapsed: false,
    });
    const moveDataGroup = categoryMapList.filter(item => item.node.PARENT_NODE_ID === nextParentNode.NODE_ID);
    const modifyList = [];
    moveDataGroup.forEach(item => {
      modifyList.push(item.node);
    });
    const updateData = {
      parentNode: nextParentNode,
      modifyList,
    };
    this.props.updateCategoryMapList(updateData);
  };

  render() {
    const { treeData } = this.props;

    const rootRowInfo = {};
    rootRowInfo.node = { key: -1 };

    return (
      <StyleMyAppTree
        style={{
          display: 'flex',
          flex: '1 0 50%',
          padding: '0',
          flexDirection: 'column',
          height: 'calc(100vh - 200px)',
          maxHeight: 'calc(100vh - 200px)',
          width: '100%',
        }}
      >
        <ScrollBar>
          <SortableTree
            theme={CustomTheme}
            treeData={getTreeData(treeData)}
            onChange={setData => this.updateTreeData(setData)}
            rowHeight={35}
            scaffoldBlockPxWidth={22}
            style={{ display: 'inline-block', width: '100%', height: '100%', overflow: 'visible' }}
            isVirtualized={false}
            onMoveNode={rowInfo => this.onMoveNode(rowInfo)}
            generateNodeProps={rowInfo => this.renderTreeNode(rowInfo)}
            className="sortableTreeWrapper"
          />
        </ScrollBar>
      </StyleMyAppTree>
    );
  }
}

Tree.propTypes = {
  treeData: PropTypes.array.isRequired,
  setCategoryMapList: PropTypes.func.isRequired,
  selectedNode: PropTypes.object.isRequired,
  setSelectedNode: PropTypes.func.isRequired,
  deleteCategoryMap: PropTypes.func.isRequired,
  setIsAdd: PropTypes.func.isRequired,
  initAddNodeInfo: PropTypes.func.isRequired,
  updateCategoryMapList: PropTypes.func.isRequired,
};

export default Tree;
