import { takeLatest, call, put } from 'redux-saga/effects';

import { Axios } from 'utils/AxiosFunc';

import * as actionTypes from './constants';
import * as actions from './actions';
import { dummyResponse } from './dummyData';

function* getView({ id }) {
  const payload = {
    WORK_SEQ: id,
  };
  // Todo - Load Data
  // const response = yield call('', payload);
  console.debug('...dummyReponse', dummyResponse);
  const { metas } = dummyResponse;
  // This Part is Temporary
  let formStuffs = [];
  const boxes = metas.map(box => {
    const { children, CONFIG } = box;
    formStuffs = formStuffs.concat(children.map(child => ({ ...JSON.parse(child.CONFIG).property })));
    return {
      ...JSON.parse(CONFIG).property,
    };
  });
  console.debug('###', boxes, formStuffs);
  yield put(actions.successGetView(boxes, formStuffs));
}

export default function* watcher() {
  yield takeLatest(actionTypes.GET_VIEW, getView);
}
