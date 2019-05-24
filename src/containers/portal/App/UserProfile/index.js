import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { intlObj, lang } from 'utils/commonUtils';
import { Button, Popover } from 'antd';
import { createStructuredSelector } from 'reselect';
import NewWindow from 'react-new-window'
import { Link } from 'react-router-dom';
import Organization from 'containers/portal/components/Organization';
import injectReducer from '../../../../utils/injectReducer';
import injectSaga from '../../../../utils/injectSaga';
import saga from './saga';
import * as selectors from './selectors';
import * as actions from './actions';
import reducer from './reducer';
import messages from '../UserSearch/messages';
import { Cookies } from 'react-cookie';

class UserProfile extends Component {
  constructor(props) {
    super(props);
    const { profile } = this.props;
    // handleGetFullPath(profile.USER_ID);
    this.state = {
      show: false,
    };
  }

  onModal = () => {
    this.setState({
      show: true,
    });
  }

  closeModal = () => {
    this.setState({
      show: false,
    });
  }

  handleClickToMoveToSite = (profile, type) => { //eslint-disable-line
    switch (type) {
      case 'org':
        this.onModal();
        break;
      case 'logout': {
        const cookies = new Cookies();
        cookies.remove('token', { path: '/' })
        window.location.href = '/signin';
        break;
      }
      // case 'talk':
      //   window.open(`http://cube.skhynix.com/web/BizWorks/Default.jsp?type=DM&empno=${profile.EMP_NO}`);
      //   break;
      // case 'mail':
      //   window.open(`https://email.skhynix.com/WOW/MailA/Message/AddNewMessage.aspx?a=New&to=${profile.EMAIL}`);
      //   break;
      // case 'todo':
      //   window.open(`http://schedule.skhynix.com/task/AddTask.aspx?a=New&exuserid=${profile.EMP_NO}`);
      //   break;
      // case 'hithanks':
      //   window.open(`http://thanks.skhynix.com/front/TR/ht_thanks_proc_pop.do?recvMemId=${profile.EMP_NO}`);
      //   break;
      default:
        alert('준비중입니다.');
        return false;
    }
  }

  moveToSite = () => {
    const { profile, locale } = this.props;
    // const linkTo = `/popup/organization/${locale}/${profile.DEPT_ID}/${profile.USER_ID}`;
    return (
      <div>
        <ul className="userProfileMenuList">
          <li>
            {/* <Link to={linkTo} target="organizationPopup">
              <Button type="button" className="highlight icon-info">{intlObj.get(messages.userProfile)}</Button>
            </Link> */}
            <Button onClick={() => this.handleClickToMoveToSite(profile, 'org')} type="button" className="highlight icon-info">{intlObj.get(messages.userProfile)}</Button>
          </li>
          <li><Button onClick={() => this.handleClickToMoveToSite(profile, 'talk')} type="button" className="icon-talk">{intlObj.get(messages.sendToCube)}</Button></li>
          <li><Button onClick={() => this.handleClickToMoveToSite(profile, 'mail')} type="button" className="icon-mail">{intlObj.get(messages.sendToMail)}</Button></li>
          <li><Button onClick={() => this.handleClickToMoveToSite(profile, 'todo')} type="button" className="icon-todo">{intlObj.get(messages.todoRegist)}</Button></li>
          <li><Button onClick={() => this.handleClickToMoveToSite(profile, 'logout')} type="button" className="icon-logout">{intlObj.get(messages.logout)}</Button></li>
          {/* <li><Button onClick={() => this.handleClickToMoveToSite(profile, 'hithanks')} type="button" className="icon-hithanks">{intlObj.get(messages.hyThanks)}</Button></li> */}
        </ul>
      </div>
    );
  }

  render() {
    const { profile } = this.props;
    const { show } = this.state;
    const contents = this.moveToSite();
    return (
      <div>
        {profile != null ?
          <div className="userInfo">
            <Popover
              placement="left"
              content={contents}
              trigger="hover"
              overlayClassName="userProfileMenu"
            >
              <div className="myPicture">
                <img
                  src={`/no_img_pro.jpg`}
                  alt={profile.EMP_NO}
                  onError={(e) => { e.target.src = '/no_img_pro.jpg'; }}
                />
              </div>
            </Popover>
          </div>
          : <div />
        }
        <Organization
          show={show}
          closeModal={this.closeModal}
          isModal={true}
          userProfile={profile}
          isProfile={true}
          orgName="유저프로필"
        />
      </div>
    );
  }
}

UserProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  // fullPath: PropTypes.object.isRequired,
  // handleGetFullPath: PropTypes.func.isRequired,
  
  // language 스토어의 locale값을 가져옴
  // 왜냐하면, 환경설정에서 intl의 locale값을 변경해도 UserProfile에는 영향이 없어 re-render가 일어나지 않아
  // moveToSite의 Link에 연결된 url이 변경되지 않는다. 그러므로 language의 locale을 직접 가져오게하여
  // UserProfile의 re-render를 발생시켜야 한다.
  locale: PropTypes.string.isRequired,
};

const mapStateToProps = createStructuredSelector({
  profile: selectors.makeSelectProfile(),
  // fullPath: selectors.makeSelectFullPath(),
  locale: selectors.makeSelectLocale(),
});

export function mapDispatchToProps(dispatch) {
  return {
    // handleGetFullPath: id => dispatch(actions.getFullPath(id)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'userProfile', reducer });

const withSaga = injectSaga({ key: 'userProfile', saga });

export default compose(
  withReducer,
  withConnect,
  withSaga,
)(UserProfile);
