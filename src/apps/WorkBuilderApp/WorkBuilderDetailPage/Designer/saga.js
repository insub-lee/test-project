import { takeLatest, put, call, select, take } from 'redux-saga/effects';
import { delay } from 'redux-saga';

import { fromJS } from 'immutable';

import { Axios } from 'utils/AxiosFunc';

import * as actionTypes from './constants';
import * as selectors from './selectors';
import { makeInfo } from './util';


const getDefaultFormProperty = (type, id) => {
  const defaultFormProperty = {
    className: '',
    style: {},
    name: id,
    defaultValue: '',
  };
  switch (type) {
    case 'checkbox':
      return {
        ...defaultFormProperty,
        style: { ...defaultFormProperty.style },
        label: 'Label',
        id,
        options: [{ label: 'label 1', value: 'label 1' }, { label: 'label 2', value: 'label 2' }, { label: 'label 3', value: 'label 3' }],
        defaultValue: [],
      };
    case 'radio':
      return {
        ...defaultFormProperty,
        style: { ...defaultFormProperty.style },
        label: 'Label',
        id,
        options: [{ label: 'label 1', value: 'label 1' }, { label: 'label 2', value: 'label 2' }, { label: 'label 3', value: 'label 3' }],
      };
    default:
      return {
        ...defaultFormProperty,
        style: { ...defaultFormProperty.style },
        label: 'Label',
        id,
      };
  }
};


function* boot({ payload }) {}

function* fetchData({ id }) {
  const payload = {
    WORK_SEQ: id,
  };
  console.debug('@@ FETCH DATA', payload);
}

function* saveLayers() {
  const { boxes, formStuffs } = yield select(selectors.makeSelectLayers());
  const metas = boxes.map((box, boxIndex) => ({
    ORD: boxIndex,
    NAME_KOR: box.property.label,
    DCSR: box.desc,
    COMP_TYPE: 'BOX',
    COMP_TAG: 'BOX',
    COMP_FIELD: 'BOX',
    CONFIG: JSON.stringify({
      info: {},
      property: {
        ...box,
      },
      option: {},
    }),
    children: formStuffs
      .filter(formStuff => formStuff.parentId === box.id)
      .map((formStuff, formStuffIndex) => ({
        ORD: formStuffIndex,
        NAME_KOR: formStuff.property.label,
        DCSR: formStuff.desc,
        COMP_TYPE: 'FIELD',
        COMP_TAG: formStuff.type,
        COMP_FIELD: formStuff.property.name || formStuff.id,
        CONFIG: JSON.stringify({
          info: makeInfo(formStuff),
          property: {
            ...formStuff,
          },
          option: {},
        }),
      })),
  }));

  const payload = {
    PARAM: metas,
  };

  console.debug(payload);
}

function* saveTemporary() {
  yield delay(800);
  const { boxes, formStuffs } = yield select(selectors.makeSelectLayers());
  const metas = boxes.map((box, boxIndex) => ({
    ORD: boxIndex,
    NAME_KOR: box.property.label,
    DCSR: box.desc,
    COMP_TYPE: 'BOX',
    COMP_TAG: 'BOX',
    COMP_FIELD: 'BOX',
    CONFIG: JSON.stringify({
      info: {},
      property: {
        ...box,
      },
      option: {},
    }),
    children: formStuffs
      .filter(formStuff => formStuff.parentId === box.id)
      .map((formStuff, formStuffIndex) => ({
        ORD: formStuffIndex,
        NAME_KOR: formStuff.property.label,
        DCSR: formStuff.desc,
        COMP_TYPE: 'FIELD',
        COMP_TAG: formStuff.type,
        COMP_FIELD: formStuff.property.name || formStuff.id,
        CONFIG: JSON.stringify({
          info: makeInfo(formStuff),
          property: {
            ...formStuff,
          },
          option: {},
        }),
      })),
  }));

  const payload = {
    PARAM: metas,
  };
  // const response = yield call(Axios.post)

  console.debug(payload);
}

function* addBox() {
  const { boxes } = yield select(selectors.makeSelectLayers());
  const { workSeq } = yield select(selectors.makeSelectWorkSeq());
  const defaultBox = { type: 'Box', id: `box-${new Date().getTime()}`, property: { label: 'Box Title', useLabel: true, type: 'normal', column: 1 } };
  const param = {
    WORK_SEQ: workSeq,
    ORD: boxes.length + 1,
    NAME_KOR: defaultBox.property.label,
    DCSR: defaultBox.desc,
    COMP_TYPE: 'BOX',
    COMP_TAG: 'BOX',
    COMP_FIELD: 'BOX',
    CONFIG: JSON.stringify({
      info: {},
      property: {
        ...defaultBox,
      },
      option: {},
    }),
  };
  const response = yield call(Axios.put, { PARAM: param });
  const { PARAM } = response;
  const { META_SEQ, COMP_FIELD, CONFIG } = PARAM;
  const box = JSON.parse(CONFIG).property;
  box.META_SEQ = META_SEQ;
  box.COMP_FIELD = COMP_FIELD;
  console.debug('@@ add box', box);
  yield put(actionTypes.SUCCESS_FETCH_DATA)
}

function* addFormStuff({ formStuffType }) {
  const { viewTargetId, formStuffs } = yield select(selectors.makeSelectCanvasProperty());
  const { workSeq } = yield select(selectors.makeSelectWorkSeq());
  const newId = `${formStuffType}-${new Date().getTime()}`;
  const newObj = {
    type: formStuffType,
    id: newId,
    // groupId: viewTargetId,
    parentId: viewTargetId,
    property: getDefaultFormProperty(formStuffType, newId),
  };
  const param = {
    WORK_SEQ: workSeq,
    ORD: formStuffs.length + 1,
    NAME_KOR: newObj.property.label,
    DCSR: newObj.desc,
    COMP_TYPE: 'FIELD',
    COMP_TAG: newObj.type,
    COMP_FIELD: newObj.property.name || newObj.id,
    CONFIG: JSON.stringify({
      info: makeInfo(newObj),
      property: {
        ...newObj,
      },
      option: {},
    }),
  };
  const response = yield call(Axios.put, { PARAM: param });
  console.debug('@@ add formStuff', response);
}

export default function* watcher() {
  yield takeLatest(actionTypes.FETCH_DATA, fetchData);
  yield takeLatest(actionTypes.SAVE_LAYERS, saveLayers);
  yield takeLatest(actionTypes.SAVE_TEMPORARY, saveTemporary);
  yield take(actionTypes.ADD_BOX, addBox);
  yield take(actionTypes.ADD_FORM_STUFF, addFormStuff);
}
