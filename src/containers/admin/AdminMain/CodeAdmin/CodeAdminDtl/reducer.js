import { fromJS } from 'immutable';
import * as constants from './constants';

const initialState = fromJS({
  codeamdin: [],
  codeAdminDtl: [],
  codeGrpCd: false,
  // codeCd: false,
});

const codeAdminDtlReducer = (state = initialState, action) => {
  switch (action.type) {
    case constants.SET_CODE_ADMIN:
      // console.log('codeamdin_reduser', action.payload);
      return state.set('codeamdin', action.payload);
    case constants.SET_CODE_ADMIN_DTL:
      return state.set('codeAdminDtl', action.payload);
    case constants.SET_MAPLIST_MORE:
      return state.set('mapList', action.mapList);
    case constants.UPDATE_GRID:
      return state.set('codeAdminDtl', action.payload);
    case constants.SET_CODE_GRP_CD:
      return state.set('codeGrpCd', action.payload);
    default:
      return state;
  }
};

export default codeAdminDtlReducer;
