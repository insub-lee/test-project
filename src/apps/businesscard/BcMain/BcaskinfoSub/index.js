import React, { PureComponent } from 'react';
import { Route, Switch } from 'react-router-dom';
import { basicPath } from 'containers/common/constants';

import BcinfoList from './BcinfoList';
import BcinfoReg from './BcinfoReg';
import BcinfoDetail from './BcinfoDetail';
import BcinfoEdt from './BcinfoEdt';

class Bcaskinfo extends PureComponent {
  constructor(prop) {
    super(prop);
    this.state = {};
  }


  render() {
    console.log(this.props);
    return (
      <div>
          <div className="storeLayoutContentWrapper">
            <Switch>
              <Route path={`/${basicPath.APPS}/businesscard/BcMain/BcaskinfoSub`} component={BcinfoList} exact />
              <Route path={`/${basicPath.APPS}/businesscard/BcMain/BcaskinfoSub/BcinfoReg`} component={BcinfoReg} exact />
              <Route path={`/${basicPath.APPS}/businesscard/BcMain/BcaskinfoSub/BcinfoDetail`} component={BcinfoDetail} exact />
              <Route path={`/${basicPath.APPS}/businesscard/BcMain/BcaskinfoSub/BcinfoEdt`} component={BcinfoEdt} exact />
            </Switch>
          </div>
      </div>    


    );
  }
}

export default Bcaskinfo;

