/* eslint-disable no-useless-escape */
/* eslint-disable jsx-a11y/mouse-events-have-key-events */
/* eslint-disable react/require-default-props */
/* eslint-disable prefer-const */
/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
/* eslint-disable no-shadow */
/* eslint-disable react/prop-types */
/* eslint-disable prefer-destructuring */
/* eslint-disable react/sort-comp */
import React, { Component } from 'react';
import { SortableTreeWithoutDndContext as SortableTree } from 'react-sortable-tree';
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
import StyleMyPageTree, { AppListBtn, FolderBtn, CopyBtn, VisionBtn, RemoveBtn, EditBtn } from './StyleMyPageTree';

const replaceSpecialCharacter = (str) => {
  const regExp = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gi;
  return str.replace(regExp, '');
};

class MyPageTree extends Component {
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
        // eslint-disable-next-line prefer-destructuring
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
    });
  }

  addNode(PRNT_ID, NODE_TYPE) {
    this.setState({
      showInsert: true,
      showEdit: false,
      selectedIndex: PRNT_ID,
      data: {
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

  changeShowInsert = (visible) => {
    this.setState({ showInsert: visible });
  };
  changeShowEdit = (visible) => {
    this.setState({ showEdit: visible });
  };

  // 팝업저장
  onOkCate = (rowInfo, treeData) => {
    const data = this.state.data;
    const NAME_KOR = replaceSpecialCharacter(this.inputKor.input.value);
    const NAME_ENG = replaceSpecialCharacter(this.inputEng.input.value);
    const NAME_CHN = replaceSpecialCharacter(this.inputChn.input.value);

    this.inputKor.input.value = NAME_KOR;
    this.inputEng.input.value = NAME_ENG;
    this.inputChn.input.value = NAME_CHN;

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
      this.setState({
        showInsert: false,
        showEdit: false,
      });
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
      updateMymenuDisp, // 메뉴 노출 여부 변경 func()
    } = this.props;

    const rootRowInfo = {};
    rootRowInfo.node = { key: -1 };

    const getModalJsx = (rowInfo, treeData) => (
      <div className="mypageTree">
        <ul className="entryName">
          <li>
            <label htmlFor="l_ko">{intlObj.get(messages.kor)}</label>
            <Input
              placeholder=""
              title={intlObj.get(messages.kor)}
              maxLength="100"
              ref={(ref) => {
                if (ref) {
                  this.inputKor = ref;
                  // console.log(ref);
                  ref.input.value = data.NAME_KOR;

                  setTimeout(() => {
                    const input = ref.input;
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
              ref={(ref) => {
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
              ref={(ref) => {
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

    const rootInsertBox = this.state.showInsert && data.PRNT_ID === -1 ? getModalJsx(rootRowInfo, treeData) : '';

    const tree = (
      <SortableTree
        theme={CustomTheme}
        treeData={treeData}
        onChange={this.updateTreeData}
        searchQuery={searchString}
        searchFocusOffset={searchFocusIndex}
        style={{
          display: 'inline-block',
          width: '100%',
          height: '100%',
          overflow: 'visible',
        }}
        isVirtualized={false}
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
          const MENU_ID = node.MENU_ID;
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
          moveNode(treeFunc.generateList(fromJS(treeData)));
        }}
        rowHeight={35}
        scaffoldBlockPxWidth={22}
        generateNodeProps={(rowInfo) => {
          const { node } = rowInfo;
          node.selectedIndex = selectedIndex; // node-content-renderer.js에서 쓰임..
          node.title = lang.get('NAME', node);

          console.debug('>>>>>>>>>tree node: ', node);

          // 버튼 노출 조건(아이콘 별)
          const isFolder = node.NODE_TYPE !== 'E' && node.REF_TYPE !== 'B'; // 마지막노드X 업무그룹X
          const isRootBizGroup = node.REF_TYPE === 'B' && node.NODE_TYPE === 'R'; // 업무그룹O
          const isEmptyFolder = node.REF_TYPE !== 'B' && (!node.children || node.children.length === 0); // 업무그룹X 하위노드존재X
          const canEditName = (node.REF_TYPE !== 'B' && node.NODE_TYPE === 'F') || (node.REF_TYPE === 'M' && node.PAGE_ID !== -1); // 페이지O 폴더O(업무X)

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
          if (onHoverKey === node.key) {
            buttons = [
              // [앱등록 버튼]
              isFolder ? (
                <AppListBtn
                  key="appListBtn"
                  title="앱등록"
                  onClick={() => {
                    saveData(rowInfo, treeData);
                    history.push('/portal/store/appMain/myPage/modal/app/list');
                  }}
                />
              ) : (
                ''
              ),

              // [폴더추가 버튼]
              isFolder ? (
                <FolderBtn
                  key="folderBtn"
                  title="폴더추가"
                  onClick={() => {
                    // cateInsert(rowInfo);
                    this.addNode(node.key, 'F');
                  }}
                />
              ) : (
                ''
              ),

              // [페이지추가 버튼] 버튼노출조건 : 마지막노드X 업무그룹X
              isFolder ? (
                <CopyBtn
                  key="copybtn"
                  title="페이지 추가"
                  onClick={() => {
                    this.addNode(node.key, 'E');
                  }}
                />
              ) : (
                ''
              ),

              // [메뉴노출여부 버튼]
              // btnCondition2 ?
              <VisionBtn
                key="visionBtn"
                title="메뉴노출"
                onClick={() => {
                  saveData(rowInfo, treeData);
                  updateMymenuDisp();
                }}
                className={node.DISP_YN === 'Y' ? 'visible' : 'invisible'}
              />,
              // : '',

              // [메뉴명수정]
              canEditName ? (
                <EditBtn
                  key="editBtn"
                  title="편집"
                  onClick={() => {
                    this.editNode(node);
                  }}
                />
              ) : (
                ''
              ),

              // [메뉴삭제 버튼]
              isRootBizGroup || isEmptyFolder ? (
                <RemoveBtn
                  key="removeBtn"
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
                onVisibleChange={visible => this.changeShowInsert(visible)}
                overlayClassName="mypageTreePopupMenu"
              />
            </div>
          );

          return {
            title,

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
          <ScrollBar style={{ width: 280, height: '90%' }} autoHide autoHideTimeout={1000} autoHideDuration={200}>
            {tree}
          </ScrollBar>
        ) : (
          tree
        )}

        {rootInsertBox}

        <div className="fixedMenu">
          <AppListBtn
            key="rootAppListBtn"
            className="apps"
            title="앱등록"
            onClick={() => {
              saveData(rootRowInfo, this.state.treeData);
              history.push('/portal/store/appMain/myPage/modal/app/list');
            }}
          />
          <FolderBtn
            key="rootFolderBtn"
            className="folder"
            title="폴더추가"
            onClick={() => {
              this.addNode(-1, 'F');
            }}
          />
          <CopyBtn
            key="rootCopyBtn"
            className="copy"
            title="페이지 추가"
            onClick={() => {
              this.addNode(-1, 'E');
            }}
          />
        </div>
      </StyleMyPageTree>
    );
  }
}

MyPageTree.propTypes = {
  treeData: PropTypes.array.isRequired,
  selectedIndex: PropTypes.number.isRequired,
  // eslint-disable-next-line react/require-default-props
  canDrag: PropTypes.bool,
  // eslint-disable-next-line react/no-unused-prop-types
  canDrop: PropTypes.bool,
  history: PropTypes.object.isRequired,
  onClick: PropTypes.func,
};

MyPageTree.defaultProps = {
  onClick: [],
  // eslint-disable-next-line react/default-props-match-prop-types
  selectedIndex: -1,
};

export default MyPageTree;
