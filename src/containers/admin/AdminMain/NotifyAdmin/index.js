import React from 'react';
import { Route } from 'react-router-dom';
import Footer from 'containers/admin/App/Footer';

import NotifyAdminList from './NotifyAdminList';
import NotifyAdminDtl from './NotifyAdminDtl';
import NotifyAdminReg from './NotifyAdminReg';
import NotifyAdminUdt from './NotifyAdminUdt';

class NotifyAdmin extends React.Component {
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
          <Route path="/admin/AdminMain/notifyadmin" component={NotifyAdminList} exact />
          <Route path="/admin/AdminMain/notifyAdmin/notifyAdminDtl" component={NotifyAdminDtl} exact />
          <Route path="/admin/AdminMain/notifyAdmin/notifyAdminReg" component={NotifyAdminReg} exact />
          <Route path="/admin/AdminMain/notifyAdmin/notifyAdminUdt" component={NotifyAdminUdt} exact />
        </div>
        <Footer />
      </div>
    );
  }
}

export default NotifyAdmin;
