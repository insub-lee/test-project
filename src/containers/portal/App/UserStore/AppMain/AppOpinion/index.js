import React from 'react';
import { Route, Switch } from 'react-router-dom';
import ExaminePage from './ExaminePage';
import AppOpinion from './Opinion';

const BizStore = () => (
  <div>
    <Switch>
      {/* 비즈앱 메인 콘텐츠 */}
      <Route path="/store/appMain/AppOpinion" component={AppOpinion} exact />
      <Route path="/store/appMain/AppOpinion/ExaminePage" component={ExaminePage} />
    </Switch>
  </div>
  // ));
);

// export default wrap(AppMain);
export default BizStore;

