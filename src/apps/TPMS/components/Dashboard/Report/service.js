import request from 'utils/request';

const signTask = {
  get: mnuid =>
    request({
      url: `/apigate/v1/portal/sign/task?sysid=TPMS&mnuid=${mnuid}&type=list&currentPage=1&pageSize=10`,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      method: 'GET',
    }),
};

export default {
  signTask,
};
