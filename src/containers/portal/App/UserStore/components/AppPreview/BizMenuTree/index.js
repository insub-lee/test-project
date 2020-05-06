import React, { Component } from 'react';
// import SortableTree from 'react-sortable-tree';
import { SortableTreeWithoutDndContext as SortableTree } from 'react-sortable-tree';
// import Popover from 'components/uielements/popover';
import { Input, Popover } from 'antd';
import PropTypes from 'prop-types';
import { fromJS } from 'immutable';
import _ from 'lodash';
import { lang, intlObj } from 'utils/commonUtils';
import * as feed from 'components/Feedback/functions';
import * as treeFunc from 'containers/common/functions/treeFunc';
// import 'style/sortable-tree-biz.css';
import { toggleExpandedForSelected } from './tree-data-utils';
import messages from './messages';
// import './app.css';
import CustomTheme from './theme';
import StyleMyPageTree, { AppListBtn, FolderBtn, CopyBtn, VisionBtn, RemoveBtn, EditBtn } from './StyleMyPageTree';

const replaceSpecialCharacter = str => {
  const regExp = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gi;
  return str.replace(regExp, '');
};

class BizMenuTree extends Component {
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
      onHoverKey: -1,

      showInsert: false,
      showEdit: false,
      data: {
        NODE_TYPE: 'F',
        NAME_KOR: '',
        NAME_ENG: '',
        NAME_CHN: '',
        NAME_JPN: '',
        NAME_ETC: '',
      },
    };

    this.updateTreeData = this.updateTreeData.bind(this);
    this.onHoverTreeNode = this.onHoverTreeNode.bind(this);
    // this.onChangeNameKor = this.onChangeNameKor.bind(this);
    // this.onChangeNameEng = this.onChangeNameEng.bind(this);
    // this.onChangeNameChn = this.onChangeNameChn.bind(this);
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

  onChangeData(newData) {
    this.setState({
      data: { ...this.state.data, ...newData },
    });
  }

  onHoverTreeNode(key) {
    this.setState({
      onHoverKey: key,
      data: {
        NAME_KOR: '',
        NAME_ENG: '',
        NAME_CHN: '',
      },
    });
  }

  updateTreeData(treeData) {
    this.setState({ treeData });
  }

  // 팝업닫기
  closeModal = () => {
    this.setState({
      showInsert: false,
      showEdit: false,
    });
  };

  changeShowInsert = visible => {
    this.setState({ showInsert: visible });
  };

  changeShowEdit = visible => {
    this.setState({ showEdit: visible });
  };

  // 팝업저장
  onOkCate = (rowInfo, treeData) => {
    const { data } = this.state;
    const NAME_KOR = this.inputKor.input.value;
    const NAME_ENG = this.inputEng.input.value;
    const NAME_CHN = this.inputChn.input.value;

    if (NAME_KOR === '' || NAME_ENG === '' || NAME_CHN === '') {
      // 빈 값 처리
    } else {
      data.NAME_KOR = NAME_KOR;
      data.NAME_ENG = NAME_ENG;
      data.NAME_CHN = NAME_CHN;

      if (data.MENU_ID) {
        this.props.updateNode(rowInfo, treeData, data, this.props.history);
      } else {
        this.props.insertNode(rowInfo, treeData, data, this.props.history);
      }
      this.setState({ showInsert: false, showEdit: false });
    }
  };

  // // 카테고리명 한글
  // onChangeNameKor = (val) => {
  //   this.onChangeData({ NAME_KOR: replaceSpecialCharacter(val.target.value) });
  // };
  // // 카테고리명 영어
  // onChangeNameEng = (val) => {
  //   this.onChangeData({ NAME_ENG: replaceSpecialCharacter(val.target.value) });
  // };
  // // 카테고리명 중문
  // onChangeNameChn = (val) => {
  //   this.onChangeData({ NAME_CHN: replaceSpecialCharacter(val.target.value) });
  // };

  render() {
    const {
      treeData,
      searchString,
      searchFocusIndex,
      selectedIndex,
      data,

      showInsert,
      showEdit,
      onHoverKey,
    } = this.state;

    const {
      history,
      onClick, // 트리 클릭 func
      canDrag, // 드래그 가능 bool

      saveData, // 임시데이터 저장 func(treeData, rowInfo)
      moveNode, // 메뉴 드래그 이동 func(treeData)
      deleteNode, // 메뉴 삭제 func(rowInfo, treeData)

      bizGroupInfo,
    } = this.props;

    const { BIZGRP_ID } = bizGroupInfo;
    const rootRowInfo = {};
    rootRowInfo.node = { key: -1, BIZGRP_ID };

    return (
      <StyleMyPageTree
        style={{
          display: 'flex',
          flex: '1 0 50%',
          padding: '10px 0 0 0',
          flexDirection: 'column',
          height: '100%',
          width: '100%',
        }}
      >
        <h2>{lang.get('NAME', bizGroupInfo)}</h2>
        <SortableTree
          theme={CustomTheme}
          treeData={treeData}
          onChange={this.updateTreeData}
          searchQuery={searchString}
          searchFocusOffset={searchFocusIndex}
          canDrag={({ node }) =>
            // [ 노드 드래그 가능 여부 ]
            // 조건 : 드래그가능 && 업무그룹 하위를 제외한 모든경우 && 폴더/페이지명 수정중이지 않을때
            canDrag && !(node.REF_TYPE === 'B' && node.NODE_TYPE !== 'R')
          }
          canDrop={({ nextParent }) =>
            // [ 노드 드롭 가능 여부 ]
            // 조건 : 최하위 노드 하위에 이동불가 && 업무그룹폴더 하위에 이동불가
            !nextParent || (nextParent.NODE_TYPE !== 'E' && !(nextParent.NODE_TYPE === 'R' && nextParent.REF_TYPE === 'B'))
          }
          onMoveNode={({ treeData, node, nextParentNode }) => {
            // [ 노드 드래그 이동 후 실행됨 ]
            // 이동 후 변경된 treeData를 재귀함수돌며 sort, lvl값을 재정렬하고, 트리데이터를 파라미터로 전달
            const { MENU_ID } = node;
            let PRNT_ID = -1; // 최상위 루트
            const ROOT_ID = node.path[0];

            if (nextParentNode) {
              // 부모가 있는 경우 PRNT_ID지정

              PRNT_ID = nextParentNode.MENU_ID;
            }

            // eslint-disable-next-line no-shadow
            const resortTreeData = (data, pathArr, lvl) => {
              for (let i = 0; i < data.length; i += 1) {
                // eslint-disable-next-line no-shadow
                const node = data[i];
                const path = [...pathArr, node.key];

                node.SORT_SQ = i + 1;
                node.LVL = lvl;
                node.path = path;

                if (node.MENU_ID === MENU_ID) {
                  node.PRNT_ID = PRNT_ID;
                }
                if (node.children) {
                  resortTreeData(node.children, path, lvl + 1);
                }
              }
            };

            resortTreeData(treeData, [ROOT_ID], 0);

            saveData(null, treeData);
            moveNode(BIZGRP_ID, treeFunc.generateList(fromJS(treeData)));
          }}
          rowHeight={35}
          scaffoldBlockPxWidth={20}
          generateNodeProps={rowInfo => {
            const { node } = rowInfo;
            node.selectedIndex = selectedIndex; // node-content-renderer.js에서 쓰임..
            node.title = lang.get('NAME', node);

            let title; // 트리 노드 제목
            const buttons = null; // 트리 노드 마우스 오버시 노출 될 버튼

            const handleTreeOnClick = () => {
              this.setState({
                selectedIndex: node.key,
              });
              this.props.execApps(node);
              saveData(rowInfo, treeData);
              onClick(node);
            };

            title = (
              <div>
                <button className={`${node.key === selectedIndex ? 'bizIcon active' : 'bizIcon'}`} onClick={handleTreeOnClick} style={{ cursor: 'pointer' }}>
                  {node.title}
                </button>
              </div>
            );

            return {
              title,

              // buttons,
            };
          }}
          className="sortableTreeWrapper bizMenuTree"
        />
      </StyleMyPageTree>
    );
  }
}

BizMenuTree.propTypes = {
  treeData: PropTypes.array.isRequired,
  selectedIndex: PropTypes.number.isRequired,
  canDrag: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
  canDrop: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
  history: PropTypes.object.isRequired,
  onClick: PropTypes.func,
};

BizMenuTree.defaultProps = {
  onClick: [],
  selectedIndex: -1,
};

export default BizMenuTree;
