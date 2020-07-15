import React, { Component } from 'react';
import { SortableTreeWithoutDndContext as SortableTree } from 'react-sortable-tree';
import PropTypes from 'prop-types';
import { fromJS } from 'immutable';
import { Input, Popover } from 'antd';
import message from 'components/Feedback/message';
import * as feed from 'components/Feedback/functions';
import ScrollBar from 'react-custom-scrollbars';
// import 'style/sortable-tree-biz.css';
import './tree-node.css';
import * as treeFunc from 'containers/common/functions/treeFunc';
import { toggleExpandedForSelected } from 'containers/common/functions/tree-data-utils';

import CustomTheme from './theme';
import StyleUserFolderTree, { AddCtgBtn, EditCtgBtn, DeleteCtgBtn } from './StyleUserFolderTree';

const replaceSpecialCharacter = str => {
  const regExp = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gi;
  return str.replace(regExp, '');
};

class UserFolderTree extends Component {
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
      showInsert: false,
      showUpdate: false,
      FOLDER_NAME: '',
    };

    this.updateTreeData = this.updateTreeData.bind(this);
    this.onHover = this.onHover.bind(this);
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { selectedIndex } = nextProps;

    if (nextProps.treeData && nextProps.treeData.length > 0) {
      if (nextProps.selectedIndex === -1) {
        this.setState({
          treeData: nextProps.treeData,
          selectedIndex,
        });
      } else {
        if (nextProps.selectedIndex === 0) {
          this.setState({
            showInsert: false,
            showUpdate: false,
          });
        }

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
    if (!this.state.showInsert && !this.state.showUpdate) {
      this.setState({
        onHoverKey: key,
        showUpdate: false,
        FOLDER_NAME: '',
        showInsert: false,
      });
    }
  }

  render() {
    const { treeData, selectedIndex } = this.state;

    const { rowHeight, style, innerStyle, wrapperStyle, canDrag, canDrop, onClick } = this.props;

    const rootRowInfo = {};
    rootRowInfo.node = { key: -1 };

    // 카테고리 추가
    const cateInsert = rowInfo => {
      this.setState({
        selectedIndex: rowInfo.node.FOLDER_ID,
        showInsert: true,
        FOLDER_NAME: '',
        showUpdate: false,
      });
      onClick(rowInfo.node);
    };
    // 팝업닫기
    const closeModal = () => {
      this.setState({ showInsert: false });
    };
    // 팝업저장
    const onOkCate = () => {
      const FOLDER_NAME = replaceSpecialCharacter(this.inputName.input.value);
      // 필수값 체크
      let isValid = true;
      if (FOLDER_NAME === '') {
        message.error(`폴더명을 입력하세요`, 2);
        isValid = false;
      }
      if (isValid) {
        this.props.returnGateInfo(this.state.selectedIndex, FOLDER_NAME);
        this.setState({ showInsert: false });
      }
    };

    // 등록 popover
    const insertContent = () => (
      <div>
        <ul className="entryName">
          <li>
            <label htmlFor="f_name">폴더명</label>
            <Input
              placeholder=""
              title="폴더명"
              maxLength="100"
              defaultValue={this.state.FOLDER_NAME}
              onPressEnter={onOkCate}
              ref={ref => {
                if (ref) {
                  this.inputName = ref;
                  ref.input.value = this.state.FOLDER_NAME;

                  setTimeout(() => {
                    const { input } = ref;
                    if (input) {
                      if ('selectionStart' in input) {
                        // Standard-compliant browsers
                        input.focus();
                        input.selectionStart = this.state.FOLDER_NAME.length;
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
              id="f_name"
            />
          </li>
        </ul>
        <div className="buttonWrapper">
          <button type="button" onClick={closeModal}>
            취소
          </button>
          <button type="button" onClick={onOkCate}>
            저장
          </button>
        </div>
      </div>
    );

    // 카테고리 수정
    const cateUpdate = rowInfo => {
      this.setState({
        selectedIndex: rowInfo.node.FOLDER_ID,
        showUpdate: true,
        FOLDER_NAME: rowInfo.node.FOLDER_NAME,
        showInsert: false,
      });
      onClick(rowInfo.node);
    };
    // 팝업닫기
    const closeModalUpdate = () => {
      this.setState({ showUpdate: false });
    };
    // 팝업저장
    const onOkCateUpdate = () => {
      const FOLDER_NAME = replaceSpecialCharacter(this.inputName.input.value);

      this.props.returnGateUpdate(this.state.selectedIndex, FOLDER_NAME);
      this.setState({
        showUpdate: false,
        FOLDER_NAME,
      });
    };

    // 수정 popover
    const updateContent = () => (
      <div>
        <ul className="entryName">
          <li>
            <label htmlFor="f_name">폴더명</label>
            <Input
              placeholder=""
              title="폴더명"
              maxLength="100"
              defaultValue={this.state.FOLDER_NAME}
              onPressEnter={onOkCateUpdate}
              ref={ref => {
                if (ref) {
                  this.inputName = ref;
                  ref.input.value = this.state.FOLDER_NAME;
                  setTimeout(() => {
                    const { input } = ref;
                    if (input) {
                      if ('selectionStart' in input) {
                        // Standard-compliant browsers
                        input.focus();
                        input.selectionStart = this.state.FOLDER_NAME.length;
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
              id="f_name"
            />
          </li>
        </ul>
        <div className="buttonWrapper">
          <button onClick={closeModalUpdate}>취소</button>
          <button onClick={onOkCateUpdate}>저장</button>
        </div>
      </div>
    );

    const cateDelete = rowInfo => {
      this.setState({
        selectedIndex: rowInfo.node.FOLDER_ID,
      });
      // this.props.returnGateDelete(rowInfo.node.FOLDER_ID, rowInfo.node.PRNT_ID);
      this.props.returnGateDelete(rowInfo.node.FOLDER_ID, rowInfo.parentNode);
    };
    return (
      <StyleUserFolderTree style={wrapperStyle}>
        <ScrollBar>
          <SortableTree
            theme={CustomTheme}
            treeData={treeData}
            onChange={this.updateTreeData}
            rowHeight={rowHeight}
            canDrag={canDrag}
            canDrop={canDrop}
            scaffoldBlockPxWidth={20}
            style={{
              display: 'inline-block',
              width: '100%',
              height: '100%',
              overflow: 'visible',
              ...style,
            }}
            innerStyle={{ ...innerStyle }}
            isVirtualized={false}
            generateNodeProps={rowInfo => {
              const { node } = rowInfo;
              // 마우스 오버시 키값 셋, 아이콘 노출
              const handleOnClick = () => {
                this.setState({
                  selectedIndex: node.key,
                  showInsert: false,
                  showUpdate: false,
                });
                onClick(node);
              };

              let buttons = []; // 트리 노드 마우스 오버시 노출 될 버튼

              // 트리 노드 타이틀
              const titleInner = node.FOLDER_NAME;

              // 버튼 노출 조건(아이콘 별)
              const btnConditionAdd = true;
              const btnConditionUdt = node.LVL !== 0;
              const btnConditionDel = node.FOLDERCNT === 0 && node.FILECNT === 0 && node.LVL !== 0;

              // 노드에 마우스 오버했을 때
              if (this.state.onHoverKey === node.key) {
                buttons = [
                  // [카테고리 추가]
                  btnConditionAdd ? (
                    <li key={`${node.key}-1`}>
                      <AddCtgBtn onClick={() => cateInsert(rowInfo)} />
                    </li>
                  ) : (
                    ''
                  ),
                  // [카테고리 수정]
                  btnConditionUdt ? (
                    <li key={`${node.key}-2`}>
                      <EditCtgBtn onClick={() => cateUpdate(rowInfo)} />
                    </li>
                  ) : (
                    ''
                  ),
                  // [카테고리 삭제]
                  btnConditionDel ? (
                    <li key={`${node.key}-3`}>
                      <DeleteCtgBtn
                        onClick={() => {
                          feed.showConfirm(`${node.FOLDER_NAME} 폴더를 삭제 하시겠습니까?`, '', () => cateDelete(rowInfo));
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
                title: (
                  <div>
                    <Popover placement="right" content={buttons} trigger="hover" overlayClassName="myappTreePopupMenu">
                      <button
                        type="button"
                        className={`${node.key === selectedIndex ? 'active' : ''}`}
                        onClick={handleOnClick}
                        onMouseOver={() => this.onHover(node.key)}
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
                      overlayClassName="popoverCtgTree"
                    />
                    <Popover
                      placement="right"
                      content={updateContentTrigger}
                      trigger="click"
                      visible={this.state.showUpdate && node.key === selectedIndex}
                      overlayClassName="popoverCtgTree"
                    />
                  </div>
                ),
              };
            }}
            className="sortableTreeWrapper"
          />
        </ScrollBar>
      </StyleUserFolderTree>
    );
  }
}

UserFolderTree.propTypes = {
  treeData: PropTypes.array, //eslint-disable-line
  selectedIndex: PropTypes.number, //eslint-disable-line
  canDrag: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
  canDrop: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
  rowHeight: PropTypes.number,
  style: PropTypes.object,
  innerStyle: PropTypes.object,
  wrapperStyle: PropTypes.object,
  onClick: PropTypes.func,
  returnGateInfo: PropTypes.func.isRequired, //eslint-disable-line
  returnGateUpdate: PropTypes.func.isRequired, //eslint-disable-line  
  returnGateDelete: PropTypes.func.isRequired, //eslint-disable-line  
};

UserFolderTree.defaultProps = {
  selectedIndex: -1,
  rowHeight: 35,
  canDrag: () => false,
  canDrop: () => false,
  wrapperStyle: {
    display: 'flex',
    flex: '1 0 50%',
    padding: '10px 0 0 10px',
    flexDirection: 'column',
    height: 'calc(100vh - 100px)',
    width: '100%',
  },
  style: {},
  innerStyle: {},
};

export default UserFolderTree;
