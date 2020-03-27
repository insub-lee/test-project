import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import Profile from 'components/Profile';
import * as routeSelectors from 'containers/common/Routes/selectors';
import * as routeActions from 'containers/common/Routes/actions';
import * as authSelectors from 'containers/common/Auth/selectors';

import Styled from './Styled';
import Tree from './Tree';
// import WorkTimeLine from '../WorkTimeLine';

class UserCategoryMenuBak extends Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false,
      showNoti: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    const { visible } = nextProps;
    if (!visible) this.setState({ visible });
  }

  onClick = () => {
    this.setState(prevState => ({ visible: !prevState.visible }));
  };

  // onNoneClick = () => {
  //   this.setState({ visible: false });
  //   this.props.setMenuClose();
  // };

  onMenuClick = () => {
    this.setState({ visible: false });
  };

  onClickNode = () => {};

  onMouseEnter = () => {
    this.setState(prevState => ({ visible: !prevState.visible }));
  };

  onClickNotiButton = () => {
    this.setState(prevState => ({ showNoti: !prevState.showNoti }));
  };

  render() {
    const { isShow, setMenuClose } = this.props;
    // const { showNoti } = this.state;
    const {
      execMenu,
      execPage,
      myMNotiCnt,
      // myHNotiCnt,
      // myMNotiList,
      selectedIndex,
      menuName,
      handleSetMenuNameSelectedIndex,
      // view,
      history,
      execApp,
      setClose,
      setOpen,
      setFixedOpenMenu,
      myAppStoreTreeData,
      moveNode,
      updateMymenuDisp,
      myAppTreeData,
      saveData,
      profile,
      fixedMenu,
    } = this.props;

    return (
      <Styled className={isShow ? 'active' : ''} onMouseLeave={setMenuClose}>
        <div className="profile-area">
          <Profile profile={profile} setFixedOpenMenu={setFixedOpenMenu} fixedMenu={fixedMenu} />
        </div>
        <div className="category-menu-area">
          <div className="area-title">{profile.DEPT_NAME_KOR}</div>
          <Tree
            treeData={myAppTreeData}
            saveData={saveData}
            editMenu={this.onSetEditClick}
            onClick={this.onClickNode}
            execMenu={execMenu}
            execPage={execPage}
            selectedIndex={selectedIndex}
            menuName={menuName}
            handleSetMenuNameSelectedIndex={handleSetMenuNameSelectedIndex}
            setClose={setClose}
            onMenuClick={this.onMenuClick}
            showNoti={myMNotiCnt > 0}
            myAppStoreTreeData={myAppStoreTreeData}
            moveNode={moveNode}
            updateMymenuDisp={updateMymenuDisp}
            execApp={execApp}
            history={history}
          />
        </div>
        {/* timeline 기획 확정 후 진행 - 2019.10.06 */}
        {/* <div className="divider" />
        <div className="timeline-area">
          <div className="area-title">Timeline</div>
          <WorkTimeLine height="calc(100% - 47px)" />
        </div> */}
        {!isShow && (
          <div className="active-btn">
            {/* <Button type="default" htmlType="button" icon={`vertical-${isShow ? 'right' : 'left'}`} onClick={toggleMenu} /> */}
            <Button type="default" htmlType="button" icon={`vertical-${isShow ? 'right' : 'left'}`} onMouseOver={setOpen} onFocus={() => {}} />
          </div>
        )}
      </Styled>
    );
  }
}

UserCategoryMenuBak.propTypes = {
  isShow: PropTypes.bool,
  // toggleMenu: PropTypes.func,
  // open: PropTypes.bool.isRequired,
  myAppTreeData: PropTypes.array.isRequired,
  myAppStoreTreeData: PropTypes.array.isRequired,
  // myAppTreeDataCashe: PropTypes.array.isRequired,
  execMenu: PropTypes.func.isRequired,
  execPage: PropTypes.func.isRequired,
  myMNotiCnt: PropTypes.number.isRequired,
  // myHNotiCnt: PropTypes.number.isRequired,
  // myMNotiList: PropTypes.array.isRequired,
  selectedIndex: PropTypes.number.isRequired,
  menuName: PropTypes.string.isRequired,
  handleSetMenuNameSelectedIndex: PropTypes.func.isRequired,
  saveData: PropTypes.func.isRequired,
  moveNode: PropTypes.func.isRequired,
  updateMymenuDisp: PropTypes.func.isRequired,
  visible: PropTypes.bool.isRequired,
  setClose: PropTypes.func,
  setMenuClose: PropTypes.func,
  // view: PropTypes.string.isRequired,
  execApp: PropTypes.func,
  history: PropTypes.object.isRequired,
  profile: PropTypes.object,
  setOpen: PropTypes.func.isRequired,
  setFixedOpenMenu: PropTypes.func.isRequired,
  fixedMenu: PropTypes.bool.isRequired,
};

UserCategoryMenuBak.defaultProps = {
  isShow: false,
  // toggleMenu: () => false,
  setClose: undefined,
  execApp: () => {},
  profile: {},
  setMenuClose: () => {},
};

const mapStateToProps = createStructuredSelector({
  myAppTreeData: routeSelectors.makeMyAppTree(),
  myAppStoreTreeData: routeSelectors.makeMyAppStoreTree(),
  profile: authSelectors.makeSelectProfile(),
});
const mapDispatchToProps = dispatch => ({
  saveData: (node, treeData) => dispatch(routeActions.saveData(node, treeData)),
  moveNode: treeData => dispatch(routeActions.moveNode(treeData)),
  updateMymenuDisp: node => dispatch(routeActions.updateMymenuDisp(node)),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(UserCategoryMenuBak);
