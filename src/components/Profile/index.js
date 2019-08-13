import React from 'react';
import PropTypes from 'prop-types';

import IconCollection from '../IconCollection';
import userImg from 'images/portal/img-user-sample.png';
import Styled from './Styled';

const User = ({ profile }) => (
  <Styled>
    <div>
      <button type="button" className="btn-pin">
        <IconCollection className="icon-pin" />
      </button>
      <div className="user-img">
        <img src={userImg} alt="profile-img" />
      </div>
      <div className="user-info">
        <span className="user-info-name">홍길동 상무</span>
        <span className="user-info-belong">kbsys / IT개발 운영</span>
      </div>
    </div>
  </Styled>
);

User.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default User;
