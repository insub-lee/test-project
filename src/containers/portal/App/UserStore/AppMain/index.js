import React from 'react';
import { Route } from 'react-router-dom';
import BizStore from './BizStore';

const AppMain = () => (
  <div>
    <Route path="/portal/store/appMain" component={BizStore} />
  </div>
);

export default AppMain;
