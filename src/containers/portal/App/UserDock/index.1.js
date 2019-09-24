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
    const { view, dockFixedYn, dockIconType } = this.props;

    if (prevProps.view !== view || prevProps.dockFixedYn !== dockFixedYn || prevProps.dockIconType !== dockIconType) {
      this.setStyleObj();
    }

    // DockItem을 추가했을 경우, 독의 스크롤을 내려주는기능
    if (this.props.dockAppList.length > prevProps.dockAppList.length && this.ReactScrollbar && this.ReactScrollbar.scrollArea.children[1]) {
      this.ReactScrollbar.updateSizeForAddDockItem(this.ReactScrollbar.state.scrollAreaHeight - this.ReactScrollbar.state.scrollWrapperHeight + 70);
    }

    if (this.props.dockAppList !== prevProps.dockAppList && this.props.dockAppList.length > 0) {
      console.log('$$$ different');
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

  setStyleObj = () => {
    const { view, dockFixedYn, dockIconType } = this.props;

    const { styleObj } = this.state;

    const styleObjCopy = Object.assign({}, styleObj);

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
      styleObjCopy.pagingBtnsWidth = '90px';
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
      styleObjCopy.dockDivWidth = '90px';
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
    this.setState({
      isSettingArea: !this.state.isSettingArea,
    });
  };

  getDock = () => {
    const {
      isUnfixDockItem,
      view,
      dockCallbacks,
      dockFixedYn,
      handleSetDockFixedYn,
      appYn,
      dockIconType,
      handleSetDockIconType,
      isClose,
      setIsCloseToTrue,
      setIsCloseToFalse,

      execApp,
    } = this.props;

    const dockItemHeight = dockIconType === 'MAX' ? '70px' : '34px';
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
          isVisible={true}
          dimMode="none"
          size={dockIconType === 'MAX' ? 90 : 42}
          dockFixedYn={dockFixedYn}
          dockIconType={dockIconType}
          appYn={appYn}
          setIsFloattingShowFalse={this.setIsFloattingShowFalse}
          setFloattingClassShow={this.setFloattingClassShow}
          setFloattingClassHidden={this.setFloattingClassHidden}
        >
          {() => {
            const content = [];

            const { execPage, dockAppList } = this.props;

            const myScrollbar = {
              width: '100%',
              height: '100%',
              position: 'relative',
            };

            const { pagingUpClass, pagingDownClass, isDockItemDragged } = this.state;

            if (dockAppList !== undefined && dockAppList.length > 0) {
              for (let i = 0; i < dockAppList.length; i += 1) {
                console.log('$$$ makecontent', content);
                if (dockAppList[i].DOCK_YN === 'Y' || dockAppList[i].EXEC_YN === 'Y') {
                  const dockItemStyleObject = {
                    height: dockItemHeight,
                    width: dockIconType === 'MAX' ? '70px' : '34px',

                    marginTop: '9px',
                    marginRight: 'auto',
                    marginBottom: 'auto',
                    marginLeft: dockIconType === 'MAX' ? '9px' : '4px',
                  };

                  // 홈 앱
                  if (dockAppList[i].HOME_YN === 'Y') {
                    dockItemStyleObject.marginTop = dockIconType === 'MAX' && isDesktopValue ? '9px' : '4px';
                  } else {
                    // 일반 앱
                    dockItemStyleObject.marginTop = isDesktopValue ? '9px' : '4px';
                  }

                  content.push(
                    <DockItem
                      key={i}
                      dockItem={dockAppList[i]}
                      dockItemStyleObject={dockItemStyleObject}
                      dndChangePosition={dockCallbacks.handleDndChangePosition}
                      dndChangePositionSaga={dockCallbacks.handleDndChangePositionSaga}
                      exitDockItem={dockCallbacks.handleExitDockItem}
                      fixDockItem={dockCallbacks.handleFixDockItem}
                      unfixDockItem={dockCallbacks.handleUnfixDockItem}
                      dockSetMyMenuData={dockCallbacks.handleDockSetMyMenuData}
                      execPage={execPage}
                      changeIsDockItemDragged={this.changeIsDockItemDragged}
                      dockIconType={dockIconType}
                      view={view}
                      isClose={isClose[dockAppList[i].DOCK_ID] ? isClose[dockAppList[i].DOCK_ID] : false}
                      setIsCloseToTrue={setIsCloseToTrue}
                      setIsCloseToFalse={setIsCloseToFalse}
                      history={this.props.history}
                      execApp={execApp}
                    />,
                  );
                }
              }
            }
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
                  {content}
                  {position === 'right' ? (
                    <div className="pagingBtns">
                      <button className={`pagingUp ${pagingUpClass}`} onClick={this.scrollUp} />
                      {/* 비활성화 class: disabled */}
                      <button className={`pagingDown ${pagingDownClass}`} onClick={this.scrollDown} />
                      {/* 비활성화 class: disabled */}
                    </div>
                  ) : (
                    ''
                  )}
                  <DragTopArea isDockItemDragged={isDockItemDragged} scrollDownForDnD={this.scrollDownForDnD} position={position} />
                  <DragBottomArea isDockItemDragged={isDockItemDragged} scrollTopForDnD={this.scrollTopForDnD} position={position} />
                  {isDesktop(view) ? (
                    <div style={floattingClass}>
                      <button
                        onClick={() => {
                          this.setIsSettingArea();
                        }}
                        className={isSettingArea ? 'floattingBtn' : 'floattingBtnShow'}
                      />
                    </div>
                  ) : (
                    ''
                  )}
                  {isDesktop(view) ? (
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
                  ) : (
                    ''
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

    const {
      view,
      dockCallbacks,
      dockFixedYn,
      appYn,
      dockIconType,
      isClose,
      setIsCloseToTrue,
      setIsCloseToFalse,
      dockAppList,

      execApp,
    } = this.props;

    const { execPage } = this.props;

    const dockItemHeight = dockIconType === 'MAX' ? '70px' : '34px';

    return (
      <AppWrapper styleObj={styleObj}>
        <Dock
          position="bottom"
          isVisible={true}
          dimMode="none"
          size={dockIconType === 'MAX' ? 90 : 42}
          dockFixedYn={dockFixedYn}
          dockIconType={dockIconType}
          appYn={appYn}
          setIsFloattingShowFalse={this.setIsFloattingShowFalse}
          setFloattingClassShow={this.setFloattingClassShow}
          setFloattingClassHidden={this.setFloattingClassHidden}
        >
          {() => {
            // dockDiv의 넓이 구하기 (dockDiv 넓이 = window의 넓이)
            let dockDivWidth = window.innerWidth; // 375
            const dockItemWidth = 70;
            let half = false;

            // 하나의 dockDiv에 들어갈 dockItem의 개수
            let dockItemNumberInDockDiv = Math.floor(dockDivWidth / dockItemWidth);
            if (dockItemNumberInDockDiv * 10 > dockDivWidth - dockItemWidth * dockItemNumberInDockDiv) {
              dockItemNumberInDockDiv -= 1;
            }
            if (dockAppList.length < dockItemNumberInDockDiv) {
              dockItemNumberInDockDiv = dockAppList.length;
            }

            // 화면 넓이에 비해 독아이템이 너무 적을 때 양쪽 마진값 늘림
            if (dockDivWidth / 2 > dockItemWidth * dockItemNumberInDockDiv) {
              dockDivWidth /= 2;
              half = true;
            }

            const dockItemMargin = (dockDivWidth - dockItemWidth * dockItemNumberInDockDiv) / (dockItemNumberInDockDiv + 1);

            const dockDivArray = [];
            let content = [];
            if (dockAppList !== undefined && dockAppList.length > 0) {
              for (let i = 0; i < dockAppList.length; i += 1) {
                // dockItem Style객체 만들기
                const dockItemStyleObject = {
                  height: dockItemHeight,
                  width: dockIconType === 'MAX' ? '70px' : '34px',

                  marginTop: '9px',
                  marginRight: 'auto',
                  marginBottom: 'auto',
                  marginLeft: 'auto',
                };

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

                content.push(
                  <DockItem
                    key={i}
                    dockItem={dockAppList[i]}
                    dockItemStyleObject={dockItemStyleObject}
                    dndChangePosition={dockCallbacks.handleDndChangePosition}
                    dndChangePositionSaga={dockCallbacks.handleDndChangePositionSaga}
                    execDockItem={dockCallbacks.handleExecDockItem}
                    exitDockItem={dockCallbacks.handleExitDockItem}
                    fixDockItem={dockCallbacks.handleFixDockItem}
                    unfixDockItem={dockCallbacks.handleUnfixDockItem}
                    dockSetMyMenuData={dockCallbacks.handleDockSetMyMenuData}
                    execPage={execPage}
                    changeIsDockItemDragged={this.changeIsDockItemDragged}
                    dockIconType={dockIconType}
                    view={view}
                    isClose={isClose[dockAppList[i].DOCK_ID] ? isClose[dockAppList[i].DOCK_ID] : false}
                    setIsCloseToTrue={setIsCloseToTrue}
                    setIsCloseToFalse={setIsCloseToFalse}
                    history={this.props.history}
                    execApp={execApp}
                  />,
                );

                if ((i + 1) % dockItemNumberInDockDiv === 0 || i === dockAppList.length - 1) {
                  const dockDiv = <div className="dockDiv positionBottom">{content}</div>;
                  dockDivArray.push(dockDiv);
                  content = [];
                }
              }
            }

            return <Carousel>{dockDivArray}</Carousel>;
          }}
        </Dock>
        <Switch>
          <Route exact path="/cube" />
        </Switch>
      </AppWrapper>
    );
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

  execApp: PropTypes.func.isRequired,
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
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(UserDock);
