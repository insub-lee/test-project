import React from 'react';
import PropTypes from 'prop-types';

import IconCollection from '../IconCollection';
import Styled from './Styled';

const User = ({ profile, setFixedOpenMenu, isShow}) => (
  <Styled>
    <div>
      <button type="button" className="btn-pin" onClick={setFixedOpenMenu}>
        <IconCollection className={isShow ? 'icon-pin' : ''} />
      </button>
      <div className="user-img">
        <img src={`/img/thumb/200x200/${profile.PHOTO}`} onError={(e) => { e.target.src = '/no_img_pro.jpg'; }} alt="profile-img" />
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
  setMenuClose: PropTypes.func.isRequired,
  isShow: PropTypes.bool,
};

export default User;
