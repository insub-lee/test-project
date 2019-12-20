const listOfA = [
  {
    id: 1,
    hasChild: 0,
    title: '개발자 가이드 안내',
    keyUrl: 'ComponentsMain',
  },
  {
    id: 1,
    hasChild: 1,
    title: '개요',
    children: [
      { title: '사용기술', keyUrl: 'tech' },
      { title: '환경설정', keyUrl: 'setting' },
      { title: '개발현황', keyUrl: 'development' },
    ],
  },
  {
    id: 2,
    hasChild: 1,
    title: '예제',
    children: [
      { title: '안내', keyUrl: 'exguide' },
      { title: '예제1', keyUrl: 'ex1' },
      { title: '예제2', keyUrl: 'ex2' },
      { title: '예제3', keyUrl: 'ex3' },
    ],
  },
  {
    id: 2,
    hasChild: 0,
    title: '참고 사이트/부서',
    keyUrl: 'site',
  },
  {
    id: 3,
    hasChild: 0,
    title: 'FAQ',
    keyUrl: 'faq',
  },
];

const listOfB = [
  {
    id: 1,
    hasChild: 0,
    title: '컴포넌트 가이드 안내',
    keyUrl: 'componentguide',
  },
  {
    id: 2,
    hasChild: 1,
    title: '일반',
    children: [{ title: 'Button', keyUrl: 'Button' }],
  },
  {
    id: 3,
    hasChild: 1,
    title: '데이터 입력',
    children: [
      { title: 'Radio', keyUrl: 'Radio' },
      { title: 'Input', keyUrl: 'Input' },
      { title: 'Checkbox', keyUrl: 'Checkbox' },
      { title: 'Datepicker', keyUrl: 'Datepicker' },
      { title: 'Select', keyUrl: 'Select' },
      { title: 'Upload', keyUrl: 'Upload' },
    ],
  },
  {
    id: 4,
    hasChild: 1,
    title: '디스플레이',
    children: [
      { title: 'Badge', keyUrl: 'Badge' },
      { title: 'Carousel', keyUrl: 'Carousel' },
      { title: 'Popover', keyUrl: 'Popover' },
      { title: 'Tabs', keyUrl: 'Tabs' },
      { title: 'Tooltip', keyUrl: 'Tooltip' },
      { title: 'Tree', keyUrl: 'Tree' },
      { title: 'Organization', keyUrl: 'Organization' },
      { title: 'Notification', keyUrl: 'Notification' },
      { title: 'Grid', keyUrl: 'Grid' },
      { title: 'Profile', keyUrl: 'Profile' },
      { title: 'AppSelector', keyUrl: 'AppSelector' },
    ],
  },
  {
    id: 5,
    hasChild: 1,
    title: '기타',
    children: [
      { title: 'Spin', keyUrl: 'Spin' },
      { title: 'Modal', keyUrl: 'Modal' },
    ],
  },
];

const listOfC = [
  {
    id: 1,
    hasChild: 0,
    title: '미정_가이드목록_기획필요',
    keyUrl: 'undefined',
  },
  {
    id: 1,
    hasChild: 1,
    title: 'Swagger',
    children: [
      { title: 'Article', keyUrl: 'Article' },
      { title: 'Auth', keyUrl: 'Auth' },
      { title: 'Guide', keyUrl: 'Guide' },
    ],
  },
];

const listOfD = [
  {
    id: 1,
    hasChild: 2,
    title: 'GIPMS',
    children: [
      { title: 'PM(TBM) Plan Modeling', keyUrl: 'PMSheet' },
      { title: 'InformNote', keyUrl: 'InformNote' },
      { title: 'GridSheet', keyUrl: 'GridSheet' },
      { title: 'MasterFncLoc', keyUrl: 'MasterFncLoc' },
      { title: 'DatePickerExample', keyUrl: 'DatePickerExample' },
      { title: 'MasterPmBomTree', keyUrl: 'MasterPmBomTree' },
    ],
  },
];

const ArticleList = [listOfA, listOfB, listOfC, listOfD];

export default ArticleList;
