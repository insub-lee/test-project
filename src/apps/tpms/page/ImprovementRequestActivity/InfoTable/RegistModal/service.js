import request from 'utils/request';

const status = {
  get: queryString =>
    request({
      url: `/apigate/v1/portal/post?${queryString}`,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      method: 'GET',
    }),
  post: payload =>
    request({
      // url: '/apigate/v1/portal/sign/report/up',
      url: '/api/tpms/v1/common/board/detail',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'content-type': 'multipart/form-data',
      },
      method: 'POST',
      data: payload,
    }),
};

export default {
  status,
};
