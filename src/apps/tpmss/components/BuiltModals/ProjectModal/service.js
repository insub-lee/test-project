import request from 'utils/request';

const board = {
  get: queryString =>
    request({
      url: `/apigate/v1/portal/sign/task?sysid=TPMS&mnuid=bestPractice&${queryString}`,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      method: 'GET',
    }),
};

export default {
  board,
};
