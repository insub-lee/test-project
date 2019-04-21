import * as constants from './constants';

export const loadingMembers = () => (
  {
    type: constants.LOADING_MEMBERS_SAGA,
  }
);

// 구성원 즐겨찾기 위젯에서 설정버튼 클릭 시, 해당 사용자가 등록한 구성원 목록 불러오는 작업
export const loadingSettingMembers = () => (
  {
    type: constants.LOADING_SETTING_MEMBERS_SAGA,
  }
);

export const saveSettingMembers = (userSetMembers, srchUserIdArr) => (
  {
    type: constants.SAVE_SETTING_MEMBERS_SAGA,
    userSetMembers,
    srchUserIdArr,
  }
);

export const addMember = (users, item) => (
  {
    type: constants.ADD_MEMBER,
    users,
    item,
  }
);

export const deleteMember = (user, item) => (
  {
    type: constants.DELETE_MEMBER,
    user,
    item,
  }
);

export const dndChangePositionMember = (users, item) => (
  {
    type: constants.DND_CHANGE_POSITION_MEMBER,
    users,
    item,
  }
);

export const deleteAllMember = item => (
  {
    type: constants.DELETE_ALL_MEMBER_SAGA,
    item,
  }
);
