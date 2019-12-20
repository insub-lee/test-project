import React, { Component } from 'react';
// import SortableTree, { toggleExpandedForAll } from 'react-sortable-tree';
import { SortableTreeWithoutDndContext as SortableTree } from 'react-sortable-tree';
import PropTypes from 'prop-types';
import { fromJS } from 'immutable';
import { Icon, Input, Popover } from 'antd';
import { lang, intlObj } from 'utils/commonUtils';
import message from 'components/Feedback/message';
import * as feed from 'components/Feedback/functions';
import ScrollBar from 'react-custom-scrollbars';
import 'style/sortable-tree-biz.css';
import * as treeFunc from 'containers/common/functions/treeFunc';
import { toggleExpandedForSelected } from 'containers/common/functions/tree-data-utils';
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

class MyAppTree extends Component {
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
      menuName: '',
      onHoverKey: -1,
      editingMenuName: false,
      // start
      showInsert: false,
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

  readyEditMenuName(menuName, treeData) {
    this.setState({ menuName, editingMenuName: true, treeData: treeData || this.state.treeData });
  }

  // 트리 클릭 시 하위 트리 노출
  updateTreeData(treeData) {
    this.setState({ treeData });
  }

  // 마우스 오버
  onHover(key) {
    if (!this.state.showInsert && !this.state.showUpdate) {
      this.setState({
        onHoverKey: key,
        showUpdate: false,
        NAME_KOR: '',
        NAME_ENG: '',
        NAME_CHN: '',
        showInsert: false,
      });
    }
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
      shape, // 페이지, 모달 스타일 구분
    } = this.props;

    const rootRowInfo = {};
    rootRowInfo.node = { key: -1 };

    // 카테고리 추가
    const cateInsert = rowInfo => {
      this.setState({
        selectedIndex: rowInfo.node.CATG_ID,
        showInsert: true,
        NAME_KOR: '',
        NAME_ENG: '',
        NAME_CHN: '',
        showUpdate: false,
      });
    };
    // 팝업닫기
    const closeModal = () => {
      this.setState({ showInsert: false });
    };
    // 팝업저장
    const onOkCate = () => {
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
        this.props.returnGateInfo(this.state.selectedIndex, NAME_KOR, NAME_ENG, NAME_CHN);
        this.setState({ showInsert: false });
        const node = {
          CATG_ID: this.state.selectedIndex,
          NAME_KOR,
          NAME_ENG,
          NAME_CHN,
        };
      }
    };

    // 등록 popover
    const insertContent = () => (
      <div>
        <ul className="entryName">
          <li>
            <label htmlFor="l_ko">{intlObj.get(messages.kor)}</label>
            <Input
              placeholder=""
              title={intlObj.get(messages.kor)}
              maxLength="100"
              defaultValue={this.state.NAME_KOR}
              // ref={ref => {
              //   if (ref) {
              //     this.inputKor = ref;
              //   }
              // }}
              ref={ref => {
                if (ref) {
                  this.inputKor = ref;
                  // console.log(ref);
                  ref.input.value = this.state.NAME_KOR;

                  setTimeout(() => {
                    const { input } = ref;
                    if (input) {
                      if ('selectionStart' in input) {
                        // Standard-compliant browsers
                        input.focus();
                        input.selectionStart = this.state.NAME_KOR.length;
                      } else if (document.selection) {
                        // IE
                        input.focus();
                        const sel = document.selection.createRange();
                        const selLen = document.selection.createRange().text.length;
                        sel.moveStart('character', -input.value.length);
                      }
                    }
                  }, 100);

                  // setTimeout(() => {
                  //   if (this.inputKor) {
                  //     this.inputKor.focus();
                  //   }
                  // }, 200);
                }
              }}
              id="l_ko"
            />
          </li>
          <li>
            <label htmlFor="l_en">{intlObj.get(messages.eng)}</label>
            <Input
              placeholder=""
              title={intlObj.get(messages.eng)}
              maxLength="100"
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
            <label htmlFor="l_ch">{intlObj.get(messages.chn)}</label>
            <Input
              placeholder=""
              title={intlObj.get(messages.chn)}
              maxLength="100"
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
          <button type="button" onClick={closeModal}>{intlObj.get(messages.cancle)}</button>
          <button type="button" onClick={onOkCate}>{intlObj.get(messages.save)}</button>
        </div>
      </div>
    );

    // 카테고리 수정
    const cateUpdate = rowInfo => {
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
    const closeModalUpdate = () => {
      this.setState({ showUpdate: false });
    };
    // 팝업저장
    const onOkCateUpdate = () => {
      const NAME_KOR = replaceSpecialCharacter(this.inputKor.input.value);
      const NAME_ENG = replaceSpecialCharacter(this.inputEng.input.value);
      const NAME_CHN = replaceSpecialCharacter(this.inputChn.input.value);

      this.props.returnGateUpdate(this.state.selectedIndex, NAME_KOR, NAME_ENG, NAME_CHN);
      this.setState({
        showUpdate: false,
        NAME_KOR,
        NAME_ENG,
        NAME_CHN,
      });
    };

    // 수정 popover
    const updateContent = () => (
      <div>
        <ul className="entryName">
          <li>
            <label htmlFor="l_ko">{intlObj.get(messages.kor)}</label>
            <Input
              placeholder=""
              title={intlObj.get(messages.kor)}
              maxLength="100"
              defaultValue={this.state.NAME_KOR}
              // ref={ref => {
              //   if (ref) {
              //     this.inputKor = ref;
              //   }
              // }}
              ref={ref => {
                if (ref) {
                  this.inputKor = ref;
                  // console.log(ref);
                  ref.input.value = this.state.NAME_KOR;

                  setTimeout(() => {
                    const { input } = ref;
                    if (input) {
                      if ('selectionStart' in input) {
                        // Standard-compliant browsers
                        input.focus();
                        input.selectionStart = this.state.NAME_KOR.length;
                      } else if (document.selection) {
                        // IE
                        input.focus();
                        const sel = document.selection.createRange();
                        const selLen = document.selection.createRange().text.length;
                        sel.moveStart('character', -input.value.length);
                      }
                    }
                  }, 100);

                  // setTimeout(() => {
                  //   if (this.inputKor) {
                  //     this.inputKor.focus();
                  //   }
                  // }, 200);
                }
              }}
              id="l_ko"
            />
          </li>
          <li>
            <label htmlFor="l_en">{intlObj.get(messages.eng)}</label>
            <Input
              placeholder=""
              title={intlObj.get(messages.eng)}
              maxLength="100"
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
            <label htmlFor="l_ch">{intlObj.get(messages.chn)}</label>
            <Input
              placeholder=""
              title={intlObj.get(messages.chn)}
              maxLength="100"
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
          <button onClick={closeModalUpdate}>{intlObj.get(messages.cancle)}</button>
          <button onClick={onOkCateUpdate}>{intlObj.get(messages.save)}</button>
        </div>
      </div>
    );

    const cateDelete = rowInfo => {
      this.setState({
        selectedIndex: rowInfo.node.CATG_ID,
      });
      this.props.returnGateDelete(rowInfo.node.CATG_ID, rowInfo.node.SORT_SQ);
    };
    return (
      // <StyleMyAppTree
      //   style={{
      //     display: 'flex', flex: '1 0 50%', padding: '0',
      //     flexDirection: 'column', height: 'calc(100vh - 167px)',
      //     maxHeight: 500, width: '100%',
      //   }}
      // >
      <StyleMyAppTree
        style={
          shape === 'modal'
            ? {
              display: 'flex',
              flex: '1 0 50%',
              padding: '0',
              flexDirection: 'column',
              height: 'calc(100vh - 167px)',
              maxHeight: 500,
              width: '100%',
              }
            : {
              display: 'flex',
              flex: '1 0 50%',
              padding: '0',
              flexDirection: 'column',
              height: 'calc(100vh - 200px)',
              maxHeight: 'calc(100vh - 200px)',
              width: '100%',
            }
        }
      >
        <ScrollBar>
          <SortableTree
            theme={CustomTheme}
            treeData={treeData}
            onChange={this.updateTreeData}
            rowHeight={35}
            scaffoldBlockPxWidth={20}
            style={{ display: 'inline-block', width: '100%', height: '100%', overflow: 'visible' }}
            isVirtualized={false}
            canDrag={({ node }) =>
              // [ 노드 드래그 가능 여부 ]
              canDrag
            }
            canDrop={({ prevParent, nextParent }) => {
              // [ 노드 드롭 가능 여부 ]
              // 조건 : 최하위 노드 하위에 이동불가
              if (nextParent && prevParent.key === nextParent.key) {
                return nextParent;
              }
              return false;
            }}
            onMoveNode={({ treeData, node, nextParentNode }) => {
              if (node.LVL !== 0) {
                // [ 노드 드래그 이동 후 실행됨 ]
                // 이동 후 변경된 treeData를 재귀함수돌며 sort, lvl값을 재정렬하고, 트리데이터를 파라미터로 전달
                const { CATG_ID } = node;
                let PRNT_ID = -1; // 최상위 루트

                if (nextParentNode) {
                  // 부모가 있는 경우 PRNT_ID지정
                  PRNT_ID = nextParentNode.CATG_ID;
                }

                const resortTreeData = (data, lvl) => {
                  for (let i = 0; i < data.length; i += 1) {
                    const node = data[i];
                    node.SORT_SQ = i + 1;
                    node.LVL = lvl;
                    if (node.CATG_ID === CATG_ID) {
                      node.PRNT_ID = PRNT_ID;
                    }
                    if (node.children) {
                      resortTreeData(node.children, lvl + 1);
                    }
                  }
                };

                resortTreeData(treeData, 0);
                moveMymenu(treeFunc.generateList(fromJS(treeData)));
              }
            }}
            generateNodeProps={rowInfo => {
              const { node } = rowInfo;
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
              // 1. 카테고리 추가는 전부 노출
              const btnCondition1 = true; // 마지막노드X 업무그룹X
              // 2. 카테고리 수정는 자신 것만, 최상위는 제외
              // const btnCondition4 = node.MYCATE === '1' && node.LVL !== 0;
              const btnCondition4 = false;
              // 3. 카테고리 삭제는 자신 것만, 사용하는 앱이 없고, 하위 카테고리가 없는 것만 삭제 가능 , 최상위는 제외
              // const btnCondition3 = node.MYCATE === '1' && node.APPCNT === '0' && node.CATGCNT === '0' && node.LVL !== 0;
              const btnCondition3 = node.APPCNT === '0' && node.CATGCNT === '0' && node.LVL !== 0;

              // 노드에 마우스 오버했을 때
              if (this.state.onHoverKey === node.key) {
                buttons = [
                  // [카테고리 추가]
                  btnCondition1 ? (
                    <li key={`${node.key}-1`}>
                      <AddCtgBtn onClick={() => cateInsert(rowInfo)} />
                    </li>
                  ) : (
                    ''
                  ),
                  // [카테고리 수정]
                  btnCondition4 ? (
                    <li key={`${node.key}-2`}>
                      <EditCtgBtn onClick={() => cateUpdate(rowInfo)} />
                    </li>
                  ) : (
                    ''
                  ),
                  // [카테고리 삭제]
                  btnCondition3 ? (
                    <li key={`${node.key}-3`}>
                      <DeleteCtgBtn
                        onClick={() => {
                          feed.showConfirm(`${lang.get('NAME', rowInfo.node)} ${intlObj.get(messages.cateDel)}`, '', () => cateDelete(rowInfo));
                        }}
                      />
                    </li>
                  ) : (
                    ''
                  ),
                ];

                // div 감쌈
                buttons = <ul className="btnsWrapper">{buttons}</ul>;
              }
              const insertContentTrigger = this.state.showInsert && node.key === selectedIndex ? insertContent() : '';
              const updateContentTrigger = this.state.showUpdate && node.key === selectedIndex ? updateContent() : '';

              return {
                title:
                  this.props.type === 'bizgroup' ? (
                    <button
                      type="button"
                      className={`${node.key === selectedIndex ? 'active' : ''}`}
                      onClick={handleOnClick}
                      onMouseOver={() => this.onHover(node.key)}
                      // onMouseOut={() => this.onHover(-1)}
                      style={{ cursor: 'pointer' }}
                    >
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
                          type="button"
                          className={`${node.key === selectedIndex ? 'active' : ''}`}
                          onClick={handleOnClick}
                          onMouseOver={() => this.onHover(node.key)}
                          // onMouseOut={() => this.onHover(-1)}
                          style={{ cursor: 'pointer' }}
                        >
                          {titleInner}
                        </button>
                      </Popover>
                      <Popover
                        placement="right"
                        content={insertContentTrigger}
                        trigger="click"
                        visible={this.state.showInsert && node.key === selectedIndex}
                        // onVisibleChange={visible => this.changeShowInsert(visible)}
                        overlayClassName="popoverCtgTree"
                      />
                      <Popover
                        placement="right"
                        content={updateContentTrigger}
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
            className="sortableTreeWrapper"
          />
        </ScrollBar>
      </StyleMyAppTree>
    );
  }
}

MyAppTree.propTypes = {
  type: PropTypes.string,
  treeData: PropTypes.array, //eslint-disable-line
  selectedIndex: PropTypes.number, //eslint-disable-line
  canDrag: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
  canDrop: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
  history: PropTypes.object, //eslint-disable-line
  onClick: PropTypes.func,
  returnGateInfo: PropTypes.func.isRequired, //eslint-disable-line
  returnGateUpdate: PropTypes.func.isRequired, //eslint-disable-line  
  returnGateDelete: PropTypes.func.isRequired, //eslint-disable-line  
  moveMymenu: PropTypes.func.isRequired, //eslint-disable-line
  shape: PropTypes.string,
};

MyAppTree.defaultProps = {
  //   onClick: [],
  //   selectedIndex: -1,
  shape: 'page',
};

export default MyAppTree;
