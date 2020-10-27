import request from 'utils/request';

const board = {
  get: url =>
    request({
      url,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      method: 'GET',
    }),
};

export default {
  board,
};
