import { fromJS } from 'immutable';
import { Cookies } from 'react-cookie';
import * as actionTypes from './constants';

const initialState = fromJS({
  uuid: null,
  profile: null,
  meta: {
    uuid: '',
    client: 0,
  },
  lastUrl: '/',
  language: 'KOR',
  UNREAD_CNT: null,
  SMSESSION: null,

  myHNotiCnt: 0,
});

let totalUnreadCnt = 0;
const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_SUCCESS: {
      Object.keys(action.UNREAD_CNT).forEach((o) => {
        totalUnreadCnt += Number(JSON.parse(action.UNREAD_CNT[o]).UNREAD_CNT);
      });
      document.querySelector('#uuid-portal').innerHTML = action.token;
      if (action.profile.client !== undefined &&
          (action.profile.client === 1 ||
            action.profile.client === 2 ||
            action.profile.client === '1' ||
            action.profile.client === '2')
      ) {
        document.location.href = `callNative://function/saveToken?token=${action.token}`;
      }
      const cookies = new Cookies();
      cookies.set('token', action.token, { path: '/' });
      return state.set('profile', action.profile)
        .set('meta', {
          uuid: action.token,
          client: action.profile.client !== undefined ? action.profile.client : 0,
        })
        .set('uuid', action.token)
        .set('UNREAD_CNT', action.UNREAD_CNT)
        .set('myHNotiCnt', totalUnreadCnt)
        .set('SMSESSION', action.SMSESSION);
    }
    case actionTypes.AUTH_LOGOUT:
      localStorage.removeItem('token');
      return initialState;
    case actionTypes.CHANGE_LANG:
      return state.set('language', action.language);
    case actionTypes.UNREAD_CNT_UPDATE:
      return state.set('UNREAD_CNT', action.UNREAD_CNT);
    case actionTypes.SET_HEADERNOTICNT_SUCCESS:
      return state.set('myHNotiCnt', action.resultValue.resultCnt);
    default:
      return state;
  }
};

export default authReducer;
