import React from 'react';
import PropTypes from 'prop-types';
import Sidebar from 'react-sidebar';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import * as routesSelectors from '../../../common/Routes/selectors';
import Menu from './Menu';

class MenuCategory extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false,
      showNoti: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.visible === false) {
      this.setState({ visible: nextProps.visible });
    }
  }

  onNoneClick = () => {
    this.setState({ visible: false });
    this.props.setMenuClose();
  };

  onMenuClick = () => {
    this.setState({ visible: false });
  };

  onMouseEnter = () => {
    this.setState(prevState => ({ visible: !prevState.visible }));
  };

  onClickNotiButton = () => {
    this.setState(prevState => ({ showNoti: !prevState.showNoti }));
  };

  getNotiList = () => {
    const { commonMenuTreeData, execMenu, execPage } = this.props;
    const treeData = commonMenuTreeData.map(data => ({
      ...data,
      icon: 'fa-briefcase',
    }));
    return (
      <div>
        <Menu treeData={treeData} execMenu={execMenu} execPage={execPage} />
      </div>
    );
  };

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
        zIndex: 2000,
        position: 'fixed',
        top: 42,
        bottom: 0,
        transition: 'transform .3s ease-out',
        WebkitTransition: '-webkit-transform .3s ease-out',
        willChange: 'transform',
        overflow: 'hidden',
        overflowY: 'hidden',
        width: 280,
        backgroundImage: '-webkit-gradient(linear,right top, left top,from(rgba(51,148,225,.18)),to(transparent))',
        backgroundColor: '#584475',
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
        backgroundColor: 'transparent',
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
        <Sidebar sidebar={sidebarContent} open={open} styles={styleObj} touch shadow>
          <p style={{ dispaly: 'none' }}>remove children undefined error</p>
        </Sidebar>
      </div>
    );
  }
}

MenuCategory.propTypes = {
  open: PropTypes.bool.isRequired,
  commonMenuTreeData: PropTypes.array.isRequired,
  execMenu: PropTypes.func.isRequired,
  execPage: PropTypes.func.isRequired,
  visible: PropTypes.bool.isRequired,
  setMenuClose: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  commonMenuTreeData: routesSelectors.makeCommonMenuTree(),
});

const withConnect = connect(mapStateToProps);

export default compose(withConnect)(MenuCategory);
