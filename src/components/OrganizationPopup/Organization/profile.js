import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ScrollBar from 'react-custom-scrollbars';
import { lang, intlObj } from 'utils/commonUtils';
import messages from './messages';

class Profile extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      selectedUser: {},
    };
  }

  onClick = type => {
    console.log(type);
    alert('준비중입니다.');
    /*
    const {
      selectedUser,
    } = this.state;

    const empNo = selectedUser ? selectedUser.EMP_NO : this.props.loadProfile.EMP_NO;
    const eMail = selectedUser ? selectedUser.EMAIL : this.props.loadProfile.EMAIL;

    switch (type) {
      case 'talk':
        window.open(`http://www.kb-sys.co.kr/solutions#solutions-link-4`);
        return;
      case 'mail':
        window.open(`http://www.kb-sys.co.kr/solutions#solutions-link-4`);
        return;
      case 'todo':
        window.open(`http://www.kb-sys.co.kr/solutions#solutions-link-4`);
        return;
      default:
    }
    */
  };

  handleOnClick = item => {
    const fPath = this.props.loadProfile.FULL_PATH.split('|');
    this.props.selectedProfileTree(item.target.id, item.target.value, fPath[0]);
  };

  render() {
    const { selectedUser } = this.state;

    const { loadProfile } = this.props;

    // 팝업용 조직도에서 query string으로 DEPT_ID를 넘겨줬는데,
    // 해당 부서의 구성원이 없는 경우
    if (!loadProfile.USER_ID) {
      return '';
    }

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
            {selectedUser.length ? (
              <img
                src={`/img/thumb/200x200/${selectedUser.PHOTO}`}
                alt={selectedUser.EMP_NO}
                onError={e => {
                  e.target.src = '/no_img_pro.jpg';
                }}
              />
            ) : (
              <img
                src={`/img/thumb/200x200/${loadProfile.PHOTO}`}
                alt={loadProfile.EMP_NO}
                onError={e => {
                  e.target.src = '/no_img_pro.jpg';
                }}
              />
            )}
          </div>
          <ul className="userInfoList">
            {selectedUser.length ? (
              <li className="name">
                {lang.get('NAME', selectedUser)}({selectedUser.EMP_NO}) {lang.get('DEPT_NAME', selectedUser)} {lang.get('PSTN_NAME', selectedUser)}
              </li>
            ) : (
              <li className="name">
                {lang.get('NAME', loadProfile)}({loadProfile.EMP_NO}) {lang.get('DEPT_NAME', loadProfile)} {lang.get('PSTN_NAME', loadProfile)}
              </li>
            )}
            <li className="dept">
              {np.map(list => (
                <div style={{ display: 'inline-block', float: 'left' }} key={list.name}>
                  <button onClick={this.handleOnClick} id={list.name} value={list.path} className="treePathElement">
                    {list.name}
                  </button>
                  <span className="bracket">{list.direc}</span>
                </div>
              ))}
            </li>
            {selectedUser.length ? <li className="phone">{selectedUser.MOBILE_TEL_NO}</li> : <li className="phone">{loadProfile.MOBILE_TEL_NO}</li>}
          </ul>
        </div>
        {/* <ul className="buttonWrapper">
          <li>
            <button className="icon talk" onClick={() => this.onClick('talk')}>
              {intlObj.get(messages.conversation)}
            </button>
          </li>
          <li>
            <button className="icon mail" onClick={() => this.onClick('mail')}>
              {intlObj.get(messages.mail)}
            </button>
          </li>
          <li>
            <button className="icon todo" onClick={() => this.onClick('todo')}>
              {intlObj.get(messages.registerTodo)}
            </button>
          </li>
          <li>
            <button className="icon hithanks" onClick={() => this.onClick('hithanks')}>{intlObj.get(messages.HyThanks)}</button>
          </li>
        </ul> */}
        <div className="userInfoDetails">
          <table>
            <tbody>
              <tr>
                <td style={foottable}>{intlObj.get(messages.dutyAndPosition)}</td>
                <td style={note}>{loadProfile.JOB_NAME_KOR.trim() ? lang.get('JOB_NAME', loadProfile) : lang.get('DUTY_NAME', loadProfile)}</td>
              </tr>
              <tr className="majorJob">
                <td style={foottable}>{intlObj.get(messages.responsibility)}</td>
                <td style={note}>
                  <ScrollBar style={{ height: 158 }}>
                    <ul>
                      <li>{loadProfile.RESP_CONT}</li>
                    </ul>
                  </ScrollBar>
                </td>
              </tr>
              <tr />
              <tr>
                <td style={foottable}>{intlObj.get(messages.inHousePhone)}</td>
                {loadProfile.OFFICE_TEL_NO ? <td style={note}>{loadProfile.OFFICE_TEL_NO}</td> : <td style={note} />}
              </tr>
              {selectedUser.length ? (
                <tr>
                  <td style={foottable}>{intlObj.get(messages.mobilePhone)}</td>
                  {selectedUser.MOBILE_TEL_NO ? <td style={note}>{selectedUser.MOBILE_TEL_NO}</td> : <td style={note} />}
                </tr>
              ) : (
                <tr>
                  <td style={foottable}>{intlObj.get(messages.mobilePhone)}</td>
                  {loadProfile.MOBILE_TEL_NO ? <td style={note}>{loadProfile.MOBILE_TEL_NO}</td> : <td style={note} />}
                </tr>
              )}
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
};

export default Profile;
