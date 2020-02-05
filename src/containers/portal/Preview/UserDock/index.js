import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { isDesktop } from 'utils/commonUtils';
// import { Switch, Route } from 'react-router-dom';

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

    this.makeDisabledPaging = this.makeDisabledPaging.bind(this);
    this.windowResizeScrollbar = this.windowResizeScrollbar.bind(this);
    this.changeIsDockItemDragged = this.changeIsDockItemDragged.bind(this);
    this.scrollDownForDnD = this.scrollDownForDnD.bind(this);
  }

  componentDidMount() {
    window.addEventListener('resize', this.windowResizeScrollbar);
    this.setStyleObj();
  }

  componentWillReceiveProps(nextProps) {
    const { execPage, setMyMenuNodeData } = this.props;
    if (setMyMenuNodeData !== nextProps.setMyMenuNodeData) {
      execPage(nextProps.setMyMenuNodeData);
    }
  }

  componentDidUpdate(prevProps) {
    const { view, dockFixedYn, dockIconType } = this.props;

    if (prevProps.view !== view || prevProps.dockFixedYn !== dockFixedYn || prevProps.dockIconType !== dockIconType) {
      this.setStyleObj();
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

    const styleObjCopy = { ...styleObj };

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
      },
    });
  };

  setIsSettingArea = () => {
    this.setState({
      isSettingArea: !this.state.isSettingArea,
    });
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
    this.ReactScrollbar.scrollToY(this.state.pos);
  };

  render() {
    const isVisible = true;
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
    } = this.props;

    const dockItemHeight = dockIconType === 'MAX' ? '70px' : '34px';

    const { floattingClass, isSettingArea, styleObj } = this.state;

    if (isUnfixDockItem) {
      this.ReactScrollbar.setTop(dockItemHeight);
      dockCallbacks.setIsUnfixDockItem();
    }

    let position = '';
    let dockDivClass = '';

    if (isDesktop(view)) {
      position = 'right';
      dockDivClass = 'positionRight';
    } else {
      position = 'bottom';
      dockDivClass = 'positionBottom';
    }

    return (
      <AppWrapper styleObj={styleObj} visible={false}>
        <Dock
          position={position}
          isVisible={isVisible}
          dimMode="none"
          dockFixedYn={dockFixedYn}
          setIsFloattingShowFalse={this.setIsFloattingShowFalse}
          setFloattingClassShow={this.setFloattingClassShow}
          setFloattingClassHidden={this.setFloattingClassHidden}
          appYn={appYn}
          dockIconType={dockIconType}
          size={dockIconType === 'MAX' ? 90 : 42}
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
                if (dockAppList[i].DOCK_YN === 'Y' || dockAppList[i].EXEC_YN === 'Y') {
                  content.push(
                    <DockItem
                      key={i}
                      dockItem={dockAppList[i]}
                      dockItemHeight={dockItemHeight}
                      dndChangePosition={dockCallbacks.onDndChangePosition}
                      dndChangePositionSaga={dockCallbacks.onDndChangePositionSaga}
                      execDockItem={dockCallbacks.onExecDockItem}
                      exitDockItem={dockCallbacks.onExitDockItem}
                      fixDockItem={dockCallbacks.onFixDockItem}
                      unfixDockItem={dockCallbacks.onUnfixDockItem}
                      dockSetMyMenuData={dockCallbacks.onDockSetMyMenuData}
                      execPage={execPage}
                      changeIsDockItemDragged={this.changeIsDockItemDragged}
                      dockIconType={dockIconType}
                      view={view}
                      isClose={isClose[dockAppList[i].DOCK_ID] ? isClose[dockAppList[i].DOCK_ID] : false}
                      setIsCloseToTrue={setIsCloseToTrue}
                      setIsCloseToFalse={setIsCloseToFalse}
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
                        // onClick={() => { handleSetDockFixedYn(dockFixedYn === 'Y' ? 'N' : 'Y'); }}
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
        {/* <Switch> */}
        {/*  <Route exact path="/cube" /> */}
        {/* </Switch> */}
      </AppWrapper>
    );
  }
}
UserDock.propTypes = {
  dockAppList: PropTypes.arrayOf(PropTypes.object).isRequired,
  isUnfixDockItem: PropTypes.bool.isRequired,
  setMyMenuNodeData: PropTypes.object,
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
};

UserDock.defaultProps = {
  appYn: 'N',
  dockFixedYn: undefined,
  dockIconType: undefined,
  setMyMenuNodeData: undefined,
};

const mapStateToProps = createStructuredSelector({
  view: makeSelectView(),
});
const mapDispatchToProps = () => ({});
const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(UserDock);
