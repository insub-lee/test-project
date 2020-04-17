import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { intlObj, loginPage } from 'utils/commonUtils';
import { Button, Popover } from 'antd';
import { createStructuredSelector } from 'reselect';

import Organization from 'containers/portal/components/Organization';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import saga from './saga';
import * as selectors from './selectors';
import reducer from './reducer';
import messages from '../UserSearch/messages';

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
    };
  }

  onModal = () => {
    this.setState({
      show: true,
    });
  };

  closeModal = () => {
    this.setState({
      show: false,
    });
  };

  handleClickToMoveToSite = (profile, type) => {
    const { execPage } = this.props;
    switch (type) {
      case 'org':
        this.onModal();
        break;
      case 'logout': {
        loginPage();
        break;
      }
      // case 'mail':
      //   window.open(`http://www.kb-sys.co.kr/solutions#solutions-link-4`);
      //   break;
      // case 'todo':
      //   window.open(`http://www.kb-sys.co.kr/solutions#solutions-link-4`);
      //   break;
      case 'set':
        execPage('set');
        break;
      default:
        alert('준비중입니다.');
        break;
    }
  };

  render() {
    const { profile } = this.props;
    const { show } = this.state;
    return (
      <div>
        <div className="userInfo">
          <Popover
            placement="left"
            content={
              <div>
                <ul className="userProfileMenuList">
                  <li>
                    <Button onClick={() => this.handleClickToMoveToSite(profile, 'org')} type="button" className="highlight icon-info">
                      {intlObj.get(messages.userProfile)}
                    </Button>
                  </li>
                  <li>
                    <Button onClick={() => this.handleClickToMoveToSite(profile, 'set')} type="button" className="icon-settings">
                      환경설정
                    </Button>
                  </li>
                  <li>
                    <Button onClick={() => this.handleClickToMoveToSite(profile, 'logout')} type="button" className="icon-hithanks">
                      {intlObj.get(messages.logout)}
                    </Button>
                  </li>
                </ul>
              </div>
            }
            trigger="hover"
            overlayClassName="userProfileMenu"
          >
            <div className="myPicture">
              <img
                src={profile.PHOTO ? `/img/thumb/200x200/${profile.PHOTO}` : '/no_img_pro.jpg'}
                alt={profile.EMP_NO}
                onError={e => {
                  e.target.src = '/no_img_pro.jpg';
                }}
              />
            </div>
          </Popover>
        </div>
        <Organization show={show} closeModal={this.closeModal} isModal userProfile={profile} isProfile orgName="유저프로필" />
      </div>
    );
  }
}

UserProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  execPage: PropTypes.func,
};

UserProfile.defaultProps = {
  execPage: () => {},
};

const mapStateToProps = createStructuredSelector({
  profile: selectors.makeSelectProfile(),
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

export default compose(withReducer, withSaga, withConnect)(UserProfile);
