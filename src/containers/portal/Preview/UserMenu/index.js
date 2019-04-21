import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Sidebar from 'react-sidebar';
import { intlObj } from 'utils/commonUtils';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import injectSaga from '../../../../utils/injectSaga';
import injectReducer from '../../../../utils/injectReducer';
import { makeMyAppTree } from './selectors';
import reducer from './reducer';
import saga from './saga';
import { getMyAppTree, saveData } from './actions';
import Tree from './Tree';
import Notification from './Notification';
import ExtraMenus from './ExtraMenus';
import messages from '../../components/Header/messages';

class UserMenu extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false,
    };
  }

  componentWillMount() {
    this.props.getMyAppTree(this.props.BIZGRP_ID);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.visible === false) {
      this.setState({ visible: nextProps.visible });
    }
  }

  onClick = () => {
    this.setState({ visible: !this.state.visible });
  }

  onNoneClick = () => {
    this.setState({ visible: false });
    this.props.setMenuClose();
  }

  onMenuClick = () => {
    this.setState({ visible: false });
  }

  onClickNode = () => {
  }

  onMouseEnter = () => {
    this.setState({ visible: !this.state.visible });
  }

  getNotiList = () => { //eslint-disable-line
    const {
      execMenu,
      execPage,
      myMNotiCnt,
      myHNotiCnt,
      myMNotiList,
      selectedIndex,
      menuName,
      handleSetMenuNameSelectedIndex,
    } = this.props;
    return (
      <div>
        <ExtraMenus>
          <ul className="extraMenusList">
            <li>
              {/* <Link to="" className="storeLink" title={intlObj.get(messages.linkToBizStore)}> */}
                <span className="icon-app" />
              {/* </Link> */}
            </li>
            <li>
              {/* <button className="homeLink" title="포털 메인페이지"> */}
                <span className="icon-home" />
              {/* </button> */}
            </li>
            <li>
              {/* <Link to="/apps/settings" className="settingLink" title="환경세팅">
                <span className="icon-setting" />
              </Link> */}
              {/* <button title="환경세팅"> */}
                <span className="icon-setting" />
              {/* </button> */}
            </li>
          </ul>
        </ExtraMenus>
        <Notification
          myMNotiCnt={myMNotiCnt}
          myMNotiList={myMNotiList}
          myHNotiCnt={myHNotiCnt}
          execPage={execPage}
          execMenu={execMenu}
          onClick={this.onClick}
          onNoneClick={this.onNoneClick}
          visible={this.state.visible}
          onMouseEnter={this.onMouseEnter}
          onMenuClick={this.onMenuClick}
        />
        <Tree
          treeData={this.props.myAppTreeData}
          saveData={this.props.saveData}
          onClick={this.onClickNode}
          execMenu={execMenu}
          execPage={execPage}
          selectedIndex={selectedIndex}
          menuName={menuName}
          handleSetMenuNameSelectedIndex={handleSetMenuNameSelectedIndex}
          setClose={this.props.setClose}
          onMenuClick={this.onMenuClick}
        />
      </div>
    );
  }

  gotoHome = () => {
    const { execPage } = this.props;
    execPage('common');
  }
  render() {
    const sidebarContent = this.getNotiList();
    const styleObj = {
      root: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        overflow: 'hidden',
      },
      sidebar: {
        zIndex: 2,
        position: 'fixed',
        top: 42,
        bottom: 0,
        transition: 'transform .3s ease-out',
        WebkitTransition: '-webkit-transform .3s ease-out',
        willChange: 'transform',
        overflow: 'hidden',
        width: 360,
        paddingLeft: 50,
        backgroundColor: '#FFFFFF',
      },
      content: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        overflowY: 'scroll',
        WebkitOverflowScrolling: 'touch',
        transition: 'left .3s ease-out, right .3s ease-out',
      },
      overlay: {
        zIndex: 1,
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        opacity: 0,
        visibility: 'hidden',
        transition: 'opacity .3s ease-out, visibility .3s ease-out',
        backgroundColor: 'rgba(0,0,0,0)',
        display: 'none',
      },
      dragHandle: {
        zIndex: 1,
        position: 'fixed',
        top: 0,
        bottom: 0,
      },
    };
    const { open } = this.props;
    return (
      <div onMouseLeave={this.onNoneClick} onMouseEnter={this.onMenuClick}>
        {/* <Sidebar
          sidebar={sidebarContent}
          open={open}
          styles={styleObj}
          touch={true}
          shadow={true}
        /> */}
      </div>
    );
  }
}
UserMenu.propTypes = {
  open: PropTypes.bool.isRequired,
  getMyAppTree: PropTypes.func.isRequired,
  myAppTreeData: PropTypes.array.isRequired,
  // myAppTreeDataCashe: PropTypes.array.isRequired,
  execMenu: PropTypes.func.isRequired,
  execPage: PropTypes.func.isRequired,
  myMNotiCnt: PropTypes.array.isRequired,
  myHNotiCnt: PropTypes.number.isRequired,
  myMNotiList: PropTypes.array.isRequired,
  selectedIndex: PropTypes.number.isRequired,
  menuName: PropTypes.string.isRequired,
  handleSetMenuNameSelectedIndex: PropTypes.func.isRequired,
  saveData: PropTypes.func.isRequired,
  visible: PropTypes.bool.isRequired,
  setClose: PropTypes.func.isRequired,
  setMenuClose: PropTypes.func.isRequired,
};
const mapStateToProps = createStructuredSelector({
  myAppTreeData: makeMyAppTree(),
});
export function mapDispatchToProps(dispatch) {
  return {
    getMyAppTree: BIZGRP_ID => dispatch(getMyAppTree(BIZGRP_ID)),
    saveData: (node, treeData) => dispatch(saveData(node, treeData)),
  };
}
const withReducer = injectReducer({ key: 'previewMenu', reducer });
const withSaga = injectSaga({ key: 'previewMenu', saga });
const withConnect = connect(mapStateToProps, mapDispatchToProps);
export default compose(
  withReducer,
  withConnect,
  withSaga,
)(UserMenu);
