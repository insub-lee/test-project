import { fromJS } from 'immutable';

// 임시데이터
const rows = fromJS([
  {
    id: 0, title: 'row1', count: 20,
  },
  {
    id: 1, title: 'row2', count: 40,
  },
  {
    id: 2, title: 'row3', count: 60,
  },
  {
    id: 3, title: 'row4', count: 80,
  },
  {
    id: 4, title: 'row5', count: 100,
  },
  {
    id: 5, title: 'row6', count: 60,
  },
  {
    id: 6, title: 'row7', count: 60,
  },
  {
    id: 7, title: 'row8', count: 60,
  },
  {
    id: 8, title: 'row9', count: 60,
  },
  {
    id: 9, title: 'row10', count: 60,
  },
]);

const fakeData = {
  rows,
};

export default fakeData;
