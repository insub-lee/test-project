import { fromJS } from 'immutable';

// 임시데이터
const fakeDataList1 = fromJS([
  {
    SITE_ID: '1', NAME_KOR: '차세대 반응형 포털 DEV', NAME_ENG: '품질보증', NAME_CHN: 'Foundy고객포털', URL: 'http://portal.skhynix.com', REG_DTTM: '2018.02.26', state: 0,
  },
  {
    SITE_ID: '2', NAME_KOR: '차세대 반응형 포털 DEV', NAME_ENG: '경영지원', NAME_CHN: '법인판매지원', URL: 'http://portal.skhynix.com', REG_DTTM: '2018.02.25', state: 0,
  },
  {
    SITE_ID: '3', NAME_KOR: '임시 게시판', NAME_ENG: '기업문화', NAME_CHN: '사내표준관리', URL: 'http://portal.skhynix.com/tmp', REG_DTTM: '2018.02.24', state: 0,
  },
  {
    SITE_ID: '4', NAME_KOR: '신규 게시판', NAME_ENG: '기업문화', NAME_CHN: 'DRAM생물관리시스템', URL: 'http://portal.skhynix.com/new', REG_DTTM: '2018.02.23', state: 0,
  },
  {
    SITE_ID: '5', NAME_KOR: '차세대 반응형 포털 내부 COMM.', NAME_ENG: '경영지원', NAME_CHN: 'Memory외주관리', URL: 'http://portal.skhynix.com/comm', REG_DTTM: '2018.02.13', state: 0,
  },
  {
    SITE_ID: '6', NAME_KOR: '차세대 반응형 포털 내부 COMM.', NAME_ENG: '경영지원', NAME_CHN: '사내표준관리', URL: 'http://portal.skhynix.com/comm', REG_DTTM: '2018.02.13', state: 0,
  },
  {
    SITE_ID: '7', NAME_KOR: '차세대 반응형 포털 내부 COMM.', NAME_ENG: '기업문화', NAME_CHN: 'DRAM생물관리시스템', URL: 'http://portal.skhynix.com/comm', REG_DTTM: '2018.02.14', state: 0,
  },
  {
    SITE_ID: '8', NAME_KOR: '차세대 반응형 포털 내부 COMM.', NAME_ENG: '경영지원', NAME_CHN: '사내표준관리', URL: 'http://portal.skhynix.com', REG_DTTM: '2018.02.13', state: 0,
  },
  {
    SITE_ID: '9', NAME_KOR: '폐쇄 대기 게시판', NAME_ENG: '경영지원', NAME_CHN: 'DRAM생물관리시스템', URL: 'http://portal.skhynix.com/close', REG_DTTM: '2018.02.13', state: 0,
  },
  {
    SITE_ID: '10', NAME_KOR: '폐쇄 대기 게시판', NAME_ENG: '경영지원', NAME_CHN: 'Memory외주관리', URL: 'http://portal.skhynix.com/close', REG_DTTM: '2018.02.13', state: 0,
  },
  {
    SITE_ID: '11', NAME_KOR: '차세대 반응형 포털 DEV', NAME_ENG: '품질보증', NAME_CHN: 'Foundy고객포털', URL: 'http://portal.skhynix.com', REG_DTTM: '2018.02.26', state: 0,
  },
  {
    SITE_ID: '12', NAME_KOR: '차세대 반응형 포털 DEV', NAME_ENG: '경영지원', NAME_CHN: '법인판매지원', URL: 'http://portal.skhynix.com', REG_DTTM: '2018.02.25', state: 0,
  },
  {
    SITE_ID: '13', NAME_KOR: '차세대 반응형 포털 DEV', NAME_ENG: '품질보증', NAME_CHN: 'Foundy고객포털', URL: 'http://portal.skhynix.com', REG_DTTM: '2018.02.26', state: 0,
  },
  {
    SITE_ID: '14', NAME_KOR: '차세대 반응형 포털 DEV', NAME_ENG: '경영지원', NAME_CHN: '법인판매지원', URL: 'http://portal.skhynix.com', REG_DTTM: '2018.02.25', state: 0,
  },
  {
    SITE_ID: '15', NAME_KOR: '임시 게시판', NAME_ENG: '기업문화', NAME_CHN: '사내표준관리', URL: 'http://portal.skhynix.com/tmp', REG_DTTM: '2018.02.24', state: 0,
  },
  {
    SITE_ID: '16', NAME_KOR: '신규 게시판', NAME_ENG: '기업문화', NAME_CHN: 'DRAM생물관리시스템', URL: 'http://portal.skhynix.com/new', REG_DTTM: '2018.02.23', state: 0,
  },
  {
    SITE_ID: '17', NAME_KOR: '차세대 반응형 포털 내부 COMM.', NAME_ENG: '경영지원', NAME_CHN: 'Memory외주관리', URL: 'http://portal.skhynix.com/comm', REG_DTTM: '2018.02.13', state: 0,
  },
  {
    SITE_ID: '18', NAME_KOR: '차세대 반응형 포털 내부 COMM.', NAME_ENG: '경영지원', NAME_CHN: '사내표준관리', URL: 'http://portal.skhynix.com/comm', REG_DTTM: '2018.02.13', state: 0,
  },
  {
    SITE_ID: '19', NAME_KOR: '차세대 반응형 포털 내부 COMM.', NAME_ENG: '기업문화', NAME_CHN: 'DRAM생물관리시스템', URL: 'http://portal.skhynix.com/comm', REG_DTTM: '2018.02.14', state: 0,
  },
  {
    SITE_ID: '20', NAME_KOR: '차세대 반응형 포털 내부 COMM.', NAME_ENG: '경영지원', NAME_CHN: '사내표준관리', URL: 'http://portal.skhynix.com', REG_DTTM: '2018.02.13', state: 0,
  },
  {
    SITE_ID: '21', NAME_KOR: '폐쇄 대기 게시판', NAME_ENG: '경영지원', NAME_CHN: 'DRAM생물관리시스템', URL: 'http://portal.skhynix.com/close', REG_DTTM: '2018.02.13', state: 0,
  },
  {
    SITE_ID: '22', NAME_KOR: '폐쇄 대기 게시판', NAME_ENG: '경영지원', NAME_CHN: 'Memory외주관리', URL: 'http://portal.skhynix.com/close', REG_DTTM: '2018.02.13', state: 0,
  },
  {
    SITE_ID: '23', NAME_KOR: '차세대 반응형 포털 DEV', NAME_ENG: '품질보증', NAME_CHN: 'Foundy고객포털', URL: 'http://portal.skhynix.com', REG_DTTM: '2018.02.26', state: 0,
  },
  {
    SITE_ID: '24', NAME_KOR: '차세대 반응형 포털 DEV', NAME_ENG: '경영지원', NAME_CHN: '법인판매지원', URL: 'http://portal.skhynix.com', REG_DTTM: '2018.02.25', state: 0,
  },
]);

const fakeData = {
  fakeDataList1,
};

export default fakeData;
