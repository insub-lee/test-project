import React from 'react';
import { Route } from 'react-router-dom';
import Footer from 'containers/admin/App/Footer';

import SiteList from './SiteList';
import SiteReg from './SiteReg';
import SiteDetail from './SiteDetail';

class SiteAdmin extends React.Component {
  constructor(prop) {
    super(prop);
    this.state = {};
  }

  render() {
    return (
      <div>
        <div className="storeLayoutContentWrapper">
          <Route path="/admin/adminmain/siteadmin" component={SiteList} exact />
          <Route path="/admin/adminmain/siteadmin/SiteReg" component={SiteReg} exact />
          {/* <Route path="/admin/adminmain/siteadmin/SiteDetail/:SITE_ID"
        component={SiteDetail} exact /> */}
          <Route path="/admin/adminmain/siteadmin/SiteDetail" component={SiteDetail} exact />
        </div>
        <Footer />
      </div>
    );
  }
}

export default SiteAdmin;
