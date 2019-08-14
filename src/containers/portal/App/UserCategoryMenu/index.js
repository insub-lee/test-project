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
import WorkTimeLine from '../WorkTimeLine';

class UserCategoryMenu extends Component {
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

  onNoneClick = () => {
    this.setState({ visible: false });
    this.props.setMenuClose();
  };

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
    const { isShow, toggleMenu } = this.props;
    const { showNoti } = this.state;
    const {
      execMenu,
      execPage,
      myMNotiCnt,
      myHNotiCnt,
      myMNotiList,
      selectedIndex,
      menuName,
      handleSetMenuNameSelectedIndex,
      view,
      history,
      execApp,
      setClose,
      myAppStoreTreeData,
      moveNode,
      updateMymenuDisp,
      myAppTreeData,
      saveData,
      profile,
    } = this.props;

    return (
      <Styled className={isShow ? 'active' : ''}>
        <div className="profile-area">
          <Profile profile={profile} />
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
        <div className="divider" />
        <div className="timeline-area">
          <div className="area-title">Timeline</div>
          <WorkTimeLine height="calc(100% - 47px)" />
        </div>
        <div className="active-btn">
          <Button type="default" htmlType="button" icon={`vertical-${isShow ? 'right' : 'left'}`} onClick={toggleMenu} />
        </div>
      </Styled>
    );
  }
}

UserCategoryMenu.propTypes = {
  isShow: PropTypes.bool,
  toggleMenu: PropTypes.func,
  // open: PropTypes.bool.isRequired,
  myAppTreeData: PropTypes.array.isRequired,
  myAppStoreTreeData: PropTypes.array.isRequired,
  // myAppTreeDataCashe: PropTypes.array.isRequired,
  execMenu: PropTypes.func.isRequired,
  execPage: PropTypes.func.isRequired,
  myMNotiCnt: PropTypes.number.isRequired,
  myHNotiCnt: PropTypes.number.isRequired,
  myMNotiList: PropTypes.array.isRequired,
  selectedIndex: PropTypes.number.isRequired,
  menuName: PropTypes.string.isRequired,
  handleSetMenuNameSelectedIndex: PropTypes.func.isRequired,
  saveData: PropTypes.func.isRequired,
  moveNode: PropTypes.func.isRequired,
  updateMymenuDisp: PropTypes.func.isRequired,
  visible: PropTypes.bool.isRequired,
  setClose: PropTypes.func,
  setMenuClose: PropTypes.func.isRequired,
  view: PropTypes.string.isRequired,
  execApp: PropTypes.func,
  history: PropTypes.object.isRequired,
  profile: PropTypes.object,
};

UserCategoryMenu.defaultProps = {
  isShow: false,
  toggleMenu: () => false,
  setClose: undefined,
  execApp: () => {},
  profile: {},
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

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(UserCategoryMenu);
