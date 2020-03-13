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
      const { id, workSeq, taskSeq, viewType, extraProps, response, work, metaList, workFlow, apiList, viewProcessList, formData, validationData } = action;
      const { inputMetaSeq, modifyMetaSeq, viewMetaSeq, listMetaSeq, customViewChangeProcessSeq } = extraProps;
      const reduxFormData = state.getIn(['bizBuilderBase', id, 'formData']) ? state.getIn(['bizBuilderBase', id, 'formData']).toJS() : {};
      const upperCaseViewType = viewType && viewType.length > 0 ? viewType.toUpperCase() : state.getIn(['bizBuilderBase', id, 'viewPageData', 'viewType']);
      let viewChangeProcessSeq = -1;
      if (formData && formData.VIEW_CHANGE_PROCESS_SEQ && formData.VIEW_CHANGE_PROCESS_SEQ > -1) {
        viewChangeProcessSeq = formData.VIEW_CHANGE_PROCESS_SEQ;
      } else if (reduxFormData && reduxFormData.VIEW_CHANGE_PROCESS_SEQ && reduxFormData.VIEW_CHANGE_PROCESS_SEQ > -1) {
        viewChangeProcessSeq = reduxFormData.VIEW_CHANGE_PROCESS_SEQ;
      }
      let viewSeq = -1;
      if (upperCaseViewType === 'INPUT' && inputMetaSeq > -1) {
        viewSeq = inputMetaSeq;
      } else if (upperCaseViewType === 'MODIFY' && modifyMetaSeq > -1) {
        viewSeq = modifyMetaSeq;
      } else if (upperCaseViewType === 'VIEW' && viewMetaSeq > -1) {
        viewSeq = viewMetaSeq;
      } else if (upperCaseViewType === 'LIST' && listMetaSeq > -1) {
        viewSeq = listMetaSeq;
      } else if (customViewChangeProcessSeq && customViewChangeProcessSeq > 0) {
        const findIdx = viewProcessList.findIndex(iNode => iNode.VIEW_CHANGE_PROCESS_SEQ === customViewChangeProcessSeq);
        if (findIdx > -1) {
          const viewChangeProcessInfo = viewProcessList[findIdx];
          viewSeq = viewChangeProcessInfo[`${upperCaseViewType}_META_SEQ`];
        }
      } else if (viewChangeProcessSeq > -1) {
        const findIdx = viewProcessList.findIndex(iNode => iNode.VIEW_CHANGE_PROCESS_SEQ === viewChangeProcessSeq);
        if (findIdx > -1) {
          const viewChangeProcessInfo = viewProcessList[findIdx];
          viewSeq = viewChangeProcessInfo[`${upperCaseViewType}_META_SEQ`];
        }
      } else if (work.VIEW_CHANGE_PROCESS_SEQ && work.VIEW_CHANGE_PROCESS_SEQ > -1) {
        const findIdx = viewProcessList.findIndex(iNode => iNode.VIEW_CHANGE_PROCESS_SEQ === work.VIEW_CHANGE_PROCESS_SEQ);
        if (findIdx > -1) {
          const viewChangeProcessInfo = viewProcessList[findIdx];
          viewSeq = viewChangeProcessInfo[`${upperCaseViewType}_META_SEQ`];
        }
      } else {
        viewSeq = work[`VW_${upperCaseViewType}`];
      }
      const viewLayer = metaList.filter(fNode => fNode.COMP_TYPE === 'VIEW' && fNode.COMP_TAG === upperCaseViewType && fNode.META_SEQ === viewSeq);

      if (formData && validationData) {
        return state
          .setIn(['bizBuilderBase', id, 'responseData'], fromJS(response))
          .setIn(['bizBuilderBase', id, 'workInfo'], fromJS(work))
          .setIn(['bizBuilderBase', id, 'metaList'], fromJS(metaList))
          .setIn(['bizBuilderBase', id, 'workFlow'], fromJS(workFlow || {}))
          .setIn(['bizBuilderBase', id, 'apiList'], fromJS(apiList || []))
          .setIn(['bizBuilderBase', id, 'formData'], fromJS(formData || {}))
          .setIn(['bizBuilderBase', id, 'validationData'], fromJS(validationData || {}))
          .setIn(['bizBuilderBase', id, 'viewProcessList'], fromJS(viewProcessList || []))
          .setIn(['bizBuilderBase', id, 'viewPageData', 'workSeq'], workSeq)
          .setIn(['bizBuilderBase', id, 'viewPageData', 'taskSeq'], taskSeq)
          .setIn(['bizBuilderBase', id, 'viewPageData', 'viewType'], upperCaseViewType)
          .setIn(['bizBuilderBase', id, 'viewSeq'], viewSeq)
          .setIn(['bizBuilderBase', id, 'viewLayer'], fromJS(viewLayer || []))
          .setIn(['bizBuilderBase', id, 'isLoading'], false);
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
        .setIn(['bizBuilderBase', id, 'viewPageData', 'viewType'], upperCaseViewType)
        .setIn(['bizBuilderBase', id, 'viewSeq'], viewSeq)
        .setIn(['bizBuilderBase', id, 'viewLayer'], fromJS(viewLayer || []))
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
      const metaList = state.getIn(['bizBuilderBase', id, 'metaList']);
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
      const { id, listData } = action;
      return state.setIn(['bizBuilderBase', id, 'listData'], fromJS(listData));
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
      const { id, flag, builderModalSetting } = action;
      return state.setIn(['bizBuilderBase', id, 'isBuilderModal'], flag).setIn(['bizBuilderBase', id, 'builderModalSetting'], builderModalSetting);
    }
    case actionTypes.SET_IS_LOADING_REDUCER: {
      const { id, flag } = action;
      return state.setIn(['bizBuilderBase', id, 'isLoading'], flag);
    }
    default:
      return state;
  }
};

export default reducer;
