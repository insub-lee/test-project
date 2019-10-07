import React, { Component } from 'react';
// import SortableTree, { toggleExpandedForAll } from 'react-sortable-tree';
import { SortableTreeWithoutDndContext as SortableTree } from 'react-sortable-tree';
import PropTypes from 'prop-types';
import { fromJS } from 'immutable';
import ScrollBar from 'react-custom-scrollbars';
import { Icon, Input, Popover } from 'antd';
import { lang, intlObj } from 'utils/commonUtils';
import * as feed from 'components/Feedback/functions';
// import 'style/sortable-tree-biz.css';
import messages from './messages';
import * as makeTreeData from '../../components/VgroupTree/makeTreeData';
import { toggleExpandedForSelected } from './tree-data-utils';

import CustomTheme from './theme';
import StyleMyAppTree, { AddCtgBtn, EditCtgBtn, DeleteCtgBtn } from '../../components/VgroupTree/StyleMyAppTree';

let flatData = fromJS({});
let count = 0;
const generateList = (data) => {
  for (let i = 0; i < data.size; i += 1) {
    const node = data.get(i);
    const nodeObject = node.toJS();
    const key = node.get('key');
    flatData = flatData.set(key, {
      index: count,
      ...nodeObject,
      path: makeTreeData.convertPathStringToArray(nodeObject.path),
    });
    count += 1;
    if (node.get('children')) {
      generateList(node.get('children'));
    }
  }
  return flatData;
};

class VgroupTree extends Component {
  constructor(props) {
    super(props);

    let treeData = [];
    this.treeFlatData = fromJS([]);

    // 트리 데이터 삽입
    if (props.treeData && props.treeData.length > 0) {
      this.treeFlatData = generateList(fromJS(props.treeData));
      // 펼쳐야 하는 트리 값 셋팅
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
      menuName: '',
      onHoverKey: -1,
      editingMenuName: false,
      // start
      show: false,
      showUpdate: false,
      NAME_KOR: '',
      NAME_ENG: '',
      NAME_CHN: '',
    };

    this.updateTreeData = this.updateTreeData.bind(this);
    this.readyEditMenuName = this.readyEditMenuName.bind(this);
    this.onHover = this.onHover.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.treeData && nextProps.treeData.length > 0) {
      if (nextProps.selectedIndex === -1) {
        this.setState({
          treeData: nextProps.treeData,
          selectedIndex: nextProps.selectedIndex,
        });
      } else {
        this.treeFlatData = generateList(fromJS(nextProps.treeData));

        this.setState({
          treeData: toggleExpandedForSelected({
            treeData: nextProps.treeData,
            path: this.treeFlatData.get(nextProps.selectedIndex).path,
          }),
          selectedIndex: nextProps.selectedIndex,
        });
      }
    }
  }

  readyEditMenuName(menuName, treeData) {
    this.setState({ menuName, editingMenuName: true, treeData: treeData || this.state.treeData });
  }

  // 트리 클릭 시 하위 트리 노출
  updateTreeData(treeData) {
    this.setState({ treeData });
  }

  // 마우스 오버
  onHover(key) {
    this.setState({ onHoverKey: key });
  }

  render() {
    const {
      treeData,
      selectedIndex,
      menuName, // 폴더/페이지명 입력인풋
      editingMenuName, // 폴더/페이지명 수정중 bool
    } = this.state;

    const {
      onClick, // 트리 클릭 func
      saveData, // 임시데이터 저장 func
      deleteMymenu, // 메뉴 삭제 func
      canDrag, // 드래그 가능 bool
      moveMymenu, // 메뉴 드래그 이동 func(treeData)
    } = this.props;

    const rootRowInfo = {};
    rootRowInfo.node = { key: -1 };

    // 카테고리 추가
    const vgroupInsert = (rowInfo) => {
      this.setState({
        selectedIndex: rowInfo.node.GRP_ID,
        PRNT_ID: rowInfo.node.PRNT_ID,
        show: true,
        NAME_KOR: '',
        NAME_ENG: '',
        NAME_CHN: '',
        showUpdate: false,
      });
    };
    // 팝업닫기
    const closeModal = () => {
      this.setState({ show: false });
    };
    // 팝업저장
    const onOKInsert = () => {
      // alert('상위 카테고리 ID:' + this.state.selectedIndex);
      // alert('입력할 카테고리명:' + this.state.NAME_KOR);
      this.props.returnVgroupInsert(
        this.props.SITE_ID,
        this.state.selectedIndex,
        this.state.PRNT_ID,
        this.state.NAME_KOR,
        this.state.NAME_ENG,
        this.state.NAME_CHN,
      );
      this.setState({ 
        NAME_KOR: '',
        NAME_ENG: '',
        NAME_CHN: '',
        show: false });
    };
    // 카테고리명 한글
    const onChangeNameKor = (val) => {
      this.setState({ NAME_KOR: val.target.value });
    };
    // 카테고리명 영어
    const onChangeNameEng = (val) => {
      this.setState({ NAME_ENG: val.target.value });
    };
    // 카테고리명 중문
    const onChangeNameChn = (val) => {
      this.setState({ NAME_CHN: val.target.value });
    };
    // 등록 popover
    const insertContent = (
      <div>
        <ul className="entryName">
          <li>
            <label htmlFor="l_ko">
              {intlObj.get(messages.kor)}
            </label>
            <Input
              placeholder=""
              title={intlObj.get(messages.kor)}
              maxLength="100"
              onChange={onChangeNameKor}
              value={this.state.NAME_KOR}
              id="l_ko"
            />
          </li>
          <li>
            <label htmlFor="l_en">
              {intlObj.get(messages.eng)}
            </label>
            <Input
              placeholder=""
              title={intlObj.get(messages.eng)}
              maxLength="100"
              onChange={onChangeNameEng}
              value={this.state.NAME_ENG}
              id="l_en"
            />
          </li>
          <li>
            <label htmlFor="l_ch">
              {intlObj.get(messages.chn)}
            </label>
              <Input
              placeholder=""
              title={intlObj.get(messages.chn)}
              maxLength="100"
              onChange={onChangeNameChn}
              value={this.state.NAME_CHN}
              id="l_ch"
            />
          </li>
        </ul>
        <div className="buttonWrapper">
          <button onClick={closeModal}>
            {intlObj.get(messages.cancle)}
          </button>
          <button onClick={onOKInsert}>
            {intlObj.get(messages.save)}
          </button>
        </div>
      </div>
    );

    // 카테고리 수정
    const vgroupUpdate = (rowInfo) => {
      // alert(node.node.CATG_ID);
      this.setState({
        selectedIndex: rowInfo.node.GRP_ID,
        showUpdate: true,
        NAME_KOR: rowInfo.node.NAME_KOR,
        NAME_ENG: rowInfo.node.NAME_ENG,
        NAME_CHN: rowInfo.node.NAME_CHN,
        show: false,
      });
      // this.setState({ showUpdate: true });
    };
    // 팝업닫기
    const closeModalUpdate = () => {
      this.setState({ showUpdate: false });
    };
    // 팝업저장
    const onOkVgroupUpdate = () => {
      // alert('상위 카테고리 ID:' + this.state.selectedIndex);
      // alert('입력할 카테고리명:' + this.state.NAME_KOR);
      this.props.returnVgroupUpdate(
        this.props.SITE_ID,
        this.state.selectedIndex,
        this.state.NAME_KOR,
        this.state.NAME_ENG,
        this.state.NAME_CHN,
      );
      this.setState({ showUpdate: false });
    };

    const updateContent = (
      <div>
        <ul className="entryName">
          <li>
            <label htmlFor="l_ko">
              {intlObj.get(messages.kor)}
            </label>
            <Input
              placeholder=""
              title={intlObj.get(messages.kor)}
              maxLength="100"
              onChange={onChangeNameKor}
              value={this.state.NAME_KOR}
              id="l_ko"
            />
          </li>
          <li>
            <label htmlFor="l_en">
              {intlObj.get(messages.eng)}
            </label>
            <Input
              placeholder=""
              title={intlObj.get(messages.eng)}
              maxLength="100"
              onChange={onChangeNameEng}
              value={this.state.NAME_ENG}
              id="l_en"
            />
          </li>
          <li>
            <label htmlFor="l_ch">
              {intlObj.get(messages.chn)}
            </label>
            <Input
              placeholder=""
              title={intlObj.get(messages.chn)}
              maxLength="100"
              onChange={onChangeNameChn}
              value={this.state.NAME_CHN}
              id="l_ch"
            />
          </li>
        </ul>
        <div className="buttonWrapper">
          <button onClick={closeModalUpdate}>
            {intlObj.get(messages.cancle)}
          </button>
          <button onClick={onOkVgroupUpdate}>
            {intlObj.get(messages.save)}
          </button>
        </div>
      </div>
    );
    const vgroupDelete = (rowInfo) => {
      this.setState({
        selectedIndex: rowInfo.node.GRP_ID,
      });
      this.props.returnVgroupDelete(this.props.SITE_ID, rowInfo.node.GRP_ID, rowInfo.parentNode);
    };
    return (
      <StyleMyAppTree
        style={{
          display: 'flex', flex: '1 0 50%', padding: '10px 0 0 0',
          flexDirection: 'column', width: '100%', height: 'calc(100vh - 215px)',
        }}
      >
        <ScrollBar>
          <SortableTree
            theme={CustomTheme}
            treeData={treeData}
            onChange={this.updateTreeData}
            rowHeight={35}
            scaffoldBlockPxWidth={22}
            canDrag={({ node }) => {
              // [ 노드 드래그 가능 여부 ]
              return canDrag
            }}
            canDrop={({ nextParent }) => {
              // [ 노드 드롭 가능 여부 ]
              // 조건 : 최하위 노드 하위에 이동불가
              return nextParent
            }}
            onMoveNode={({ treeData, node, nextParentNode }) => {
              if (node.LVL !== 0) {
                // [ 노드 드래그 이동 후 실행됨 ]
                // 이동 후 변경된 treeData를 재귀함수돌며 sort, lvl값을 재정렬하고, 트리데이터를 파라미터로 전달
                const CATG_ID = node.CATG_ID;
                let PRNT_ID = -1; // 최상위 루트

                if (nextParentNode) { // 부모가 있는 경우 PRNT_ID지정
                  PRNT_ID = nextParentNode.CATG_ID;
                }

                const resortTreeData = (data, lvl) => {
                  for (let i = 0; i < data.length; i += 1) {
                    const node = data[i];
                    node['SORT_SQ'] = i + 1;
                    node['LVL'] = lvl;
                    if (node['CATG_ID'] === CATG_ID) {
                      node['PRNT_ID'] = PRNT_ID;
                    }
                    if (node['children']) {
                      resortTreeData(node['children'], lvl + 1);
                    }
                  }
                };

                resortTreeData(treeData, 0);
                moveMymenu(generateList(fromJS(treeData)));
              }
            }}
            generateNodeProps={(rowInfo) => {
              const { node} = rowInfo;
              // 마우스 오버시 키값 셋, 아이콘 노출
              const handleOnClick = () => {
                this.setState({
                  selectedIndex: node.key,
                });
                onClick(node);
              };

              let titleInner; // 트리 노드 제목
              let buttons = []; // 트리 노드 마우스 오버시 노출 될 버튼

              // 트리 노드 타이틀
              titleInner = lang.get('NAME', node);

              // 버튼 노출 조건(아이콘 별)
              // 1. 추가는 전부 노출
              const btnCondition1 = true; // 마지막노드X 업무그룹X

              const btnCondition4 = node.LVL !== 0;

              // 최상위가 아니고 삭제 하위 노드가 없을 경우
              const btnCondition3 = node.LVL !== 0 && !node.children;

              // 노드에 마우스 오버했을 때
              if (this.state.onHoverKey === node.key) {
                buttons = [
                  // [카테고리 추가]
                  btnCondition1 ?
                    <li>
                      <AddCtgBtn
                        onClick={() => vgroupInsert(rowInfo)}
                      />
                    </li> : '',
                  // [카테고리 수정]
                  btnCondition4 ?
                    <li>
                      <EditCtgBtn
                        onClick={() => vgroupUpdate(rowInfo)}
                      />

                    </li> : '',
                  // [카테고리 삭제]
                  btnCondition3 ?
                    <li>
                      <DeleteCtgBtn
                        onClick={() => {
                          feed.showConfirm(`${lang.get('NAME', rowInfo.node)} ${intlObj.get(messages.vgroupDel)}`, '', () => vgroupDelete(rowInfo));
                        }}
                      />
                    </li> : '',
                ];

                // div 감쌈
                buttons = (<ul className="btnsWrapper">{buttons}</ul>);
              }

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
                        className={`${node.key === selectedIndex ? 'active' : ''}`}
                        onClick={handleOnClick}
                        onMouseOver={() => this.onHover(node.key)}
                        // onMouseOut={() => this.onHover(-1)}
                        style={{ cursor: 'pointer' }}>
                        {titleInner}
                      </button>
                    </Popover>
                    <Popover
                      placement="right"
                      content={insertContent}
                      trigger="click"
                      visible={this.state.show && node.key === selectedIndex}
                      // onVisibleChange={visible => this.changeShowInsert(visible)}
                      overlayClassName="popoverCtgTree"
                    />
                    <Popover
                      placement="right"
                      content={updateContent}
                      trigger="click"
                      visible={this.state.showUpdate && node.key === selectedIndex}
                      // onVisibleChange={visible => this.changeShowInsert(visible)}
                      overlayClassName="popoverCtgTree"
                    />
                  </div>
                ),
                // buttons,
              };
            }}
            style={{ display: 'inline-block', width: '100%', height: '100%', overflow: 'visible' }}
            isVirtualized={false}
            className="sortableTreeWrapper CustomSCRB"
          />
        </ScrollBar>
      </StyleMyAppTree>
    );
  }
}

VgroupTree.propTypes = {
  treeData: PropTypes.array, //eslint-disable-line
  selectedIndex: PropTypes.number, //eslint-disable-line
  SITE_ID: PropTypes.number, //eslint-disable-line
  canDrag: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
  canDrop: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
  history: PropTypes.object, //eslint-disable-line
  onClick: PropTypes.func,
  returnVgroupInsert: PropTypes.func.isRequired, //eslint-disable-line
  returnVgroupUpdate: PropTypes.func.isRequired, //eslint-disable-line
  returnVgroupDelete: PropTypes.func.isRequired, //eslint-disable-line
  moveMymenu: PropTypes.func.isRequired, //eslint-disable-line
};

// MyAppTree.defaultProps = {
//   onClick: [],
//   selectedIndex: -1,
// };

export default VgroupTree;
