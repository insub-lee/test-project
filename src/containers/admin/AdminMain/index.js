// import React from 'react';
import React, { PureComponent } from 'react';
import { Route, Switch } from 'react-router-dom';
import { DragDropContext as dragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import WorkBuilderDetailPage from 'apps/WorkBuilderApp/Admin/WorkBuilderDetailPage';
import WorkBuilderListPage from 'apps/WorkBuilderApp/Admin/WorkBuilderListPage';
import WorkBuilderToAppPage from 'apps/WorkBuilderApp/Admin/WorkBuilderToAppPage';
import WorkBuilderCompMgr from 'apps/WorkBuilderApp/Admin/WorkBuilderCompMgr';
import WorkBuilderAPIMgr from 'apps/WorkBuilderApp/Admin/WorkBuilderApiMgr';
import WorkBuilderOptionMgr from 'apps/WorkBuilderApp/Admin/WorkBuilderOptionMgr';
import WorkBuilderSysFieldMgr from 'apps/WorkBuilderApp/Admin/WorkBuilderSysFieldMgr';
import FileManager from 'apps/FileManager';
import ProcessMgr from 'apps/Workflow/Admin/ProcessMgr';

import CodeAdmin from './CodeAdmin';
import SiteAdmin from './SiteAdmin';
import GlobalAdmin from './GlobalAdmin';
import NotifyAdmin from './NotifyAdmin';
import VgroupAdmin from './VgroupAdmin';
import OrgAdmin from './OrgAdmin';
import Category from './Category';
import Position from './Position';
import Rank from './Rank';
import Duty from './Duty';
import Dept from './Dept';
import UserAdmin from './UserAdmin';
import AppStore from './AppStore';
import Menu from './Menu';
import App from './App';
import Classify from './Classify';
import Node from './Node';

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
          <Route path="/admin/adminmain/filemanager" component={FileManager} />
          <Route path="/admin/adminmain/sysapp" component={App} />
          <Route path="/admin/adminmain/codeadmin" component={CodeAdmin} />
          <Route path="/admin/adminmain/siteadmin" component={SiteAdmin} />
          <Route path="/admin/adminmain/globaladmin" component={GlobalAdmin} />
          <Route path="/admin/adminmain/vgroupadmin" component={VgroupAdmin} />
          <Route path="/admin/adminmain/orgadmin" component={OrgAdmin} />
          <Route path="/admin/adminmain/notifyadmin" component={NotifyAdmin} />
          <Route path="/admin/adminmain/category" component={Category} />
          <Route path="/admin/adminmain/position" component={Position} />
          <Route path="/admin/adminmain/rank" component={Rank} />
          <Route path="/admin/adminmain/duty" component={Duty} />
          <Route path="/admin/adminmain/dept" component={Dept} />
          <Route path="/admin/adminmain/appstore" component={AppStore} />
          <Route path="/admin/adminmain/workbuilder" component={WorkBuilderListPage} exact />
          <Route path="/admin/adminmain/workbuilder/manageapp" component={WorkBuilderToAppPage} exact />
          <Route path="/admin/adminmain/workbuilder/:ID" component={WorkBuilderDetailPage} />
          <Route path="/admin/adminmain/account" component={UserAdmin} />
          <Route path="/admin/adminmain/classify" component={Classify} />
          <Route path="/admin/adminmain/node" component={Node} />
          <Route path="/admin/adminmain/ProcessMgr" component={ProcessMgr} />
          <Route path="/admin/adminmain/workBuilderCompMgr" component={WorkBuilderCompMgr} />
          <Route path="/admin/adminmain/WorkBuilderApiMgr" component={WorkBuilderAPIMgr} />
          <Route path="/admin/adminmain/WorkBuilderOptionMgr" component={WorkBuilderOptionMgr} />
          <Route path="/admin/adminmain/WorkBuilderSysFieldMgr" component={WorkBuilderSysFieldMgr} />
          {/* Route 추가시 아래의 Route 위에 추가 하세요 */}
          <Route path="/admin/adminmain/:MENU/" component={Menu} />
        </Switch>
      </div>
    );
  }
}

export default dragDropContext(HTML5Backend)(wrap);
