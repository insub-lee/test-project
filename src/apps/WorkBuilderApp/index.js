import React from 'react';
import { Switch, Route } from 'react-router-dom';

import WorkBuilderListPage from './WorkBuilderListPage';
import WorkBuilderDetailPage from './WorkBuilderDetailPage';
import WorkBuilderToAppPage from './WorkBuilderToAppPage';
import WorkBuilderViewer from './WorkBuilderViewerPage';

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
