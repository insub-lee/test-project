import React from 'react';
import { Route, Switch } from 'react-router-dom';
// import Loadable from 'components/Loadable';

import RootMap from './RootMap';
import CategoryMap from './CategoryMap';
// const RootMap = Loadable({ loader: import('./RootMap') });
// const CategoryMap = Loadable({ loader: import('./CategoryMap') });

const Classify = () => (
  <div>
    <Switch>
      <Route path="/admin/adminmain/classify/:GUBUN" component={RootMap} exact />
      <Route path="/admin/adminmain/classify/:GUBUN/:MAP_ID" component={CategoryMap} exact />
    </Switch>
  </div>
);

export default Classify;
