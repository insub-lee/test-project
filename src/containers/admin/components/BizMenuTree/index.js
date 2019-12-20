import React, { Component } from 'react';
import { SortableTreeWithoutDndContext as SortableTree } from 'react-sortable-tree';
// import { Link } from 'react-router-dom';
import { Input, Popover } from 'antd';
import PropTypes from 'prop-types';
import { fromJS } from 'immutable';
import ScrollBar from 'react-custom-scrollbars';
import { lang, intlObj } from 'utils/commonUtils';
import * as feed from 'components/Feedback/functions';
import * as treeFunc from 'containers/common/functions/treeFunc';

// import 'style/sortable-tree-biz.css';
import { toggleExpandedForSelected } from './tree-data-utils';
import messages from './messages';
import CustomTheme from './theme';
import StyleMyPageTree, { AppListBtn, FolderBtn, CopyBtn, RemoveBtn, EditBtn } from './StyleMyPageTree';

const replaceSpecialCharacter = str => {
  // var regExp = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gi;
  const regExp = /[\{\}?,;*~`^$%&\\\=\'\"]/gi;
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
    this.addNode = this.addNode.bind(this);
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

  addNode(BIZGRP_ID, PRNT_ID, NODE_TYPE) {
    this.setState({
      showInsert: true,
      showEdit: false,
      selectedIndex: PRNT_ID,
      data: {
        BIZGRP_ID,
        PRNT_ID,
        NODE_TYPE,
        NAME_KOR: '',
        NAME_ENG: '',
        NAME_CHN: '',
        NAME_JPN: '',
        NAME_ETC: '',
      },
    });
  }

  editNode(node) {
    this.setState({
      showInsert: false,
      showEdit: true,
      selectedIndex: node.key,
      data: { ...node },
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
    const NAME_KOR = replaceSpecialCharacter(this.inputKor.input.value);
    const NAME_ENG = replaceSpecialCharacter(this.inputEng.input.value);
    const NAME_CHN = replaceSpecialCharacter(this.inputChn.input.value);

    this.inputKor.input.value = NAME_KOR;
    this.inputEng.input.value = NAME_ENG;
    this.inputChn.input.value = NAME_CHN;

    if (NAME_KOR === '') {
      // 빈 값 처리
    } else {
      data.NAME_KOR = NAME_KOR;
      data.NAME_ENG = NAME_ENG === '' ? NAME_KOR : NAME_ENG;
      data.NAME_CHN = NAME_CHN === '' ? NAME_KOR : NAME_CHN;

      if (data.MENU_ID) {
        this.props.updateNode(rowInfo, treeData, data, this.props.history);
      } else {
        this.props.insertNode(rowInfo, treeData, data, this.props.history);
      }
      this.setState({ showInsert: false, showEdit: false });
    }
  };

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
      userRole,
    } = this.props;

    const pathArr = history.location.pathname.split('/');
    const type = pathArr[3];
    const { BIZGRP_ID } = bizGroupInfo;
    const rootRowInfo = {};
    rootRowInfo.node = { key: -1, BIZGRP_ID };

    const SEC_YN = bizGroupInfo.SEC_YN === 'Y' || userRole === 'SA';

    const getModalJsx = (rowInfo, treeData) => {
      const { data } = this.state;
      return (
        <div className="mypageTree">
          <ul className="entryName">
            <li>
              <label htmlFor="l_ko">{intlObj.get(messages.kor)}</label>
              <Input
                placeholder=""
                title={intlObj.get(messages.kor)}
                maxLength="100"
                ref={ref => {
                  if (ref) {
                    this.inputKor = ref;
                    // console.log(ref);
                    ref.input.value = data.NAME_KOR;

                    setTimeout(() => {
                      const { input } = ref;
                      if (input) {
                        if ('selectionStart' in input) {
                          // Standard-compliant browsers
                          input.focus();
                          input.selectionStart = data.NAME_KOR.length;
                        } else if (document.selection) {
                          // IE
                          input.focus();
                          const sel = document.selection.createRange();
                          const selLen = document.selection.createRange().text.length;
                          sel.moveStart('character', -input.value.length);
                        }
                      }
                    }, 100);
                  }
                }}
                defaultValue={data.NAME_KOR}
                id="l_ko"
              />
            </li>
            <li>
              <label htmlFor="l_en">{intlObj.get(messages.eng)}</label>
              <Input
                placeholder=""
                title={intlObj.get(messages.eng)}
                maxLength="100"
                ref={ref => {
                  if (ref) {
                    this.inputEng = ref;
                  }
                }}
                defaultValue={data.NAME_ENG}
                id="l_en"
              />
            </li>
            <li>
              <label htmlFor="l_ch">{intlObj.get(messages.chn)}</label>
              <Input
                placeholder=""
                title={intlObj.get(messages.chn)}
                maxLength="100"
                ref={ref => {
                  if (ref) {
                    this.inputChn = ref;
                  }
                }}
                defaultValue={data.NAME_CHN}
                id="l_ch"
              />
            </li>
          </ul>
          <div className="buttonWrapper">
            <button onClick={() => this.closeModal()}>{intlObj.get(messages.cancle)}</button>
            <button onClick={() => this.onOkCate(rowInfo, treeData)}>{intlObj.get(messages.save)}</button>
          </div>
        </div>
      );
    };

    const rootInsertBox = this.state.showInsert && data.PRNT_ID === -1 ? getModalJsx(rootRowInfo, treeData) : '';

    const tree = (
      <SortableTree
        theme={CustomTheme}
        treeData={treeData}
        onChange={this.updateTreeData}
        searchQuery={searchString}
        searchFocusOffset={searchFocusIndex}
        style={{ display: 'inline-block', width: '100%', height: '100%', overflow: 'visible' }}
        isVirtualized={false}
        canDrag={({ node }) =>
          // [ 노드 드래그 가능 여부 ]
          // 조건 : 드래그가능 && 업무그룹 하위를 제외한 모든경우 && 폴더/페이지명 수정중이지 않을때
          canDrag && SEC_YN && !(node.REF_TYPE === 'B' && node.NODE_TYPE !== 'R')
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

          const resortTreeData = (data, lvl, pathArr) => {
            for (let i = 0; i < data.length; i += 1) {
              const node = data[i];
              const path = [...pathArr, node.key];

              node.SORT_SQ = i + 1;
              node.LVL = lvl;
              node.path = path;
              if (node.MENU_ID === MENU_ID) {
                node.PRNT_ID = PRNT_ID;
              }
              if (node.children) {
                resortTreeData(node.children, lvl + 1, path);
              }
            }
          };

          resortTreeData(treeData, treeData[0].LVL, [ROOT_ID]);

          saveData(null, treeData);
          moveNode(BIZGRP_ID, treeFunc.generateList(fromJS(treeData)));
        }}
        rowHeight={35}
        scaffoldBlockPxWidth={20}
        generateNodeProps={rowInfo => {
          const { node } = rowInfo;
          node.selectedIndex = selectedIndex; // node-content-renderer.js에서 쓰임..
          node.title = lang.get('NAME', node);

          // 버튼 노출 조건(아이콘 별)
          const isFolder = node.NODE_TYPE === 'F'; // 마지막노드X
          const isEmptyFolder = !node.children || node.children.length === 0; // 하위노드존재X
          const canEditName = node.NODE_TYPE === 'F' || (node.APP_ID === -1 && node.PAGE_ID !== -1); // 페이지O 폴더O(업무X)

          let title; // 트리 노드 제목
          let buttons = null; // 트리 노드 마우스 오버시 노출 될 버튼

          const handleTreeOnClick = () => {
            this.setState({
              selectedIndex: node.key,
            });
            saveData(rowInfo, treeData);
            onClick(node);
          };

          // 버튼 노출 조건. 폴더명 수정중아닐때, 노드에 마우스 오버했을 때
          if (onHoverKey === node.key && SEC_YN) {
            buttons = [
              // [앱등록 버튼]
              isFolder ? (
                <AppListBtn
                  title="앱등록"
                  onClick={() => {
                    saveData(rowInfo, treeData);
                    history.push(`/admin/adminmain/${type}/bizMenuReg/appSelect/${BIZGRP_ID}/modal/app/list`);
                  }}
                />
              ) : (
                ''
              ),

              // [폴더추가 버튼]
              isFolder ? (
                <FolderBtn
                  title="폴더추가"
                  onClick={() => {
                    // cateInsert(rowInfo);
                    this.addNode(BIZGRP_ID, node.key, 'F');
                  }}
                />
              ) : (
                ''
              ),

              // [페이지추가 버튼] 버튼노출조건 : 마지막노드X 업무그룹X
              isFolder ? (
                <CopyBtn
                  title="페이지 추가"
                  onClick={() => {
                    this.addNode(BIZGRP_ID, node.key, 'E');
                  }}
                />
              ) : (
                ''
              ),

              // [메뉴명수정]
              canEditName ? <EditBtn title="편집" onClick={() => this.editNode(node)} /> : '',

              // [메뉴삭제 버튼]
              isEmptyFolder ? (
                <RemoveBtn
                  title="삭제"
                  onClick={() => {
                    let message = '';
                    if (node.NODE_TYPE === 'F') {
                      // 폴더
                      message = messages.deleteFolder;
                    } else if (node.APP_YN === 'Y') {
                      // 앱
                      message = messages.deleteApp;
                    } else {
                      // 페이지
                      message = messages.deletePage;
                    }

                    const messageStr = `${node.title} ${intlObj.get(message)}`;
                    feed.showConfirm(messageStr, '', () => deleteNode(rowInfo, this.state.treeData, history));
                  }}
                />
              ) : (
                ''
              ),
            ];
            // div 감쌈
            buttons = (
              <div className="btnsWrapper" style={{ display: this.state.showInsert ? 'none' : 'block' }}>
                {buttons}
              </div>
            );
          }

          const insertTitleBoxJsx = showInsert && node.key === selectedIndex ? getModalJsx(rowInfo, treeData) : '';
          const editTitleBoxJsx = showEdit && node.key === selectedIndex ? getModalJsx(rowInfo, treeData) : '';

          title = (
            <div>
              <Popover placement="right" content={buttons} trigger="hover" overlayClassName="mypageTreePopupMenu">
                <button
                  className={`${node.key === selectedIndex ? 'active' : ''}`}
                  onClick={handleTreeOnClick}
                  onMouseOver={() => (!showInsert && !showEdit ? this.onHoverTreeNode(node.key) : '')}
                  style={{ cursor: 'pointer' }}
                >
                  {node.title}
                </button>
              </Popover>
              <Popover
                placement="right"
                content={insertTitleBoxJsx}
                trigger="click"
                visible={showInsert && node.key === selectedIndex}
                onVisibleChange={visible => this.changeShowInsert(visible)}
                overlayClassName="mypageTreePopupMenu"
              />
              <Popover
                placement="right"
                content={editTitleBoxJsx}
                trigger="click"
                visible={showEdit && node.key === selectedIndex}
                onVisibleChange={visible => this.changeShowEdit(visible)}
                overlayClassName="mypageTreePopupMenu"
              />
            </div>
          );

          return {
            title,

            // buttons,
          };
        }}
        className="sortableTreeWrapper bizMenuTree CustomSCRB"
        style={{ height: 'calc(100vh - 304px)' /* 페이지 내 하단 메뉴버튼을 제외한 높이 */ }}
      />
    );

    return (
      <StyleMyPageTree
        style={{
          display: 'flex',
          flex: '1 0 50%',
          flexDirection: 'column',
          height: '100%',
          width: '100%',
        }}
      >
        <h2>
          <button
            onClick={() => {
              onClick({ key: -1 });
              history.push(`/admin/adminmain/${type}/bizMenuReg/info/${BIZGRP_ID}`);
            }}
            className="ellipsis"
            style={{ color: `${selectedIndex === -1 ? '#886ab5' : 'inherit'}`, paddingLeft: 6 }}
          >
            {lang.get('NAME', bizGroupInfo)}
          </button>
        </h2>

        {/* {
          treeData.length > 0 ? (
            <ScrollBar
              style={{ width: 280, height: '100%' }}
              autoHide
              autoHideTimeout={1000}
              autoHideDuration={200}
            >
              {tree}
            </ScrollBar>
          ) : tree
        } */}

        <ScrollBar style={{ width: 280, height: '100%' }} autoHide autoHideTimeout={1000} autoHideDuration={200}>
          {tree}
        </ScrollBar>

        {this.state.showInsert && data.PRNT_ID === -1 ? rootInsertBox : ''}
        {SEC_YN ? (
          <div className="fixedMenu">
            <AppListBtn
              className="apps"
              title="앱등록"
              onClick={() => {
                saveData(rootRowInfo, this.state.treeData);
                history.push(`/admin/adminmain/${type}/bizMenuReg/appSelect/${BIZGRP_ID}/modal/app/list`);
              }}
            />
            <FolderBtn
              className="folder"
              title="폴더추가"
              onClick={() => {
                this.addNode(BIZGRP_ID, -1, 'F');
              }}
            />
            <CopyBtn
              className="copy"
              title="페이지 추가"
              onClick={() => {
                this.addNode(BIZGRP_ID, -1, 'E');
              }}
            />
          </div>
        ) : (
          ''
        )}
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
  userRole: PropTypes.string.isRequired,
};

BizMenuTree.defaultProps = {
  onClick: [],
  selectedIndex: -1,
};

export default BizMenuTree;
