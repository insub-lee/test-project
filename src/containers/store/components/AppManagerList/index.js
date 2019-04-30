import React from 'react';
import PropTypes from 'prop-types';
import Scrollbars from 'react-custom-scrollbars';
import { Table } from 'semantic-ui-react';
import { Button, Popover, Row } from 'antd';
import { FormattedMessage } from 'react-intl';
import { intlObj, lang } from 'utils/commonUtils';
import messages from './messages';
import UserSearchWrapper from './userSearch.style';

class AppManagerList extends React.Component {
  constructor(prop) {
    super(prop);
    this.state = {
      managerList: prop.managerList,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      managerList: nextProps.managerList,
    });
  }

  handleClickManagerInfo = (gubun, param1) => {
    if (gubun === 'org') {
      this.props.userProfile(param1, true);
    }else {
      alert('준비중입니다.');
    }
    // } else if (gubun === 'talk') {
    //   window.open(`http://cube.skhynix.com/web/BizWorks/Default.jsp?type=DM&empno=${param1}`);
    // } else if (gubun === 'mail') {
    //   window.open(`https://email.skhynix.com/WOW/MailA/Message/AddNewMessage.aspx?a=New&to=${param1}`);
    // } else if (gubun === 'todo') {
    //   window.open(`http://schedule.skhynix.com/task/AddTask.aspx?a=New&exuserid=${param1}`);
    // } else if (gubun === 'hithanks') {
    //   window.open(`http://thanks.skhynix.com/front/TR/ht_thanks_proc_pop.do?recvMemId=${param1}`);
    // }
  }

  render() {
    const RenderSearchView = (props) => {
      if (props.managerList.length > 0) {
        return (
          <div className="message">
            <Scrollbars
              className="custom-scrollbar"
              autoHeight
              autoHeightMin={40}
              autoHeightMax={175}
            >
              <div className="resultsTableWrapper">
                <Table size="small" style={{ width: '100%' }}>
                  <Table.Body>
                    {
                      props.managerList.map(user => (

                        <Table.Row key={user.EMP_NO} style={{ cursor: 'pointer' }}>

                          <Table.Cell style={{ width: 25 }}>
                            <Popover
                              placement="rightTop"
                              content={(
                                <ul className="userProfileMenuList">
                                  <li><Button type="button" onClick={() => this.handleClickManagerInfo('org', user)} className="highlight icon-info"><FormattedMessage {...messages.userProfile} /></Button></li>
                                  <li><Button type="button" onClick={() => this.handleClickManagerInfo('talk', user.EMP_NO)} className="icon-talk"><FormattedMessage {...messages.sendToCube} /></Button></li>
                                  <li><Button type="button" onClick={() => this.handleClickManagerInfo('mail', user.EMAIL)} className="icon-mail"><FormattedMessage {...messages.sendToMail} /></Button></li>
                                  <li><Button type="button" onClick={() => this.handleClickManagerInfo('todo', user.EMP_NO)} className="icon-todo"><FormattedMessage {...messages.todoRegist} /></Button></li>
                                  {/* <li><Button type="button" onClick={() => this.handleClickManagerInfo('hithanks', user.EMP_NO)} className="icon-hithanks"><FormattedMessage {...messages.hyThanks} /></Button></li> */}
                                </ul>
                              )}
                              trigger={(this.props.currentView !== 'Mobile' && this.props.currentView !== 'Tablet') ? "hover" : ""}
                              overlayClassName="userProfileMenu"
                              size="50"
                            >
                              <div
                                role="presentation"
                                onError={(e) => { e.target.src = '/no_img_pro.jpg'; }}
                              >
                                <img
                                  className="listImg"
                                  src={`/portalWeb/uploadfile/pictures/${user.EMP_NO}.jpg`}
                                  alt={lang.get('NAME', user)}
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
                      ))
                    }
                  </Table.Body>
                </Table>
              </div>
            </Scrollbars>
          </div>
        );
      } return false;
    };
    return (
      <div align="left">
        <UserSearchWrapper>
          <div className="mSearchWrapper" style={{ position: 'relative', padding: 0, margin: 0 }}>
            <div>
              {RenderSearchView(this.state)}
            </div>
          </div>
        </UserSearchWrapper>
      </div>
    );
  }
}

AppManagerList.propTypes = {
  userProfile: PropTypes.func, //eslint-disable-line  
  currentView: PropTypes.string.isRequired,  //eslint-disable-line
};
export default AppManagerList;
