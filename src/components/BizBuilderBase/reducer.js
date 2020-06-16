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
      const { id, workSeq, taskSeq, conditional } = action;
      return state
        .setIn(['bizBuilderBase', id, 'workSeq'], workSeq)
        .setIn(['bizBuilderBase', id, 'taskSeq'], taskSeq)
        .setIn(['bizBuilderBase', id, 'isLoading'], true)
        .setIn(['bizBuilderBase', id, 'conditional'], conditional || '');
    }
    case actionTypes.SET_BUILDER_DATA: {
      const {
        id,
        workSeq,
        taskSeq,
        viewType,
        extraProps,
        response,
        work,
        metaList,
        workFlow,
        apiList,
        viewProcessList,
        viewSetData,
        fieldSelectData,
        formData,
        validationData,
      } = action;

      if (formData && validationData) {
        state = state
          .setIn(['bizBuilderBase', id, 'formData'], fromJS(formData || {}))
          .setIn(['bizBuilderBase', id, 'validationData'], fromJS(validationData || {}));
      }

      if (extraProps && extraProps.viewChangeSeq && extraProps.viewChangeSeq > 0) {
        state = state.setIn(['bizBuilderBase', id, 'formData', 'VIEW_CHANGE_PROCESS_SEQ'], extraProps.viewChangeSeq);
      }

      if (viewSetData && viewSetData.viewSeq && viewSetData.viewSeq > 0 && viewSetData.viewLayer) {
        state = state
          .setIn(['bizBuilderBase', id, 'viewSeq'], viewSetData.viewSeq)
          .setIn(['bizBuilderBase', id, 'viewLayer'], fromJS(viewSetData.viewLayer || []));
      }

      return state
        .setIn(['bizBuilderBase', id, 'responseData'], fromJS(response))
        .setIn(['bizBuilderBase', id, 'workInfo'], fromJS(work))
        .setIn(['bizBuilderBase', id, 'metaList'], fromJS(metaList))
        .setIn(['bizBuilderBase', id, 'workFlow'], fromJS(workFlow || {}))
        .setIn(['bizBuilderBase', id, 'apiList'], fromJS(apiList || []))
        .setIn(['bizBuilderBase', id, 'viewProcessList'], fromJS(viewProcessList || []))
        .setIn(['bizBuilderBase', id, 'viewPageData', 'workSeq'], workSeq)
        .setIn(['bizBuilderBase', id, 'viewPageData', 'taskSeq'], taskSeq)
        .setIn(['bizBuilderBase', id, 'viewPageData', 'viewType'], viewType)
        .setIn(['bizBuilderBase', id, 'fieldSelectData'], fromJS(fieldSelectData || {}))
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
      const { id, data, validationData, draftInfo } = action;
      return state
        .setIn(['bizBuilderBase', id, 'formData'], fromJS(data))
        .setIn(['bizBuilderBase', id, 'validationData'], fromJS(validationData))
        .setIn(['bizBuilderBase', id, 'draftInfo'], fromJS(draftInfo));
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
      const metaList = state.getIn(['bizBuilderBase', id, 'metaList']);
      if (metaList && metaList.size > 0) {
        const compConfig = metaList.getIn([metaList.findIndex(iNode => iNode.get('COMP_FIELD') === key), 'CONFIG']);
        if (isJSON(compConfig)) {
          const compConfigObject = JSON.parse(compConfig);
          const { isRequired } = compConfigObject.property;
          if (isRequired) {
            let requiredFlag = false;
            const requiredMsg = `${key}항목은 필수 입력입니다.`;
            switch (typeof val) {
              case 'string':
                requiredFlag = !!(val && val.length > 0);
                break;
              case 'number':
              case 'bigint':
                requiredFlag = !!val;
                break;
              case 'undefined':
                requiredFlag = false;
                break;
              default:
                requiredFlag = !!val;
            }
            state = state
              .setIn(['bizBuilderBase', id, 'validationData', key, 'requiredFlag'], requiredFlag)
              .setIn(['bizBuilderBase', id, 'validationData', key, 'requiredMsg'], requiredMsg);
          }
        }
      }
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
          validationData[item.COMP_FIELD] = { flag: true, msg: '', requiredFlag: flag, requiredMsg: msg };
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
        .deleteIn(['bizBuilderBase', id, 'validationData'])
        .deleteIn(['bizBuilderBase', id, 'listData'])
        .deleteIn(['bizBuilderBase', id, 'listSelectRowKeys'])
        .deleteIn(['bizBuilderBase', id, 'processRule']);
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
    case actionTypes.SET_LIST_DATA_REDUCER: {
      const { id, listData, listTotalCnt } = action;
      return state.setIn(['bizBuilderBase', id, 'listData'], fromJS(listData)).setIn(['bizBuilderBase', id, 'listTotalCnt'], listTotalCnt);
    }
    case actionTypes.CHANGE_SEARCH_DATA_REDUCER: {
      const { id, key, val } = action;
      return state.setIn(['bizBuilderBase', id, 'searchData', key], val);
    }
    case actionTypes.DESTROY_REDUCER: {
      const { id } = action;
      return state.deleteIn(['bizBuilderBase', id]);
    }
    case actionTypes.SET_LIST_SELECT_ROW_KEYS_REDUCER: {
      const { id, list } = action;
      return state.setIn(['bizBuilderBase', id, 'listSelectRowKeys'], fromJS(list));
    }
    case actionTypes.SET_BUILDER_MODAL_REDUCER: {
      const { id, flag, builderModalSetting, isSaveModalClose } = action;
      return state
        .setIn(['bizBuilderBase', id, 'isBuilderModal'], flag)
        .setIn(['bizBuilderBase', id, 'builderModalSetting'], builderModalSetting)
        .setIn(['bizBuilderBase', id, 'isSaveModalClose'], isSaveModalClose);
    }
    case actionTypes.SET_IS_LOADING_REDUCER: {
      const { id, flag } = action;
      return state.setIn(['bizBuilderBase', id, 'isLoading'], flag);
    }
    case actionTypes.SET_FORMDATA_REDUCER: {
      const { id, formData } = action;
      return state.setIn(['bizBuilderBase', id, 'formData'], fromJS(formData));
    }
    case actionTypes.SET_IS_TASK_FAVORITE_REDUCER: {
      const { id, flag } = action;
      return state.setIn(['bizBuilderBase', id, 'isTaskFavorite'], flag);
    }
    default:
      return state;
  }
};

export default reducer;
