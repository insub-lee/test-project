import * as actionType from './constants';

export const getMailList = id => (
    {
        type: actionType.GET_MAILLIST_SAGA,
        id
    }
);


export const deleteMail = (item) => (
    {
        type: actionType.DELETE_MAIL_SAGA,
        item
    }
);
