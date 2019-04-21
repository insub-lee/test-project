import { fromJS } from 'immutable';
import * as actionTypes from './constants';

const initialState = fromJS({
  collapsed: true,
  menus: [
    {
      key: 1,
      name: '계정/조직',
      nav: [
        {
          key: 1,
          name: 'Company 관리',
          link: '/admin/account/companyManage',
          subs: [],
        },
        {
          key: 2,
          name: '부서 관리',
          link: '/admin/account/divisionManage',
          subs: [],
        },
        {
          key: 3,
          name: '직급 관리',
          link: '/admin/account/positionManage',
          subs: [],
        },
        {
          key: 4,
          name: '직책 관리',
          link: '/admin/account/dutyManage',
          subs: [],
        },
        {
          key: 5,
          name: '사용자 관리',
          link: '/admin/account/userManage',
          subs: [],
        },
        {
          key: 6,
          name: '관리자 관리',
          link: '/admin/account/adminManage',
          subs: [],
        },
        {
          key: 7,
          name: '동기화 관리',
          link: '/admin/syncManage',
          subs: [],
        },
        {
          key: 8,
          name: '사이트 관리',
          link: '/admin/account/systemadmin/siteadmin',
          subs: [],
        },
        {
          key: 9,
          name: '공통코드 관리',
          link: '/admin/account/systemadmin/codeadmin',
          subs: [],
        },
        {
          key: 10,
          name: '다국어 메세지 관리',
          link: '/admin/account/systemadmin/globaladmin',
          subs: [],
        },
      ],
    },
    {
      key: 2,
      name: '채널',
      nav: [],
    },
    {
      key: 3,
      name: '채널2',
      nav: [],
    },
  ],
});

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.TOGGLE_COLLAPSE_SIDEBAR:
      return state.set('collapsed', !state.get('collapsed'));
    default:
      return state;
  }
};

export default appReducer;
