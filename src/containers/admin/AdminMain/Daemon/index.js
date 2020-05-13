import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Loadable from 'components/Loadable';

const DaemonList = Loadable({ loader: () => import('./DaemonList') });
const DaemonDetail = Loadable({ loader: () => import('./DaemonDetail') });
const DaemonLog = Loadable({ loader: () => import('./DaemonLog') });

const DaemonManager = () => (
  <div>
    <Switch>
      <Route path="/admin/adminmain/daemon" component={DaemonList} exact />
      <Route path="/admin/adminmain/daemon/daemonReg" component={DaemonDetail} exact />
      <Route path="/admin/adminmain/daemon/detail/:DAEMON_ID" component={DaemonDetail} exact />
      <Route path="/admin/adminmain/daemon/log/:DAEMON_ID" component={DaemonLog} exact />
    </Switch>
  </div>
);
export default DaemonManager;
