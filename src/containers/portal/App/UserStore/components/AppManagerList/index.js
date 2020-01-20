import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Scrollbars from 'react-custom-scrollbars';
import { Table } from 'semantic-ui-react';
import { Button, Popover } from 'antd';
import { FormattedMessage } from 'react-intl';
import { lang } from 'utils/commonUtils';
import messages from './messages';
import UserSearchWrapper from './userSearch.style';

class AppManagerList extends Component {
  handleClickManagerInfo = (gubun, param1) => {
    console.debug('@@@@ param1', param1);
    if (gubun === 'org') {
      this.props.userProfile(param1, true);
    } else {
      alert('준비중입니다.');
    }
  };

  render() {
    const { managerList } = this.props;
    return (
      <div align="left">
        <UserSearchWrapper>
          <div className="mSearchWrapper" style={{ position: 'relative', padding: 0, margin: 0 }}>
            <div>
              {managerList.length > 0 && (
                <div className="message">
                  <Scrollbars className="custom-scrollbar" autoHeight autoHeightMin={40} autoHeightMax={175}>
                    <div className="resultsTableWrapper">
                      <Table size="small" style={{ width: '100%' }}>
                        <Table.Body>
                          {managerList.map(user => (
                            <Table.Row key={user.EMP_NO} style={{ cursor: 'pointer' }}>
                              <Table.Cell style={{ width: 25 }}>
                                <Popover
                                  placement="rightTop"
                                  content={
                                    <ul className="userProfileMenuList">
                                      <li>
                                        <Button type="button" onClick={() => this.handleClickManagerInfo('org', user)} className="highlight icon-info">
                                          <FormattedMessage {...messages.userProfile} />
                                        </Button>
                                      </li>
                                      {/* <li>
                                        <Button type="button" onClick={() => this.handleClickManagerInfo('talk', user.EMP_NO)} className="icon-talk">
                                          <FormattedMessage {...messages.sendToCube} />
                                        </Button>
                                      </li>
                                      <li>
                                        <Button type="button" onClick={() => this.handleClickManagerInfo('mail', user.EMAIL)} className="icon-mail">
                                          <FormattedMessage {...messages.sendToMail} />
                                        </Button>
                                      </li>
                                      <li>
                                        <Button type="button" onClick={() => this.handleClickManagerInfo('todo', user.EMP_NO)} className="icon-todo">
                                          <FormattedMessage {...messages.todoRegist} />
                                        </Button>
                                      </li>
                                      <li><Button type="button" onClick={() => this.handleClickManagerInfo('hithanks', user.EMP_NO)} className="icon-hithanks"><FormattedMessage {...messages.hyThanks} /></Button></li> */}
                                    </ul>
                                  }
                                  trigger={this.props.currentView !== 'Mobile' && this.props.currentView !== 'Tablet' ? 'hover' : ''}
                                  overlayClassName="userProfileMenu"
                                  size="50"
                                >
                                  <div role="presentation">
                                    <img
                                      className="listImg"
                                      src={`/img/thumb/200x200/${user.PHOTO}`}
                                      alt={lang.get('NAME', user)}
                                      onError={e => {
                                        e.target.src = '/no_img_pro.jpg';
                                      }}
                                    />
                                  </div>
                                </Popover>
                              </Table.Cell>
                              <Table.Cell textAlign="left">
                                <p style={{ width: 250, marginLeft: 5 }} className="ellipsis">
                                  {lang.get('NAME', user)}({user.EMP_NO})&nbsp;{user.MGR_TYPE}/{lang.get('DEPT_NAME', user)}/{lang.get('PSTN_NAME', user)}
                                </p>
                              </Table.Cell>
                            </Table.Row>
                          ))}
                        </Table.Body>
                      </Table>
                    </div>
                  </Scrollbars>
                </div>
              )}
            </div>
          </div>
        </UserSearchWrapper>
      </div>
    );
  }
}

AppManagerList.propTypes = {
  userProfile: PropTypes.func,
  currentView: PropTypes.string.isRequired,
  managerList: PropTypes.arrayOf(PropTypes.object),
};

AppManagerList.defaultProps = {
  userProfile: () => {},
  managerList: [],
};

export default AppManagerList;
