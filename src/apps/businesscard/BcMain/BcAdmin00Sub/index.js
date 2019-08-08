import React, { PureComponent } from 'react';
import { Route, Switch } from 'react-router-dom';
import { basicPath } from 'containers/common/constants';

import BcList from './BcList';
import BcDetail from './BcDetail';
import BcEdt from './BcinfoEdt';

class BcAdmin00 extends PureComponent {
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
              <Route path={`/${basicPath.APPS}/businesscard/BcMain/BcAdmin00Sub/`} component={BcList} exact />
              <Route path={`/${basicPath.APPS}/businesscard/BcMain/BcAdmin00Sub/BcDetail`} component={BcDetail} exact />
              <Route path={`/${basicPath.APPS}/businesscard/BcMain/BcAdmin00Sub/BcinfoEdt`} component={BcEdt} exact />
            </Switch>
          </div>
      </div>    


    );
  }
}

export default BcAdmin00;

