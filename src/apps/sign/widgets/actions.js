import * as actionType from './constants';

export const getSignList = id => (
    {
        type: actionType.GET_SIGNLIST_SAGA,
        id
    }
);


export const deleteSign = (item) => (
    {
        type: actionType.DELETE_SIGN_SAGA,
        item
    }
);
