import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ScrollBar from 'react-custom-scrollbars';
import { button } from 'antd/lib';
import { Link } from 'react-router-dom';
import { lang, intlObj } from 'utils/commonUtils';
import messages from './messages';

class singleView extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      selectedUser: {},
    };

    this.onClick = this.onClick.bind(this);
    this.handleOnClick = this.handleOnClick.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.selectedUser.USER_ID !== nextProps.selectedUser.USER_ID) {
      this.setState({
        selectedUser: nextProps.selectedUser,
      });
    }
  }

  handleOnClick(item) {
    let fPath = this.props.loadProfile.FULL_PATH.split("|");

    this.props.selectedProfileTree(item.name, item.path, fPath[0]);
}

  onClick(type) {
    console.log(type);
    alert('준비중입니다.');
    /*
    const {
      selectedUser,
    } = this.state;

    let empNo = selectedUser ? selectedUser.EMP_NO : this.props.userProfile.EMP_NO;
    let eMail = selectedUser ? selectedUser.EMAIL : this.props.userProfile.EMAIL;

    switch (type) {
      case "talk":
        window.open("http://cube.skhynix.com/web/BizWorks/Default.jsp?type=DM&empno=" + empNo);
        break;
      case "mail":
        window.open('https://email.skhynix.com/WOW/MailA/Message/AddNewMessage.aspx?a=New&to=' + eMail);
        break;
      case "todo":
        window.open('http://schedule.skhynix.com/task/AddTask.aspx?a=New&exuserid=' + empNo);
        break;
      case "hithanks":
        window.open('http://thanks.skhynix.com/front/TR/ht_thanks_proc_pop.do?recvMemId=' + empNo);
        break;
      default:
        return false;
    }
    */
  }

  render() {
    const {
      selectedUser,
    } = this.state;

    const {
      officetel,
      loadProfile
    } = this.props;

    const foottable = {
      width: 105,
      paddingLeft: 15,
      background: '#f7f7f7',
      textAlign: 'left',
      fontWeight: 'bold',
    };

    const note = {
      paddingLeft: 15,
    };

    let sName = lang.get('DEPT_PATH', loadProfile).split(/\s*>\s/);
    let sPath = loadProfile.FULL_PATH.split("|");  
    let np = [];
        
    for(let i = 0; i < sName.length; i++) {
      np.push({name:sName[i], path:sPath[i]});
    }

    for(let i = 0; i < np.length -1; i++){
      np[i]["direc"] = "  >"
    }

    return (
      <div>
        <div className="userBasicInfo" style={{ marginBottom: 8 }}>
          <div className="picWrapper">
            {selectedUser.length ?
              <img
                src={`/portalWeb/uploadfile/pictures/${selectedUser.EMP_NO}.jpg`}
                alt={selectedUser.EMP_NO}
                onError={(e) => { e.target.src = '/no_img_pro.jpg'; }}
              /> :

              <img
                src={`/portalWeb/uploadfile/pictures/${loadProfile.EMP_NO}.jpg`}
                alt={loadProfile.EMP_NO}
                onError={(e) => { e.target.src = '/no_img_pro.jpg'; }}
              />
            }
          </div>
            <ul className="userInfoList">
              {selectedUser.length ?
                <li className="name">
                  {lang.get('NAME', selectedUser)}({selectedUser.EMP_NO}) {lang.get('DEPT_NAME', selectedUser)} {lang.get('PSTN_NAME', selectedUser)}
                </li>
                :
                <li className="name">
                  {lang.get('NAME', loadProfile)}({loadProfile.EMP_NO}) {lang.get('DEPT_NAME', loadProfile)} {lang.get('PSTN_NAME', loadProfile)}
                </li>
              }
              <li className="dept">
                {np.map((list, index) => {
                  let handleOnClick = this.handleOnClick.bind(this, list);
                    return (
                      <div style={{ display: 'inline-block', float: 'left' }} key={index}>
                        <button 
                          onClick={handleOnClick}
                          id={list.name}
                          value={list.path}
                          className="treePathElement"
                        >
                                {list.name}
                              </button>
                              <span
                                className="bracket"
                              >
                                {list.direc}
                              </span>
                            </div>
                            )})}
                        </li>
                        {selectedUser.length ?
                            <li className="phone">
                                {selectedUser.MOBILE_TEL_NO}
                            </li>
                            :
                            <li className="phone">
                                {loadProfile.MOBILE_TEL_NO}
                            </li>
                        }
                    </ul>
                </div>
                <ul className="buttonWrapper">
                    <li>
                        <button className="icon talk" onClick={() => this.onClick('talk')} >{intlObj.get(messages.conversation)}</button>
                    </li>
                    <li>
                        <button className="icon mail" onClick={() => this.onClick('mail')}>{intlObj.get(messages.mail)}</button>
                    </li>
                    <li>
                        <button className="icon todo" onClick={() => this.onClick('todo')}>{intlObj.get(messages.registerTodo)}</button>
                    </li>
                    {/* <li>
                        <button className="icon hithanks" onClick={() => this.onClick('hithanks')}>{intlObj.get(messages.HyThanks)}</button>
                    </li> */}
                </ul>
                <div className="userInfoDetails">
                    <table>
                        <tbody>
                            <tr>
                                <td style={foottable}>{intlObj.get(messages.dutyAndPosition)}</td>
                                <td style={note}>{lang.get('JOB_NAME', loadProfile)}</td>
                            </tr>
                            <tr className="majorJob">
                                <td style={foottable}>{intlObj.get(messages.responsibility)}</td>
                                <td style={note}>
                                    <ScrollBar style={{ height: 177 }}>
                                        <ul>
                                            <li>{loadProfile.RESP_CONT}</li>
                                        </ul>
                                    </ScrollBar>
                                </td>
                            </tr>
                            <tr>
                            </tr>
                            <tr>
                                <td style={foottable}>{intlObj.get(messages.inHousePhone)}</td>
                                {officetel ? <td style={note}>{officetel}</td> : <td style={note} />}
                            </tr>
                            {selectedUser.length ?
                                <tr>
                                    <td style={foottable}>{intlObj.get(messages.mobilePhone)}</td>
                                    {selectedUser.MOBILE_TEL_NO ? <td style={note}>{selectedUser.MOBILE_TEL_NO}</td> : <td style={note} />}
                                </tr>
                                :
                                <tr>
                                    <td style={foottable}>{intlObj.get(messages.mobilePhone)}</td>
                                    {loadProfile.MOBILE_TEL_NO ? <td style={note}>{loadProfile.MOBILE_TEL_NO}</td> : <td style={note} />}
                                </tr>
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

singleView.propTypes = {
  userProfile: PropTypes.object.isRequired,
  selectedUser: PropTypes.object.isRequired,
  loadProfile: PropTypes.object.isRequired,
  selectedProfileTree: PropTypes.func.isRequired,
};

export default singleView;
