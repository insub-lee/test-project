import { fromJS } from 'immutable';

const categoryData = fromJS([
  {
    key: 'cate1',
    title: 'Marketing / Quality',
    state: 0,
    children: [
      {
        key: 'cate6',
        title: '전사',
        state: 0,
        children: [],
        path: '#cate1#cate6',
      },
      {
        key: 'cate7',
        title: '공통',
        state: 0,
        children: [],
        path: '#cate1#cate7',
      },
      {
        key: 'cate8',
        title: '구매/재무',
        state: 0,
        children: [],
        path: '#cate1#cate8',
      },
      {
        key: 'cate9',
        title: '경영/특허',
        state: 0,
        children: [],
        path: '#cate1#cate9',
      },
    ],
    path: '#cate1',
  },
  {
    key: 'cate2',
    title: 'Production',
    state: 0,
    children: [],
    path: '#cate2',
  },
  {
    key: 'cate3',
    title: 'Research',
    state: 0,
    children: [],
    path: '#cate3',
  },
  {
    key: 'cate4',
    title: '전사/공통(Supporting)',
    state: 0,
    children: [],
    path: '#cate4',
  },
  {
    key: 'cate5',
    title: '구매/재무(Supporting)',
    state: 0,
    children: [],
    path: '#cate5',
  },
]);

const fakeData = {
  categoryData,
};

export default fakeData;
