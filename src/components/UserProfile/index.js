import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { lang } from 'utils/commonUtils';
import UserProfileStyle from './UserProfileStyle';

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const { profile } = this.props;
    return (
      <UserProfileStyle>
        {profile != null ?
          <div className="userInfo">
            <div className="myPicture">
              <img
                src={`/img/thumb/200x200/${profile.PHOTO}`}
                alt={profile.EMP_NO}
                onError={(e) => { e.target.src = '/no_img_pro.jpg'; }}
              />
            </div>
            <div className="myInfo">
              <span>{lang.get('NAME', profile)}</span>
              <span className="myPosition">{lang.get('DEPT_NAME', profile)}
                <span className="iconDiv">|</span>
                {lang.get('PSTN_NAME', profile)}
              </span>
            </div>
          </div>
          : <div />
        }
      </UserProfileStyle>
    );
  }
}

UserProfile.propTypes = {
  profile: PropTypes.string.isRequired,
};

export default UserProfile;
