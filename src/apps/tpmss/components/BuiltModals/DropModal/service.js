import request from 'utils/request';

const sign = {
  post: payload =>
    request({
      url: '/apigate/v1/portal/sign/task',
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      method: 'POST',
      data: payload,
    }),
};

export default {
  sign,
};
