import React from 'react';
import { Route } from 'react-router-dom';
import Footer from 'containers/admin/App/Footer';

import GlobalAdminList from './GlobalAdminList';
import GlobalAdminDtl from './GlobalAdminDtl';

class GlobalAdmin extends React.Component {
  constructor(prop) {
    super(prop);
    this.state = {
      // title: '공통코드 PAGE3',
    };
  }

  render() {
    return (
      <div>
        <div className="storeLayoutContentWrapper">
          <Route path="/admin/adminMain/globalAdmin" component={GlobalAdminList} exact />
          <Route path="/admin/adminMain/globalAdmin/globalAdminDtl" component={GlobalAdminDtl} exact />
        </div>
        <Footer />
      </div>
    );
  }
}

export default GlobalAdmin;
