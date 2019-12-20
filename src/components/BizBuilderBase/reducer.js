import { fromJS } from 'immutable';
import { isJSON } from 'utils/helpers';
import * as actionTypes from './constants';

const initialState = fromJS({
  dataLoading: false,
  bizBuilderBase: {},
  // workSeq: -1,
  // taskSeq: -1,
  // apiArr: [],
  // responseData: {},
  // metaList: [],
  // workFlow: {},
  // formData: {},
  // extraApiData: {},
  // processRule: {},
});

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case `${actionTypes.GET_BUILDER_DATA}_${action.id}`: {
      const { id, workSeq, taskSeq } = action;
      return state
        .setIn(['bizBuilderBase', id, 'workSeq'], workSeq)
        .setIn(['bizBuilderBase', id, 'taskSeq'], taskSeq)
        .setIn(['bizBuilderBase', id, 'isLoading'], true);
    }
    case actionTypes.SET_BUILDER_DATA: {
      const { id, response, work, metaList, workFlow, formData, validationData } = action;
      if (formData && validationData) {
        return state
          .setIn(['bizBuilderBase', id, 'responseData'], fromJS(response))
          .setIn(['bizBuilderBase', id, 'workInfo'], fromJS(work))
          .setIn(['bizBuilderBase', id, 'metaList'], fromJS(metaList))
          .setIn(['bizBuilderBase', id, 'workFlow'], fromJS(workFlow || {}))
          .setIn(['bizBuilderBase', id, 'formData'], fromJS(formData || {}))
          .setIn(['bizBuilderBase', id, 'validationData'], fromJS(validationData || {}))
          .setIn(['bizBuilderBase', id, 'isLoading'], false);
      }
      return state
        .setIn(['bizBuilderBase', id, 'responseData'], fromJS(response))
        .setIn(['bizBuilderBase', id, 'workInfo'], fromJS(work))
        .setIn(['bizBuilderBase', id, 'metaList'], fromJS(metaList))
        .setIn(['bizBuilderBase', id, 'workFlow'], fromJS(workFlow || {}))
        .setIn(['bizBuilderBase', id, 'isLoading'], false);
    }
    case actionTypes.SET_PROCESS_RULE: {
      const { id, processRule } = action;
      return state.setIn(['bizBuilderBase', id, 'processRule'], fromJS(processRule));
    }
    case actionTypes.SET_PROCESS_STEP: {
      const { id, processStep } = action;
      return state.setIn(['bizBuilderBase', id, 'processRule', 'DRAFT_PROCESS_STEP'], fromJS(processStep));
    }
    case actionTypes.INIT_FORMDATA: {
      const { id, formData } = action;
      // const formData = {};
      const validationData = {};
      return state
        .setIn(['bizBuilderBase', id, 'formData'], fromJS(formData || {}))
        .setIn(['bizBuilderBase', id, 'validationData'], fromJS(validationData || {}));
    }
    case actionTypes.GET_EXTRA_API_DATA: {
      const { id, apiArr } = action;
      return state.setIn(['bizBuilderBase', id, 'apiArr'], apiArr);
    }
    case actionTypes.SET_EXTRA_API_DATA: {
      const { id, apiKey, response } = action;
      return state.setIn(['bizBuilderBase', id, 'extraApiData', apiKey], response);
    }
    case actionTypes.SET_DETAIL_DATA: {
      const { id, data } = action;
      return state.setIn(['bizBuilderBase', id, 'formData'], fromJS(data));
    }
    case actionTypes.SET_TASK_SEQ: {
      const { id, taskSeq } = action;
      return state.setIn(['bizBuilderBase', id, 'taskSeq'], taskSeq).setIn(['bizBuilderBase', id, 'viewPageData', 'taskSeq'], taskSeq);
    }
    // case actionTypes.SUCCESS_SAVE_TEMP_CONTENTS: {
    //   const { id, CONT_SEQ, FIELD_NAME } = action;
    //   return state.setIn(['bizBuilderBase', id, 'formData', FIELD_NAME, 'contSeq'], CONT_SEQ);
    // }
    case actionTypes.CHANGE_FORMDATA: {
      const { id, key, val } = action;
      const metaList = state.getIn(['bizBuilderBase', id, 'metaList']) !== undefined ? state.getIn(['bizBuilderBase', id, 'metaList']).toJS() : [];
      // let compTag = '';

      // metaList
      //   .filter(meta => meta.COMP_TYPE === 'FIELD')
      //   .forEach(item => {
      //     if (item.COMP_FIELD === key) {
      //       compTag = item.COMP_TAG;
      //     }
      //   });

      // if (compTag.toUpperCase().indexOf('EDITOR') > -1) {
      //   const arr = state.getIn(['bizBuilderBase', id, 'formData', key]) !== undefined ? state.getIn(['bizBuilderBase', id, 'formData', key]).toJS() : [];
      //   arr.forEach(item => {
      //     if (item.FIELD_NM === key) {
      //       item.DETAIL = val;
      //     }
      //   });
      //   return state.setIn(['bizBuilderBase', id, 'formData', key], fromJS(arr));
      // }
      // if (compTag.toUpperCase().indexOf('ATTACH') > -1) {
      //   return state.setIn(['bizBuilderBase', id, 'formData', key, 'DETAIL'], val);
      // }
      return state.setIn(['bizBuilderBase', id, 'formData', key], val);
    }
    case actionTypes.SUCCESS_SAVE_TASK: {
      const { id } = action;
      const workSeq = state.getIn(['bizBuilderBase', id, 'workSeq']);
      const metaList = state.getIn(['bizBuilderBase', id, 'metaList']).toJS();
      const formData = {};
      const validationData = {};

      metaList
        .filter(meta => meta.COMP_TYPE === 'FIELD')
        .forEach(item => {
          // if (item.COMP_TAG.toUpperCase().indexOf('EDITOR') > -1 || item.COMP_TAG.toUpperCase().indexOf('ATTACH') || item.COMP_TAG === 'work-selector') {
          //   formData[item.COMP_FIELD] = {
          //     WORK_SEQ: workSeq,
          //     TASK_SEQ: -1,
          //     CONT_SEQ: -1,
          //     FIELD_NM: item.COMP_FIELD,
          //     TYPE: item.COMP_TAG,
          //     DETAIL: [],
          //   };
          // } else {
          //   formData[item.COMP_FIELD] = '';
          // }

          let flag = true;
          let msg = '';

          if (item.CONFIG && item.CONFIG.length > 0 && isJSON(item.CONFIG)) {
            const config = JSON.parse(item.CONFIG);
            if (config.property && config.property.isRequired) {
              flag = false;
              msg = `${item.NAME_KOR}항목은 필수 입력입니다.`;
            }
            formData[item.COMP_FIELD] = '';
          }
          validationData[item.COMP_FIELD] = { flag, msg };
        });

      return state
        .setIn(['bizBuilderBase', id, 'taskSeq'], -1)
        .setIn(['bizBuilderBase', id, 'formData'], fromJS(formData || {}))
        .setIn(['bizBuilderBase', id, 'validationData'], fromJS(validationData || {}));
    }
    case actionTypes.REMOVE_REDUX_STATE: {
      const { id } = action;
      return state
        .deleteIn(['bizBuilderBase', id, 'responseData'])
        .deleteIn(['bizBuilderBase', id, 'workInfo'])
        .deleteIn(['bizBuilderBase', id, 'metaList'])
        .deleteIn(['bizBuilderBase', id, 'workFlow'])
        .deleteIn(['bizBuilderBase', id, 'formData'])
        .deleteIn(['bizBuilderBase', id, 'validationData']);
    }
    case actionTypes.SET_REVISION_HISTORY: {
      const { id, list } = action;
      return state.setIn(['bizBuilderBase', id, 'revisionHistory'], fromJS(list));
    }
    case actionTypes.CHANGE_VALIDATIONDATA_REDUCR: {
      const { id, key, flag, msg } = action;
      return state.setIn(['bizBuilderBase', id, 'validationData', key], fromJS({ flag, msg }));
    }
    case actionTypes.SET_DRAFT_PROCESS: {
      const { id, draftProcess } = action;
      return state.setIn(['bizBuilderBase', id, 'draftProcess'], fromJS(draftProcess));
    }
    case actionTypes.SET_VIEWPAGEDATA_REDUCER: {
      const { id, workSeq, taskSeq, viewType } = action;
      return state
        .setIn(['bizBuilderBase', id, 'viewPageData', 'viewType'], viewType)
        .setIn(['bizBuilderBase', id, 'viewPageData', 'workSeq'], workSeq)
        .setIn(['bizBuilderBase', id, 'viewPageData', 'taskSeq'], taskSeq);
    }
    case actionTypes.SET_VIEWTYPE_REDUCER: {
      const { id, viewType } = action;
      return state.setIn(['bizBuilderBase', id, 'viewPageData', 'viewType'], viewType);
    }
    case actionTypes.ENABLE_DATA_LOADING: {
      return state.set('dataLoading', true);
    }
    case actionTypes.DISABLE_DATA_LOADING: {
      return state.set('dataLoading', false);
    }
    default:
      return state;
  }
};

export default reducer;
