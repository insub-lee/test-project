import React from 'react';
import { Route, Switch } from 'react-router-dom';

import UserList from './UserList';
import UserReg from './UserDetail';

class UserAdmin extends React.Component {
  constructor(prop) {
    super(prop);
    this.state = {

    };
  }

  render() {
    return (
      <div>
        <Switch>
          <Route path="/admin/adminmain/account" component={UserList} exact />
          <Route path="/admin/adminmain/account/userReg" component={UserReg} exact />
          <Route path="/admin/adminmain/account/user/:USER_ID" component={UserReg} />
        </Switch>
      </div>
    );
  }
}

export default UserAdmin;
