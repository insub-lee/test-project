import request from 'utils/request';

const board = {
  post: (url, payload) =>
    request({
      url,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      method: 'POST',
      data: payload,
    }),
  delete: (url, payload) =>
    request({
      url,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      method: 'DELETE',
      data: payload,
    }),
};

export default {
  board,
};
