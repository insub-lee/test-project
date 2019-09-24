import { fromJS } from 'immutable';

// 임시데이터
const userList = fromJS([
  {
    USER_ID: 12345,
    EMP_NO: 'X0000000',
    NAME_KOR: '홍길동',
    NAME_ENG: '홍길동',
    NAME_CHN: '홍길동',
    NAME_JPN: '홍길동',
    NAME_ETC: '홍길동',
    EMAIL: 'hkd@email.com',
    DEPT_ID: 60570,
    DEPT_NAME_KOR: '정보화개발',
    DEPT_NAME_ENG: '정보화개발',
    DEPT_NAME_CHN: '정보화개발',
    DEPT_NAME_JPN: '정보화개발',
    DEPT_NAME_ETC: '정보화개발',
    PSTN_ID: 60679,
    PSTN_NAME_KOR: '선임',
    PSTN_NAME_ENG: '선임',
    PSTN_NAME_CHN: '선임',
    PSTN_NAME_JPN: '선임',
    PSTN_NAME_ETC: '선임',
    DUTY_ID: -1,
    DUTY_NAME_KOR: ' ',
    DUTY_NAME_ENG: ' ',
    DUTY_NAME_CHN: ' ',
    DUTY_NAME_JPN: ' ',
    DUTY_NAME_ETC: ' ',
    PHOTO: ' ',
    OFFICE_TEL_NO: ' ',
    MOBILE_TEL_NO: '010-1234-4321',
    COMP_CD: '1000',
    SUB_EMP_NO: ' ',
    SUB_COMP_CD: ' ',
    SUB_EMAIL: ' ',
    EMP_TYPE: 'E',
    DSPT_YN: 'N',
    SITE_ID: 1,
  },
]);

const fakeData = {
  userList,
};

export default fakeData;
