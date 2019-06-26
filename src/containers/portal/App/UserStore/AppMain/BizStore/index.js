import React from 'react';
import { Route } from 'react-router-dom';

import AppList from '../AppList';
// import Biz from '../Biz';

import AppDetail from '../AppDetail/index';

const BizStore = () => (
  <div>
    {/* 비즈앱 메인 콘텐츠 */}
    <Route path="/portal/store/appMain/bizStore" component={AppList} exact />
    <Route path="/portal/store/appMain/bizStore/app/list" component={AppList} exact />
    <Route path="/portal/store/appMain/bizStore/app/list/:CATG_ID" component={AppList} exact />
    <Route path="/portal/store/appMain/bizStore/app/search/:searchword" component={AppList} />
    <Route path="/portal/store/appMain/bizStore/app/detail/:CATG_ID/:APP_ID" component={AppDetail} />
    {/* <Route path="/portal/store/appMain/bizStore/biz" component={Biz} /> */}
  </div>
);

export default BizStore;
