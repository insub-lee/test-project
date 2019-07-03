// import React from 'react';
import React, { PureComponent } from 'react';
import { Route, Switch } from 'react-router-dom';
import { DragDropContext as dragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import WorkBuilderDetailPage from 'apps/WorkBuilderApp/WorkBuilderDetailPage';
import WorkBuilderListPage from 'apps/WorkBuilderApp/WorkBuilderListPage';
import WorkBuilderToAppPage from 'apps/WorkBuilderApp/WorkBuilderToAppPage';

import CodeAdmin from './CodeAdmin';
import SiteAdmin from './SiteAdmin';
import GlobalAdmin from './GlobalAdmin';
import NotifyAdmin from './NotifyAdmin';
import VgroupAdmin from './VgroupAdmin';
import OrgAdmin from './OrgAdmin';
import Category from './Category';
import Position from './Position';
import Duty from './Duty';
import Dept from './Dept';
import UserReg from './User';
import AppStore from './AppStore';

// const wrap = dragDropContext(HTML5Backend);

// const AdminMain = () => (
//   <div>
//     {/* 어드민 메인 콘텐츠 */}
//     <Route path="/admin/adminmain/codeadmin" component={CodeAdmin} />
//     <Route path="/admin/adminmain/siteadmin" component={SiteAdmin} />
//     <Route path="/admin/adminmain/globaladmin" component={GlobalAdmin} />
//     <Route path="/admin/adminmain/vgroupadmin" component={VgroupAdmin} />
//     <Route path="/admin/adminmain/orgadmin" component={OrgAdmin} />
//     <Route path="/admin/adminmain/notifyadmin" component={NotifyAdmin} />
//   </div>
// );

// export default wrap(AdminMain);

class wrap extends PureComponent {
  render() {
    console.log(this.props);
    return (
      <div>
        {/* 어드민 메인 콘텐츠 */}
        <Switch>
          <Route path="/admin/adminmain/codeadmin" component={CodeAdmin} />
          <Route path="/admin/adminmain/siteadmin" component={SiteAdmin} />
          <Route path="/admin/adminmain/globaladmin" component={GlobalAdmin} />
          <Route path="/admin/adminmain/vgroupadmin" component={VgroupAdmin} />
          <Route path="/admin/adminmain/orgadmin" component={OrgAdmin} />
          <Route path="/admin/adminmain/notifyadmin" component={NotifyAdmin} />
          <Route path="/admin/adminmain/category" component={Category} />
          <Route path="/admin/adminmain/position" component={Position} />
          <Route path="/admin/adminmain/duty" component={Duty} />
          <Route path="/admin/adminmain/dept" component={Dept} />
          <Route path="/admin/adminmain/account" exact component={UserReg} />
          <Route path="/admin/adminmain/account/:USER_ID" component={UserReg} />
          <Route path="/admin/adminmain/appstore" component={AppStore} />
          <Route path="/admin/adminmain/workBuilder" component={WorkBuilderListPage} exact />
          <Route path="/admin/adminmain/workBuilder/manageApp" component={WorkBuilderToAppPage} exact />
          <Route path="/admin/adminmain/workBuilder/:ID" component={WorkBuilderDetailPage} />
        </Switch>
      </div>
    );
  }
}


export default dragDropContext(HTML5Backend)(wrap);
