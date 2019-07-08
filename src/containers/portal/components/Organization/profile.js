import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import ScrollBar from 'react-custom-scrollbars';
import { lang, intlObj } from 'utils/commonUtils';
import messages from './messages';
import { BtnDkGray } from '../uielements/buttons.style';

class Profile extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      selectedUser: {},
    };
  }
  onClick = (type) => {
    // const {
    //   selectedUser,
    // } = this.state;

    // const empNo = selectedUser ? selectedUser.EMP_NO : this.props.loadProfile.EMP_NO;
    // const eMail = selectedUser ? selectedUser.EMAIL : this.props.loadProfile.EMAIL;
    switch (type) {
    // case 'talk':
    //   window.open(`http://cube.skhynix.com/web/BizWorks/Default.jsp?type=DM&empno=${empNo}`);
    //   return;
    // case 'mail':
    //   window.open(`https://email.skhynix.com/WOW/MailA/Message/AddNewMessage.aspx?a=New&to=${eMail}`);
    //   return;
    // case 'todo':
    //   window.open(`http://schedule.skhynix.com/task/AddTask.aspx?a=New&exuserid=${empNo}`);
    //   return;
    // case 'hithanks':
    //   window.open(`http://thanks.skhynix.com/front/TR/ht_thanks_proc_pop.do?recvMemId=${empNo}`);
    //   break;
      default:
        alert('준비중입니다.');
    }
  }

  handleOnClick = (item) => {
    const fPath = this.props.loadProfile.FULL_PATH.split('|');
    this.props.selectedProfileTree(item.target.id, item.target.value, fPath[0]);
  }


  render() {
    const {
      selectedUser,
    } = this.state;

    const {
      officetel,
      loadProfile,
      userSetting,
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

    const sName = lang.get('DEPT_PATH', loadProfile).split(/\s*>\s/);
    const sPath = loadProfile.FULL_PATH.split('|');
    const np = [];

    for (let i = 0; i < sName.length; i += 1) {
      np.push({ name: sName[i], path: sPath[i] });
    }

    for (let i = 0; i < np.length - 1; i += 1) {
      np[i].direc = '  >';
    }

    return (
      <div style={{ marginTop: 8 }}>
        <div className="userBasicInfo" style={{ marginBottom: 8 }}>
          <div className="picWrapper">
            {selectedUser.length ?
              <img
                src={`http://skynet.skhynix.com/portalWeb/uploadfile/pictures/${selectedUser.EMP_NO}.jpg`}
                alt={selectedUser.EMP_NO}
                onError={(e) => { e.target.src = '/no_img_pro.jpg'; }}
              /> :

              <img
                src={`http://skynet.skhynix.com/portalWeb/uploadfile/pictures/${loadProfile.EMP_NO}.jpg`}
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
              {np.map(list => (
                <div style={{ display: 'inline-block', float: 'left' }} key={list.name}>
                  <button
                    onClick={this.handleOnClick}
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
              ))}
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
        <ul className="buttonWrapper" style={{ height: 'auto' }}>
          {/* <li>
            <button className="icon talk" onClick={() => this.onClick('talk')} >{intlObj.get(messages.conversation)}</button>
          </li>
          <li>
            <button className="icon mail" onClick={() => this.onClick('mail')}>{intlObj.get(messages.mail)}</button>
          </li>
          <li>
            <button className="icon todo" onClick={() => this.onClick('todo')}>{intlObj.get(messages.registerTodo)}</button>
          </li> */}
          {userSetting &&
          <li>
            <button className="icon" style={{ paddingTop: '0px', height: '25px' }}>
              <Link style={{ display: 'block', height: '100%' }} to={`/admin/adminmain/account/${loadProfile.USER_ID}`} className="icon" title="계정정보관리">계정정보관리</Link>
            </button>
          </li>
          }
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
                  <ScrollBar style={{ height: 158, whiteSpace: 'pre-line' }}>
                    <ul>
                      <li>{loadProfile.RESP_CONT}</li>
                    </ul>
                  </ScrollBar>
                </td>
              </tr>
              <tr />
              <tr>
                <td style={foottable}>{intlObj.get(messages.inHousePhone)}</td>
                {officetel ? <td style={note}>{officetel}</td> : <td style={note} />}
              </tr>
              {selectedUser.length ?
                <tr>
                  <td style={foottable}>{intlObj.get(messages.mobilePhone)}</td>
                  {
                    selectedUser.MOBILE_TEL_NO
                    ?
                      <td style={note}>{selectedUser.MOBILE_TEL_NO}</td>
                    :
                      <td style={note} />
                  }
                </tr>
                :
                <tr>
                  <td style={foottable}>{intlObj.get(messages.mobilePhone)}</td>
                  {
                    loadProfile.MOBILE_TEL_NO
                    ?
                      <td style={note}>{loadProfile.MOBILE_TEL_NO}</td>
                    :
                      <td style={note} />
                  }
                </tr>
              }
              {userSetting &&
                <tr>
                  <BtnDkGray className="icon" style={{ paddingTop: '0px', height: '30px', marginTop: '5px' }}>
                    <Link style={{ display: 'block', height: '100%' }} to="/admin/adminmain/account" className="icon" title="계정생성">+계정생성</Link>
                  </BtnDkGray>
                </tr>
              }
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

Profile.propTypes = {
  loadProfile: PropTypes.object.isRequired,
  selectedProfileTree: PropTypes.func.isRequired,
  // eslint-disable-next-line react/no-unused-prop-types
  history: PropTypes.object.isRequired,
  officetel: PropTypes.string,
  userSetting: PropTypes.bool,
};

Profile.defaultProps = {
  officetel: undefined,
  userSetting: false,
};

export default Profile;
