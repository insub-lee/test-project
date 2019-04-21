import { fromJS } from 'immutable';

// 임시데이터
const fakeDataList1 = fromJS([
  {
    key: '1', no: 1, codeGroupID: 'APPSIZE', codeGroupName: 'App 지원규격', registUser: '관리자', registDate: '2018.06.12', state: 0,
  },
  {
    key: '2', no: 2, codeGroupID: 'APPSUBITEM', codeGroupName: 'App 상세항목', registUser: '관리자', registDate: '2018.06.13', state: 0,
  },
  {
    key: '3', no: 3, codeGroupID: 'CONDITION', codeGroupName: '심사조건', registUser: '관리자', registDate: '2018.06.14', state: 0,
  },
  {
    key: '4', no: 4, codeGroupID: 'APPTYPE', codeGroupName: 'App 유형', registUser: '관리자', registDate: '2018.06.15', state: 0,
  },
]);

const fakeDataList2 = fromJS([
  {
    key: '1', no: 1, codeGroupID: 'APPSIZE', codeGroupName: 'App 지원규격', registUser: '관리자', registDate: '2018.06.12', state: 0,
  },
  {
    key: '2', no: 2, codeGroupID: 'APPSUBITEM', codeGroupName: 'App 상세항목', registUser: '관리자', registDate: '2018.06.13', state: 0,
  },
]);

const fakeData = {
  fakeDataList1,
  fakeDataList2,
};

export default fakeData;
