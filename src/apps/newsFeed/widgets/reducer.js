import { fromJS } from 'immutable';
import * as constants from './constants';

const initState = fromJS({
  app_id: undefined,
  widget_id: undefined,
  selectedCategory: [],
  modalView: false,
  modalIdx: undefined,
  totalCategory: [],
  widgetDataList: [],
});

const NewsFeedReducer = (state = initState, action) => {
  switch (action.type) {
    case constants.SET_NEWSFEED_CONFIG: {
      const { app_id,  widget_id, selectedCategory} = action;
      return state
        .set('app_id', app_id)
        .set('widget_id', widget_id)
        .set('selectedCategory', selectedCategory);
    }

    case constants.SET_NEWSFEED_DATA_LIST: {
      const { newDataList } = action;
      return state.set('widgetDataList', newDataList);
    }

    case constants.SET_INIT_CATEGORY: {
      const { list } = action;
      return state.set('totalCategory', fromJS(list));
    }

    case constants.SET_SELECTED_CATEGORY:
      return state.set('selectedCategory', fromJS(action.selectedCategoryList));

    case constants.SET_MODAL_IDX:
      return state.set('modalIdx',action.modalIdx);  

    case constants.SET_MODAL_VIEW:
      return state.set('modalView', action.modalView);

    default:
      return state;
  }
};

export default NewsFeedReducer;
