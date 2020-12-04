import request from 'utils/request';

const tableau = {
  post: (url, payload) =>
    request({
      url,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      method: 'POST',
      data: payload,
    }),
};

export default {
  tableau,
};
