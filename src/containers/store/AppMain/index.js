import React from 'react';
import { Route, Switch } from 'react-router-dom';
// import { DragDropContext as dragDropContext } from 'react-dnd';
// import HTML5Backend from 'react-dnd-html5-backend';
// import { toClass } from 'recompose';

// import AppList from './AppList';
// import Biz from './Biz';
// import AppDetail from './AppDetail';

import MyPage from './MyPage';
import BizManage from './BizManage';
import Organization from './Organization';
import MyApp from './MyApp';
import AppOpinion from './AppOpinion';
import AppSec from './AppSec';
// import ExaminePage from './AppOpinion/ExaminePage';
import ErrorPage from './ErrorPage';
import BizStore from './BizStore';

// const wrap = dragDropContext(HTML5Backend);

// const AppMain = toClass(() => (
const AppMain = () => (
  <div>
    <Switch>
      {/* 비즈앱 메인 콘텐츠 */}
      <Route path="/store/appMain/bizStore" component={BizStore} />
      <Route path="/store/appMain/myPage" component={MyPage} />
      <Route path="/store/appMain/bizManage" component={BizManage} />
      <Route path="/store/appMain/organization" component={Organization} />
      <Route path="/store/appMain/MyApp" component={MyApp} />
      <Route path="/store/appMain/AppOpinion" component={AppOpinion} />
      <Route path="/store/appMain/AppSec" component={AppSec} />
      {/* <Route path="/store/appMain/ExaminePage" component={ExaminePage} /> */}
      <Route path="/store/appMain/errorPage" component={ErrorPage} exact />
      {/* Biz Store 세부 콘텐츠 */}
      {/* <Route path="/store/appMain/bizStore/app/list" component={AppList} exact />
        <Route path="/store/appMain/bizStore/app/list/:CATG_ID" component={AppList} exact />
        <Route path="/store/appMain/bizStore/app/search/:searchword" component={AppList} />
        <Route path="/store/appMain/bizStore/biz" component={Biz} />
        <Route path="/store/appMain/bizStore/app/detail/:CATG_ID/:APP_ID" component={AppDetail} /> */}
    </Switch>
  </div>
  // ));
);

// export default wrap(AppMain);
export default AppMain;
