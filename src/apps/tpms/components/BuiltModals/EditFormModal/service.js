import request from 'utils/request';

const board = {
  put: (url, payload) =>
    request({
      url,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      method: 'PUT',
      data: payload,
    }),
};

export default {
  board,
};
