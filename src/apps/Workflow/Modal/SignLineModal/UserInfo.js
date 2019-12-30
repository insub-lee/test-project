import React, { Component } from 'react';
import PropTypes from 'prop-types';

import noImgPro from 'images/common/no_img_pro.jpg';

class UserInfo extends Component {
  componentDidMount() {}

  render() {
    const { isDraggable, user, removeCheckedUsers } = this.props;

    return (
      <div className="userInfoArea">
        <div className="userImgArea">
          <img
            src={`/portalWeb/uploadfile/pictures/${user.EMP_NO}.jpg`}
            onError={e => {
              e.target.src = noImgPro;
            }}
            alt="profile"
          />
        </div>
        <div className="userTextArea">
          {user.NAME_KOR}({user.EMP_NO})
          <br /> {user.DEPT_NAME_KOR} / {user.PSTN_NAME_KOR}
        </div>
        {isDraggable && (
          <div className="btnUserDel">
            <button type="button" onClick={() => removeCheckedUsers(user)} title="삭제" />
          </div>
        )}
      </div>
    );
  }
}

UserInfo.propTypes = {
  isDraggable: PropTypes.bool,
  user: PropTypes.object,
  removeCheckedUsers: PropTypes.func,
};

UserInfo.defaultProps = {
  isDraggable: false,
  user: {},
  removeCheckedUsers: () => {},
};

export default UserInfo;
