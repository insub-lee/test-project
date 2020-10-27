import React from 'react';
import PropTypes from 'prop-types';
import defaultUserImg from '../../images/icon_user.png';
import StyledProfile from './StyledProfile';

const Profile = ({ profile }) => (
  <StyledProfile className="user">
    <img
      src={profile.img ? `/img/profile${profile.img}` : defaultUserImg}
      alt={`${profile.name || 'User'}`}
      className={`user_img ${profile.img ? 'on_img' : ''}`}
      onError={e => {
        e.target.src = defaultUserImg;
        e.target.class = 'user_img';
      }}
    />
    <span className="user_txt1">{profile.name}</span>
    <span className="user_txt2">{`${profile.dept} / ${profile.position} / ${profile.id}`}</span>
  </StyledProfile>
);

Profile.propTypes = {
  profile: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    dept: PropTypes.string,
    position: PropTypes.string,
    img: PropTypes.string,
  }),
};

Profile.defaultProps = {
  profile: {
    id: 'no id',
    name: 'UNKNOWN',
    dept: 'no dept',
    position: 'no position',
    img: '',
  },
};

export default Profile;
