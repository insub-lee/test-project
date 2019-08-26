import { fromJS } from 'immutable';
import moment from 'moment';
import * as constantTypes from './constants';
const initialState = fromJS({
  manualMasterState: {
    pageMoveType: {
      pageType: 'DefaultMgr',
      selectedMualIdx: 0,
      selectedCategoryIdx: 0,
    },
    defaultMgrMap: {
      SELECTED_MUAL_IDX: 0,
      CATEGORY_IDX: 0,
      MUAL_IDX: 0,
      MUAL_ORG_IDX: 0,
      MUAL_NAME: '',
      VERSION: 0,
      ISDISPLAY: 1,
      ISPRODUCT: 0,
      REGISTERID: 0,
      UPDATEID: 0,
      PUBDATE: moment().format('YYYY-MM-DD'),
      MUAL_STATE: 'WAIT',
      ENDDATE: moment('9999-12-31').format('YYYY-MM-DD'),
      MUAL_TYPE: 1,
      VERSIONLIST: [],
    },
    manualEditorEntity: {
      selectedMualTabIdx: 0,
      selectedTabArrayIdx: 0,
      selectedComponentIdx: 0,
      focusComponentIdx: 0,
      addComponentId: '',
      editorTabList: [],
      selectedAddIdx: 0,
      scrollComp: {},
    },
    manualOptionMgr: {
      relationManualList: [],
      isRelationMualModal: false,
    },
    isEditorMgr: false,
    compareTempletMgr: {
      isAddMualTypeModal: false,
      compareTempletList: [],
      selectedNode: {
        TEMPLET_IDX: 0,
        TEMPLET_PIDX: 0,
        TEMPLET_NAME: '',
        TEMPLET_CONTENT: [],
        IS_FOLDER: 'Y',
        SORT_SQ: 9999,
      },
      viewMode: 'I',
      hoverKey: 0,
      manage: {
        templet: {},
        data: {},
        selectedIdx: 0,
      },
    },
  },
});

const initDefaultMgrMapValue = fromJS({
  SELECTED_MUAL_IDX: 0,
  CATEGORY_IDX: 0,
  MUAL_IDX: 0,
  MUAL_ORG_IDX: 0,
  MUAL_NAME: '',
  VERSION: 0,
  ISDISPLAY: 1,
  ISPRODUCT: 0,
  REGISTERID: 0,
  UPDATEID: 0,
  PUBDATE: moment().format('YYYY-MM-DD'),
  MUAL_STATE: 'WAIT',
  ENDDATE: moment('9999-12-31').format('YYYY-MM-DD'), // ,ENDDATE: moment('9999-12-31').valueOf(),
  MUAL_TYPE: 1,
  VERSIONLIST: [],
});

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case constantTypes.SET_MOVEPAGETYPEBYREDUCR: {
      const { pageMoveType } = action;
      return state
        .setIn(['manualMasterState', 'defaultMgrMap'], initDefaultMgrMapValue.set('CATEGORY_IDX', pageMoveType.get('selectedCategoryIdx')))
        .setIn(['manualMasterState', 'pageMoveType'], pageMoveType)
        .setIn(['manualMasterState', 'defaultMgrMap', 'SELECTED_MUAL_IDX'], pageMoveType.get('selectedMualIdx'));
    }
    case constantTypes.SET_RELATIONMANUALLISTBYMUALIDX_REDUCR: {
      const { mualIdx, selected, target } = action;
      if (target === 'left') {
        const relationList = state.getIn(['manualMasterState', 'optionMgr', 'relationManualList']);
        const fidx = relationList.findIndex(x => x.MUAL_IDX === mualIdx);
        relationList[fidx].checked = selected;
        state.setIn(['manualMasterState', 'optionMgr', 'relationManualList'], relationList);
      } else {
        const selectedRelationManual = state.getIn(['manualMasterState', 'optionMgr', 'selectedRelationManual']);
        const fidx = selectedRelationManual.findIndex(x => x.MUAL_IDX === mualIdx);
        selectedRelationManual[fidx].checked = selected;
        state.setIn(['manualMasterState', 'optionMgr', 'selectedRelationManual'], selectedRelationManual);
      }
      return state;
    }
    case constantTypes.SET_SELECTEDRELATIONMANUAL_REDUCR: {
      const { items } = action;
      return state.setIn(['manualMasterState', 'optionMgr', 'selectedRelationManual'], items);
    }
    case constantTypes.SET_RELATIONCATEGORYIDX: {
      const { categoryIdx } = action;
      return state.setIn(['manualMasterState', 'optionMgr', 'selectedCategoryIdx'], categoryIdx);
    }
    case constantTypes.SET_RELATIONMANUALLIST_REDUCR: {
      const { manualList } = action;
      return state.setIn(['manualMasterState', 'optionMgr', 'relationManualList'], manualList);
    }
    case constantTypes.SET_CATEGORYLIST_REDUCR: {
      const { categoryList } = action;
      return state.setIn(['manualMasterState', 'optionMgr', 'categoryList'], categoryList);
    }
    case constantTypes.SET_SELECTEDUSERINFO_REDUCR: {
      const { selectedUserInfo } = action;
      return state.setIn(['manualMasterState', 'selectedUserInfo'], selectedUserInfo);
    }
    case constantTypes.SET_USERINFO_REDUCR: {
      const { userInfoList } = action;
      return state.setIn(['manualMasterState', 'userInfoList'], userInfoList);
    }
    case constantTypes.INIT_DEFAULTMGR_REDUCR: {
      const selectedCategoryIdx = state.getIn(['manualMasterState', 'pageMoveType', 'selectedCategoryIdx']);
      return state.setIn(['manualMasterState', 'defaultMgrMap'], initDefaultMgrMapValue.set('CATEGORY_IDX', selectedCategoryIdx));
    }
    case constantTypes.SET_DEFAULTMGRCHANGEVALUE_REDUCR: {
      const { key, value } = action;
      return state.setIn(['manualMasterState', 'defaultMgrMap', key], value);
    }
    case constantTypes.SET_DEFAULTMGR_REDUCR: {
      const { defaultMgrMap } = action;
      return state.setIn(['manualMasterState', 'defaultMgrMap'], defaultMgrMap);
    }
    case constantTypes.ADD_TAB_INFO_REDUCR: {
      return addTabInfo(state);
    }
    case constantTypes.SET_TAB_IDX_REDUCR: {
      const { tabIdx, idx } = action;
      return state
        .setIn(['manualMasterState', 'manualEditorEntity', 'selectedMualTabIdx'], tabIdx)
        .setIn(['manualMasterState', 'manualEditorEntity', 'selectedTabArrayIdx'], idx)
        .setIn(['manualMasterState', 'manualEditorEntity', 'selectedComponentIdx'], 0)
        .setIn(['manualMasterState', 'manualEditorEntity', 'focusComponentIdx'], 0)
        .setIn(['manualMasterState', 'manualEditorEntity', 'addComponentId'], '')
        .setIn(['manualMasterState', 'manualEditorEntity', 'selectedAddIdx'], 0);
    }
    case constantTypes.REMOVE_TAB_INFO_REDUCR: {
      const { tabIdx } = action;
      const idx = state.getIn(['manualMasterState', 'manualEditorEntity', 'editorTabList']).findIndex(item => item.get('MUAL_TAB_IDX') === tabIdx);
      const isSave = state.getIn(['manualMasterState', 'manualEditorEntity', 'editorTabList', idx, 'IS_SAVE']);
      const tabList = state
        .getIn(['manualMasterState', 'manualEditorEntity', 'editorTabList'])
        .filter(item => item.get('IS_REMOVE') === 'N' && item.get('MUAL_TAB_IDX') !== tabIdx);
      const selectTabIdx = tabList.size > 0 ? tabList.getIn([0, 'MUAL_TAB_IDX']) : 0;
      if (isSave === 'Y') {
        return state
          .setIn(['manualMasterState', 'manualEditorEntity', 'editorTabList', idx, 'IS_REMOVE'], 'Y')
          .setIn(['manualMasterState', 'manualEditorEntity', 'editorTabList', idx, 'SORT_SQ'], 9999)
          .setIn(['manualMasterState', 'manualEditorEntity', 'selectedMualTabIdx'], selectTabIdx)
          .setIn(['manualMasterState', 'manualEditorEntity', 'selectedTabArrayIdx'], 0)
          .setIn(['manualMasterState', 'manualEditorEntity', 'selectedComponentIdx'], 0)
          .setIn(['manualMasterState', 'manualEditorEntity', 'focusComponentIdx'], 0)
          .setIn(['manualMasterState', 'manualEditorEntity', 'addComponentId'], '')
          .setIn(['manualMasterState', 'manualEditorEntity', 'selectedAddIdx'], 0);
      }
      return state
        .deleteIn(['manualMasterState', 'manualEditorEntity', 'editorTabList', idx])
        .setIn(['manualMasterState', 'manualEditorEntity', 'selectedMualTabIdx'], selectTabIdx)
        .setIn(['manualMasterState', 'manualEditorEntity', 'selectedTabArrayIdx'], 0)
        .setIn(['manualMasterState', 'manualEditorEntity', 'selectedComponentIdx'], 0)
        .setIn(['manualMasterState', 'manualEditorEntity', 'focusComponentIdx'], 0)
        .setIn(['manualMasterState', 'manualEditorEntity', 'addComponentId'], '')
        .setIn(['manualMasterState', 'manualEditorEntity', 'selectedAddIdx'], 0);
    }
    case constantTypes.SET_IS_EDITORMGR_REDUCR: {
      const { flag } = action;
      return state.setIn(['manualMasterState', 'isEditorMgr'], flag);
    }
    case constantTypes.SET_PAGE_TYPE_REDUCR: {
      const { pageType } = action;
      return state.setIn(['manualMasterState', 'pageMoveType', 'pageType'], pageType);
    }
    case constantTypes.SET_EDITORMGR_REDUCR: {
      const { tabList } = action;
      // const selectedTabIdx = state.getIn(['manualMasterState', 'manualEditorEntity', 'selectedMualTabIdx']);
      const selectedTabArrayIdx = state.getIn(['manualMasterState', 'manualEditorEntity', 'selectedTabArrayIdx']);
      if (tabList && tabList.size > 0) {
        return state
          .setIn(['manualMasterState', 'manualEditorEntity', 'editorTabList'], tabList)
          .setIn(['manualMasterState', 'manualEditorEntity', 'selectedMualTabIdx'], tabList.getIn([selectedTabArrayIdx, 'MUAL_TAB_IDX']));
      }
      const selectedMualIdx = state.getIn(['manualMasterState', 'pageMoveType', 'selectedMualIdx']);
      const editorTabList = fromJS([
        {
          MUAL_TAB_IDX: 1,
          MUAL_IDX: selectedMualIdx,
          SORT_SQ: 1,
          MUAL_TABNAME: 'New Tab',
          MUAL_TABVIEWINFO: '',
          IS_REMOVE: 'N',
          IS_SAVE: 'N',
        },
      ]);
      return state
        .setIn(['manualMasterState', 'manualEditorEntity', 'editorTabList'], editorTabList)
        .setIn(['manualMasterState', 'manualEditorEntity', 'selectedMualTabIdx'], 1);
    }
    case constantTypes.SET_TAB_NAME_REDUCR: {
      const { tabName, tabIdx } = action;
      const idx = state.getIn(['manualMasterState', 'manualEditorEntity', 'editorTabList']).findIndex(item => item.get('MUAL_TAB_IDX') === tabIdx);
      return state.setIn(['manualMasterState', 'manualEditorEntity', 'editorTabList', idx, 'MUAL_TABNAME'], tabName);
    }
    case constantTypes.RESET_EDITORMGR_REDUCR: {
      return state
        .setIn(
          ['manualMasterState', 'manualEditorEntity'],
          fromJS({
            selectedMualTabIdx: 0,
            selectedTabArrayIdx: 0,
            selectedComponentIdx: 0,
            focusComponentIdx: 0,
            addComponentId: '',
            editorTabList: [],
            selectedAddIdx: 0,
          }),
        )
        .setIn(['manualMasterState', 'isEditorMgr'], false);
    }
    case constantTypes.MOVE_TAB_COMPONENT_REDUCR: {
      const { node } = action;
      if (!node.destination) {
        return state;
      }
      const selectedTabIdx = state.getIn(['manualMasterState', 'manualEditorEntity', 'selectedMualTabIdx']);
      const idx = state.getIn(['manualMasterState', 'manualEditorEntity', 'editorTabList']).findIndex(item => item.get('MUAL_TAB_IDX') === selectedTabIdx);
      const editorComponentList = state.getIn(['manualMasterState', 'manualEditorEntity', 'editorTabList', idx, 'editorComponentList']).toJS();
      const { source, destination } = node;
      const sourceCompIdx = editorComponentList.filter(item =>
        node.type.indexOf('manualEditorIndex') > -1
          ? item.MUAL_TABCOMP_PIDX === Number(node.type.split('-')[1]) && item.TYPE.indexOf('index') > -1
          : item.MUAL_TABCOMP_PIDX === Number(node.type.split('-')[1]),
      )[source.index].MUAL_TABCOMP_IDX;
      const sourceIdx = editorComponentList.findIndex(item => item.MUAL_TABCOMP_IDX === sourceCompIdx);
      const tagetCompIdx = editorComponentList.filter(item =>
        node.type.indexOf('manualEditorIndex') > -1
          ? item.MUAL_TABCOMP_PIDX === Number(node.type.split('-')[1]) && item.TYPE.indexOf('index') > -1
          : item.MUAL_TABCOMP_PIDX === Number(node.type.split('-')[1]),
      )[destination.index].MUAL_TABCOMP_IDX;
      const tagetIdx = editorComponentList.findIndex(item => item.MUAL_TABCOMP_IDX === tagetCompIdx);
      const [removed] = editorComponentList.splice(sourceIdx, 1);
      editorComponentList.splice(tagetIdx, 0, removed);
      // editorComponentList = editorComponentList.map((item, index) => ({ ...item, SORT_SQ: index + 1 }));

      let compList = [];
      if (editorComponentList && editorComponentList.length > 0) {
        const hashArr = {};

        for (let i = 0; i < editorComponentList.length; i++) {
          if (hashArr[editorComponentList[i].MUAL_TABCOMP_PIDX] === undefined) hashArr[editorComponentList[i].MUAL_TABCOMP_PIDX] = [];
          hashArr[editorComponentList[i].MUAL_TABCOMP_PIDX].push(editorComponentList[i]);
        }
        compList = hierarhySort(hashArr, 0, []);
        compList = compList.map((comp, index) => ({ ...comp, SORT_SQ: index + 1 }));
      }

      return state.setIn(['manualMasterState', 'manualEditorEntity', 'editorTabList', idx, 'editorComponentList'], fromJS(compList));
    }
    case constantTypes.ADD_EDITOR_COMPONENT_REDUCR: {
      const { compType } = action;
      return addComponentInfo(state, compType);
    }
    case constantTypes.SET_EDITOR_COMPONENT_VALUE_REDUCR: {
      const { tabIdx, compIdx, key, value } = action;
      const idx = state.getIn(['manualMasterState', 'manualEditorEntity', 'editorTabList']).findIndex(item => item.get('MUAL_TAB_IDX') === tabIdx);
      const editorComponentList = state.getIn(['manualMasterState', 'manualEditorEntity', 'editorTabList', idx, 'editorComponentList']);
      if (editorComponentList && editorComponentList.size > 0) {
        const innerIdx = editorComponentList.findIndex(item => item.get('MUAL_TABCOMP_IDX') === compIdx);
        if (key.indexOf('COMP_OPTION') > -1) {
          return state.setIn(
            ['manualMasterState', 'manualEditorEntity', 'editorTabList', idx, 'editorComponentList', innerIdx, 'COMP_OPTION', key.split('.')[1]],
            value,
          );
        }
        return state.setIn(['manualMasterState', 'manualEditorEntity', 'editorTabList', idx, 'editorComponentList', innerIdx, key], value);
      }
      return state;
    }
    case constantTypes.SET_EDITOR_COMPONENT_INDEX_REDUCR: {
      const { idx } = action;
      return state.setIn(['manualMasterState', 'manualEditorEntity', 'selectedComponentIdx'], idx);
    }
    case constantTypes.REMOVE_EDITOR_COMPONENT_REDUCR: {
      const { tabIdx, compIdx } = action;
      const idx = state.getIn(['manualMasterState', 'manualEditorEntity', 'editorTabList']).findIndex(item => item.get('MUAL_TAB_IDX') === tabIdx);
      let editorComponentList = removeEditorComponet(
        state.getIn(['manualMasterState', 'manualEditorEntity', 'editorTabList', idx, 'editorComponentList']),
        compIdx,
      );
      editorComponentList = editorComponentList.toJS().sort((a, b) => (a.SORT_SQ > b.SORT_SQ ? 1 : -1));
      editorComponentList = editorComponentList.map((item, sortIdx) => ({ ...item, SORT_SQ: item.IS_REMOVE === 'Y' ? 9999 : sortIdx + 1 }));
      return state.setIn(['manualMasterState', 'manualEditorEntity', 'editorTabList', idx, 'editorComponentList'], fromJS(editorComponentList));
    }
    case constantTypes.SET_ADD_EDITOR_COMPONENT_ID_REDUCR: {
      const { id } = action;
      return state.setIn(['manualMasterState', 'manualEditorEntity', 'addComponentId'], id);
    }
    case constantTypes.SET_FOCUS_EDITOR_COMPONENT_IDX_REDUCR: {
      const { idx } = action;
      return state.setIn(['manualMasterState', 'manualEditorEntity', 'focusComponentIdx'], idx);
    }
    case constantTypes.SET_ADD_EDITOR_COMPONENT_IDX_REDUCR: {
      const { idx } = action;
      return state.setIn(['manualMasterState', 'manualEditorEntity', 'selectedAddIdx'], idx);
    }
    case constantTypes.SET_EDITOR_COMPONENT_LIST_REDUCR: {
      const { compList } = action;
      const selectedTabIdx = state.getIn(['manualMasterState', 'manualEditorEntity', 'selectedMualTabIdx']);
      const idx = state.getIn(['manualMasterState', 'manualEditorEntity', 'editorTabList']).findIndex(item => item.get('MUAL_TAB_IDX') === selectedTabIdx);
      return state.setIn(['manualMasterState', 'manualEditorEntity', 'editorTabList', idx, 'editorComponentList'], fromJS(compList));
    }
    case constantTypes.SET_SCROLL_COMPONENT_REDUCR: {
      const { item } = action;
      return state.setIn(['manualMasterState', 'manualEditorEntity', 'scrollComp'], fromJS(item));
    }
    case constantTypes.SET_IS_RELATION_MUAL_MODAL_REDUCR: {
      const { flag } = action;
      return state.setIn(['manualMasterState', 'manualOptionMgr', 'isRelationMualModal'], flag);
    }
    case constantTypes.SET_IS_ADD_MUAL_TYPE_MODAL_REDUCR: {
      const { flag } = action;
      return state.setIn(['manualMasterState', 'compareTempletMgr', 'isAddMualTypeModal'], flag);
    }
    case constantTypes.SET_COMPARE_TEMPLET_REDUCR: {
      const { list } = action;
      return state.setIn(['manualMasterState', 'compareTempletMgr', 'compareTempletList'], list);
    }
    case constantTypes.SET_COMPARE_TEMPLET_VIEW_MODE_REDUCR: {
      const { node, flag } = action;
      return state
        .setIn(['manualMasterState', 'compareTempletMgr', 'selectedNode'], fromJS(node))
        .setIn(['manualMasterState', 'compareTempletMgr', 'viewMode'], flag);
    }
    case constantTypes.SET_COMPARE_TEMPLET_CHANGE_VALUE_REDUCR: {
      const { key, value } = action;
      return state.setIn(['manualMasterState', 'compareTempletMgr', 'selectedNode', key], value);
    }
    case constantTypes.SET_COMPARE_TEMPLET_HOVER_KEY_REDUCR: {
      const { idx } = action;
      return state.setIn(['manualMasterState', 'compareTempletMgr', 'hoverKey'], idx);
    }
    case constantTypes.SET_COMPARE_TEMPLET_CONTENT_NAME_REDUCR: {
      const { id, value } = action;
      const ciList = state.getIn(['manualMasterState', 'compareTempletMgr', 'selectedNode', 'TEMPLET_CONTENT']);
      const idx = ciList.findIndex(find => find.get('ITEM_IDX') === id);
      return state.setIn(['manualMasterState', 'compareTempletMgr', 'selectedNode', 'TEMPLET_CONTENT', idx, 'ITEM_NAME'], value);
    }
    case constantTypes.REMOVE_COMPARE_TEMPLET_CONTENT_ITEM_REDUCR: {
      const { id } = action;
      let ciList = state.getIn(['manualMasterState', 'compareTempletMgr', 'selectedNode', 'TEMPLET_CONTENT']);
      const idx = ciList.findIndex(find => find.get('ITEM_IDX') === id);
      ciList = ciList.delete(idx);
      return state.setIn(['manualMasterState', 'compareTempletMgr', 'selectedNode', 'TEMPLET_CONTENT'], ciList);
    }
    case constantTypes.ADD_COMPARE_TEMPLET_CONTENT_ITEM_REDUCR: {
      let ciList = state.getIn(['manualMasterState', 'compareTempletMgr', 'selectedNode', 'TEMPLET_CONTENT']) || fromJS([]);
      ciList = ciList.push(fromJS({ ITEM_IDX: -ciList.size, ITEM_NAME: '' }));
      return state.setIn(['manualMasterState', 'compareTempletMgr', 'selectedNode', 'TEMPLET_CONTENT'], ciList);
    }
    case constantTypes.MOVE_COMPARE_TEMPLET_CONTENT_ITEM_REDUCR: {
      const {
        dropResult: { source, destination },
      } = action;

      if (!destination) {
        return state;
      }

      const ciList = state.getIn(['manualMasterState', 'compareTempletMgr', 'selectedNode', 'TEMPLET_CONTENT']);
      const result = Array.from(ciList.toJS());
      const [removed] = result.splice(source.index, 1);
      result.splice(destination.index, 0, removed);
      return state.setIn(['manualMasterState', 'compareTempletMgr', 'selectedNode', 'TEMPLET_CONTENT'], fromJS(result));
    }
    case constantTypes.SET_COMPARE_MANAGE_TEMPLET_REDUCR: {
      const { data } = action;
      return state.setIn(['manualMasterState', 'compareTempletMgr', 'manage', 'templet'], fromJS(data));
    }
    case constantTypes.SET_COMPARE_MANAGE_DATA_REDUCR: {
      const { data } = action;
      return state.setIn(['manualMasterState', 'compareTempletMgr', 'manage', 'data'], fromJS(data));
    }
    case constantTypes.SET_COMPARE_MANAGE_CHANGE_VALUE_REDUCR: {
      const { idx, value } = action;
      return state.setIn(['manualMasterState', 'compareTempletMgr', 'manage', 'templet', 'TEMPLET_CONTENT', idx, 'ITEM_DATA'], value);
    }
    case constantTypes.SET_SELECTED_COMPARE_MANAGE_IDX_REDUCR: {
      const { idx } = action;
      return state.setIn(['manualMasterState', 'compareTempletMgr', 'manage', 'selectedIdx'], idx);
    }
    default:
      return state;
  }
};

const addTabInfo = state => {
  const selectedMualIdx = state.getIn(['manualMasterState', 'pageMoveType', 'selectedMualIdx']);
  const editorTabList = state.getIn(['manualMasterState', 'manualEditorEntity', 'editorTabList']);
  let maulTabIdx = 1;
  let sortSQ = 1;
  if (editorTabList.toJS().length > 0) {
    editorTabList.toJS().forEach(element => {
      maulTabIdx = element.MUAL_TAB_IDX > maulTabIdx ? element.MUAL_TAB_IDX : maulTabIdx;
      sortSQ = element.SORT_SQ > sortSQ ? element.SORT_SQ : sortSQ;
    });
    maulTabIdx += 1;
    sortSQ += 1;
  }
  const tabInfo = fromJS({
    MUAL_TAB_IDX: maulTabIdx,
    MUAL_IDX: selectedMualIdx,
    SORT_SQ: sortSQ,
    MUAL_TABNAME: 'New Tab',
    MUAL_TABVIEWINFO: '',
    IS_REMOVE: 'N',
    IS_SAVE: 'N',
  });
  return state
    .setIn(['manualMasterState', 'manualEditorEntity', 'editorTabList'], editorTabList.push(tabInfo))
    .setIn(['manualMasterState', 'manualEditorEntity', 'selectedMualTabIdx'], maulTabIdx);
};

const addComponentInfo = (state, compType) => {
  const addType = ['editor', 'index', 'indexLink', 'indexFile', 'qna'];
  if (addType.findIndex(item => item === compType) === -1) {
    console.debug('type error');
    return state;
  }
  const selectedMualIdx = Number(state.getIn(['manualMasterState', 'pageMoveType', 'selectedMualIdx']));
  const selectedTabIdx = state.getIn(['manualMasterState', 'manualEditorEntity', 'selectedMualTabIdx']);
  const selectedAddIdx = state.getIn(['manualMasterState', 'manualEditorEntity', 'selectedAddIdx']);
  const idx = state.getIn(['manualMasterState', 'manualEditorEntity', 'editorTabList']).findIndex(item => item.get('MUAL_TAB_IDX') === selectedTabIdx);
  let editorComponentList = state.getIn(['manualMasterState', 'manualEditorEntity', 'editorTabList', idx, 'editorComponentList'], fromJS([]));
  let maulCompIdx = 1;
  let sortSQ = 1;
  if (editorComponentList.toJS().length > 0) {
    editorComponentList.toJS().forEach(element => {
      maulCompIdx = element.MUAL_TABCOMP_IDX > maulCompIdx ? element.MUAL_TABCOMP_IDX : maulCompIdx;
      sortSQ = element.SORT_SQ > sortSQ ? element.SORT_SQ : sortSQ;
    });
    maulCompIdx += 1;
    sortSQ += 1;
  }
  const newComp = {
    MUAL_TABCOMP_IDX: maulCompIdx,
    MUAL_TABCOMP_OIDX: maulCompIdx,
    MUAL_TABCOMP_PIDX: selectedAddIdx,
    MUAL_TAB_IDX: selectedTabIdx,
    MUAL_IDX: selectedMualIdx,
    SORT_SQ: sortSQ,
    TYPE: compType,
    MUAL_COMPVIEWINFO: '',
    IS_REMOVE: 'N',
    IS_SAVE: 'N',
  };
  if (compType === 'indexLink') {
    newComp.COMP_OPTION = { URL: '', VIEW_TYPE: 'popup', ACTION_TYPE: 'menu' };
  }
  if (compType === 'indexFile') {
    newComp.COMP_OPTION = { VIEW_TYPE: 'link' };
  }
  if (compType === 'qna') {
    newComp.COMP_OPTION = { ANSWER: '' };
  }
  editorComponentList = editorComponentList.push(fromJS(newComp));
  if (compType === 'index') {
    const indexComp = {
      MUAL_TABCOMP_IDX: maulCompIdx + 1,
      MUAL_TABCOMP_OIDX: maulCompIdx + 1,
      MUAL_TABCOMP_PIDX: maulCompIdx,
      MUAL_TAB_IDX: selectedTabIdx,
      MUAL_IDX: selectedMualIdx,
      SORT_SQ: sortSQ + 1,
      TYPE: 'editor',
      MUAL_COMPVIEWINFO: '',
      IS_REMOVE: 'N',
      IS_SAVE: 'N',
    };
    editorComponentList = editorComponentList.push(fromJS(indexComp));
  }

  const tempCompList = editorComponentList.toJS();
  let compList = [];
  if (tempCompList && tempCompList.length > 0) {
    const hashArr = {};

    for (let i = 0; i < tempCompList.length; i++) {
      if (hashArr[tempCompList[i].MUAL_TABCOMP_PIDX] === undefined) hashArr[tempCompList[i].MUAL_TABCOMP_PIDX] = [];
      hashArr[tempCompList[i].MUAL_TABCOMP_PIDX].push(tempCompList[i]);
    }
    compList = hierarhySort(hashArr, 0, []);
    compList = compList.map((comp, index) => ({ ...comp, SORT_SQ: index + 1 }));
  }

  if (compType.indexOf('index') > -1 || compType === 'qna') {
    return state
      .setIn(['manualMasterState', 'manualEditorEntity', 'editorTabList', idx, 'editorComponentList'], fromJS(compList))
      .setIn(['manualMasterState', 'manualEditorEntity', 'addComponentId'], `editorCompID_${selectedTabIdx}_${maulCompIdx}`)
      .setIn(['manualMasterState', 'manualEditorEntity', 'selectedComponentIdx'], maulCompIdx);
  }
  return state
    .setIn(['manualMasterState', 'manualEditorEntity', 'editorTabList', idx, 'editorComponentList'], fromJS(compList))
    .setIn(['manualMasterState', 'manualEditorEntity', 'addComponentId'], `editorCompID_${selectedTabIdx}_${maulCompIdx}`)
    .setIn(['manualMasterState', 'manualEditorEntity', 'selectedComponentIdx'], maulCompIdx);
};

const hierarhySort = (hashArr, key, result) => {
  if (hashArr[key] === undefined) return;
  const arr = hashArr[key].sort((a, b) => (a.SORT_SQ > b.SORT_SQ ? 1 : -1));
  for (let i = 0; i < arr.length; i++) {
    result.push(arr[i]);
    hierarhySort(hashArr, arr[i].MUAL_TABCOMP_IDX, result);
  }

  return result;
};

const removeEditorComponet = (editorComponentList, compIdx) => {
  let resultList = editorComponentList;
  const childrenList = resultList.filter(item => item.get('MUAL_TABCOMP_PIDX') === compIdx);
  if (childrenList.size > 0) {
    childrenList.forEach(item => {
      resultList = removeEditorComponet(resultList, item.get('MUAL_TABCOMP_IDX'));
    });
  }
  const innerIdx = resultList.findIndex(item => item.get('MUAL_TABCOMP_IDX') === compIdx);
  if (resultList.getIn([innerIdx, 'IS_SAVE']) === 'Y') {
    return resultList.setIn([innerIdx, 'IS_REMOVE'], 'Y').setIn([innerIdx, 'SORT_SQ'], 9999);
  }
  return resultList.deleteIn([innerIdx]);
};

export default appReducer;
