import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Table } from 'semantic-ui-react';
import Sidebar from 'react-sidebar';
import { lang } from 'utils/commonUtils';
import Scrollbars from 'react-custom-scrollbars';
import { connect } from 'react-redux';
import Badge from 'components/Badge/StyleBadge';
import styled from 'styled-components';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import * as routeActions from 'containers/common/Routes/actions';
// import makeMyAppTree from './selectors';
import * as selectors from './selectors';
import Tree from './Tree';
import Notification from './Notification';
// import ExtraMenus from './ExtraMenus';
// import messages from '../../components/Header/messages';

const ResultsTableWrapper = styled.div`
  width: 230px;
  padding-bottom: 20px;

  tr {
    cursor: pointer;

    td {
      height: 29px;
      color: #404040;
      font-size: 12px;

      &:first-child {
        width: 175px;
        padding-left: 16px;
      }

      &:last-child {
        width: calc(100% - 175px);

        .ant-badge {
          display: inline-block;
          float: right;

          .ant-badge-count {
            right: 0;
            min-width: 15px;
            height: 16px;
            font-size: 10px;
            line-height: 16px;
            background: #f85023;
            box-shadow: none;
          }
        }
      }
    }
  }
`;

class UserMenu extends React.Component {
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
    } = this.props;

    console.debug('>>>>>>>userMenu this.props: ', this.props);

    return (
      <div>
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
          view={view}
          onClickNotiButton={this.onClickNotiButton}
        />
        {this.state.showNoti && (
          <div className="unreadNotiContent">
            <Scrollbars className="custom-scrollbar" autoHide autoHideTimeout={1000} autoHideDuration={100} autoHeight autoHeightMin={0} autoHeightMax={290}>
              <ResultsTableWrapper>
                <Table size="small" style={{ width: '100%' }}>
                  <Table.Body>
                    {myMNotiList.map(noti => (
                      <Table.Row key={noti.MENU_ID}>
                        <Table.Cell /* onClick={() => onClickItem(noti)} */>
                          {noti.SEC_YN === 'Y' ? <p>{lang.get('NAME', noti)}</p> : <p style={{ color: 'lightgray' }}>{lang.get('NAME', noti)}</p>}
                        </Table.Cell>
                        <Table.Cell>
                          <Badge count={noti.UNREAD_CNT ? noti.UNREAD_CNT : ''} overflowCount={99} className="badgeCount">
                            <Link to="/" className="badgeLink" />
                          </Badge>
                        </Table.Cell>
                      </Table.Row>
                    ))}
                  </Table.Body>
                </Table>
              </ResultsTableWrapper>
            </Scrollbars>
          </div>
        )}
        <Tree
          treeData={this.props.myAppTreeData}
          saveData={this.props.saveData}
          editMenu={this.onSetEditClick}
          onClick={this.onClickNode}
          execMenu={execMenu}
          execPage={execPage}
          selectedIndex={selectedIndex}
          menuName={menuName}
          handleSetMenuNameSelectedIndex={handleSetMenuNameSelectedIndex}
          setClose={this.props.setClose}
          onMenuClick={this.onMenuClick}
          showNoti={myMNotiCnt > 0}
          myAppStoreTreeData={this.props.myAppStoreTreeData}
          moveNode={this.props.moveNode}
          updateMymenuDisp={this.props.updateMymenuDisp}
          execApp={execApp}
          history={history}
        />
      </div>
    );
  };

  gotoHome = () => {
    const { execPage } = this.props;
    execPage('common');
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
    return (
      <div onMouseLeave={this.onNoneClick} onMouseEnter={this.onMenuClick}>
        <Sidebar sidebar={sidebarContent} open={open} styles={styleObj} touch shadow />
      </div>
    );
  }
}
UserMenu.propTypes = {
  open: PropTypes.bool.isRequired,
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
};

UserMenu.defaultProps = {
  setClose: undefined,
  execApp: () => {},
};

const mapStateToProps = createStructuredSelector({
  myAppTreeData: selectors.makeMyAppTree(),
  myAppStoreTreeData: selectors.makeMyAppStoreTree(),
});
export function mapDispatchToProps(dispatch) {
  return {
    // RoutesAction의 디스패쳐
    saveData: (node, treeData) => dispatch(routeActions.saveData(node, treeData)),
    moveNode: treeData => dispatch(routeActions.moveNode(treeData)),
    updateMymenuDisp: node => dispatch(routeActions.updateMymenuDisp(node)),
  };
}
const withConnect = connect(mapStateToProps, mapDispatchToProps);
export default compose(withConnect)(UserMenu);
