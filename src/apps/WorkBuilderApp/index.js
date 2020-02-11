import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Loadable from 'components/Loadable';

// import WorkBuilderListPage from './Admin/WorkBuilderListPage';
// import WorkBuilderDetailPage from './Admin/WorkBuilderDetailPage';
// import WorkBuilderToAppPage from './Admin/WorkBuilderToAppPage';
// import WorkBuilderViewer from './User/WorkBuilderViewerPage';
const WorkBuilderListPage = Loadable({ loader: () => import('./Admin/WorkBuilderListPage') });
const WorkBuilderDetailPage = Loadable({ loader: () => import('./Admin/WorkBuilderDetailPage') });
const WorkBuilderToAppPage = Loadable({ loader: () => import('./Admin/WorkBuilderToAppPage') });
const WorkBuilderViewer = Loadable({ loader: () => import('./User/WorkBuilderViewerPage') });

export const WorkBuilderApp = () => (
  <div>
    <Switch>
      <Route path="/apps/workBuilder/:ID" component={WorkBuilderViewer} />
    </Switch>
  </div>
);

export const WorkBuilderAppAdmin = () => (
  <div>
    <Switch>
      <Route path="/admin/workBuilder" component={WorkBuilderListPage} exact />
      <Route path="/admin/workBuilder/manageApp" component={WorkBuilderToAppPage} />
      <Route path="/admin/workBuilder/:ID" component={WorkBuilderDetailPage} />
    </Switch>
  </div>
);
