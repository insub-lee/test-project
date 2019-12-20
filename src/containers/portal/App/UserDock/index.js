import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { isDesktop } from 'utils/commonUtils';
import { Switch, Route } from 'react-router-dom';
import Carousel from 're-carousel';

import dockBigIconActive from 'images/portal/dock_big_active.png';
import dockBigIcon from 'images/portal/dock_big_icon.png';
import dockSmallIconActive from 'images/portal/dock_small_active.png';
import dockSmallIcon from 'images/portal/dock_small_icon.png';
import dockLock from 'images/portal/dock_lock.png';
import dockLockActive from 'images/portal/dock_lock_active.png';
import dockUnlock from 'images/portal/dock_unlock.png';
import dockUnlockActive from 'images/portal/dock_unlock_active.png';
import dockAutoActive from 'images/portal/dock_auto_active.png';
import dockAutoHidden from 'images/portal/dock_auto_hidden.png';

import ReactScrollbar from './ReactScrollbar';

import Dock from './Dock/Dock';
import DockItem from './DockItem';
import { makeSelectView } from './selectors';
import './ReactScrollbar/style_default.css';
import DragTopArea from './DragTopArea';
import DragBottomArea from './DragBottomArea';
import AppWrapper from './AppWrapper';

class UserDock extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      pos: 0,
      pagingUpClass: '',
      pagingDownClass: '',
      prevPaging: false,
      isDockItemDragged: false,
      floattingClass: {
        position: 'fixed',
        bottom: '20px',
        right: '-20%',
      },
      dockItemList: [],
      dockDivArray: [],
      // 독의 세팅버튼 클릭 여부
      isSettingArea: false,

      styleObj: {
        floattingSettingAreaBottom: '20px',
        dockDivWidth: '90px',
        dockDivOverflowX: 'hidden',
        pagingBtnsWidth: '90px',
        pagingBtnsHeight: '20px',
        pagingUpWidth: '50%',
        pagingDownWidth: '50%',
        floattingSettingAreaShowWidth: '90px',
        floattingSettingAreaWidth: '90px',
        floattingSettingAreaTopTextAlign: 'left',
        settingMenuNameColor: '#f85023',
        settingMenuNameSmallIconColor: '#f85023',
        settingMenuNameFixedColor: '#f85023',
        settingMenuNameUnfixedColor: '#f85023',
        settingMenuNameAutoColor: '#f85023',
      },
    };
  }

  componentDidMount() {
    window.addEventListener('resize', this.windowResizeScrollbar);
    this.setStyleObj();
  }

  componentDidUpdate(prevProps) {
    const { view, dockFixedYn, dockIconType, dockCallbacks, dockAppList } = this.props;

    if (prevProps.view !== view || prevProps.dockFixedYn !== dockFixedYn || prevProps.dockIconType !== dockIconType) {
      this.setStyleObj();
    }

    // DockItem을 추가했을 경우, 독의 스크롤을 내려주는 기능
    if (this.props.dockAppList.length > prevProps.dockAppList.length && this.ReactScrollbar && this.ReactScrollbar.scrollArea.children[1]) {
      this.ReactScrollbar.updateSizeForAddDockItem(this.ReactScrollbar.state.scrollAreaHeight - this.ReactScrollbar.state.scrollWrapperHeight + 70);
    }

    if (
      (this.props.dockAppList !== prevProps.dockAppList && this.props.dockAppList.length > 0) ||
      this.props.dockIconType !== prevProps.dockIconType ||
      this.props.view !== prevProps.view
    ) {
      /*
        dockAppList에 변화가 있을 때마다 dockItemList는 새로 생성된다 (새로운 객체)
        그런데 dockItemList 내부에 들어가는 <DockItem> 컴포넌트의 경우, 코드상에는 새로 생성되는 것 처럼 보이지만,
        실제로 <DockItem> 컴포넌트의 생성자는 호출되지 않고 render()만 호출된다..............
      */

      switch (isDesktop(view)) {
        case true: {
          // 데스크탑일 경우
          const dockItemList = this.props.dockAppList.map(o => {
            const dockItemStyleObject = this.makeDockItemStyleObject(o);
            return (
              <DockItem
                key={o.DOCK_ID}
                dockItem={o}
                dockItemStyleObject={dockItemStyleObject}
                dndChangePosition={dockCallbacks.handleDndChangePosition}
                dndChangePositionSaga={dockCallbacks.handleDndChangePositionSaga}
                exitDockItem={dockCallbacks.handleExitDockItem}
                fixDockItem={dockCallbacks.handleFixDockItem}
                unfixDockItem={dockCallbacks.handleUnfixDockItem}
                dockSetMyMenuData={dockCallbacks.handleDockSetMyMenuData}
                execPage={this.props.execPage}
                changeIsDockItemDragged={this.changeIsDockItemDragged}
                dockIconType={dockIconType}
                view={view}
                isClose={this.props.isClose[o.DOCK_ID] ? this.props.isClose[o.DOCK_ID] : false}
                setIsCloseToTrue={this.props.setIsCloseToTrue}
                setIsCloseToFalse={this.props.setIsCloseToFalse}
                history={this.props.history}
              />
            );
          });
          this.setDockItemList(dockItemList);
          break;
        }
        default: {
          // 모바일, 태블릿

          const dockItemWidth = 70;
          const dockDivArray = [];
          // 하나의 dockDiv에 들어갈 dockItem의 개수
          let dockItemNumberInDockDiv = Math.floor(window.innerWidth / dockItemWidth);
          if (dockItemNumberInDockDiv * 10 > window.innerWidth - dockItemWidth * dockItemNumberInDockDiv) {
            dockItemNumberInDockDiv -= 1;
          }
          if (dockAppList.length < dockItemNumberInDockDiv) {
            dockItemNumberInDockDiv = dockAppList.length;
          }

          let content = [];
          this.props.dockAppList.forEach((o, i, arr) => {
            const dockItemStyleObject = this.makeDockItemStyleObject(o, i, arr, dockItemNumberInDockDiv);
            content.push(
              <DockItem
                key={o.DOCK_ID}
                dockItem={o}
                dockItemStyleObject={dockItemStyleObject}
                dndChangePosition={dockCallbacks.handleDndChangePosition}
                dndChangePositionSaga={dockCallbacks.handleDndChangePositionSaga}
                exitDockItem={dockCallbacks.handleExitDockItem}
                fixDockItem={dockCallbacks.handleFixDockItem}
                unfixDockItem={dockCallbacks.handleUnfixDockItem}
                dockSetMyMenuData={dockCallbacks.handleDockSetMyMenuData}
                execPage={this.props.execPage}
                changeIsDockItemDragged={this.changeIsDockItemDragged}
                dockIconType={dockIconType}
                view={view}
                isClose={this.props.isClose[o.DOCK_ID] ? this.props.isClose[o.DOCK_ID] : false}
                setIsCloseToTrue={this.props.setIsCloseToTrue}
                setIsCloseToFalse={this.props.setIsCloseToFalse}
                history={this.props.history}
              />,
            );
            if ((i + 1) % dockItemNumberInDockDiv === 0 || i === dockAppList.length - 1) {
              const dockDiv = <div className="dockDiv positionBottom">{content}</div>;
              dockDivArray.push(dockDiv);
              content = [];
            }
          });
          this.setDockDivArray(dockDivArray);
          break;
        }
      }
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.windowResizeScrollbar);
  }

  onDragDockVerticalScrollbar = top => {
    this.setState({
      pos: top,
    });
  };

  setDockDivArray = dockDivArray => {
    this.setState({
      dockDivArray,
    });
  };

  setDockItemList = dockItemList => {
    this.setState({
      dockItemList,
    });
  };

  setStyleObj = () => {
    const { view, dockFixedYn, dockIconType } = this.props;

    const { styleObj } = this.state;

    const styleObjCopy = {
      ...styleObj,
    };

    if (dockIconType === 'MIN') {
      styleObjCopy.floattingSettingAreaBottom = '40px';
      styleObjCopy.pagingBtnsWidth = '45px';
      styleObjCopy.pagingBtnsHeight = '40px';
      styleObjCopy.pagingUpWidth = '100%';
      styleObjCopy.pagingDownWidth = '100%';
      styleObjCopy.floattingSettingAreaShowWidth = '42px';
      styleObjCopy.floattingSettingAreaWidth = '42px';
      styleObjCopy.floattingSettingAreaTopTextAlign = 'center';
      styleObjCopy.settingMenuNameColor = '#aeaeae';
      styleObjCopy.settingMenuNameSmallIconColor = '#f85023';
    } else {
      styleObjCopy.floattingSettingAreaBottom = '20px';
      styleObjCopy.pagingBtnsWidth = '70px';
      styleObjCopy.pagingBtnsHeight = '20px';
      styleObjCopy.pagingUpWidth = '50%';
      styleObjCopy.pagingDownWidth = '50%';
      styleObjCopy.floattingSettingAreaShowWidth = '90px';
      styleObjCopy.floattingSettingAreaWidth = '90px';
      styleObjCopy.floattingSettingAreaTopTextAlign = 'left';
      styleObjCopy.settingMenuNameColor = '#f85023';
      styleObjCopy.settingMenuNameSmallIconColor = '#aeaeae';
    }

    if (isDesktop(view)) {
      styleObjCopy.dockDivOverflowX = 'hidden';
    } else {
      styleObjCopy.dockDivOverflowX = 'auto';
    }

    if (!isDesktop(view)) {
      styleObjCopy.dockDivWidth = '100%';
    } else if (dockIconType === 'MAX') {
      styleObjCopy.dockDivWidth = '70px';
    } else {
      styleObjCopy.dockDivWidth = '42px';
    }

    if (dockFixedYn === 'Y') {
      styleObjCopy.settingMenuNameFixedColor = '#f85023';
      styleObjCopy.settingMenuNameUnfixedColor = '#aeaeae';
      styleObjCopy.settingMenuNameAutoColor = '#aeaeae';
    } else if (dockFixedYn === 'N') {
      styleObjCopy.settingMenuNameFixedColor = '#aeaeae';
      styleObjCopy.settingMenuNameUnfixedColor = '#f85023';
      styleObjCopy.settingMenuNameAutoColor = '#aeaeae';
    } else {
      styleObjCopy.settingMenuNameFixedColor = '#aeaeae';
      styleObjCopy.settingMenuNameUnfixedColor = '#aeaeae';
      styleObjCopy.settingMenuNameAutoColor = '#f85023';
    }

    this.setState({
      styleObj: styleObjCopy,
    });
  };

  setFloattingClassHidden = () => {
    const { dockIconType } = this.props;

    this.setState({
      floattingClass: {
        position: 'fixed',
        bottom: dockIconType === 'MAX' ? '20px' : '40px',
        right: '-20%',
        transitionProperty: 'right',
        transitionDuration: '0.2s',
      },
    });
  };

  setFloattingClassShow = () => {
    const { dockIconType } = this.props;

    this.setState({
      floattingClass: {
        position: 'fixed',
        bottom: dockIconType === 'MAX' ? '20px' : '40px',
        right: 0,
        transitionProperty: 'right',
        transitionDuration: '0.2s',
        zIndex: 12,
      },
    });
  };

  // 독 설정 영역 표시 이벤트
  setIsSettingArea = () => {
    this.setState(prevState => ({
      isSettingArea: !prevState.isSettingArea,
    }));
  };

  getDock = () => {
    const { isUnfixDockItem, view, dockCallbacks, dockFixedYn, handleSetDockFixedYn, appYn, dockIconType, handleSetDockIconType } = this.props;

    const dockItemHeightWithoutPx = dockIconType === 'MAX' ? 70 : 34;

    const { floattingClass, isSettingArea, styleObj } = this.state;

    if (isUnfixDockItem) {
      this.ReactScrollbar.setTop(dockItemHeightWithoutPx);
      dockCallbacks.handleSetIsUnfixDockItem();
    }

    const isDesktopValue = isDesktop(view);
    const dockDivClass = 'positionRight';
    const position = 'right';

    return (
      <AppWrapper styleObj={styleObj}>
        <Dock
          position="right"
          isVisible
          dimMode="none"
          size={dockIconType === 'MAX' ? 70 : 42}
          dockFixedYn={dockFixedYn}
          dockIconType={dockIconType}
          appYn={appYn}
          setIsFloattingShowFalse={this.setIsFloattingShowFalse}
          setFloattingClassShow={this.setFloattingClassShow}
          setFloattingClassHidden={this.setFloattingClassHidden}
        >
          {() => {
            const myScrollbar = {
              width: '100%',
              height: '100%',
              position: 'relative',
            };

            const { pagingUpClass, pagingDownClass, isDockItemDragged } = this.state;

            return (
              <ReactScrollbar
                style={myScrollbar}
                ref={c => {
                  this.ReactScrollbar = c;
                }}
                onDragDockVerticalScrollbar={this.onDragDockVerticalScrollbar}
                makeDisabledPaging={this.makeDisabledPaging}
                isDesktop={isDesktopValue}
              >
                <div className={`dockDiv ${dockDivClass}`}>
                  {this.state.dockItemList}
                  {position === 'right' && (
                    <div className="pagingBtns">
                      <button type="button" className={`pagingUp ${pagingUpClass}`} onClick={this.scrollUp} />
                      {/* 비활성화 class: disabled */}
                      <button type="button" className={`pagingDown ${pagingDownClass}`} onClick={this.scrollDown} />
                      {/* 비활성화 class: disabled */}
                    </div>
                  )}
                  <DragTopArea isDockItemDragged={isDockItemDragged} scrollDownForDnD={this.scrollDownForDnD} position={position} />
                  <DragBottomArea isDockItemDragged={isDockItemDragged} scrollTopForDnD={this.scrollTopForDnD} position={position} />
                  {isDesktop(view) && (
                    <div style={floattingClass}>
                      <button
                        type="button"
                        onClick={() => {
                          this.setIsSettingArea();
                        }}
                        className={isSettingArea ? 'floattingBtn' : 'floattingBtnShow'}
                      />
                    </div>
                  )}
                  {isDesktop(view) && (
                    <div
                      className={isSettingArea ? 'floattingSettingAreaShow' : 'floattingSettingArea'}
                      onMouseLeave={() => {
                        this.setIsSettingArea();
                      }}
                    >
                      <div className="floattingSettingAreaTop">
                        <div
                          className="settingMenuList"
                          onClick={() => {
                            handleSetDockIconType('MAX');
                          }}
                          onKeyPress={() => {}}
                          role="button"
                          tabIndex="0"
                        >
                          <img src={dockIconType === 'MAX' ? dockBigIconActive : dockBigIcon} alt="큰 아이콘" />
                          {dockIconType === 'MAX' ? <span className="settingMenuName">큰 아이콘</span> : ''}
                        </div>
                        <div
                          className="settingMenuList"
                          onClick={() => {
                            handleSetDockIconType('MIN');
                          }}
                          onKeyPress={() => {}}
                          role="button"
                          tabIndex="0"
                        >
                          <img src={dockIconType === 'MIN' ? dockSmallIconActive : dockSmallIcon} alt="작은 아이콘" />
                          {dockIconType === 'MAX' ? <span className="settingMenuNameSmallIcon">작은 아이콘</span> : ''}
                        </div>
                      </div>

                      <div
                        className="myHorizontal"
                        style={{
                          width: dockIconType === 'MAX' ? ' 76px' : '28px',
                        }}
                      />

                      <div className="floattingSettingAreaTop">
                        <div
                          className="settingMenuList"
                          onClick={() => {
                            handleSetDockFixedYn('Y');
                          }}
                          onKeyPress={() => {}}
                          role="button"
                          tabIndex="0"
                        >
                          <img src={dockFixedYn === 'Y' ? dockLockActive : dockLock} alt="고정" />
                          {dockIconType === 'MAX' ? <span className="settingMenuNameFixed">고정</span> : ''}
                        </div>
                        <div
                          className="settingMenuList"
                          onClick={() => {
                            handleSetDockFixedYn('N');
                          }}
                          onKeyPress={() => {}}
                          role="button"
                          tabIndex="0"
                        >
                          <img src={dockFixedYn === 'N' ? dockUnlockActive : dockUnlock} alt="고정 해제" />
                          {dockIconType === 'MAX' ? <span className="settingMenuNameUnfixed">고정 해제</span> : ''}
                        </div>
                        <div
                          className="settingMenuList"
                          onClick={() => {
                            handleSetDockFixedYn('A');
                          }}
                          onKeyPress={() => {}}
                          role="button"
                          tabIndex="0"
                        >
                          <img src={dockFixedYn === 'A' ? dockAutoActive : dockAutoHidden} alt="자동 숨김" />
                          {dockIconType === 'MAX' ? <span className="settingMenuNameAuto">자동 숨김</span> : ''}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </ReactScrollbar>
            );
          }}
        </Dock>
        <Switch>
          <Route exact path="/cube" />
        </Switch>
      </AppWrapper>
    );
  };

  getMobileDock = () => {
    const { styleObj } = this.state;

    const { dockFixedYn, appYn, dockIconType } = this.props;

    return (
      <AppWrapper styleObj={styleObj}>
        <Dock
          position="bottom"
          isVisible
          dimMode="none"
          size={dockIconType === 'MAX' ? 90 : 42}
          dockFixedYn={dockFixedYn}
          dockIconType={dockIconType}
          appYn={appYn}
          setIsFloattingShowFalse={this.setIsFloattingShowFalse}
          setFloattingClassShow={this.setFloattingClassShow}
          setFloattingClassHidden={this.setFloattingClassHidden}
        >
          {() => <Carousel>{this.state.dockDivArray}</Carousel>}
        </Dock>
        <Switch>
          <Route exact path="/cube" />
        </Switch>
      </AppWrapper>
    );
  };

  // dockItemStyleObject 생성 작업
  makeDockItemStyleObject = (dockItem, i, arr, dockItemNumberInDockDiv) => {
    const { dockIconType, dockAppList } = this.props;
    const dockItemHeight = dockIconType === 'MAX' ? '70px' : '34px';
    const dockItemStyleObject = {
      height: dockItemHeight,
      width: dockIconType === 'MAX' ? '70px' : '34px',

      marginTop: '10px',
      marginRight: 'auto',
      marginBottom: 'auto',
      // marginLeft: dockIconType === 'MAX' ? '9px' : '4px',
    };
    if (isDesktop(this.props.view)) {
      // 홈 앱
      if (dockItem.HOME_YN === 'Y') {
        dockItemStyleObject.marginTop = dockIconType === 'MAX' ? '9px' : '4px';
      }
    } else {
      dockItemStyleObject.marginLeft = 'auto';
      dockItemStyleObject.marginTop = '4px';

      // dockDiv의 넓이 구하기 (dockDiv 넓이 = window의 넓이)
      let dockDivWidth = window.innerWidth; // 375
      const dockItemWidth = 70;
      let half = false;

      // 화면 넓이에 비해 독아이템이 너무 적을 때 양쪽 마진값 늘림
      if (dockDivWidth / 2 > dockItemWidth * dockItemNumberInDockDiv) {
        dockDivWidth /= 2;
        half = true;
      }

      const dockItemMargin = (dockDivWidth - dockItemWidth * dockItemNumberInDockDiv) / (dockItemNumberInDockDiv + 1);

      // 처음 앱
      if (i % dockItemNumberInDockDiv === 0) {
        dockItemStyleObject.marginLeft = half ? `${dockItemMargin + dockDivWidth / 2}px` : `${dockItemMargin}px`;
        dockItemStyleObject.marginRight = `${dockItemMargin / 2}px`;
      } else if ((i + 1) % dockItemNumberInDockDiv === 0 || i === dockAppList.length - 1) {
        // 마지막 앱
        dockItemStyleObject.marginLeft = `${dockItemMargin / 2}px`;
        dockItemStyleObject.marginRight = half ? `${dockItemMargin + dockDivWidth / 2}px` : `${dockItemMargin}px`;
      } else {
        dockItemStyleObject.marginLeft = `${dockItemMargin / 2}px`;
        dockItemStyleObject.marginRight = `${dockItemMargin / 2}px`;
      }
    }

    return dockItemStyleObject;
  };

  scrollUp = () => {
    const pos = this.ReactScrollbar.state.top - (window.innerHeight - 90 - 32);
    if (pos >= 0) {
      this.ReactScrollbar.scrollToY(pos);
    } else {
      this.ReactScrollbar.scrollToY(0);
    }
  };

  scrollDown = () => {
    const pos = this.ReactScrollbar.state.top + (window.innerHeight - 90 - 32);
    this.ReactScrollbar.scrollToY(pos);
  };

  scrollDownForDnD = () => {
    const pos = this.ReactScrollbar.state.top - 3;

    if (pos < 0) {
      return;
    }
    this.ReactScrollbar.scrollToY(pos);
  };

  scrollTopForDnD = () => {
    const pos = this.ReactScrollbar.state.top + 3;

    if (pos > window.innerHeight - 90 - 32) {
      return;
    }
    this.ReactScrollbar.scrollToY(pos);
  };

  makeDisabledPaging = (direction, param, pagingBtn = false) => {
    if (this.state.prevPaging !== param || pagingBtn) {
      switch (direction) {
        case 'UP': {
          if (param) {
            this.setState({
              pagingUpClass: 'disabled',
              pagingDownClass: '',
              prevPaging: param,
            });
          } else {
            this.setState({
              pagingUpClass: '',
              pagingDownClass: '',
              prevPaging: param,
            });
          }
          break;
        }
        case 'DOWN': {
          if (param) {
            this.setState({
              pagingDownClass: 'disabled',
              pagingUpClass: '',
              prevPaging: param,
            });
          }
          break;
        }
        default:
      }
    }
  };

  changeIsDockItemDragged = () => {
    const { isDockItemDragged } = this.state;
    if (!isDockItemDragged) {
      this.setState({
        isDockItemDragged: true,
      });
    } else {
      this.setState({
        isDockItemDragged: false,
      });
    }
  };

  windowResizeScrollbar = () => {
    const { view } = this.props;

    if (isDesktop(view)) {
      this.ReactScrollbar.scrollToY(this.state.pos);
    }
  };

  render() {
    const { view } = this.props;

    if (isDesktop(view)) {
      return this.getDock();
    }

    return this.getMobileDock();
  }
}
UserDock.propTypes = {
  dockAppList: PropTypes.arrayOf(PropTypes.object).isRequired,
  isUnfixDockItem: PropTypes.bool.isRequired,
  // setMyMenuNodeData: PropTypes.object,
  dockCallbacks: PropTypes.object.isRequired,

  execPage: PropTypes.func.isRequired,
  view: PropTypes.string.isRequired,
  isClose: PropTypes.object.isRequired,
  setIsCloseToTrue: PropTypes.func.isRequired,
  setIsCloseToFalse: PropTypes.func.isRequired,

  // Dock 고정 여부
  dockFixedYn: PropTypes.string,
  handleSetDockFixedYn: PropTypes.func.isRequired,
  dockIconType: PropTypes.string,
  handleSetDockIconType: PropTypes.func.isRequired,

  // 현재 실행되고있는 앱의 단일 앱 여부
  appYn: PropTypes.string,

  history: PropTypes.object.isRequired,
};

UserDock.defaultProps = {
  appYn: 'N',
  dockFixedYn: undefined,
  dockIconType: undefined,
  // setMyMenuNodeData: undefined,
};

const mapStateToProps = createStructuredSelector({
  view: makeSelectView(),
});
const mapDispatchToProps = () => ({});
const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(UserDock);
