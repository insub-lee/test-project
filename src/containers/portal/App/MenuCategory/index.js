import React from 'react';
import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom';
// import { Table } from 'semantic-ui-react';
import Sidebar from 'react-sidebar';
// import { lang } from 'utils/commonUtils';
// import Scrollbars from 'react-custom-scrollbars';
import { connect } from 'react-redux';
// import Badge from 'components/Badge/StyleBadge';
// import styled from 'styled-components';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import * as routeActions from 'containers/common/Routes/actions';
// import makeMyAppTree from './selectors';
import * as selectors from './selectors';
import Tree from './Tree';
// import Notification from './Notification';
// import ExtraMenus from './ExtraMenus';
// import messages from '../../components/Header/messages';

// const ResultsTableWrapper = styled.div`
//   width: 230px;
//   padding-bottom: 20px;

//   tr {
//     cursor: pointer;

//     td {
//       height: 29px;
//       color: #404040;
//       font-size: 12px;

//       &:first-child {
//         width: 175px;
//         padding-left: 16px;
//       }

//       &:last-child {
//         width: calc(100% - 175px);

//         .ant-badge {
//           display: inline-block;
//           float: right;

//           .ant-badge-count {
//             right: 0;
//             min-width: 15px;
//             height: 16px;
//             font-size: 10px;
//             line-height: 16px;
//             background: #f85023;
//             box-shadow: none;
//           }
//         }
//       }
//     }
//   }
// `;

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

  onClick = () => {
    this.setState({ visible: !this.state.visible });
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
    this.setState({ visible: !this.state.visible });
  };

  onClickNotiButton = () => {
    this.setState({ showNoti: !this.state.showNoti });
  };

  getNotiList = () => {
    //eslint-disable-line
    const {
 execMenu, execPage, myMNotiCnt, selectedIndex, menuName, handleSetMenuNameSelectedIndex, execApp 
} = this.props;

    console.debug('>>>>>>>>>commonMenuTreeData', this.props.commonMenuTreeData);

    return (
      <div>
        <Tree
          treeData={this.props.commonMenuTreeData}
          // saveData={this.props.saveData}
          onClick={this.onClickNode}
          execMenu={execMenu}
          execPage={execPage}
          selectedIndex={selectedIndex}
          menuName={menuName}
          handleSetMenuNameSelectedIndex={handleSetMenuNameSelectedIndex}
          setClose={this.props.setClose}
          onMenuClick={this.onMenuClick}
          showNoti={myMNotiCnt > 0}
          execApp={execApp}
        />
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
        width: 360,
        // paddingLeft: 50,
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

    console.debug('>>>>>>>sidebarContent: ', sidebarContent);
    console.debug('>>>>>>>this.props >>>>>>>>>>>.: ', this.props);
    return (
      <div onMouseLeave={this.onNoneClick} onMouseEnter={this.onMenuClick}>
        <Sidebar sidebar={sidebarContent} open={open} styles={styleObj} touch={true} shadow={true}>
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
  myMNotiCnt: PropTypes.number.isRequired,
  myHNotiCnt: PropTypes.number.isRequired,
  myMNotiList: PropTypes.array.isRequired,
  selectedIndex: PropTypes.number.isRequired,
  menuName: PropTypes.string.isRequired,
  handleSetMenuNameSelectedIndex: PropTypes.func.isRequired,
  visible: PropTypes.bool.isRequired,
  setClose: PropTypes.func,
  setMenuClose: PropTypes.func.isRequired,
  view: PropTypes.string.isRequired,

  execApp: PropTypes.func,
};

MenuCategory.defaultProps = {
  setClose: undefined,
  execApp: () => {},
};

const mapStateToProps = createStructuredSelector({
  commonMenuTreeData: selectors.makeCommonMenuTree(),
});

export function mapDispatchToProps(dispatch) {
  return {
    // RoutesAction의 디스패쳐
    moveNode: treeData => dispatch(routeActions.moveNode(treeData)),
    updateMymenuDisp: node => dispatch(routeActions.updateMymenuDisp(node)),
  };
}
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);
export default compose(withConnect)(MenuCategory);
