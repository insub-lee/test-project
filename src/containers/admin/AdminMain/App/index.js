import React from 'react';
import { Route, Switch } from 'react-router-dom';

import AppList from './AppList';
import AppRegis from './AppRegis';
import AppDetail from './AppDetail';
import AppUpdate from './AppUpdate';

class App extends React.Component {
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
          <Route path="/admin/adminmain/app" component={AppList} exact />
          <Route path="/admin/adminmain/app/appRegis" component={AppRegis} />
          <Route path="/admin/adminmain/app/appDetail/:APP_ID/:VER" component={AppDetail} exact />
          <Route path="/admin/adminmain/app/appUpdate/:uv/:APP_ID/:VER/:tabNum/:svcyn" component={AppUpdate} />
        </Switch>
      </div>
    );
  }
}

export default App;
