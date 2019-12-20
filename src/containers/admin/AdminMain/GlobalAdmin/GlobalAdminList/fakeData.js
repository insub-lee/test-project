import { fromJS } from 'immutable';

// 임시데이터
const fakeDataList1 = fromJS([
  {
    id: 1,
    key: '1',
    siteNm: '차세대 반응형 포탈',
    msgCd: 'T0001',
    msgKOR: '테스트메세지',
    msgENG: 'Test Message',
    msgCHN: '测试消息',
  },
  {
    id: 2,
    key: '2',
    siteNm: 'Test site 01',
    msgCd: 'T0002',
    msgKOR: '안녕하세요',
    msgENG: 'Hello',
    msgCHN: '你好',
  },
  {
    id: 3,
    key: '3',
    siteNm: 'Test site 02',
    msgCd: 'T0003',
    msgKOR: '돈',
    msgENG: 'Money',
    msgCHN: '钱',
  },
  {
    id: 4,
    key: '4',
    siteNm: '차세대 반응형 포탈',
    msgCd: 'T0004',
    msgKOR: '확인',
    msgENG: 'OK',
    msgCHN: '确认',
  },
  {
    id: 5,
    key: '5',
    siteNm: 'Test site 02',
    msgCd: 'T0005',
    msgKOR: '643 병살',
    msgENG: '643 double play',
    msgCHN: '643 双杀',
  },
  {
    id: 6,
    key: '6',
    siteNm: 'Test site 02',
    msgCd: 'T0003',
    msgKOR: '돈',
    msgENG: 'Money',
    msgCHN: '钱',
  },
  {
    id: 7,
    key: '7',
    siteNm: 'Test site 02',
    msgCd: 'T0003',
    msgKOR: '돈',
    msgENG: 'Money',
    msgCHN: '钱',
  },
  {
    id: 8,
    key: '8',
    siteNm: 'Test site 02',
    msgCd: 'T0003',
    msgKOR: '돈',
    msgENG: 'Money',
    msgCHN: '钱',
  },
  {
    id: 9,
    key: '9',
    siteNm: 'Test site 02',
    msgCd: 'T0003',
    msgKOR: '돈',
    msgENG: 'Money',
    msgCHN: '钱',
  },
  {
    id: 10,
    key: '10',
    siteNm: 'Test site 02',
    msgCd: 'T0003',
    msgKOR: '돈',
    msgENG: 'Money',
    msgCHN: '钱',
  },
  {
    id: 11,
    key: '11',
    siteNm: 'Test site 02',
    msgCd: 'T0003',
    msgKOR: '돈',
    msgENG: 'Money',
    msgCHN: '钱',
  },
  {
    id: 12,
    key: '12',
    siteNm: 'Test site 02',
    msgCd: 'T0003',
    msgKOR: '돈',
    msgENG: 'Money',
    msgCHN: '钱',
  },
  {
    id: 13,
    key: '13',
    siteNm: 'Test site 02',
    msgCd: 'T0003',
    msgKOR: '돈',
    msgENG: 'Money',
    msgCHN: '钱',
  },
]);

const filterList1 = fromJS([
  { id: 1, key: '1', name: '차세대 반응형 포탈' },
  { id: 2, key: '2', name: 'Test Site 01' },
  { id: 3, key: '3', name: 'Test Site 02' },
]);

const filterList2 = fromJS([
  { id: 1, name: '전체' },
  { id: 2, name: '메세지 코드' },
  { id: 3, name: '메세지 명' },
]);

const fakeData = {
  fakeDataList1,
  filterList1,
  filterList2,
};

export default fakeData;
