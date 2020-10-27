import request from 'utils/request';

const noticeLink = {
  get: queryString =>
    request({
      url: `apigate/v1/portal/sign/task?sysid=TPMS&mnuid=notice&${queryString}`,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      method: 'GET',
      // data: payload,
    }),
};

export default { noticeLink };
