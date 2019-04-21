import { fromJS } from 'immutable';

// 임시데이터
const unreadedSignList = fromJS([
  {
    SIGN_TITLE: 'Sign Widget Test',
    SIGN_DATE: '2018-08-03',
    FILE_YN: true,
  },
  {
    SIGN_TITLE: '보안 관련 요청드립니다.',
    SIGN_DATE: '2018-07-27',
    FILE_YN: false,
  },
  {
    SIGN_TITLE: '8월 예정 시안.',
    SIGN_DATE: '2018-07-27',
    FILE_YN: false,
  },
  {
    SIGN_TITLE: '휴가 신청합니다.',
    SIGN_DATE: '2018-07-27',
    FILE_YN: false,
  },
  {
    SIGN_TITLE: '요청합니다.',
    SIGN_DATE: '2018-07-27',
    FILE_YN: false,
  },
  {
    SIGN_TITLE: '권한 신청합니다.',
    SIGN_DATE: '2018-07-27',
    FILE_YN: true,
  },
]);

const fakeData = {
  unreadedSignList,
};

export default fakeData;
