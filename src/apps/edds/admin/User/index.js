import React, { Component } from 'react';
import BizMicroDevBase from 'components/BizMicroDevBase';
import UserList from './UserList';

class User extends Component {
  render() {
    return <BizMicroDevBase id="userList" component={UserList} />
  }
}

export default User;