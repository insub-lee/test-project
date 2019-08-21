import React from 'react';

// 포탈에 배포시 변경 필요함
// import SortableTree, { getTreeFromFlatData, getFlatDataFromTree } from 'react-sortable-tree';
import { SortableTreeWithoutDndContext as SortableTree, getTreeFromFlatData, getFlatDataFromTree } from 'react-sortable-tree';

import PropTypes from 'prop-types';
import { fromJS } from 'immutable';
import { Popover } from 'antd';
import ScrollBar from 'react-custom-scrollbars';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import * as feed from 'components/Feedback/functions';
import { intlObj } from 'utils/commonUtils';
import 'style/sortable-tree-biz.css';
import selectors from '../selectors';
import * as actions from '../actions';
import * as manageActions from '../../ManualManager/actions';
import * as masterActions from '../../ManualManager/ManualMaster/actions';

import CustomTheme from '../../../components/Tree/theme';
import StyleMyAppTree, { AddCtgBtn, EditCtgBtn, DeleteCtgBtn, FolderBtn } from '../../../components/Tree/StyleMyAppTree';
import messages from './messages';
import '../../../components/Tree/tree-node.css';

const getTreeData = flatData =>
  getTreeFromFlatData({ flatData, getKey: node => node.CATEGORY_IDX, getParentKey: node => node.CATEGORY_PARENT_IDX, rootKey: 0 });

const setTreeData = (treeData, setCategoryTreeData) => {
  const categoryList = getFlatDataFromTree({
    treeData,
    getNodeKey: ({ node }) => node.CATEGORY_IDX,
    ignoreCollapsed: false,
  }).map(({ node, path }, idx) => {
    const temp = { ...node };
    delete temp.children;
    return {
      ...temp,
      CATEGORY_PARENT_IDX: path.length > 1 ? path[path.length - 2] : 0,
      SORT_SQ: idx + 1,
      expanded: temp.expanded || false,
    };
  });

  setCategoryTreeData(categoryList);
};

const handleOnClick = (node, setViewMode, setManualManage, setSelectedIndex) => {
  setViewMode(node, 'L');
  setManualManage('list', node.CATEGORY_IDX, 0);
  setSelectedIndex(node.CATEGORY_IDX);
};

const handleAddOnClick = (node, setViewMode, setManualManage, setSelectedIndex) => {
  setViewMode(node, 'V');
  setManualManage('view', node.CATEGORY_IDX, 0);
  setSelectedIndex(node.CATEGORY_IDX);
};

const handleMoveNode = (treeData, moveCategory) => {
  moveCategory(generateList(treeData));
};

const generateList = data => {
  let tempData1 = fromJS({});
  for (let i = 0; i < data.size; i++) {
    const node = data.get(i);
    const nodeObject = node.toJS();
    const key = node.get('CATEGORY_IDX');
    tempData1 = tempData1.set(key, {
      index: i,
      ...nodeObject,
    });
  }
  return tempData1;
};

const renderNode = (rowInfo, setViewMode, removeCategoryInfo, selectedIndex, onHoverKey, setOnHoverKey, setManualManage, setSelectedIndex) => {
  const { node } = rowInfo;
  // 마우스 오버시 키값 셋, 아이콘 노출
  const titleInner = node.CATEGORY_NAME; // lang.get('CATEGORY_NAME', node); // 트리 노드 제목
  let buttons = []; // 트리 노드 마우스 오버시 노출 될 버튼

  const btnCondition1 = !(node.children && node.children.length > 0);
  const btnCondition3 = !((node.children && node.children.length > 0) || node.MANUAL_YN === 'Y' || node.MANUAL_CNT > 0);

  // 노드에 마우스 오버했을 때
  if (onHoverKey === node.CATEGORY_IDX) {
    buttons = [
      <li key={`mec_folder_${node.CATEGORY_IDX}`}>
        <FolderBtn onClick={() => setViewMode(node, 'I')} />
      </li>,
      btnCondition1 && (
        <li key={`mec_add_${node.CATEGORY_IDX}`}>
          <AddCtgBtn onClick={() => handleAddOnClick(node, setViewMode, setManualManage, setSelectedIndex)} />
        </li>
      ),
      <li key={`mec_edit_${node.CATEGORY_IDX}`}>
        <EditCtgBtn onClick={() => setViewMode(node, 'U')} />
      </li>,
      // [카테고리 삭제]
      btnCondition3 && (
        <li key={`mec_delete_${node.CATEGORY_IDX}`}>
          <DeleteCtgBtn
            onClick={() => {
              feed.showConfirm(`${rowInfo.node.CATEGORY_NAME} ${intlObj.get(messages.cateDel)}`, '', () => removeCategoryInfo(node));
            }}
          />
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
            className={`${node.CATEGORY_IDX === selectedIndex ? 'active' : ''}`}
            onClick={() => handleOnClick(node, setViewMode, setManualManage, setSelectedIndex)}
            onMouseOver={() => setOnHoverKey(node.CATEGORY_IDX)}
            onFocus={() => setOnHoverKey(node.CATEGORY_IDX)}
            style={{ cursor: 'pointer' }}
          >
            {titleInner}
          </button>
        </Popover>
      </div>
    ),
    // buttons,
  };
};

const Tree = ({
  treeData,
  selectedIndex,
  setViewMode,
  removeCategoryInfo,
  onHoverKey,
  setCategoryTreeData,
  setOnHoverKey,
  setManualManage,
  setSelectedIndex,
  moveCategory,
}) => (
  <StyleMyAppTree
    style={{
      display: 'flex',
      flex: '1 0 50%',
      padding: '0',
      flexDirection: 'column',
      height: 'calc(100vh - 180px)',
      maxHeight: 'calc(100vh - 180px)',
      width: '100%',
    }}
  >
    <div className="fixedMenu">
      <FolderBtn onClick={() => setViewMode({ CATEGORY_IDX: 0, SORT_SQ: 9999, LVL: 0, CATEGORY_NAME: '' }, 'I')} />
    </div>
    <ScrollBar>
      <SortableTree
        theme={CustomTheme}
        treeData={getTreeData(treeData.toJS())}
        onChange={setData => setTreeData(setData, setCategoryTreeData)}
        rowHeight={35}
        scaffoldBlockPxWidth={22}
        style={{ display: 'inline-block', width: '100%', height: '100%', overflow: 'visible' }}
        isVirtualized={false}
        generateNodeProps={rowInfo =>
          renderNode(rowInfo, setViewMode, removeCategoryInfo, selectedIndex, onHoverKey, setOnHoverKey, setManualManage, setSelectedIndex)
        }
        onMoveNode={() => handleMoveNode(treeData, moveCategory)}
        className="sortableTreeWrapper"
      />
    </ScrollBar>
  </StyleMyAppTree>
);

Tree.propTypes = {
  setViewMode: PropTypes.func,
  removeCategoryInfo: PropTypes.func,
  moveCategory: PropTypes.func,
  setManualManage: PropTypes.func,
  setCategoryTreeData: PropTypes.func,
  setOnHoverKey: PropTypes.func,
  setSelectedIndex: PropTypes.func,
  treeData: PropTypes.object,
  selectedIndex: PropTypes.number,
  onHoverKey: PropTypes.number,
};

Tree.defaultProps = {
  setViewMode: () => false,
  removeCategoryInfo: () => false,
  moveCategory: () => false,
  setManualManage: () => false,
  setCategoryTreeData: () => false,
  setOnHoverKey: () => false,
  setSelectedIndex: () => false,
  treeData: fromJS([]),
  selectedIndex: -1,
  onHoverKey: 0,
};

const mapStateToProps = createStructuredSelector({
  treeData: selectors.makeSelectTreeData(),
  selectedIndex: selectors.makeSelectedIndex(),
  onHoverKey: selectors.makeSelectOnHoverKey(),
});

const mapDispatchToProps = dispatch => ({
  setViewMode: (node, flag) => dispatch(actions.changeViewMode(node, flag)),
  removeCategoryInfo: node => dispatch(actions.removeCategoryInfo(node)),
  moveCategory: treeData => dispatch(actions.moveCategory(treeData)),
  setCategoryTreeData: categoryList => dispatch(actions.changeCategoryTreeData(categoryList)),
  setOnHoverKey: key => dispatch(actions.setOnHoverKey(key)),
  setSelectedIndex: idx => dispatch(actions.changeSelectedIndex(idx)),
  setManualManage: (pageType, categoryIdx, manualIdx) => {
    dispatch(masterActions.initDefaultMgrByReduc());
    dispatch(manageActions.setPageModeByReducr(pageType, categoryIdx, manualIdx));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Tree);
