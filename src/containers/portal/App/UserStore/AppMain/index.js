import React from 'react';
import { Route } from 'react-router-dom';
import BizStore from './BizStore';
import BizManage from './BizManage';
import MyPage from './MyPage';
import Organization from './Organization';
import ErrorPage from './ErrorPage';
import AppSec from './AppSec';
import MyApp from './MyApp';
import AppOpinion from './AppOpinion';

const AppMain = () => (
  <div>
    <Route path="/portal/store/appMain" component={BizStore} />
    <Route path="/portal/store/appMain/bizManage" component={BizManage} />
    <Route path="/portal/store/appMain/bizStore" component={BizStore} />

    <Route path="/portal/store/appMain/myPage" component={MyPage} />
    <Route path="/portal/store/appMain/organization" component={Organization} />
    <Route path="/portal/store/appMain/MyApp" component={MyApp} />
    <Route path="/portal/store/appMain/AppOpinion" component={AppOpinion} />
    <Route path="/portal/store/appMain/AppSec" component={AppSec} />
    <Route path="/portal/store/appMain/errorPage" component={ErrorPage} exact />
  </div>
);

export default AppMain;
