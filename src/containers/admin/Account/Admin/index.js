import React, { Component } from 'react';
import Loadable from 'react-loadable';
import Loading from './Loading';

export function createComponent(component) {
  console.log('COMP', component);
  const COMP = Loadable({
    // Adding fakeDelay below just so you can see the loading message display.
    loader: () => import(component.path),
    loading: Loading,
  });
  return <COMP />;
}
export function loader2(path) {
  return import(path);
}
export function createComponents(item) {
  console.log(item);
  // const path = 'Organization';
  // const path2 = 'store/AppMain/';
  const param = {
    loader: () => import(`containers/${item.path}`),
    loading: Loading,
  };
  const COMP = Loadable(param);
  return <COMP />;
}

class Admin extends Component {
  constructor(props) {
    super(props);

    // 사용자 목록 컬럼
    this.columns = [
      {
        title: 'INDEX1',
        path: 'admin/Account/Admin/index2',
      },
      {
        title: 'INDEX2',
        path: 'store/AppMain/Organization',
      },
    ];
  }

  render() {
    return (
      <div>
        {this.columns.map(createComponents)}
      </div>
    );
  }
}

export default Admin;
