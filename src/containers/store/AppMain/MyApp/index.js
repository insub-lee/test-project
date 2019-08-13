import React from 'react';
import { Route, Switch } from 'react-router-dom';

import MyAppList from './MyAppList';
import MyAppRegis from './MyAppRegis';
import MyAppDetail from './MyAppDetail';
import MyAppUpdate from './MyAppUpdate';

class MyApp extends React.Component {
  constructor(prop) {
    super(prop);
    this.state = {
      // title: 'MyApp',
    };
  }

  render() {
    return (
      <div>
        <Switch>
          <Route path="/store/appMain/MyApp" component={MyAppList} exact />
          <Route path="/store/appMain/MyApp/MyAppRegis" component={MyAppRegis} />
          <Route path="/store/appMain/MyApp/MyAppDetail/:APP_ID/:VER" component={MyAppDetail} exact />
          <Route path="/store/appMain/MyApp/MyAppUpdate/:uv/:APP_ID/:VER/:tabNum/:svcyn" component={MyAppUpdate} />
        </Switch>
      </div>
    );
  }
}

export default MyApp;
