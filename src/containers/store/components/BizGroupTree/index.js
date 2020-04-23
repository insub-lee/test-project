import React, { Component } from 'react';
// import SortableTree from 'react-sortable-tree';
import { SortableTreeWithoutDndContext as SortableTree } from 'react-sortable-tree';
import Popover from 'components/uielements/popover';
import PropTypes from 'prop-types';
import { fromJS } from 'immutable';
import _ from 'lodash';
import { lang, intlObj } from 'utils/commonUtils';
import * as feed from 'components/Feedback/functions';
import * as treeFunc from 'containers/common/functions/treeFunc';
import ScrollBar from 'react-custom-scrollbars';
// import 'style/sortable-tree-biz.css';

import iconBizDelete from 'images/common/icon-biz-delete.png';
import iconBizConfirm from 'images/common/icon-biz-confirm.png';
import iconBizTree from 'images/common/icon-biz-tree.png';
import messages from './messages';
import { toggleExpandedForSelected } from './tree-data-utils';

import CustomTheme from './theme';
import StyleMyPageTree, { RemoveBtn, FolderBtn, EditBtn, BizGroupBtn, BizGroupResetBtn } from './StyleMyPageTree';

class BizGroupTree extends Component {
  constructor(props) {
    super(props);

    let treeData = [];
    this.treeFlatData = fromJS([]);

    if (props.treeData && props.treeData.length > 0) {
      this.treeFlatData = treeFunc.generateList(fromJS(props.treeData));
      if (props.selectedIndex > 0 && this.treeFlatData.get(props.selectedIndex)) {
        treeData = toggleExpandedForSelected({
          treeData: props.treeData,
          path: this.treeFlatData.get(props.selectedIndex).path,
        });
      } else {
        treeData = props.treeData;
      }
    }

    this.state = {
      searchString: '',
      searchFocusIndex: -1,
      selectedIndex: -1,
      treeData,
      nodeName: '',
      onHoverKey: -1,
    };

    // data
    this.bizgroup = {
      MENU_EXIST_YN: 'Y',
      SEC_YN: 'Y',
      NAME_KOR: intlObj.get(messages.emptyBizGroupTitleWarning),
      NAME_ENG: intlObj.get(messages.emptyBizGroupTitleWarning),
      NAME_CHN: intlObj.get(messages.emptyBizGroupTitleWarning),
      NAME_JPN: intlObj.get(messages.emptyBizGroupTitleWarning),
      NAME_ETC: intlObj.get(messages.emptyBizGroupTitleWarning),
    };
    this.folder = {
      MENU_EXIST_YN: 'N',
      SEC_YN: 'Y',
      NAME_KOR: intlObj.get(messages.emptyFolderTitleWarning),
      NAME_ENG: intlObj.get(messages.emptyFolderTitleWarning),
      NAME_CHN: intlObj.get(messages.emptyFolderTitleWarning),
      NAME_JPN: intlObj.get(messages.emptyFolderTitleWarning),
      NAME_ETC: intlObj.get(messages.emptyFolderTitleWarning),
    };

    this.updateTreeData = this.updateTreeData.bind(this);
    this.onHoverTreeNode = this.onHoverTreeNode.bind(this);
    this.registBizgroup = this.registBizgroup.bind(this);
    this.registFolder = this.registFolder.bind(this);
    this.updateBizgroup = this.updateBizgroup.bind(this);
    this.updateFolder = this.updateFolder.bind(this);
    this.deleteBizgroup = this.deleteBizgroup.bind(this);
    this.deleteFolder = this.deleteFolder.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.treeData && nextProps.treeData.length > 0) {
      if (nextProps.selectedIndex === -1) {
        this.setState({
          treeData: nextProps.treeData,
          selectedIndex: nextProps.selectedIndex,
        });
      } else {
        this.treeFlatData = treeFunc.generateList(fromJS(nextProps.treeData));

        this.setState({
          treeData: toggleExpandedForSelected({
            treeData: nextProps.treeData,
            path: this.treeFlatData.get(nextProps.selectedIndex).path,
          }),
          selectedIndex: nextProps.selectedIndex,
        });
      }
    } else {
      this.setState({
        treeData: [],
      });
    }
  }

  onHoverTreeNode(key) {
    this.setState({ onHoverKey: key });
  }

  updateTreeData(treeData) {
    this.setState({ treeData });
  }

  registBizgroup = rowInfo => (
    <BizGroupBtn
      title="업무그룹 등록"
      onClick={() => {
        const data = {
          PRNT_ID: Number(rowInfo.node.key),
          ...this.bizgroup,
        };
        this.props.addEmptyNode(rowInfo, data, this.state.treeData, this.props.history);
      }}
    />
  );

  registFolder = rowInfo => (
    <FolderBtn
      title="폴더 등록"
      onClick={() => {
        const data = {
          PRNT_ID: Number(rowInfo.node.key),
          ...this.folder,
        };
        this.props.addEmptyNode(rowInfo, data, this.state.treeData, this.props.history);
      }}
    />
  );

  updateBizgroup = rowInfo => (
    <EditBtn
      title="업무그룹 수정"
      onClick={() => {
        this.props.saveData(rowInfo, this.state.treeData);
        this.props.history.push(`/store/appMain/bizManage/bizGroupReg/${rowInfo.node.key}`);
      }}
    />
  );

  updateFolder = rowInfo => (
    <EditBtn
      title="폴더 수정"
      onClick={() => {
        this.props.saveData(rowInfo, this.state.treeData);
        this.props.history.push(`/store/appMain/bizManage/bizGroupReg/${rowInfo.node.key}`);
      }}
    />
  );

  deleteBizgroup = rowInfo => (
    <RemoveBtn
      title="업무그룹 삭제"
      onClick={() => {
        const messageStr = `${rowInfo.node.title} ${intlObj.get(messages.deleteBizGroup)}`;
        feed.showConfirm(messageStr, '', () => this.props.deleteNode(rowInfo, this.state.treeData, this.props.history));
      }}
    />
  );

  deleteFolder = rowInfo => (
    <RemoveBtn
      title="폴더 삭제"
      onClick={() => {
        const messageStr = `${rowInfo.node.title} ${intlObj.get(messages.deleteBizFolder)}`;
        feed.showConfirm(messageStr, '', () => this.props.deleteNode(rowInfo, this.state.treeData, this.props.history));
      }}
    />
  );

  render() {
    const { treeData, searchString, searchFocusIndex, selectedIndex } = this.state;

    const {
      history,
      onClick, // 트리 클릭 func

      saveData, // 임시데이터 저장 func(treeData, rowInfo)
      moveNode, // 메뉴 드래그 이동 func(treeData)
      updateBizGroupDelYn,

      canDrag,
      canDrop,
    } = this.props;

    const rootRowInfo = {};
    rootRowInfo.node = { key: -1 };

    const tree = (
      <SortableTree
        theme={CustomTheme}
        treeData={treeData}
        onChange={this.updateTreeData}
        searchQuery={searchString}
        searchFocusOffset={searchFocusIndex}
        canDrag={canDrag}
        canDrop={canDrop}
        style={{ display: 'inline-block', width: '100%', height: '100%', overflow: 'visible' }}
        isVirtualized={false}
        onMoveNode={({ treeData, node, nextParentNode }) => {
          // [ 노드 드래그 이동 후 실행됨 ]
          // 이동 후 변경된 treeData를 재귀함수돌며 sort, lvl값을 재정렬하고, 트리데이터를 파라미터로 전달
          const { BIZGRP_ID } = node;
          const ROOT_ID = node.path[0];
          let PRNT_ID = ROOT_ID; // 최상위 루트

          if (nextParentNode) {
            // 부모가 있는 경우 PRNT_ID지정
            PRNT_ID = nextParentNode.BIZGRP_ID;
          }

          const resortTreeData = (data, pathArr) => {
            for (let i = 0; i < data.length; i += 1) {
              // eslint-disable-next-line no-shadow
              const node = data[i];
              const path = [...pathArr, node.key];

              node.SORT_SQ = i + 1;
              node.LVL = path.length - 1;
              node.path = path;

              if (node.BIZGRP_ID === BIZGRP_ID) {
                node.PRNT_ID = PRNT_ID;
              }
              if (node.children) {
                resortTreeData(node.children, path);
              }
            }
          };

          resortTreeData(treeData, [ROOT_ID]);

          saveData(null, treeData);
          moveNode(treeFunc.generateList(fromJS(treeData)));
        }}
        rowHeight={35}
        scaffoldBlockPxWidth={20}
        generateNodeProps={rowInfo => {
          const { node } = rowInfo;
          node.selectedIndex = selectedIndex; // node-content-renderer.js에서 쓰임..
          node.title = lang.get('NAME', node);

          let titleInner; // 트리 노드 제목
          let buttons = null; // 트리 노드 마우스 오버시 노출 될 버튼

          const handleTreeOnClick = () => {
            this.setState({
              selectedIndex: node.key,
            });
            saveData(rowInfo, treeData);
            onClick(node);
          };

          // if (node.DEL_YN === 'Y') {
          //     if (node.MENU_EXIST_YN === 'Y') {
          //       titleInner = `${node.title}${intlObj.get(messages.deletedBizGroup)}`;
          //     } else {
          //       titleInner = `${node.title}${intlObj.get(messages.deletedFolder)}`;
          //     }
          // } else { // 일반 제목 노출
          //   titleInner = node.title;
          // }
          titleInner = node.title;

          // 버튼 노출 조건. 폴더명 수정중아닐때, 노드에 마우스 오버했을 때
          if (this.state.onHoverKey === node.key && node.SEC_YN === 'Y') {
            if (node.DEL_YN !== 'Y') {
              // 메뉴가 삭제되지않은 경우
              if (node.SYS_YN === 'Y' && node.LVL === 1) {
                // 1레벨 시스템업무그룹
                buttons = [this.registBizgroup(rowInfo), this.updateBizgroup(rowInfo)];
              } else if (node.SYS_YN === 'Y' && node.LVL === 2) {
                // 2레벨 시스템업무그룹
                buttons = [this.updateBizgroup(rowInfo), this.deleteBizgroup(rowInfo)];
              } else if (node.MENU_EXIST_YN === 'Y') {
                // 업무그룹
                buttons = [
                  this.registBizgroup(rowInfo),
                  this.updateBizgroup(rowInfo),
                  !node.children || node.children.length === 0 ? this.deleteBizgroup(rowInfo) : '',
                ];
              } else {
                // 폴더
                buttons = [
                  this.registFolder(rowInfo),
                  this.registBizgroup(rowInfo),
                  !node.children || node.children.length === 0 ? this.deleteFolder(rowInfo) : '',
                ];
              }
            } else {
              // 메뉴가 삭제된 경우
              buttons = [
                <BizGroupResetBtn
                  title="메뉴 복구"
                  onClick={() => {
                    const data = {
                      BIZGRP_ID: node.BIZGRP_ID,
                      DEL_YN: 'N',
                    };

                    const messageStr = `${node.title} ${intlObj.get(messages.restoreBizGroup)}`;
                    feed.showConfirm(messageStr, '', () => updateBizGroupDelYn(rowInfo, this.state.treeData, data, this.props.history));
                  }}
                />,
              ];
            }

            // div 감쌈
            buttons = <div className="btnsWrapper">{buttons}</div>;
          }

          return {
            title: (
              <Popover placement="right" content={buttons} trigger="hover" overlayClassName="mypageTreePopupMenu">
                <span
                  // className={`${bizIcon} ${bizConfrim} ${bizDeleteIcon} ${node.key === selectedIndex ? 'active' : ''}`}
                  className={`${node.key === selectedIndex ? 'active' : ''}`}
                  onClick={handleTreeOnClick}
                  onMouseOver={() => this.onHoverTreeNode(node.key)}
                  style={{ cursor: 'pointer' }}
                >
                  {node.MENU_EXIST_YN === 'Y' ? <img src={iconBizTree} /> : ''}
                  {node.CHG_YN === 'Y' && node.MENU_EXIST_YN === 'Y' ? <img src={iconBizConfirm} /> : ''}
                  {node.DEL_YN === 'Y' ? <img src={iconBizDelete} /> : ''}
                  <span style={{ marginLeft: 5 }}>{titleInner}</span>
                </span>
              </Popover>
            ),

            // buttons,
          };
        }}
        className="sortableTreeWrapper CustomSCRB"
      />
    );

    return (
      <StyleMyPageTree
        style={{
          display: 'flex',
          flex: '1 0 50%',
          padding: 0,
          flexDirection: 'column',
          height: 'calc(100vh - 65px)',
          width: '100%',
        }}
      >
        {treeData.length > 0 ? (
          <ScrollBar style={{ width: 280, height: '100%' }} autoHide autoHideTimeout={1000} autoHideDuration={200}>
            {tree}
          </ScrollBar>
        ) : (
          tree
        )}
        <div className="fixedMenu">
          {this.registFolder(rootRowInfo)}
          {this.registBizgroup(rootRowInfo)}
        </div>
      </StyleMyPageTree>
    );
  }
}

BizGroupTree.propTypes = {
  treeData: PropTypes.array.isRequired,
  selectedIndex: PropTypes.number,
  canDrag: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
  canDrop: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
  onClick: PropTypes.func,
};

BizGroupTree.defaultProps = {
  onClick: [],
  selectedIndex: -1,
  canDrag: () => false,
  canDrop: () => false,
  moveNode: () => {},
};

export default BizGroupTree;
