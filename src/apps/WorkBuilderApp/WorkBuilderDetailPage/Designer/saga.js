import { takeLatest, put, call, select, takeEvery } from 'redux-saga/effects';
import { delay } from 'redux-saga';

import { Axios } from 'utils/AxiosFunc';

import * as actionTypes from './constants';
import * as selectors from './selectors';
import { makeInfo } from './util';
import * as actions from './actions';

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
  const response = yield call(Axios.get, `/api/builder/v1/work/meta?workSeq=${id}`);
  const { list } = response;
  yield put(actions.successFetchData(list));
  console.debug('@@ FETCH DATA', list);
}

function* saveLayers() {
  const workSeq = yield select(selectors.makeSelectWorkSeq());
  const payload = {
    PARAM: {
      WORK_SEQ: workSeq,
    },
  };
  const response = yield call(Axios.post, '/api/builder/v1/work/create', payload);
  console.debug('@ create table', response);
  // const { boxes, formStuffs } = yield select(selectors.makeSelectLayers());
  // const metas = boxes.map((box, boxIndex) => ({
  //   ORD: boxIndex,
  //   NAME_KOR: box.property.label,
  //   DCSR: box.desc,
  //   COMP_TYPE: 'BOX',
  //   COMP_TAG: 'BOX',
  //   COMP_FIELD: 'BOX',
  //   CONFIG: JSON.stringify({
  //     info: {},
  //     property: {
  //       ...box,
  //     },
  //     option: {},
  //   }),
  //   children: formStuffs
  //     .filter(formStuff => formStuff.parentId === box.id)
  //     .map((formStuff, formStuffIndex) => ({
  //       ORD: formStuffIndex,
  //       NAME_KOR: formStuff.property.label,
  //       DCSR: formStuff.desc,
  //       COMP_TYPE: 'FIELD',
  //       COMP_TAG: formStuff.type,
  //       COMP_FIELD: formStuff.property.name || formStuff.id,
  //       CONFIG: JSON.stringify({
  //         info: makeInfo(formStuff),
  //         property: {
  //           ...formStuff,
  //         },
  //         option: {},
  //       }),
  //     })),
  // }));
  //
  // const payload = {
  //   PARAM: metas,
  // };
  //
  // console.debug(payload);
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
  console.debug('@@@@ Add Box');
  const { boxes } = yield select(selectors.makeSelectLayers());
  const workSeq = yield select(selectors.makeSelectWorkSeq());
  const defaultBox = { type: 'Box', id: `box_${new Date().getTime()}`, property: { label: 'Box Title', useLabel: true, type: 'normal', column: 1 } };
  const param = {
    WORK_SEQ: workSeq,
    PRNT_SEQ: workSeq,
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
  const response = yield call(Axios.put, '/api/builder/v1/work/meta', { PARAM: param });
  const { PARAM } = response;
  const { WORK_SEQ, PRNT_SEQ, ORD, NAME_KOR, DCSR, COMP_TYPE, COMP_TAG, META_SEQ, COMP_FIELD, CONFIG } = PARAM;
  const box = JSON.parse(CONFIG).property;
  box.WORK_SEQ = WORK_SEQ;
  box.PRNT_SEQ = PRNT_SEQ;
  box.ORD = ORD;
  box.NAME_KOR = NAME_KOR;
  box.DCSR = DCSR;
  box.COMP_TYPE = COMP_TYPE;
  box.COMP_TAG = COMP_TAG;
  box.META_SEQ = META_SEQ;
  box.COMP_FIELD = COMP_FIELD;
  console.debug('@@ add box', box);
  yield put(actions.successAddBox(box));
}

function* addFormStuff({ formStuffType }) {
  const { viewTargetId, boxes, formStuffs } = yield select(selectors.makeSelectCanvasProperty());
  const workSeq = yield select(selectors.makeSelectWorkSeq());
  const prntTargetIndex = boxes.findIndex(box => box.id === viewTargetId);
  if (prntTargetIndex > -1) {
    const prntSeq = boxes[prntTargetIndex].META_SEQ;
    const newId = `${formStuffType}_${new Date().getTime()}`.substring(0, 20);
    const newObj = {
      type: formStuffType,
      id: newId,
      // groupId: viewTargetId,
      parentId: viewTargetId,
      property: getDefaultFormProperty(formStuffType, newId),
    };
    const param = {
      WORK_SEQ: workSeq,
      PRNT_SEQ: prntSeq,
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
    const response = yield call(Axios.put, '/api/builder/v1/work/meta', { PARAM: param });
    const { PARAM } = response;
    const { WORK_SEQ, PRNT_SEQ, ORD, NAME_KOR, DCSR, COMP_TYPE, COMP_TAG, META_SEQ, COMP_FIELD, CONFIG } = PARAM;
    const formStuff = JSON.parse(CONFIG).property;
    formStuff.WORK_SEQ = WORK_SEQ;
    formStuff.PRNT_SEQ = PRNT_SEQ;
    formStuff.ORD = ORD;
    formStuff.NAME_KOR = NAME_KOR;
    formStuff.DCSR = DCSR;
    formStuff.COMP_TYPE = COMP_TYPE;
    formStuff.COMP_TAG = COMP_TAG;
    formStuff.META_SEQ = META_SEQ;
    formStuff.COMP_FIELD = COMP_FIELD;
    console.debug('@@ add formStuff', formStuff);
    yield put(actions.successAddFormStuff(formStuff));
  }
}

function* changeBoxType({ index, value }) {
  const { boxes } = yield select(selectors.makeSelectCanvasProperty());
  const box = boxes[index];
  box.property.type = value;
  const param = {
    WORK_SEQ: box.WORK_SEQ,
    META_SEQ: box.META_SEQ,
    PRNT_SEQ: box.PRNT_SEQ,
    ORD: box.ORD,
    NAME_KOR: box.NAME_KOR,
    DCSR: box.DCSR,
    COMP_TYPE: box.COMP_TYPE,
    COMP_TAG: box.COMP_TAG,
    COMP_FIELD: box.COMP_FIELD,
    CONFIG: JSON.stringify({
      info: {},
      property: {
        ...box,
      },
      option: {},
    }),
  };
  const response = yield call(Axios.post, '/api/builder/v1/work/meta', { PARAM: param });
  console.debug('Change box type ', response);
  yield put(actions.successChangeBoxType(index, box));
}
function* changeFormStuffSpan({ index, value }) {
  const { formStuffs } = yield select(selectors.makeSelectCanvasProperty());
  const formStuff = formStuffs[index];
  formStuff.property.span = parseInt(value, 10);
  const param = {
    WORK_SEQ: formStuff.WORK_SEQ,
    META_SEQ: formStuff.META_SEQ,
    PRNT_SEQ: formStuff.PRNT_SEQ,
    ORD: formStuff.ORD,
    NAME_KOR: formStuff.NAME_KOR,
    DCSR: formStuff.DCSR,
    COMP_TYPE: formStuff.COMP_TYPE,
    COMP_TAG: formStuff.COMP_TAG,
    COMP_FIELD: formStuff.COMP_FIELD,
    CONFIG: JSON.stringify({
      info: {},
      property: {
        ...formStuff,
      },
      option: {},
    }),
  };
  const response = yield call(Axios.post, '/api/builder/v1/work/meta', { PARAM: param });
  console.debug('Change formStuff span ', response);
  yield put(actions.successChangeFormStuffSpan(index, formStuff));
}
function* changeBoxColumnCount({ index, value }) {
  const { boxes } = yield select(selectors.makeSelectCanvasProperty());
  const box = boxes[index];
  box.property.column = parseInt(value, 10);
  const param = {
    WORK_SEQ: box.WORK_SEQ,
    META_SEQ: box.META_SEQ,
    PRNT_SEQ: box.PRNT_SEQ,
    ORD: box.ORD,
    NAME_KOR: box.NAME_KOR,
    DCSR: box.DCSR,
    COMP_TYPE: box.COMP_TYPE,
    COMP_TAG: box.COMP_TAG,
    COMP_FIELD: box.COMP_FIELD,
    CONFIG: JSON.stringify({
      info: {},
      property: {
        ...box,
      },
      option: {},
    }),
  };
  const response = yield call(Axios.post, '/api/builder/v1/work/meta', { PARAM: param });
  console.debug('Change box column ', response);
  yield put(actions.successChangeBoxColumnCount(index, box));
}
function* changeId({ payload: { type, index, value } }) {
  const { boxes, formStuffs } = yield select(selectors.makeSelectCanvasProperty());
  switch (type) {
    case 'boxes': {
      const box = boxes[index];
      box.id = value;
      box.property.id = value;
      const param = {
        WORK_SEQ: box.WORK_SEQ,
        META_SEQ: box.META_SEQ,
        PRNT_SEQ: box.PRNT_SEQ,
        ORD: box.ORD,
        NAME_KOR: box.NAME_KOR,
        DCSR: box.DCSR,
        COMP_TYPE: box.COMP_TYPE,
        COMP_TAG: box.COMP_TAG,
        COMP_FIELD: box.COMP_FIELD,
        CONFIG: JSON.stringify({
          info: {},
          property: {
            ...box,
          },
          option: {},
        }),
      };
      const response = yield call(Axios.post, '/api/builder/v1/work/meta', { PARAM: param });
      console.debug('Change Id ', response);
      yield put(actions.successChangeId({ type, index, value: box, id: value }));
      break;
    }
    case 'formStuffs': {
      const formStuff = formStuffs[index];
      formStuff.id = value;
      formStuff.property.id = value;
      const param = {
        WORK_SEQ: formStuff.WORK_SEQ,
        META_SEQ: formStuff.META_SEQ,
        PRNT_SEQ: formStuff.PRNT_SEQ,
        ORD: formStuff.ORD,
        NAME_KOR: formStuff.NAME_KOR,
        DCSR: formStuff.DCSR,
        COMP_TYPE: formStuff.COMP_TYPE,
        COMP_TAG: formStuff.COMP_TAG,
        COMP_FIELD: formStuff.COMP_FIELD,
        CONFIG: JSON.stringify({
          info: makeInfo(formStuff),
          property: {
            ...formStuff,
          },
          option: {},
        }),
      };
      const response = yield call(Axios.post, '/api/builder/v1/work/meta', { PARAM: param });
      console.debug('Change Id ', response);
      yield put(actions.successChangeId({ type, index, value: formStuff, id: value }));
      break;
    }
    default:
      break;
  }
}
function* changeTitle({ payload: { type, index, value } }) {
  yield delay(500);
  const { boxes, formStuffs } = yield select(selectors.makeSelectCanvasProperty());
  switch (type) {
    case 'boxes': {
      const box = boxes[index];
      box.property.label = value;
      box.NAME_KOR = value;
      const param = {
        WORK_SEQ: box.WORK_SEQ,
        META_SEQ: box.META_SEQ,
        PRNT_SEQ: box.PRNT_SEQ,
        ORD: box.ORD,
        DCSR: box.DCSR,
        COMP_TYPE: box.COMP_TYPE,
        COMP_TAG: box.COMP_TAG,
        COMP_FIELD: box.COMP_FIELD,
        NAME_KOR: box.property.label,
        CONFIG: JSON.stringify({
          info: {},
          property: {
            ...box,
          },
          option: {},
        }),
      };
      const response = yield call(Axios.post, '/api/builder/v1/work/meta', { PARAM: param });
      console.debug('Change Title(Label) ', response);
      yield put(actions.successChangeTitle({ type, index, value: box }));
      break;
    }
    case 'formStuffs': {
      const formStuff = formStuffs[index];
      formStuff.property.label = value;
      formStuff.NAME_KOR = value;
      const param = {
        WORK_SEQ: formStuff.WORK_SEQ,
        META_SEQ: formStuff.META_SEQ,
        PRNT_SEQ: formStuff.PRNT_SEQ,
        ORD: formStuff.ORD,
        DCSR: formStuff.DCSR,
        COMP_TYPE: formStuff.COMP_TYPE,
        COMP_TAG: formStuff.COMP_TAG,
        COMP_FIELD: formStuff.COMP_FIELD,
        NAME_KOR: formStuff.property.label,
        CONFIG: JSON.stringify({
          info: makeInfo(formStuff),
          property: {
            ...formStuff,
          },
          option: {},
        }),
      };
      const response = yield call(Axios.post, '/api/builder/v1/work/meta', { PARAM: param });
      console.debug('Change Title(Label) ', response);
      yield put(actions.successChangeTitle({ type, index, value: formStuff }));
      break;
    }
    default:
      break;
  }
}
function* changeName({ payload: { type, index, value } }) {
  const { boxes, formStuffs } = yield select(selectors.makeSelectCanvasProperty());
  switch (type) {
    case 'boxes': {
      const box = boxes[index];
      box.COMP_FIELD = value;
      box.property.name = value;
      const param = {
        WORK_SEQ: box.WORK_SEQ,
        META_SEQ: box.META_SEQ,
        PRNT_SEQ: box.PRNT_SEQ,
        ORD: box.ORD,
        DCSR: box.DCSR,
        COMP_TYPE: box.COMP_TYPE,
        COMP_TAG: box.COMP_TAG,
        COMP_FIELD: value,
        NAME_KOR: box.NAME_KOR,
        CONFIG: JSON.stringify({
          info: {},
          property: {
            ...box,
          },
          option: {},
        }),
      };
      const response = yield call(Axios.post, '/api/builder/v1/work/meta', { PARAM: param });
      console.debug('Change Name ', response);
      yield put(actions.successChangeName({ type, index, value: box }));
      break;
    }
    case 'formStuffs': {
      const formStuff = formStuffs[index];
      formStuff.COMP_FIELD = value;
      formStuff.property.name = value;
      const param = {
        WORK_SEQ: formStuff.WORK_SEQ,
        META_SEQ: formStuff.META_SEQ,
        PRNT_SEQ: formStuff.PRNT_SEQ,
        ORD: formStuff.ORD,
        DCSR: formStuff.DCSR,
        COMP_TYPE: formStuff.COMP_TYPE,
        COMP_TAG: formStuff.COMP_TAG,
        NAME_KOR: formStuff.NAME_KOR,
        COMP_FIELD: value,
        CONFIG: JSON.stringify({
          info: makeInfo(formStuff),
          property: {
            ...formStuff,
          },
          option: {},
        }),
      };
      const response = yield call(Axios.post, '/api/builder/v1/work/meta', { PARAM: param });
      console.debug('Change Name ', response);
      yield put(actions.successChangeName({ type, index, value: formStuff }));
      break;
    }
    default:
      break;
  }
}
function* changeUseLabel({ payload: { type, index, value } }) {
  const { boxes, formStuffs } = yield select(selectors.makeSelectCanvasProperty());
  switch (type) {
    case 'boxes': {
      const box = boxes[index];
      console.debug('@@@@@ wawawa', boxes, boxes[index]);
      box.property.useLabel = value;
      const param = {
        WORK_SEQ: box.WORK_SEQ,
        META_SEQ: box.META_SEQ,
        PRNT_SEQ: box.PRNT_SEQ,
        ORD: box.ORD,
        DCSR: box.DCSR,
        COMP_TYPE: box.COMP_TYPE,
        COMP_TAG: box.COMP_TAG,
        NAME_KOR: box.NAME_KOR,
        COMP_FIELD: box.COMP_FIELD,
        CONFIG: JSON.stringify({
          info: {},
          property: {
            ...box,
          },
          option: {},
        }),
      };
      const response = yield call(Axios.post, '/api/builder/v1/work/meta', { PARAM: param });
      console.debug('Change Id ', response);
      yield put(actions.successChangeUseLabel({ type, index, value: box }));
      break;
    }
    case 'formStuffs': {
      const formStuff = formStuffs[index];
      formStuff.property.useLabel = value;
      const param = {
        WORK_SEQ: formStuff.WORK_SEQ,
        META_SEQ: formStuff.META_SEQ,
        PRNT_SEQ: formStuff.PRNT_SEQ,
        ORD: formStuff.ORD,
        DCSR: formStuff.DCSR,
        COMP_TYPE: formStuff.COMP_TYPE,
        COMP_TAG: formStuff.COMP_TAG,
        NAME_KOR: formStuff.NAME_KOR,
        COMP_FIELD: formStuff.COMP_FIELD,
        CONFIG: JSON.stringify({
          info: makeInfo(formStuff),
          property: {
            ...formStuff,
          },
          option: {},
        }),
      };
      const response = yield call(Axios.post, '/api/builder/v1/work/meta', { PARAM: param });
      console.debug('Change Id ', response);
      yield put(actions.successChangeUseLabel({ type, index, value: formStuff }));
      break;
    }
    default:
      break;
  }
}

export default function* watcher() {
  yield takeLatest(actionTypes.FETCH_DATA, fetchData);
  yield takeLatest(actionTypes.SAVE_LAYERS, saveLayers);
  yield takeLatest(actionTypes.SAVE_TEMPORARY, saveTemporary);
  yield takeEvery(actionTypes.ADD_BOX, addBox);
  yield takeEvery(actionTypes.ADD_FORM_STUFF, addFormStuff);
  yield takeLatest(actionTypes.CHANGE_BOX_TYPE, changeBoxType);
  yield takeLatest(actionTypes.CHANGE_FORM_STUFF_SPAN, changeFormStuffSpan);
  yield takeLatest(actionTypes.CHANGE_BOX_COLUMN_COUNT, changeBoxColumnCount);
  yield takeLatest(actionTypes.CHANGE_ID, changeId);
  yield takeLatest(actionTypes.CHANGE_TITLE, changeTitle);
  yield takeLatest(actionTypes.CHANGE_NAME, changeName);
  yield takeLatest(actionTypes.CHANGE_USE_LABEL, changeUseLabel);
}
