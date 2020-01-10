import * as actionType from './constants';

// const actions = {
//   changeCurrent: current => ({
//     type: actionType.CHANGE_CURRENT,
//     current,
//   }),
// };
// export const changeCurrent = current => ({
//   type: actionType.CHANGE_CURRENT,
//   current,
// });

export const firstLevelSelected = selectedIndex => ({
  type: actionType.FIRST_LEVEL_SELECTED,
  selectedIndex,
});
export const articleSelected = selectedArticle => ({
  type: actionType.ARTICLE_SELECTED,
  selectedArticle,
});
