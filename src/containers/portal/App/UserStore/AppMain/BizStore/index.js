import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';

import Loadable from 'components/Loadable';

// import AppList from '../AppList';
// import Biz from '../Biz';

// import AppDetail from '../AppDetail/index';

const AppList = Loadable({ loader: () => import('../AppList') });
const Biz = Loadable({ loader: () => import('../Biz') });
const AppDetail = Loadable({ loader: () => import('../AppDetail') });

const BizStore = ({ execPage, execMenu }) => (
  <div>
    {/* 비즈앱 메인 콘텐츠 */}
    <Switch>
      <Route path="/portal/store/appMain/bizStore" component={AppList} exact />
      <Route path="/portal/store/appMain/bizStore/app/list" component={AppList} exact />
      <Route path="/portal/store/appMain/bizStore/app/list/:CATG_ID" component={AppList} exact />
      <Route path="/portal/store/appMain/bizStore/app/detail/:CATG_ID/:APP_ID" component={AppDetail} />
      <Route path="/portal/store/appMain/bizStore/app/search/:searchword" component={AppList} />
      <Route path="/portal/store/appMain/bizStore/biz" render={props => <Biz {...props} execMenu={execMenu} execPage={execPage} />} />
    </Switch>
  </div>
);

BizStore.propTypes = {
  execPage: PropTypes.func.isRequired,
  execMenu: PropTypes.func.isRequired,
};

export default BizStore;
