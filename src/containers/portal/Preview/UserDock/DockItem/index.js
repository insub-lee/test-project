import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { lang, imgUrl, isExplorer, isDesktop } from 'utils/commonUtils';
import { DragSource, DropTarget } from 'react-dnd';
import BadgeDot from 'components/Badge';
import { Tooltip, Popover } from 'antd';
import pageIcon from 'images/portal/pageIcon.png';
import homeIcon from 'images/portal/Home.png';
import StyledDockItem from './StyledDockItem';
import MouseOverIcons from '../MouseOverIcons';
import Badge from '../../../../../components/Badge/StyleBadge';

const DockItemDragSpec = {
  beginDrag(props) {
    const { changeIsDockItemDragged } = props;
    changeIsDockItemDragged();

    return {
      dockId: props.dockItem.DOCK_ID,
    };
  },
  endDrag(props) {
    const { changeIsDockItemDragged } = props;

    changeIsDockItemDragged();
    props.dndChangePositionSaga();
  },
};

const DockItemDropSpec = {
  hover(props, monitor) {
    const draggedDockId = monitor.getItem().dockId;

    if (draggedDockId !== props.dockItem.DOCK_ID) {
      props.dndChangePosition(draggedDockId, props.dockItem.DOCK_ID);
    }
  },
};

const collectDrag = connect => ({ connectDragSource: connect.dragSource() });
const collectDrop = connect => ({ connectDropTarget: connect.dropTarget() });

class DockItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isMouseOver: false,
      // isPressed: false,
    };
  }

  makeIconArr = () => {
    const { isMouseOver } = this.state;

    if (!isMouseOver) {
      this.setState({
        isMouseOver: true,
      });
    }
  };

  // DockItem에 마우스 아웃 시 독 추가/제거, 실행 닫기 버튼을 제거해 주는 함수
  deleteIconArr = () => {
    const { isMouseOver } = this.state;

    if (isMouseOver) {
      this.setState({ isMouseOver: false });
    }
  };

  // DockItem 실행 이벤트 리스너
  execDockItem = () => {
    const { dockItem, dockSetMyMenuData } = this.props;
    const { execDockItem } = this.props;

    if (dockItem.TARGET === 'NEW') {
      window.open(dockItem.URL, dockItem.DOCK_ID, 'width=1280, height=720, toolbar=yes, resizable=yes, menubar=yes, status=yes, location=yes');
    } else {
      execDockItem(dockItem.DOCK_ID, dockItem.USER_ID);
      if (dockItem.HOME_YN === 'Y') {
        dockSetMyMenuData(dockItem.PAGE_ID, 'Y');
      } else {
        dockSetMyMenuData(dockItem.PAGE_ID, 'N');
      }
    }
  };

  // **************** 모바일/태블릿에서 독아이템 길게 누르고 있을 경우 수행될 함수 ****************
  handleButtonPress = () => {
    this.props.setIsCloseToFalse();
    this.buttonPressTimer = setTimeout(() => { this.props.setIsCloseToTrue(this.props.dockItem.DOCK_ID); }, 750); //eslint-disable-line
  };

  // 모바일/태블릿에서 독아이템 길게 누르고 있다가 뗀 경우 수행될 함수
  handleButtonRelease = () => {
    clearTimeout(this.buttonPressTimer);
  };
  // **************** 모바일/태블릿에서 독아이템 길게 누르고 있을 경우 수행될 함수 끝 ****************

  render() {
    const { connectDragSource, connectDropTarget } = this.props;
    const { dockItem, dockIconType, view, isClose } = this.props;
    const { exitDockItem, fixDockItem, unfixDockItem, dockItemHeight } = this.props;
    const {
      isMouseOver,
      // isPressed,
    } = this.state;

    let dockItemClassName = '';

    if (dockItem.DOCK_YN === 'Y') {
      dockItemClassName = 'dockItemDockY';
    }
    if (dockItem.EXEC_YN === 'Y') {
      dockItemClassName = 'dockItemExec';
    }
    if (dockItem.LAST_EXEC_YN === 'Y') {
      dockItemClassName = 'dockItemLastExec';
    }

    const styleDockItemHome = {
      height: dockItemHeight,
      width: dockIconType === 'MAX' ? '70px' : '34px',
      margin: 'auto',
      marginTop: dockIconType === 'MAX' ? '9px' : '4px',
    };

    const styleDockItemCommon = {
      height: dockItemHeight,
      width: dockIconType === 'MAX' ? '70px' : '34px',
      margin: 'auto',
      marginTop: '4px',
    };

    const styleDockItemClass = {
      width: dockIconType === 'MAX' ? '70px' : '24px',
      height: dockIconType === 'MAX' ? '70px' : '24px',
      padding: dockIconType === 'MAX' ? '0 5px' : '5px 5px',
    };

    const styleDockImage = {
      width: dockIconType === 'MAX' ? '40px' : '24px',
      height: dockIconType === 'MAX' ? '40px' : '24px',
      margin: dockIconType === 'MAX' ? '1.5px auto' : 'auto',
    };

    const styleContextMenuContent = {
      background: 'transparent',
    };

    const contextMenuContent = (
      <div
        style={{
          textAlign: 'center',
        }}
      >
        {dockItem.DOCK_YN === 'Y' ? (
          <button
            style={styleContextMenuContent}
            onClick={() => {
              unfixDockItem(dockItem.DOCK_ID);
            }}
          >
            Dock 등록 해제
          </button>
        ) : (
          <button
            style={styleContextMenuContent}
            onClick={() => {
              fixDockItem(dockItem.DOCK_ID);
            }}
          >
            > Dock 등록
          </button>
        )}
        <br />
        {dockItem.EXEC_YN === 'Y' ? (
          <button
            style={styleContextMenuContent}
            onClick={() => {
              exitDockItem(dockItem.DOCK_ID);
            }}
          >
            닫기
          </button>
        ) : (
          ''
        )}
      </div>
    );

    /* eslint-disable */
    const homeDockItem =
      (<div style={styleDockItemHome}>
        <StyledDockItem
          onMouseLeave={() => this.deleteIconArr()}
          onMouseEnter={() => this.makeIconArr()}
        >
          <a onClick={() => this.execDockItem()}>
            <div
              className={dockItemClassName}
              style={styleDockItemClass}
            >
              <img
                src={homeIcon}
                alt=""
                style={styleDockImage}
              />
              {
                dockIconType === 'MAX'
                  ?
                    <div className="dockItemName">
                      {lang.get('NAME', dockItem)}
                    </div>
                  :
                    ''
              }
            </div>
          </a>
        </StyledDockItem>
      </div>);
    /* eslint-disable */

    /* eslint-disable */
    const commonDockItem =
      connectDropTarget(connectDragSource(
        <div
          style={styleDockItemCommon}
          onTouchStart={this.handleButtonPress}
          onTouchEnd={this.handleButtonRelease}
          onMouseDown={this.handleButtonPress}
          onMouseUp={this.handleButtonRelease}
        >
          <Popover
            placement="topLeft"
            content={contextMenuContent}
            trigger="contextMenu"
            visible={isClose}
          >
            <StyledDockItem
              onMouseLeave={() => this.deleteIconArr()}
              onMouseEnter={() => this.makeIconArr()}
            >
            {
              dockIconType === 'MAX' && isDesktop(view)
                ?
                <MouseOverIcons
                  dockYn={dockItem.DOCK_YN}
                  execYn={dockItem.EXEC_YN}
                  isMouseOver={isMouseOver}
                  exitDockItem={exitDockItem}
                  fixDockItem={fixDockItem}
                  unfixDockItem={unfixDockItem}
                  dockId={dockItem.DOCK_ID} />
                :
                  ''
            }
              <a onClick={() => this.execDockItem()}>
                <div
                  className={dockItemClassName}
                  style={styleDockItemClass}
                >
                  {/* <Badge count={100} overflowCount={99} className="dockNotiNum" /> */}
                  {
                    dockIconType === 'MAX'
                      ?
                        <Badge count={dockItem.UNREAD_CNT !== undefined ? dockItem.UNREAD_CNT : ''} overflowCount={99} className="dockNotiNum" />
                      :
                        dockItem.UNREAD_CNT && Number(dockItem.UNREAD_CNT) > 0
                          ?
                            <BadgeDot
                              dot
                              style={{
                                position: 'absolute',
                                left: isExplorer() ? '24px' : '12px',
                              }}
                            />
                          :
                            ''
                  }
                  <img
                    src={dockItem.ICON !== ' ' ? imgUrl.get('160x160', dockItem.ICON) : pageIcon}
                    alt=""
                    style={styleDockImage}
                  />
                    {
                      dockIconType === 'MAX'
                        ?
                          <div className="dockItemName">
                            {lang.get('NAME', dockItem)}
                          </div>
                        :
                          ''
                    }
                </div>
              </a>
            </StyledDockItem>
          </Popover>
        </div>
      ));
    /* eslint-disable */

    // Home 앱인 경우
    // 1. 드래그 앤 드랍 불가
    // 2. 독 고정 / 종료 버튼 삭제
    // 3. 뱃지 아이콘 삭제
    if (dockItem.HOME_YN === 'Y') {
      if (dockIconType === 'MAX') {
        return homeDockItem;
      }
      return (
        <Tooltip title={lang.get('NAME', dockItem)} placement="left">
          {homeDockItem}
        </Tooltip>
      );
    } else {
      if (dockIconType === 'MAX') {
        return commonDockItem;
      }
      return (
        <Tooltip title={lang.get('NAME', dockItem)} placement="left">
          {commonDockItem}
        </Tooltip>
      );
    }
  }
}

DockItem.propTypes = {
  dockItem: PropTypes.object.isRequired,

  // ***내가 만든 속성들***
  connectDragSource: PropTypes.func.isRequired,
  connectDropTarget: PropTypes.func.isRequired,
  execDockItem: PropTypes.func.isRequired,
  exitDockItem: PropTypes.func.isRequired,
  fixDockItem: PropTypes.func.isRequired,
  unfixDockItem: PropTypes.func.isRequired,
  changeIsDockItemDragged: PropTypes.func.isRequired,
  setIsCloseToFalse: PropTypes.func.isRequired,
  setIsCloseToTrue: PropTypes.func.isRequired,
  isClose: PropTypes.bool.isRequired,

  dockItemHeight: PropTypes.string.isRequired,
  execPage: PropTypes.func.isRequired,
  dockSetMyMenuData: PropTypes.func.isRequired,
  dockIconType: PropTypes.string.isRequired,
  view: PropTypes.string.isRequired,
};

const dragHighOrderApp = DragSource('SamplePage', DockItemDragSpec, collectDrag)(DockItem);
export default DropTarget('SamplePage', DockItemDropSpec, collectDrop)(dragHighOrderApp);
