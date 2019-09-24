import axios from 'axios';
import { select } from 'redux-saga/effects';

const qnaList = '/api/itf/v2/portalInterface/categories/articles';
const qnaType = 'qna';
const timeline = '/api/itf/v2/portalInterface/timeline/articles/';
const detail = '/api/itf/v2/portalInterface/article_details/';
const cateList = '/api/itf/v2/portalInterface/group/categories';
const groupList = '/api/itf/v2/portalInterface/groups';

function* getIflowUrl() {
  const uInfo = yield select(state => state.get('auth').get('profile'));
  let getIflowUrlArr = {};

  if (uInfo.iflowUrl === 'http://218.147.96.143:12081') {
    getIflowUrlArr = {
      iflowUrl: uInfo.iflowUrl,
      IFLOW_TOKEN: uInfo.IFLOW_TOKEN,
      qnaGrseq: 1501,
      qnaCtseq: 8882,
      faqCtseq: 18821,
    }
  } else if (uInfo.iflowUrl === 'http://dev.board.com') {
    getIflowUrlArr = {
      iflowUrl: uInfo.iflowUrl,
      IFLOW_TOKEN: uInfo.IFLOW_TOKEN,
      qnaGrseq: 1501,
      qnaCtseq: 8882,
      faqCtseq: 18821,
    }
  }
  return getIflowUrlArr;
}

function* makeRequestHeader() {
  const authInfo = yield select(state => state.get('auth'));
  const META = authInfo.get('meta');
  return JSON.stringify(META);
}

function* errorAxiosProcess(error) {
  if (error.response.status === 401) {
    if (uInfo.iflowUrl === 'http://218.147.96.143:12081') {
      window.location.href = `http://218.147.96.143:12081?initpage=${error.response.data.url}`;
    } else if (uInfo.iflowUrl === 'http://dev.board.com') {
      window.location.href = `http://dev.board.com?initpage=${error.response.data.url}`;
    }
  } else {
    console.log(error);
  }
}

function* getAxios(gubun, payload) {
  try {
    const uInfo = yield getIflowUrl();

    // 기본 URL 셋팅
    let fullUrl = uInfo.iflowUrl;
    if (gubun === 'qnaList') {
      fullUrl += `${qnaList}?grseq=${uInfo.qnaGrseq}&ctseq=${uInfo.qnaCtseq}&type=${qnaType}`;
    } else if (gubun === 'faqList') {
      fullUrl += `${qnaList}?grseq=${uInfo.qnaGrseq}&ctseq=${uInfo.faqCtseq}&type=${qnaType}`;
    } else if (gubun === 'articleList') {
      fullUrl += `${qnaList}?artype=0`;
    } else if (gubun === 'cateList') {
      fullUrl += `${cateList}?`;
    } else if (gubun === 'groupList') {
      fullUrl += `${groupList}?`;
    }

    // iFlow token setting
    fullUrl += `&token=${uInfo.IFLOW_TOKEN}`;

    // param setting
    let params = '';
    for (let key in payload) {
      params += `&${key}=${payload[key]}`;
    }
    fullUrl += params;


    const response = yield Promise.resolve(axios({
      method: 'get',
      url: fullUrl,
      param: { ...payload },
      headers: { META: yield makeRequestHeader() },
    }));

    if (response.statusText !== 'OK') {
      return Promise.reject(response.data);
    }

    return response.data;
  } catch (error) {
    yield errorAxiosProcess(error);
  }
  return {};
}

function* getTimelineAxios(gubun, empno, payload) {
  try {
    const uInfo = yield select(state => state.get('auth').get('profile'));

    // 기본 URL 셋틍
    let fullUrl = uInfo.iflowUrl;
    if (gubun === 'timeline') {
      fullUrl += `${timeline}${empno}`;
    }

    // iFlow token setting
    fullUrl += `?token=${uInfo.IFLOW_TOKEN}`;

    // param setting
    let params = '';
    for (let key in payload) {
      params += `&${key}=${payload[key]}`;
    }
    fullUrl += params;

    const response = yield Promise.resolve(axios({
      method: 'get',
      url: fullUrl,
      param: { ...payload },
      headers: { META: yield makeRequestHeader() },
    }));

    if (response.statusText !== 'OK') {
      return Promise.reject(response.data);
    }
    return response.data;
  } catch (error) {
    yield errorAxiosProcess(error);
  }
  return {};
}

function* getUrlReturn(cate, appId, gubun) {
  try {
    const uInfo = yield getIflowUrl();
    let url = uInfo.iflowUrl;

    if (cate === 'qna') {
      url += `/writer/banpo/qna/${uInfo.qnaGrseq}/${uInfo.qnaCtseq}?t1=suggestion&t2=${appId}&t3=${gubun}&token=${uInfo.IFLOW_TOKEN}`;
    } else if (cate === 'faq') {
      url += `/writer/banpo/faq/${uInfo.qnaGrseq}/${uInfo.faqCtseq}?t1=suggestion&t2=${appId}&t3=${gubun}&token=${uInfo.IFLOW_TOKEN}`;
    } else if (cate === 'qnaEdit'){
      url += `/edit/banpo/qna/${uInfo.qnaGrseq}`;
    }

    return url;
  } catch (error) {
    yield errorAxiosProcess(error);
  }
  return "";
}

function* getDetail(gubun, arseq, payload) {
  try {
    const uInfo = yield select(state => state.get('auth').get('profile'));

    // 기본 URL 셋틍
    let fullUrl = uInfo.iflowUrl;
    if (gubun === 'detail') {
      fullUrl += `${detail}${arseq}`;
    }

    // iFlow setting
    fullUrl += `?token=${uInfo.IFLOW_TOKEN}`;

    // param setting
    let params = '';
    for (let key in payload) {
      params += `&${key}=${payload[key]}`;
    }
    fullUrl += params;

    const response = yield Promise.resolve(axios({
      method: 'get',
      url: fullUrl,
      param: { ...payload },
      headers: { META: yield makeRequestHeader() },
    }));

    if (response.statusText !== 'OK') {
      return Promise.reject(response.data);
    }
    return response.data;
  } catch (error) {
    yield errorAxiosProcess(error);
  }
  return {};
}

export const IflowApi = {
  get: (gubun, payload) => getAxios(gubun, payload),
  getTimeline: (gubun, empno, payload) => getTimelineAxios(gubun, empno, payload),
  getUrl: (cate, appId, gubun, token) => getUrlReturn(cate, appId, gubun, token),
  getDetail: (gubun, arseq, payload) => getDetail(gubun, arseq, payload),
};

export default IflowApi;
