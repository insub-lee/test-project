import React from 'react';

// 포탈에 배포시 변경 필요함
// import SortableTree, { getTreeFromFlatData, getFlatDataFromTree } from 'react-sortable-tree';
import { SortableTreeWithoutDndContext as SortableTree, getTreeFromFlatData, getFlatDataFromTree } from 'react-sortable-tree';

import 'react-sortable-tree/style.css';
import { fromJS } from 'immutable';
import { Button, Anchor, Icon } from 'antd';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';

import selectors from '../../selectors';
import * as actions from '../../actions';

import IconCollection from '../../../../../user/components/IconCollection';
import StyleEditorIndex from './StyleEditorIndex';

const { Link } = Anchor;

const getTreeData = (list, selectedTabName) => {
  const flatData = list.filter(item => item.IS_REMOVE !== 'Y');
  flatData.push({ MUAL_TABCOMP_IDX: 0, MUAL_TABCOMP_PIDX: -1, MUAL_COMPVIEWINFO: selectedTabName, TYPE: 'index', SORT_SQ: 0, expanded: true });
  return getTreeFromFlatData({ flatData, getKey: node => node.MUAL_TABCOMP_IDX, getParentKey: node => node.MUAL_TABCOMP_PIDX, rootKey: -1 });
};

const setTreeData = (treeData, handleChangeCompList, tabComponentList) => {
  const compList = getFlatDataFromTree({
    treeData,
    getNodeKey: ({ node }) => node.MUAL_TABCOMP_IDX,
    ignoreCollapsed: false,
  }).map(({ node, path }, idx) => {
    const temp = { ...node };
    delete temp.children;
    return {
      ...temp,
      MUAL_TABCOMP_PIDX: path.length > 1 ? path[path.length - 2] : 0,
      SORT_SQ: idx,
      expanded: temp.expanded || false,
    };
  });
  const resultList = tabComponentList
    .map(item => {
      const idx = compList.findIndex(node => node.MUAL_TABCOMP_IDX === item.MUAL_TABCOMP_IDX);
      if (idx > -1) return compList[idx];
      return item;
    })
    .sort((a, b) => (a.SORT_SQ > b.SORT_SQ ? 1 : -1));
  handleChangeCompList(resultList);
};

const onClickIndex = (e, node, addAreaIdx, handleChangeAddAreaIdx, scrollComp) => {
  e.preventDefault();
  e.stopPropagation();

  if (node.TYPE === 'index' && node.MUAL_TABCOMP_IDX !== addAreaIdx) handleChangeAddAreaIdx(node.MUAL_TABCOMP_IDX);
  else if (node.MUAL_TABCOMP_IDX === addAreaIdx) handleChangeAddAreaIdx(0);
  console.debug(node);
  if (node.MUAL_TABCOMP_IDX === 0) return;
  const selectedComp = document.querySelector(`#editorCompID_${node.MUAL_TAB_IDX}_${node.MUAL_TABCOMP_IDX}`);
  const topPosition = selectedComp.getBoundingClientRect().top;
  const scrollTop = scrollComp.getScrollTop();
  scrollComp.scrollTop(scrollTop + topPosition - 121);
};

const renderNode = ({ node }, handleChangeAddAreaIdx, addAreaIdx, handleRemoveComp, scrollComp) => ({
  title: (
    <div className="editorIndexTreeTitle">
      <Button
        className={`${node.MUAL_TABCOMP_IDX === addAreaIdx ? 'active' : ''}`}
        onClick={e => (node.TYPE.indexOf('index') > -1 ? onClickIndex(e, node, addAreaIdx, handleChangeAddAreaIdx, scrollComp) : false)}
        block
      >
        {node.TYPE.indexOf('index') > -1 ? (
          <div className="editorIndexTreeInnerTitle">{node.MUAL_COMPVIEWINFO || 'New Index'}</div>
        ) : (
          <div className="editorIndexTreeInnerTitle">{node.TYPE}</div>
        )}
      </Button>
      <Button onClick={() => handleRemoveComp(node.MUAL_TAB_IDX, node.MUAL_TABCOMP_IDX)} className="btn-close">
        <IconCollection className="icon-close-soft" />
      </Button>
    </div>
  ),
});

const EditorIndex = ({ tabComponentList, handleChangeCompList, handleChangeAddAreaIdx, addAreaIdx, handleRemoveComp, selectedTabName, scrollComp }) => (
  <StyleEditorIndex>
    <div className="editorIndexTreeWrapper">
      <div className="editorIndexTitle">컴포넌트 목록</div>
      <div className="editorIndexContents">
        <SortableTree
          treeData={getTreeData(tabComponentList.toJS(), selectedTabName)}
          onChange={treeData => setTreeData(treeData, handleChangeCompList, tabComponentList.toJS())}
          canDrop={({ nextParent }) => nextParent !== null && nextParent.TYPE === 'index'}
          generateNodeProps={rowInfo => renderNode(rowInfo, handleChangeAddAreaIdx, addAreaIdx, handleRemoveComp, scrollComp)}
          // rowHeight={({ node: { TYPE, MUAL_COMPVIEWINFO } }) => {
          //   const title = TYPE.includes('index') ? MUAL_COMPVIEWINFO : TYPE;
          //   console.debug('Title', title, title.length);
          //   let rowCount = 1;
          //   if (title && title.length > 13) {
          //     rowCount += title.length / 13;
          //   }
          //   console.debug(rowCount);
          //   return 62 * rowCount;
          // }}
        />
      </div>
    </div>
  </StyleEditorIndex>
);

EditorIndex.propTypes = {
  handleChangeAddAreaIdx: PropTypes.func,
  handleChangeCompList: PropTypes.func,
  handleRemoveComp: PropTypes.func,
  tabComponentList: PropTypes.object,
  addAreaIdx: PropTypes.number,
  selectedTabName: PropTypes.string,
};

EditorIndex.defaultProps = {
  handleChangeAddAreaIdx: () => false,
  handleChangeCompList: () => false,
  handleRemoveComp: () => false,
  tabComponentList: fromJS([]),
  addAreaIdx: 0,
  selectedTabName: '',
};

const mapStateToProps = createStructuredSelector({
  tabComponentList: selectors.makeSelectTabComponentList(),
  addAreaIdx: selectors.makeSelectAddEditorComponentIndex(),
  selectedTabName: selectors.makeSelectedTabName(),
  scrollComp: selectors.makeSelectScrollComp(),
});

const mapDispatchToProps = dispatch => ({
  handleChangeAddAreaIdx: idx => dispatch(actions.setAddEditorComponentIdxByReduc(idx)),
  handleChangeCompList: compList => dispatch(actions.setEditorComponentListByReduc(compList)),
  handleRemoveComp: (tabIdx, compIdx) => dispatch(actions.removeEditorComponentByReduc(tabIdx, compIdx)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditorIndex);
