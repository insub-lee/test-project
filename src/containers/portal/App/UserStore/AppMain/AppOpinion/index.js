import React from 'react';
import { Route } from 'react-router-dom';
import ExaminePage from './ExaminePage';
import AppOpinion from './Opinion';

const BizStore = () => (
  <div>
    {/* 비즈앱 메인 콘텐츠 */}
    <Route path="/store/appMain/AppOpinion" component={AppOpinion} exact />
    <Route path="/store/appMain/AppOpinion/ExaminePage" component={ExaminePage} />
  </div>
  // ));
);

// export default wrap(AppMain);
export default BizStore;

