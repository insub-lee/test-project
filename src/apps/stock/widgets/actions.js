import * as actionType from './constants';

export const getStockList = (
    stockCode,
) => (
    {
        type: actionType.GET_STOCKLIST_SAGA,
        stockCode,
    }
);


