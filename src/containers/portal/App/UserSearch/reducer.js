// import { fromJS } from 'immutable';
import * as actionType from './constants';

const initState = () => ({
  search: {
    value: '',
    isOpenModal: false,
    isShow: false,
    isHistoryShow: false,
    isLoading: false,
    searchedUser: [],
    searchedUserProfile: '',
    searchedUserHistory: [],
    profileTest: null,
  },
  profile: [],
});

export default function userSearchReducer(state = initState(), action) {
  switch (action.type) {
    case actionType.USER_ENABLE_SEARCH_RESULT_VIEW:
      return { ...state, search: { ...state.search, isShow: true } };
    case actionType.USER_CLEAR_SEARCH_RESULT_VIEW:
      return {
        ...state,
        search: {
          ...state.search,
          isShow: false,
          isHistoryShow: false,
          searchedUser: [],
        },
      };
    case actionType.USER_HISTORY_FAIL_GET_RESULT:
      return {
        ...state,
        search: {
          ...state.search,
          isShow: false,
          isHistoryShow: false,
          searchedUser: [],
        },
      };
    case actionType.USER_DISABLE_SEARCH_RESULT_VIEW:
      return {
        ...state,
        search: {
          ...state.search,
          isShow: false,
          isHistoryShow: false,
          searchedUser: [],
        },
      };
    case actionType.USER_HISTORY_INSERT_SUCCESS:
      return {
        ...state,
        search: {
          ...state.search,
          value: '',
          isShow: false,
          isHistoryShow: false,
          searchedUser: [],
        },
      };
    case actionType.USER_HISTORY_INSERT_FAIL:
      return {
        ...state,
        search: {
          ...state.search,
          isShow: false,
          isHistoryShow: false,
          searchedUser: [],
        },
      };
    case actionType.USER_PROFILE:
      return {
        ...state,
        search: {
          ...state.search,
          value: '',
          isShow: true,
          isHistoryShow: false,
          isLoading: false,
          isOpenModal: false,
          searchedUserProfile: action.payload,
        },
      };
    case actionType.USER_SUCCESS_GET_RESULT:
      return {
        ...state,
        search: {
          ...state.search,
          isLoading: false,
          isOpenModal: false,
          isShow: true,
          isHistoryShow: false,
          searchedUser: action.payload,
        },
      };
    case actionType.USER_HISTORY_SUCCESS_GET_RESULT:
      return {
        ...state,
        search: {
          ...state.search,
          isLoading: false,
          isOpenModal: false,
          isShow: false,
          isHistoryShow: true,
          searchedUserHistory: action.payload,
        },
      };
    case actionType.USER_HISTORY_DELETE_SUCCESS:
      return {
        ...state,
        search: {
          ...state.search,
          isLoading: false,
          isOpenModal: false,
          isShow: false,
          isHistoryShow: state.search.searchedUserHistory.length > 0 ? true : false, //eslint-disable-line
        },
      };
    case actionType.USER_HISTORY_DELETEALL_SUCCESS:
      return {
        ...state,
        search: {
          ...state.search,
          isLoading: false,
          isOpenModal: false,
          isShow: false,
          isHistoryShow: false,
        },
      };
    case actionType.USER_HISTORY_UPDATE_SUCCESS:
      return {
        ...state,
        search: {
          ...state.search,
          isShow: false,
          isHistoryShow: false,
          searchedUser: [],
        },
      };
    default:
      return state;
  }
}

export { userSearchReducer };
