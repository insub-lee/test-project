import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import RootMap from './RootMap';
import CategoryMap from './CategoryMap';

class Classify extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <Switch>
          <Route path="/admin/adminmain/classify/:GUBUN" component={RootMap} exact />
          <Route path="/admin/adminmain/classify/:GUBUN/:MAP_ID" component={CategoryMap} exact />
        </Switch>
      </div>
    );
  }
}

export default Classify;
