import React, { Component } from 'react';
import { SortableTreeWithoutDndContext as SortableTree } from 'react-sortable-tree';
import { Popover } from 'antd';
import PropTypes from 'prop-types';
import { fromJS } from 'immutable';
import ScrollBar from 'react-custom-scrollbars';
import { lang } from 'utils/commonUtils';
import * as treeFunc from 'containers/common/functions/treeFunc';
import { toggleExpandedForSelected } from './tree-data-utils';
import CustomTheme from './theme';
import StyleMyPageTree, { VisionBtn } from './StyleMyPageTree';

class StoreTree extends Component {
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
      searchString: '',
      searchFocusIndex: -1,
      selectedIndex: -1,
      treeData,
    };

    this.updateTreeData = this.updateTreeData.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { treeData } = nextProps;

    if (treeData && treeData.length > 0) {
      treeFunc.mergeArray(nextProps.treeData, this.state.treeData);

      this.setState({
        treeData: nextProps.treeData,
      });
    }
  }

  updateTreeData(treeData) {
    this.setState({ treeData });
  }

  render() {
    const {
      treeData,
      searchString,
      searchFocusIndex,
      selectedIndex,
    } = this.state;

    const {
      moveNode, // 메뉴 드래그 이동 func(treeData)
      updateMymenuDisp, // 메뉴 노출 여부 변경 func()
      showNoti,
    } = this.props;

    const rootRowInfo = {};
    rootRowInfo.node = { key: -1 };

    const tree = (
      <SortableTree
        className="sortableTreeWrapper CustomSCRB"
        theme={CustomTheme}
        treeData={treeData}
        onChange={this.updateTreeData}
        searchQuery={searchString}
        searchFocusOffset={searchFocusIndex}
        style={{
          display: 'inline-block', width: '100%', height: '100%', overflow: 'visible',
        }}
        selectedIndex={selectedIndex}
        isVirtualized={false}
        canDrag={({ node }) => !(node.REF_TYPE === 'B' && node.NODE_TYPE !== 'R')}
        canDrop={({ nextParent }) => !nextParent || (nextParent.NODE_TYPE !== 'E' && !(nextParent.NODE_TYPE === 'R' && nextParent.REF_TYPE === 'B'))}
        onMoveNode={({ treeData: treeData2, node, nextParentNode }) => {
          // [ 노드 드래그 이동 후 실행됨 ]
          // 이동 후 변경된 treeData를 재귀함수돌며 sort, lvl값을 재정렬하고, 트리데이터를 파라미터로 전달
          const { MENU_ID } = node;
          let PRNT_ID = -1; // 최상위 루트
          const ROOT_ID = node.path[0];

          if (nextParentNode) { // 부모가 있는 경우 PRNT_ID지정
            PRNT_ID = nextParentNode.MENU_ID;
          }

          const resortTreeData = (o, lvl, pathArr) => {
            for (let i = 0; i < o.length; i += 1) {
              const n = o[i];
              const path = [...pathArr, n.key];

              n.SORT_SQ = i + 1;
              n.LVL = lvl;
              n.path = path;
              if (n.MENU_ID === MENU_ID) {
                n.PRNT_ID = PRNT_ID;
              }
              if (n.children) {
                resortTreeData(n.children, lvl + 1, path);
              }
            }
          };

          resortTreeData(treeData2, treeData2[0].LVL, [ROOT_ID]);

          moveNode(treeFunc.generateList(fromJS(treeData2)));

          this.setState({
            selectedIndex: node.key,
          });
        }}
        rowHeight={35}
        scaffoldBlockPxWidth={22}
        generateNodeProps={(rowInfo) => {
          const { node } = rowInfo;
          node.title = lang.get('NAME', node);
          node.active = node.key === selectedIndex;

          const handleTreeOnClick = () => {
            this.setState({
              selectedIndex: node.key,
            });
          };

          // div 감쌈
          const buttons = (
            <div className="btnsWrapper">
              <VisionBtn
                key="visionBtn"
                title="메뉴노출"
                onClick={() => {
                  updateMymenuDisp(node);
                }}
                className={node.DISP_YN === 'Y' ? 'visible' : 'invisible'}
              />
            </div>
          );

          return {
            title: (
              <Popover
                placement="right"
                content={buttons}
                trigger="hover"
                overlayClassName="mypageTreePopupMenu"
              >
                <span
                  className={`${node.active ? 'active' : ''}`}
                  style={{ background: 'transparent', paddingRight: '15px' }}
                >
                  {node.title}
                </span>
              </Popover>
            ),
            onClick: handleTreeOnClick,
            // buttons,
          };
        }}
      />
    );

    return (
      <StyleMyPageTree
        style={{
          display: 'flex',
          padding: '10px 0 0 10px',
          flexDirection: 'column',
          height: `calc(100vh - 45px ${showNoti ? '- 32px' : ''})`,
          width: '100%',
        }}
      >
        {
          treeData.length > 0 ? (
            <ScrollBar
              style={{ width: 300, height: '100%' }}
              autoHide
              autoHideTimeout={1000}
              autoHideDuration={200}
            >
              {tree}
            </ScrollBar>
          ) : tree
        }
      </StyleMyPageTree>
    );
  }
}

StoreTree.propTypes = {
  treeData: PropTypes.array.isRequired,
  selectedIndex: PropTypes.number,
  moveNode: PropTypes.func.isRequired,
  updateMymenuDisp: PropTypes.func.isRequired,
  showNoti: PropTypes.bool.isRequired,
};

StoreTree.defaultProps = {
  selectedIndex: -1,
};

export default StoreTree;
