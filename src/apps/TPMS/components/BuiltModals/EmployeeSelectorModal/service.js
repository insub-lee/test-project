import request from 'utils/request';

const deptTree = {
  get: () =>
    request({
      url: '/apigate/v1/portal/dept?type=list&coid=00',
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      method: 'GET',
    }),
};

const users = {
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
  deptTree,
  users,
};
