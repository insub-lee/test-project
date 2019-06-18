import { fromJS } from 'immutable';
import * as constants from './constants';

const initialState = fromJS({
  c: '',
  nameKor: '',
  nameEng: '',
  nameChn: '',
  email: '',
  statusCd: 'C',
  deptId: '',
  deptName: '',
  pstnId: '',
  pstnName: '',
  dutyId: '',
  dutyName: '',
  officeTel: '',
  mobileTel: '',
  compCd: '',
  empCheck: false,
});

const UserRegReducer = (state = initialState, action) => {
  switch (action.type) {
    case constants.SET_EMPNO:
      return state.set('empCheck', action.payload);
    default:
      return state;
  }
};

export default UserRegReducer;
