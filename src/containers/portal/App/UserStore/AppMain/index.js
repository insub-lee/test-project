import React from 'react';
import { Route } from 'react-router-dom';
import BizStore from './BizStore';
import BizManage from './BizManage';

const AppMain = () => (
  <div>
    <Route path="/portal/store/appMain" component={BizStore} />
    <Route path="/portal/store/appMain/bizManage" component={BizManage} />
  </div>
);

export default AppMain;
