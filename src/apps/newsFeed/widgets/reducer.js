import { fromJS } from 'immutable';
import * as constants from './constants';

const initState = fromJS({
  WIDGET_ID: undefined,
  title: '신규지식테스트',
  isTitle: true,
  skin: undefined,
  widgetSize: '1X1',
  modalView: false,
  totalCategory: [],
  selectedCategory: [],
  totalList: [],
  updateList: [],
  newList: [],
});

const NewsFeedReducer = (state = initState, action) => {
  switch (action.type) {
    case constants.SET_NEWSFEED_DATA_LIST: {
      const { newList, totalList, updateList } = action;
      return state
        .set('newList', newList)
        .set('totalList', totalList)
        .set('updateList', updateList);
    }

    case constants.SET_INIT_CATEGORY: {
      const { list } = action;
      return state.set('totalCategory', fromJS(list));
    }

    case constants.SET_SELECTED_CATEGORY:
      return state.set('selectedCategory', fromJS(action.selectedCategoryList));

    case constants.SET_MODAL_VIEW:
      return state.set('modalView', action.modalView);

    default:
      return state;
  }
};

export default NewsFeedReducer;
