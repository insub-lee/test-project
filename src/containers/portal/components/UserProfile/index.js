import React from 'react';
import PropTypes from 'prop-types';
import { lang, intlObj } from 'utils/commonUtils';
import { Popover, Button } from 'antd';
// 윈도우 팝업에 띄우면 /no_img_pro.jpg를 못불러옴..
import noImgPro from 'images/common/no_img_pro.jpg';
import messages from './messages';

class UserProfile extends React.Component {
  handleClickToMoveToSite = (profile, type) => { //eslint-disable-line
    const {
      onExecOrg,
    } = this.props;

    switch (type) {
      case 'org':
        onExecOrg(profile);
        break;
      case 'talk':
        window.open(`http://cube.skhynix.com/web/BizWorks/Default.jsp?type=DM&empno=${profile.EMP_NO}`);
        break;
      case 'mail':
        window.open(`https://email.skhynix.com/WOW/MailA/Message/AddNewMessage.aspx?a=New&to=${profile.EMAIL}`);
        break;
      case 'todo':
        window.open(`http://schedule.skhynix.com/task/AddTask.aspx?a=New&exuserid=${profile.EMP_NO}`);
        break;
      case 'hithanks':
        window.open(`http://thanks.skhynix.com/front/TR/ht_thanks_proc_pop.do?recvMemId=${profile.EMP_NO}`);
        break;
      default:
        return false;
    }
  }
  
  render() {
    const {
      userProfile,
      style,
      isPopover,
    } = this.props;

    const title = `${lang.get('NAME', userProfile)}(${userProfile.EMP_NO})\n${lang.get('PSTN_NAME',userProfile) && lang.get('PSTN_NAME',userProfile).trim() !== '' ? lang.get('DEPT_NAME',userProfile) + ' / ' : lang.get('DEPT_NAME',userProfile) + ' '}${lang.get('DUTY_NAME',userProfile) && lang.get('DUTY_NAME',userProfile).trim() !== '' ? lang.get('PSTN_NAME',userProfile) + ' / ' + lang.get('DUTY_NAME',userProfile) : lang.get('PSTN_NAME',userProfile) && lang.get('PSTN_NAME',userProfile).trim() !== '' ? lang.get('PSTN_NAME',userProfile) : ''}`;

    let content = '';
    if (isPopover) {
      content = (
        <Popover
          placement="rightBottom"
          content={(
            <div>
              <ul className="userProfileMenuList">
                <li><Button onClick={() => this.handleClickToMoveToSite(userProfile, 'org')} type="button" className="highlight icon-info">{intlObj.get(messages.userProfile)}</Button></li>
                <li><Button onClick={() => this.handleClickToMoveToSite(userProfile, 'talk')} type="button" className="icon-talk">{intlObj.get(messages.sendToCube)}</Button></li>
                <li><Button onClick={() => this.handleClickToMoveToSite(userProfile, 'mail')} type="button" className="icon-mail">{intlObj.get(messages.sendToMail)}</Button></li>
                <li><Button onClick={() => this.handleClickToMoveToSite(userProfile, 'todo')} type="button" className="icon-todo">{intlObj.get(messages.todoRegist)}</Button></li>
                {/* <li><Button onClick={() => this.handleClickToMoveToSite(userProfile, 'hithanks')} type="button" className="icon-hithanks">{intlObj.get(messages.hyThanks)}</Button></li> */}
              </ul>
            </div>
          )}
          trigger="hover"
          overlayClassName="userProfileMenu"
        >
          <div 
            style={{
              posotion: 'relative',
              display: 'inline-block',
              verticalAlign: 'middle',
              width: '25px',
              height: '25px',
              marginRight: '10px',
              borderRadius: '50%',
              overflow: 'hidden',
              cursor: 'pointer',
            }}>
            <img
              style={{
                top: '0',
                left: '0',
                width: '100%',
              }}
              src={`/portalWeb/uploadfile/pictures/${userProfile.EMP_NO}.jpg`}
              onError={(e) => { e.target.src = noImgPro }}
              alt=""
            />
          </div>
        </Popover>
      );
    } else {
      content = (
        <div 
          style={{
            posotion: 'relative',
            display: 'inline-block',
            verticalAlign: 'middle',
            width: '25px',
            height: '25px',
            marginRight: '10px',
            borderRadius: '50%',
            overflow: 'hidden',
          }}>
          <img
            style={{
              top: '0',
              left: '0',
              width: '100%',
            }}
            src={`/portalWeb/uploadfile/pictures/${userProfile.EMP_NO}.jpg`}
            onError={(e) => { e.target.src = noImgPro }}
            alt=""
          />
        </div>
      );
    }

    return (
      <div 
        title={title}
        style={style}
      >
        {
          userProfile.ACNT_TYPE === 'D'
            ?
              ''
            :
            content
        }
        <div 
          style={{
            display: 'inline-block',
            fontSize: '12px',
            lineHeight: '1.3em',
            verticalAlign: 'middle'
          }}>
          {lang.get('NAME',userProfile)}{userProfile.ACNT_TYPE === 'D' ? '' : `(${userProfile.EMP_NO})`}<br />
          {lang.get('PSTN_NAME',userProfile) && lang.get('PSTN_NAME',userProfile).trim() !== '' ? lang.get('DEPT_NAME',userProfile) + ' / ' : lang.get('DEPT_NAME',userProfile) + ' '}
          {lang.get('DUTY_NAME',userProfile) && lang.get('DUTY_NAME',userProfile).trim() !== '' ? lang.get('PSTN_NAME',userProfile) + ' / ' + lang.get('DUTY_NAME',userProfile) : lang.get('PSTN_NAME',userProfile) && lang.get('PSTN_NAME',userProfile).trim() !== '' ? lang.get('PSTN_NAME',userProfile) : ''}
        </div>
      </div>
    );
  }
}

UserProfile.propTypes = {
  userProfile: PropTypes.object.isRequired,
  style: PropTypes.object,

  // Popover 사용여부
  isPopover: PropTypes.bool,
  // Popover 사용 시, 조직도 클릭 시 불릴 함수
  // 파라메터로 조직도에 처음 띄워 줄 사용자의 객체(profile)을 받아옴
  onExecOrg: PropTypes.func,
};

UserProfile.defaultProps = {
  style: undefined,
  isPopover: false,
  onExecOrg: undefined,
};

export default UserProfile;
