import React from 'react';
import { Route } from 'react-router-dom';
import Footer from 'containers/admin/App/Footer';

import CodeAdminList from './CodeAdminList';
// import CodeAdminRegister from './CodeAdminRegister';
import CodeAdminDtl from './CodeAdminDtl';

class CodeAdmin extends React.Component {
  constructor(prop) {
    super(prop);
    this.state = {
      // title: '공통코드 PAGE3',
    };
  }

  render() {
    return (
      <div>
        <div>
          <div className="storeLayoutContentWrapper">
            <Route path="/admin/AdminMain/CodeAdmin/" component={CodeAdminList} exact />
            <Route path="/admin/AdminMain/CodeAdmin/CodeAdminDtl" component={CodeAdminDtl} exact />
            <Route path="/admin/AdminMain/CodeAdmin/CodeAdminDtl/:CURRENT_MODE" component={CodeAdminDtl} exact />
            <Route path="/admin/AdminMain/CodeAdmin/CodeAdminDtl/:CURRENT_MODE/:CODE_GRP_CD" component={CodeAdminDtl} exact />
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default CodeAdmin;
