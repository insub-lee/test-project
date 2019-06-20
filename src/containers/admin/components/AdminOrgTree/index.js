import React, { Component } from 'react';
// import SortableTree, { toggleExpandedForAll } from 'react-sortable-tree';
import { SortableTreeWithoutDndContext as SortableTree } from 'react-sortable-tree';
import PropTypes from 'prop-types';
import { fromJS } from 'immutable';
import { Icon, Input, Popover } from 'antd';
import { lang, intlObj } from 'utils/commonUtils';
import * as feed from 'components/Feedback/functions';
import ScrollBar from 'react-custom-scrollbars';
import 'style/sortable-tree-biz.css';
import * as treeFunc from 'containers/common/functions/treeFunc';
import { toggleExpandedForSelected } from 'containers/common/functions/tree-data-utils';
import messages from './messages';
// import * as makeTreeData from '../../components/AdminOrgTree/makeTreeData';
// import './app.css';
// import { toggleExpandedForSelected } from './tree-data-utils';

import CustomTheme from './theme';
import StyleAdminOrgTree, { AddCtgBtn, EditCtgBtn, DeleteCtgBtn } from '../../components/AdminOrgTree/StyleAdminOrgTree';

const replaceSpecialCharacter = (str) => {
  var regExp = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gi;
  return str.replace(regExp, "");
}

class AdminOrgTree extends Component {
  constructor(props) {
    super(props);

    let treeData = [];

    if (props.treeData && props.treeData.length > 0) {
      if (props.selectedIndex !== -1) {
        treeData = toggleExpandedForSelected({
          treeData: props.treeData,
          selectedIndex: props.selectedIndex,
        });
      } else {
        const { treeData: treeData2 } = props;
        treeData = treeData2;
      }
    }

    this.state = {
      selectedIndex: -1,
      treeData,
      onHoverKey: -1,
      // start
    };

    this.updateTreeData = this.updateTreeData.bind(this);
    this.onHover = this.onHover.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { selectedIndex } = nextProps;

    if (nextProps.treeData && nextProps.treeData.length > 0) {
      if (nextProps.selectedIndex === -1) {
        this.setState({
          treeData: nextProps.treeData,
          selectedIndex,
        });
      } else {
        treeFunc.mergeArray(nextProps.treeData, this.state.treeData);

        this.setState({
          treeData: toggleExpandedForSelected({ treeData: nextProps.treeData, selectedIndex }),
          selectedIndex,
        });
      }
    } else {
      this.setState({
        treeData: [],
      });
    }
  }

  // 트리 클릭 시 하위 트리 노출
  updateTreeData(treeData) {
    this.setState({ treeData });
  }

  // 마우스 오버
  onHover(key) {
    this.setState({
      onHoverKey: key,
    });
  }

  render() {
    const {
      treeData,
      selectedIndex,
    } = this.state;

    const {
      onClick, // 트리 클릭 func
      returnGateInfo,
      canDrag, // 드래그 가능 bool
      canDropOut, // 다른 상위 노드로 이동 가능
      moveNode, // 메뉴 드래그 이동 func(treeData)
    } = this.props;

    const rootRowInfo = {};
    rootRowInfo.node = { key: -1 };

    const nodeDelete = (rowInfo) => {
      const { node } = rowInfo;
      this.setState({
        selectedIndex: node.key,
      });
      this.props.returnGateDelete(node.key, node.SORT_SQ);
    };
    return (
      // <StyleAdminOrgTree
      //   style={{
      //     display: 'flex', flex: '1 0 50%', padding: '0',
      //     flexDirection: 'column', height: 'calc(100vh - 167px)',
      //     maxHeight: 500, width: '100%',
      //   }}
      // >
      <StyleAdminOrgTree
        style={{
          display: 'flex', flex: '1 0 50%', padding: '0',
          flexDirection: 'column', height: 'calc(100vh - 200px)',
          maxHeight: 'calc(100vh - 200px)', width: '100%',
        }}
      >
        <ScrollBar>
          <SortableTree
            theme={CustomTheme}
            treeData={treeData}
            onChange={this.updateTreeData}
            rowHeight={35}
            scaffoldBlockPxWidth={22}
            style={{ display: 'inline-block', width: '100%', height: '100%', overflow: 'visible' }}
            isVirtualized={false}
            canDrag={({ node }) => {
              // [ 노드 드래그 가능 여부 ]
              return canDrag
            }}
            canDrop={({ prevParent, nextParent }) => {
              // [ 노드 드롭 가능 여부 ]
              // 조건 : 최하위 노드 하위에 이동불가
              if (nextParent && (canDropOut || prevParent.key === nextParent.key)) {
                return nextParent;
              }
              return false;
            }}
            onMoveNode={({ treeData, node, nextParentNode }) => {
              if (node.LVL !== 0) {
                // [ 노드 드래그 이동 후 실행됨 ]
                // 이동 후 변경된 treeData를 재귀함수돌며 sort, lvl값을 재정렬하고, 트리데이터를 파라미터로 전달
                const NODE_ID = node.key;
                let PRNT_ID = -1; // 최상위 루트

                if (nextParentNode) { // 부모가 있는 경우 PRNT_ID지정
                  PRNT_ID = nextParentNode.key;
                }

                const resortTreeData = (data, lvl) => {
                  for (let i = 0; i < data.length; i += 1) {
                    const node = data[i];
                    node['SORT_SQ'] = i + 1;
                    node['LVL'] = lvl;
                    if (node['key'] === NODE_ID) {
                      node['PRNT_ID'] = PRNT_ID;
                    }
                    if (node['children']) {
                      resortTreeData(node['children'], lvl + 1);
                    }
                  }
                };

                resortTreeData(treeData, 0);
                moveNode(treeFunc.generateList(fromJS(treeData)));
              }
            }}
            generateNodeProps={(rowInfo) => {
              const { node } = rowInfo;
              // 마우스 오버시 키값 셋, 아이콘 노출
              const handleOnClick = () => {
                this.setState({
                  selectedIndex: node.key,
                });
                onClick(node);
              };

              // 노드 추가
              const nodeInsert = () => {
                this.setState({
                  selectedIndex: node.key,
                });
                returnGateInfo(node);
              };


              let titleInner; // 트리 노드 제목
              let buttons = []; // 트리 노드 마우스 오버시 노출 될 버튼

              // 트리 노드 타이틀
              titleInner = lang.get('NAME', node);

              // 버튼 노출 조건(아이콘 별)
              const btnCondition1 = true; // 마지막노드X 업무그룹X
              // 삭제는 자신 것만, 사용하는 앱이 없고, 하위가 없는 것만 삭제 가능 , 최상위는 제외
              const btnCondition3 = node.APPCNT === '0' && node.CATGCNT === '0' && node.LVL !== 0;

              // 노드에 마우스 오버했을 때
              if (this.state.onHoverKey === node.key) {
                buttons = [
                  // [추가]
                  btnCondition1 ?
                    <li>
                      <AddCtgBtn
                        onClick={nodeInsert}
                      />
                    </li> : '',
                  btnCondition3 ?
                    <li>
                      <DeleteCtgBtn
                        onClick={() => {
                          feed.showConfirm(`${lang.get('NAME', rowInfo.node)} ${intlObj.get(messages.del)}`, '', () => nodeDelete(rowInfo));
                        }}
                      />
                    </li> : '',
                ];

                // div 감쌈
                buttons = (<ul className="btnsWrapper">{buttons}</ul>);
              }
              return {
                title: this.props.type === 'bizgroup' ? (
                  <button
                    className={`${node.key === selectedIndex ? 'active' : ''}`}
                    onClick={handleOnClick}
                    onMouseOver={() => this.onHover(node.key)}
                    // onMouseOut={() => this.onHover(-1)}
                    style={{ cursor: 'pointer' }}>
                    {titleInner}
                  </button>
                ) : (
                    <div>
                      <Popover
                        placement="right"
                        content={buttons}
                        trigger="hover"
                        overlayClassName="myappTreePopupMenu"
                      // onMouseLeave={this.popoverClose}
                      >
                        <button
                          className={`${node.key === selectedIndex ? 'active' : ''}`}
                          onClick={handleOnClick}
                          onMouseOver={() => this.onHover(node.key)}
                          // onMouseOut={() => this.onHover(-1)}
                          style={{ cursor: 'pointer' }}>
                          {titleInner}
                        </button>
                      </Popover>
                    </div>
                  ),
                // buttons,
              };
            }}
            className="sortableTreeWrapper"
          />
        </ScrollBar>
      </StyleAdminOrgTree>
    );
  }
}

AdminOrgTree.propTypes = {
  type: PropTypes.string,
  treeData: PropTypes.array, //eslint-disable-line
  selectedIndex: PropTypes.number, //eslint-disable-line
  canDrag: PropTypes.bool,
  canDropOut: PropTypes.bool,
  canDrop: PropTypes.bool,
  history: PropTypes.object, //eslint-disable-line
  onClick: PropTypes.func,
  returnGateInfo: PropTypes.func.isRequired, //eslint-disable-line
  returnGateDelete: PropTypes.func.isRequired, //eslint-disable-line  
  moveNode: PropTypes.func.isRequired, //eslint-disable-line
};

// AdminOrgTree.defaultProps = {
//   onClick: [],
//   selectedIndex: -1,
// };

export default AdminOrgTree;
