import React, { Component } from 'react';
// import SortableTree, { getTreeFromFlatData, getFlatDataFromTree } from 'react-sortable-tree';
import { SortableTreeWithoutDndContext as SortableTree, getTreeFromFlatData, getFlatDataFromTree } from 'react-sortable-tree';
import PropTypes from 'prop-types';
import { Icon, Input, Popover } from 'antd';
import { lang, intlObj } from 'utils/commonUtils';
import message from 'components/Feedback/message';
import * as feed from 'components/Feedback/functions';
import ScrollBar from 'react-custom-scrollbars';
import 'style/sortable-tree-biz.css';
import messages from './messages';
// import * as makeTreeData from '../../components/MyAppTree/makeTreeData';
// import './app.css';
// import { toggleExpandedForSelected } from './tree-data-utils';

import CustomTheme from './theme';
import StyleMyAppTree, { AddCtgBtn, EditCtgBtn, DeleteCtgBtn } from './StyleMyAppTree';

const replaceSpecialCharacter = str => {
  const regExp = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gi;
  return str.replace(regExp, '');
};

const getTreeData = flatData =>
  getTreeFromFlatData({
    flatData,
    getKey: node => node.NODE_ID,
    getParentKey: node => node.PARENT_NODE_ID,
    rootKey: -1,
  });

class MyAppTree extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: -1,
      menuName: '',
      onHoverNodeId: -1,
      editingMenuName: false,
      showInsert: false,
      showUpdate: false,
      NAME_KOR: '',
      NAME_ENG: '',
      NAME_CHN: '',
      addNodeParent: {},
    };
  }

  // 마우스 오버
  onHover = key => {
    if (!this.state.showInsert && !this.state.showUpdate) {
      this.setState({
        onHoverNodeId: key,
        showUpdate: false,
        NAME_KOR: '',
        NAME_ENG: '',
        NAME_CHN: '',
        showInsert: false,
      });
    }
  };

  // 팝업저장
  onOkCate = () => {
    const { addNodeParent } = this.state;
    const NAME_KOR = replaceSpecialCharacter(this.inputKor.input.value);
    const NAME_ENG = replaceSpecialCharacter(this.inputEng.input.value);
    const NAME_CHN = replaceSpecialCharacter(this.inputChn.input.value);

    // 필수값 체크
    let isValid = true;
    if (NAME_KOR === '' || NAME_ENG === '' || NAME_CHN === '') {
      message.error(`${intlObj.get(messages.cateName)}`, 2);
      isValid = false;
    }
    if (isValid) {
      const classifyInfo = {
        PARENT_NODE_ID: addNodeParent.NODE_ID,
        LVL: addNodeParent.LVL + 1,
        NODE_ORDINAL: addNodeParent.NODE_ORDINAL,
        FULLPATH: addNodeParent.FULLPATH,
        NAME_KOR,
        NAME_ENG,
        NAME_CHN,
        GUBUN: addNodeParent.GUBUN,
      };
      this.props.addClassifyInfo(classifyInfo);
      this.setState({ showInsert: false });
    }
  };

  // 트리 클릭 시 하위 트리 노출
  updateTreeData = treeData => {
    const classifyList = getFlatDataFromTree({
      treeData,
      getNodeKey: ({ node }) => node.NODE_ID,
      ignoreCollapsed: false,
    }).map(({ node, path }) => {
      const temp = { ...node };
      delete temp.children;
      return {
        ...temp,
        PARENT_NODE_ID: path.length > 1 ? path[path.length - 2] : -1,
        expanded: temp.expanded || false,
      };
    });

    this.props.setClassifyList(classifyList);
  };

  // 카테고리 추가
  cateInsert = rowInfo => {
    this.setState({
      addNodeParent: rowInfo.node,
      showInsert: true,
    });
  };

  cateDelete = rowInfo => {
    this.props.deleteClassifyInfo(rowInfo.node);
  };

  // 팝업닫기
  closeModal = () => {
    this.setState({ showInsert: false });
  };

  // 등록 popover
  insertContent = () => (
    <div>
      <ul className="entryName">
        <li>
          <label htmlFor="l_ko">한국어</label>
          <Input
            maxLength={100}
            defaultValue={this.state.NAME_KOR}
            ref={ref => {
              if (ref) {
                this.inputKor = ref;
                ref.input.value = this.state.NAME_KOR;

                // setTimeout(() => {
                //   const { input } = ref;
                //   if (input) {
                //     if ('selectionStart' in input) {
                //       // Standard-compliant browsers
                //       input.focus();
                //       input.selectionStart = this.state.NAME_KOR.length;
                //     } else if (document.selection) {
                //       // IE
                //       input.focus();
                //       const sel = document.selection.createRange();
                //       const selLen = document.selection.createRange().text.length;
                //       sel.moveStart('character', -input.value.length);
                //     }
                //   }
                // }, 100);
              }
            }}
            id="l_ko"
          />
        </li>
        <li>
          <label htmlFor="l_en">English</label>
          <Input
            maxLength={100}
            defaultValue={this.state.NAME_ENG}
            ref={ref => {
              if (ref) {
                this.inputEng = ref;
              }
            }}
            id="l_en"
          />
        </li>
        <li>
          <label htmlFor="l_ch">中國語</label>
          <Input
            maxLength={100}
            defaultValue={this.state.NAME_CHN}
            ref={ref => {
              if (ref) {
                this.inputChn = ref;
              }
            }}
            id="l_ch"
          />
        </li>
      </ul>
      <div className="buttonWrapper">
        <button type="button" onClick={this.closeModal}>
          취소
        </button>
        <button type="button" onClick={this.onOkCate}>
          확인
        </button>
      </div>
    </div>
  );

  // 카테고리 수정
  cateUpdate = rowInfo => {
    this.setState({
      selectedIndex: rowInfo.node.CATG_ID,
      showUpdate: true,
      NAME_KOR: rowInfo.node.NAME_KOR,
      NAME_ENG: rowInfo.node.NAME_ENG,
      NAME_CHN: rowInfo.node.NAME_CHN,
      showInsert: false,
    });
  };

  // 팝업닫기
  closeModalUpdate = () => {
    this.setState({ showUpdate: false });
  };

  // // 팝업저장
  // onOkCateUpdate = () => {
  //   const NAME_KOR = replaceSpecialCharacter(this.inputKor.input.value);
  //   const NAME_ENG = replaceSpecialCharacter(this.inputEng.input.value);
  //   const NAME_CHN = replaceSpecialCharacter(this.inputChn.input.value);

  //   this.props.returnGateUpdate(this.state.selectedIndex, NAME_KOR, NAME_ENG, NAME_CHN);
  //   this.setState({
  //     showUpdate: false,
  //     NAME_KOR,
  //     NAME_ENG,
  //     NAME_CHN,
  //   });
  // };

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

    const insertContentTrigger = this.state.showInsert && node.NODE_ID === this.state.addNodeParent.NODE_ID ? this.insertContent() : '';
    const updateContentTrigger = this.state.showUpdate && node.NODE_ID === this.state.addNodeParent.NODE_ID ? this.updateContent() : '';

    return {
      title: (
        <div>
          <Popover
            placement="right"
            content={buttons}
            trigger="hover"
            overlayClassName="myappTreePopupMenu"
            // onMouseLeave={this.popoverClose}
          >
            <button
              type="button"
              className={`${node.NODE_ID === this.props.selectedNode.NODE_ID ? 'active' : ''}`}
              onClick={() => this.props.setSelectedNode(node)}
              onMouseOver={() => this.onHover(node.NODE_ID)}
              style={{ cursor: 'pointer' }}
              key={node.NODE_ID}
            >
              {titleInner}
            </button>
          </Popover>
          <Popover
            placement="right"
            content={insertContentTrigger}
            trigger="click"
            visible={this.state.showInsert && node.NODE_ID === this.state.addNodeParent.NODE_ID}
            // onVisibleChange={visible => this.changeShowInsert(visible)}
            overlayClassName="popoverCtgTree"
          />
          <Popover
            placement="right"
            content={updateContentTrigger}
            trigger="click"
            visible={false}
            // visible={this.state.showUpdate && node.key === selectedIndex}
            // onVisibleChange={visible => this.changeShowInsert(visible)}
            overlayClassName="popoverCtgTree"
          />
        </div>
      ),
    };
  };

  // 노드이동
  onMoveNode = rowInfo => {
    const { nextParentNode } = rowInfo;
    const { treeData } = this.props;
    const classifyList = getFlatDataFromTree({
      treeData,
      getNodeKey: ({ node }) => node.NODE_ID,
      ignoreCollapsed: false,
    });
    const moveDataGroup = classifyList.filter(item => item.node.PARENT_NODE_ID === nextParentNode.NODE_ID);
    const modifyList = [];
    moveDataGroup.forEach(item => {
      modifyList.push(item.node);
    });
    const updateData = {
      parentNode: nextParentNode,
      modifyList,
    };
    this.props.updateClassifyList(updateData);
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

MyAppTree.propTypes = {
  treeData: PropTypes.array.isRequired,
  setClassifyList: PropTypes.func.isRequired,
  selectedNode: PropTypes.object.isRequired,
  setSelectedNode: PropTypes.func.isRequired,
  addClassifyInfo: PropTypes.func.isRequired,
  deleteClassifyInfo: PropTypes.func.isRequired,
  updateClassifyList: PropTypes.func.isRequired,
  selectedIndex: PropTypes.number, //eslint-disable-line
};

export default MyAppTree;
