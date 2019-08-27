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
import 'style/sortable-tree-biz.css';
import selectors from '../../../selectors';
import * as actions from '../../../actions';
import CustomTheme from '../../../../../../components/Tree/theme';
import StyleMyAppTree, { DeleteCtgBtn, FolderBtn } from '../../../../../../components/Tree/StyleMyAppTree';
import '../../../../../../components/Tree/tree-node.css';

const getTreeData = flatData => getTreeFromFlatData({ flatData, getKey: node => node.TEMPLET_IDX, getParentKey: node => node.TEMPLET_PIDX, rootKey: 0 });

const setTreeData = (treeData, setCompareTreeData) => {
  const categoryList = getFlatDataFromTree({
    treeData,
    getNodeKey: ({ node }) => node.TEMPLET_IDX,
    ignoreCollapsed: false,
  }).map(({ node, path }, idx) => {
    const temp = { ...node };
    delete temp.children;
    return {
      ...temp,
      TEMPLET_PIDX: path.length > 1 ? path[path.length - 2] : 0,
      SORT_SQ: idx + 1,
      expanded: temp.expanded || false,
    };
  });

  setCompareTreeData(fromJS(categoryList));
};

const handleOnClick = (node, setViewMode) => {
  setViewMode(node, 'U');
};

const handleMoveNode = (treeData, moveCategory) => {
  moveCategory(generateList(treeData));
};

const generateList = data => {
  let tempData1 = fromJS({});
  for (let i = 0; i < data.size; i++) {
    const node = data.get(i);
    const nodeObject = node.toJS();
    const key = node.get('TEMPLET_IDX');
    tempData1 = tempData1.set(key, {
      index: i,
      ...nodeObject,
    });
  }
  return tempData1;
};

const renderNode = (rowInfo, setViewMode, removeCategoryInfo, selectedIndex, onHoverKey, setOnHoverKey) => {
  const { node } = rowInfo;
  // 마우스 오버시 키값 셋, 아이콘 노출
  const titleInner = node.TEMPLET_NAME; // lang.get('CATEGORY_NAME', node); // 트리 노드 제목
  let buttons = []; // 트리 노드 마우스 오버시 노출 될 버튼

  const btnCondition3 = !(node.children && node.children.length > 0);

  // 노드에 마우스 오버했을 때
  if (onHoverKey === node.TEMPLET_IDX) {
    buttons = [
      <li key={`mec_folder_${node.TEMPLET_IDX}`}>
        <FolderBtn
          onClick={() =>
            setViewMode({ TEMPLET_IDX: 0, TEMPLET_PIDX: node.TEMPLET_IDX, TEMPLET_NAME: '', TEMPLET_CONTENT: [], IS_FOLDER: 'Y', SORT_SQ: 9999 }, 'I')
          }
        />
      </li>,
      // [카테고리 삭제]
      btnCondition3 && (
        <li key={`mec_delete_${node.TEMPLET_IDX}`}>
          <DeleteCtgBtn
            onClick={() => {
              feed.showConfirm(`${node.TEMPLET_NAME} 를 삭제하시겠습니까?`, '', () => removeCategoryInfo(node));
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
            className={`${node.TEMPLET_IDX === selectedIndex ? 'active' : ''}`}
            onClick={() => handleOnClick(node, setViewMode)}
            onMouseOver={() => setOnHoverKey(node.TEMPLET_IDX)}
            onFocus={() => setOnHoverKey(node.TEMPLET_IDX)}
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

const Tree = ({ treeData, selectedIndex, setViewMode, removeCategoryInfo, onHoverKey, setCompareTreeData, setOnHoverKey, moveCategory }) => (
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
      <FolderBtn onClick={() => setViewMode({ TEMPLET_IDX: 0, TEMPLET_PIDX: 0, TEMPLET_NAME: '', TEMPLET_CONTENT: [], IS_FOLDER: 'Y', SORT_SQ: 9999 }, 'I')} />
    </div>
    <ScrollBar>
      <SortableTree
        theme={CustomTheme}
        treeData={getTreeData(treeData)}
        onChange={setData => setTreeData(setData, setCompareTreeData)}
        rowHeight={35}
        scaffoldBlockPxWidth={22}
        style={{ display: 'inline-block', width: '100%', height: '100%', overflow: 'visible' }}
        isVirtualized={false}
        generateNodeProps={rowInfo => renderNode(rowInfo, setViewMode, removeCategoryInfo, selectedIndex, onHoverKey, setOnHoverKey)}
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
  setCompareTreeData: PropTypes.func,
  setOnHoverKey: PropTypes.func,
  treeData: PropTypes.object,
  selectedIndex: PropTypes.number,
  onHoverKey: PropTypes.number,
};

Tree.defaultProps = {
  setViewMode: () => false,
  removeCategoryInfo: () => false,
  moveCategory: () => false,
  setCompareTreeData: () => false,
  setOnHoverKey: () => false,
  treeData: [],
  selectedIndex: -1,
  onHoverKey: 0,
};

const mapStateToProps = createStructuredSelector({
  treeData: selectors.makeSelectCompareTemplet(),
  onHoverKey: selectors.makeSelectCompareTempletHoverKey(),
});

const mapDispatchToProps = dispatch => ({
  setViewMode: (node, flag) => dispatch(actions.setCompareTempletViewModeByReducr(node, flag)),
  setOnHoverKey: idx => dispatch(actions.setCompareTampletOnHoverKey(idx)),
  setCompareTreeData: list => dispatch(actions.setCompareTempletListByReducr(list)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Tree);
