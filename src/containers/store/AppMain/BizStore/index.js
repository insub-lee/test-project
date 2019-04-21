import React from 'react';
import { Route } from 'react-router-dom';

import AppList from '../AppList';
import Biz from '../Biz';
import AppDetail from '../AppDetail';

const BizStore = () => (
  <div>
    {/* 비즈앱 메인 콘텐츠 */}
    <Route path="/store/appMain/bizStore" component={AppList} exact />
    <Route path="/store/appMain/bizStore/app/list" component={AppList} exact />
    <Route path="/store/appMain/bizStore/app/list/:CATG_ID" component={AppList} exact />
    <Route path="/store/appMain/bizStore/app/search/:searchword" component={AppList} />
    <Route path="/store/appMain/bizStore/biz" component={Biz} />
    <Route path="/store/appMain/bizStore/app/detail/:CATG_ID/:APP_ID" component={AppDetail} />
  </div>
  // ));
);

// export default wrap(AppMain);
export default BizStore;

