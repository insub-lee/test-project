import request from 'utils/request';

const manHis = {
  get: queryString =>
    request({
      url: `/api/wts/v1/common/ManHisManaged?${queryString}`,
      method: 'GET',
    }),
  post: payload =>
    request({
      url: '/api/wts/v1/common/ManHisManaged',
      method: 'POST',
      data: payload,
    }),
  put: payload =>
    request({
      url: '/api/wts/v1/common/ManHisManaged',
      method: 'PUT',
      data: payload,
    }),
  delete: payload =>
    request({
      url: '/api/wts/v1/common/ManHisManaged',
      method: 'DELETE',
      data: payload,
    }),
};

const manHisChief = {
  get: queryString =>
    request({
      url: `/api/wts/v1/common/ManHisManaged1?${queryString}`,
      method: 'GET',
    }),
  post: payload =>
    request({
      url: '/api/wts/v1/common/ManHisManaged1',
      method: 'POST',
      data: payload,
    }),
  put: payload =>
    request({
      url: '/api/wts/v1/common/ManHisManaged1',
      method: 'PUT',
      data: payload,
    }),
  delete: payload =>
    request({
      url: '/api/wts/v1/common/ManHisManaged1',
      method: 'DELETE',
      data: payload,
    }),
};

const manHisAdmin = {
  get: queryString =>
    request({
      url: `/api/wts/v1/common/ManHisManaged2?${queryString}`,
      method: 'GET',
    }),
  post: payload =>
    request({
      url: '/api/wts/v1/common/ManHisManaged2',
      method: 'POST',
      data: payload,
    }),
  put: payload =>
    request({
      url: '/api/wts/v1/common/ManHisManaged2',
      method: 'PUT',
      data: payload,
    }),
  delete: payload =>
    request({
      url: '/api/wts/v1/common/ManHisManaged2',
      method: 'DELETE',
      data: payload,
    }),
};

export default {
  manHis,
  manHisChief,
  manHisAdmin,
};
