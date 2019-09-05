import { fromJS } from 'immutable';
import * as constants from './constants';

const initState = fromJS({
  selectedCategory: {},
  modalView: {},
  modalIdx: {},
  widgetDataList: {},
  totalCategory: [],
});

const NewsFeedReducer = (state = initState, action) => {
  switch (action.type) {
    // 위젯 - 게시물 데이터
    case constants.SET_NEWSFEED_DATA_LIST: {
      const { newDataList, widget_id } = action;
      return state.setIn(['widgetDataList', widget_id], newDataList);
    }

    // 세팅 - 전체카테고리 값
    case constants.SET_INIT_CATEGORY: {
      const { list } = action;
      return state.set('totalCategory', fromJS(list));
    }

    // 모달 on / off
    case constants.SET_MODAL_VIEW:{
      const { modalView, widget_id } = action;
      return state.setIn(['modalView', widget_id], modalView);
    }

    // 모달 페이지 전환
    case constants.SET_MODAL_IDX:{
      const { mualIdx, widget_id } = action;
      return state.setIn(['modalIdx', widget_id], mualIdx);
    }

    default:
      return state;
  }
};

export default NewsFeedReducer;
