import request from 'utils/request';

const boardView = {
  get: brdId =>
    request({
      url: `/apigate/v1/portal/brd?type=view&brdid=${brdId}`,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      method: 'GET',
    }),
};

const answer = {
  post: payload =>
    request({
      url: '/apigate/v1/portal/answer',
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      method: 'POST',
      data: payload,
    }),
};

const answerList = {
  get: brdId =>
    request({
      url: `/apigate/v1/portal/answer?type=answerList&brdid=${brdId}`,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      method: 'GET',
    }),
};

export default {
  boardView,
  answer,
  answerList,
};
