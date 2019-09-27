import * as action from './constants';

export const saveCardList = (cardList, WIDGET_ID, KEYWORD) => ({
  type: action.SAVE_CARD_LIST,
  cardList,
  WIDGET_ID,
  KEYWORD,
});

export const getCardList = (BIZGRP_ID, WIDGET_ID, KEYWORD) => ({
  type: action.GET_CARD_LIST,
  BIZGRP_ID,
  WIDGET_ID,
  KEYWORD,
});

export const chageKeyword = (WIDGET_ID, KEYWORD) => ({
  type: action.CHANGE_KEYWORD,
  WIDGET_ID,
  KEYWORD,
});
