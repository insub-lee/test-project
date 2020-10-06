import React from 'react';
import PropTypes from 'prop-types';
import Sidebar from 'react-sidebar';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import * as routesSelectors from '../../../common/Routes/selectors';
import * as selectors from '../selectors';
import Menu from './Menu';

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
    top: 0,
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
    zIndex: 1999,
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0,
    visibility: 'hidden',
    transition: 'opacity .3s ease-out, visibility .3s ease-out',
    backgroundColor: 'rgba(0,0,0,0)',
    // display: 'none',
  },
  dragHandle: {
    zIndex: 1,
    position: 'fixed',
    top: 0,
    bottom: 0,
  },
};

const getSidebarContent = (commonMenuTreeData, rootPageInfo, execMenu, execPage) => {
  const treeData = commonMenuTreeData.map(data => ({
    ...data,
    icon: 'fa-briefcase',
  }));
  // 공통홈 + 공통메뉴
  if (rootPageInfo.HOME_MENU_ID > 0 && rootPageInfo.label) {
    treeData.unshift({ ...rootPageInfo, icon: 'fa-briefcase' });
  }
  return (
    <div>
      <Menu treeData={treeData} execMenu={execMenu} execPage={execPage} />
    </div>
  );
};

class MenuCategory extends React.Component {
  componentDidMount() {
    const node = document.getElementsByClassName('overlay-closer')[0];
    node.addEventListener('mouseenter', this.handleMenuClose, false);
  }

  componentWillUnmount() {
    const node = document.getElementsByClassName('overlay-closer')[0];
    node.removeEventListener('mouseenter', this.handleMenuClose, false);
  }

  handleMenuClose = () => {
    const { setMenuClose } = this.props;
    setMenuClose();
  };

  render() {
    const { open, commonMenuTreeData, rootPageInfo, execMenu, execPage, children, headerTitle, view, setMyMenuData } = this.props;
    const { PAGE_ID } = setMyMenuData;
    const eshsHomeYn = headerTitle === '환경안전보건 통합시스템' && (view === 'Desktop' || view === 'DesktopNarrow') && PAGE_ID === 401;
    if (eshsHomeYn) {
      styleObj.content.bottom = 55;
    }
    return (
      <div>
        <Sidebar
          sidebar={getSidebarContent(commonMenuTreeData, rootPageInfo, execMenu, execPage)}
          open={open}
          styles={styleObj}
          touch
          shadow
          overlayClassName="overlay-closer"
        >
          {children}
        </Sidebar>
      </div>
    );
  }
}

MenuCategory.propTypes = {
  open: PropTypes.bool.isRequired,
  commonMenuTreeData: PropTypes.array.isRequired,
  rootPageInfo: PropTypes.object,
  execMenu: PropTypes.func.isRequired,
  execPage: PropTypes.func.isRequired,
  setMenuClose: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
  headerTitle: PropTypes.string, // ESHS - 홈 - footer 추가 props
  view: PropTypes.string, // ESHS - 홈 - footer 추가 props
  setMyMenuData: PropTypes.object, // ESHS - 홈 - footer 추가 props
};

MenuCategory.defaultProps = {
  children: null,
  rootPageInfo: {},
  headerTitle: '',
  view: '',
  setMyMenuData: {},
};

const mapStateToProps = createStructuredSelector({
  commonMenuTreeData: routesSelectors.makeCommonMenuTree(),
  rootPageInfo: routesSelectors.makeSelectRootPageInfo(),
  view: selectors.makeSelectView(), // ESHS - 홈 - footer 추가 관련 셀렉터 추가
  setMyMenuData: selectors.makeSelectMyMenuData(), // ESHS - 홈 - footer 추가 관련 셀렉터 추가
  headerTitle: routesSelectors.makeSelectHeaderTitle(), // ESHS - 홈 - footer 추가 관련 셀렉터 추가
});

const withConnect = connect(mapStateToProps);

export default compose(withConnect)(MenuCategory);
