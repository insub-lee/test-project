import React from 'react';
import { Route, Switch } from 'react-router-dom';

import NodeList from './NodeList';
import NodeRegist from './NodeRegist';
import NodeDetail from './NodeDetail';

class Node extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <Switch>
          <Route path="/admin/adminmain/node" component={NodeList} exact />
          <Route path="/admin/adminmain/node/nodeRegist/:NODE_ID" component={NodeRegist} exact />
          <Route path="/admin/adminmain/node/nodeDetail/:NODE_ID" component={NodeDetail} exact />
        </Switch>
      </div>
    );
  }
}

export default Node;
