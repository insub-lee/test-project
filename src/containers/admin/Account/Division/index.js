import React, { Component } from 'react';
import Page from 'components/Page';

class MyFirstGrid extends Component {
  constructor(props) {
    super(props);

    // 사용자 목록 컬럼
    this.columns = [
      {
        title: '',
        desc: 'DESC1',
        id: 'a',
        path: 'samples/recharts/index',
        position: [0, 0, 1, 1],
        ord: 0,
        fixed: true,
        isAuth: true,
        isTitle: false,
        link: 'http://iflowdev.com',
        type: 'app',
        bgColor: '#ffffff',
        color: '#404040',
        functions: {
          notify: true,
          settings: true,
          reload: true,
          details: true,
        },
        data: {
          type: 'appType1',
          initData: ['initData'],
          d1: [1, 2, 3, 5],
        },
      },
      {
        title: '메일',
        desc: 'DESC2',
        id: 'b',
        path: 'samples/card/card-widgets',
        position: [1, 0, 1, 1],
        ord: 1,
        fixed: false,
        isAuth: true,
        isTitle: true,
        link: 'http://iflowdev.com',
        type: 'app',
        bgColor: '#ffffff',
        color: '#404040',
        functions: {
          notify: true,
          settings: true,
          reload: true,
          details: false,
        },
        data: {
          type: 'appType2',
          initData: ['initData1', 'initData2'],
        },
      },
      {
        title: 'INDEX3',
        desc: 'DESC3',
        id: 'c',
        path: 'samples/card/card-widgets',
        position: [2, 0, 1, 1],
        ord: 2,
        fixed: false,
        isAuth: true,
        isTitle: true,
        link: 'http://iflowdev.com',
        type: 'app',
        bgColor: '#ffffff',
        color: '#404040',
        functions: {
          notify: false,
          settings: true,
          reload: true,
          details: true,
        },
        data: {
          type: 'appType3',
          initData: ['initData6', 4, 5, 6, 7],
        },
      },
      {
        title: 'INDEX4',
        desc: 'DESC4',
        id: 'd',
        path: 'samples/recharts/index',
        position: [3, 0, 1, 1],
        ord: 3,
        fixed: false,
        isAuth: true,
        isTitle: true,
        link: 'http://iflowdev.com',
        type: 'app',
        bgColor: '#ffffff',
        color: '#404040',
        functions: {
          notify: true,
          settings: true,
          reload: true,
          details: true,
        },
        data: {
          type: 'appType4',
          initData: ['initData4'],
        },
      },
      {
        title: 'INDEX5',
        desc: 'DESC5',
        id: 'e',
        path: 'samples/card/card-widgets',
        position: [4, 0, 1, 1],
        ord: 4,
        fixed: false,
        isAuth: true,
        isTitle: true,
        link: 'http://iflowdev.com',
        type: 'app',
        bgColor: '#ddeef9',
        color: '#404040',
        functions: {
          notify: true,
          settings: true,
          reload: true,
          details: true,
        },
        data: {
          type: 'appType5',
          initData: ['initData5'],
        },
      },
      {
        title: 'INDEX6',
        desc: 'DESC6',
        id: 'f',
        path: 'samples/card/card-widgets',
        position: [5, 0, 1, 1],
        ord: 5,
        fixed: false,
        isAuth: true,
        isTitle: true,
        link: 'http://iflowdev.com',
        type: 'app',
        bgColor: '#464646',
        color: '#ffffff',
        functions: {
          notify: false,
          settings: true,
          reload: false,
          details: false,
        },
        data: {
          type: 'appType6',
          initData: ['initData6'],
        },
      },
    ];
  }
  render() {
    return (
      <Page columns={this.columns} />
    );
  }
}

export default MyFirstGrid;
