import React from 'react';
import PropTypes from 'prop-types';

import IconCollection from '../IconCollection';
import Styled from './Styled';

const User = ({ profile }) => (
  <Styled>
    <div>
      <button type="button" className="btn-pin">
        <IconCollection className="icon-pin" />
      </button>
      <div className="user-img">
        <img src={`/portalWeb/uploadfile/pictures/${profile.EMP_NO}.jpg`} onError={(e) => { e.target.src = '/img-user-sample.png'; }} alt="profile-img" />
      </div>
      <div className="user-info">
        <span className="user-info-name">{profile.NAME_KOR} {profile.PSTN_NAME_KOR}</span>
        <span className="user-info-belong">{profile.DEPT_NAME_KOR}</span>
      </div>
    </div>
  </Styled>
);

User.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default User;
