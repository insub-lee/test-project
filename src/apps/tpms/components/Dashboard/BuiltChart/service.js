import request from 'utils/request';

const signChart = {
  get: queryString =>
    request({
      url: `/apigate/v1/portal/sign/report?${queryString}`,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      method: 'GET',
    }),
};

export default {
  signChart,
};
