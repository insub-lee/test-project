import React from 'react';
import { Route } from 'react-router-dom';
import Footer from 'containers/admin/App/Footer';

import OrgList from './OrgList';
// import OrgReg from './OrgReg';
// import OrgDetail from './OrgDetail';

class SiteAdmin extends React.Component {
  constructor(prop) {
    super(prop);
    this.state = {};
  }

  render() {
    return (
      <div>
        <div className="storeLayoutContentWrapper">
          <Route path="/admin/adminmain/orgadmin" component={OrgList} exact />
          <Footer />
        </div>
      </div>
    );
  }
}

export default SiteAdmin;
