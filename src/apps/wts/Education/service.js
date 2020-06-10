import request from 'utils/request';

const user = {
  get: queryString =>
    request({
      url: `/apigate/v1/portal/manhis/EduHisManaged?${queryString}`,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      method: 'GET',
    }),
  post: payload =>
    request({
      url: '/apigate/v1/portal/manhis/EduHisManaged',
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      method: 'POST',
      data: payload,
    }),
  put: payload =>
    request({
      url: '/apigate/v1/portal/manhis/EduHisManaged',
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      method: 'PUT',
      data: payload,
    }),
  delete: payload =>
    request({
      url: '/apigate/v1/portal/manhis/EduHisManaged',
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      method: 'DELETE',
      data: payload,
    }),
};

const manage = {
  get: queryString =>
    request({
      url: `/apigate/v1/portal/manhis/EduHisManaged1?${queryString}`,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      method: 'GET',
    }),
  post: payload =>
    request({
      url: '/apigate/v1/portal/manhis/EduHisManaged1',
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      method: 'POST',
      data: payload,
    }),
  put: payload =>
    request({
      url: '/apigate/v1/portal/manhis/EduHisManaged1',
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      method: 'PUT',
      data: payload,
    }),
  delete: payload =>
    request({
      url: '/apigate/v1/portal/manhis/EduHisManaged1',
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      method: 'DELETE',
      data: payload,
    }),
};

const manHisAdmin = {
  get: queryString =>
    request({
      url: `/apigate/v1/portal/manhis/ManHisManaged2?${queryString}`,
      method: 'GET',
    }),
  post: payload =>
    request({
      url: '/apigate/v1/portal/manhis/ManHisManaged2',
      method: 'POST',
      data: payload,
    }),
  put: payload =>
    request({
      url: '/apigate/v1/portal/manhis/ManHisManaged2',
      method: 'PUT',
      data: payload,
    }),
  delete: payload =>
    request({
      url: '/apigate/v1/portal/manhis/ManHisManaged2',
      method: 'DELETE',
      data: payload,
    }),
};

export default {
  user,
  manage,
  manHisAdmin,
};
