import React from 'react';
import { Link, Switch, Route } from 'react-router-dom';

import DraggableModal from './DraggableModal';
// import WithPortal from './WithPortal';

const App = () => (
  <div>
    <ul>
      {/* <li><Link to="/withPortal">Portal With New Tab</Link></li> */}
      <li>
        <Link to="/draggableModal">Draggable Modal Example</Link>
      </li>
    </ul>
    <hr />
    <Switch>
      {/* <Route exact path="/withPortal">
        <WithPortal />
      </Route> */}
      <Route exact path="/draggableModal">
        <DraggableModal />
      </Route>
      <Route path="/">위 메뉴 클릭시 샘플 노출</Route>
    </Switch>
  </div>
);

export default App;
