import { fromJS } from 'immutable';

// 임시데이터
const unreadedMailList = fromJS([
  {
    MAIL_TITLE: 'Mail Widget Test E-Mail',
    MAIL_DATE: '2018-08-03',
    FILE_YN: true,
  },
  {
    MAIL_TITLE: '보안 확인 회신 드립니다.',
    MAIL_DATE: '2018-07-27',
    FILE_YN: false,
  },
  {
    MAIL_TITLE: 'RE: IT보안 PC 점검요청 드립니다.',
    MAIL_DATE: '2018-07-27',
    FILE_YN: false,
  },
  {
    MAIL_TITLE: 'RE: IT보안 PC 점검요청 드립니다.',
    MAIL_DATE: '2018-07-27',
    FILE_YN: false,
  },
  {
    MAIL_TITLE: '[DRM]FindPassword',
    MAIL_DATE: '2018-07-27',
    FILE_YN: false,
  },
  {
    MAIL_TITLE: 'IT보안 PC 점검요청 드립니다.',
    MAIL_DATE: '2018-07-27',
    FILE_YN: true,
  },
]);

const fakeData = {
  unreadedMailList,
};

export default fakeData;
