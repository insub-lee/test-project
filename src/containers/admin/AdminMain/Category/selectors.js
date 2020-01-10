import { createSelector } from 'reselect';

const selectCategory = state => state.get('Category');

const makeSelectCategoryComboList = () => createSelector(selectCategory, categoryAdminState => categoryAdminState.get('categoryComboList').toJS());

const makeCategoryData = () => createSelector(selectCategory, category => category.get('categoryData').toJS());

const makeSelectedIndex = () => createSelector(selectCategory, category => category.get('selectedIndex'));

const makeSelectTp = () => createSelector(selectCategory, category => category.get('tp'));

export { selectCategory, makeSelectCategoryComboList, makeCategoryData, makeSelectedIndex, makeSelectTp };
