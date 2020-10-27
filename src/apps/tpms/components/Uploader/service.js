import request from 'utils/request';

const post = (queryString, payload) =>
  request({
    url: `/upload/file?${queryString}`,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    method: 'POST',
    data: payload,
  });

export default {
  post,
};
