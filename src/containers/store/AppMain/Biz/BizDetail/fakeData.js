import { fromJS } from 'immutable';

// 임시데이터
const fakeAppList = fromJS([
  {
    key: 'app1',
    title: 'Foundry 고객포탈',
    subTitle: 'App에 대한 소개글이다',
    state: 0,
  },
  {
    key: 'app2',
    title: '법인판매지원',
    subTitle: 'App에 대한 소개글이다',
    state: 0,
  },
  {
    key: 'app3',
    title: '사내표준관리',
    subTitle: 'App에 대한 소개글이다',
    state: 0,
  },
  {
    key: 'app4',
    title: '상품화체계 및 매출/수익성분석',
    subTitle: 'App에 대한 소개글이다',
    state: 0,
  },
  {
    key: 'app5',
    title: '영업SCM',
    subTitle: 'App에 대한 소개글이다',
    state: 0,
  },
  {
    key: 'app6',
    title: '전사품질포탈',
    subTitle: 'App에 대한 소개글이다',
    state: 0,
  },
  {
    key: 'app7',
    title: '통합물류',
    subTitle: 'App에 대한 소개글이다',
    state: 0,
  },
  {
    key: 'app8',
    title: 'DRAM샘플관리시스템',
    subTitle: 'App에 대한 소개글이다',
    state: 0,
  },
  {
    key: 'app9',
    title: 'DRAM샘플관리시스템',
    subTitle: 'App에 대한 소개글이다',
    state: 0,
  },
  {
    key: 'app10',
    title: 'Memory외주관리',
    subTitle: 'App에 대한 소개글이다',
    state: 0,
  },
  {
    key: 'app11',
    title: 'Foundry 고객포탈',
    subTitle: 'App에 대한 소개글이다',
    state: 0,
  },
  {
    key: 'app12',
    title: '법인판매지원',
    subTitle: 'App에 대한 소개글이다',
    state: 0,
  },
  {
    key: 'app13',
    title: '사내표준관리',
    subTitle: 'App에 대한 소개글이다',
    state: 0,
  },
  {
    key: 'app14',
    title: '상품화체계 및 매출/수익성분석',
    subTitle: 'App에 대한 소개글이다',
    state: 0,
  },
  {
    key: 'app15',
    title: '영업SCM',
    subTitle: 'App에 대한 소개글이다',
    state: 0,
  },
  {
    key: 'app16',
    title: '전사품질포탈',
    subTitle: 'App에 대한 소개글이다',
    state: 0,
  },
  {
    key: 'app17',
    title: '통합물류',
    subTitle: 'App에 대한 소개글이다',
    state: 0,
  },
  {
    key: 'app18',
    title: 'DRAM샘플관리시스템',
    subTitle: 'App에 대한 소개글이다',
    state: 0,
  },
  {
    key: 'app19',
    title: 'DRAM샘플관리시스템',
    subTitle: 'App에 대한 소개글이다',
    state: 0,
  },
  {
    key: 'app20',
    title: 'Memory외주관리',
    subTitle: 'App에 대한 소개글이다',
    state: 0,
  },
]);

const fakeCategoryData = fromJS([
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
  fakeAppList,
  fakeCategoryData,
};

export default fakeData;
