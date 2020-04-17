import { fromJS } from 'immutable';
import uuid from 'uuid/v1';
import { getTreeFromFlatData } from 'react-sortable-tree';

import * as actionTypes from './constants';

const getNewKey = () => uuid();

const initialState = fromJS({
  topMenus: [
    { key: 'INPUT', title: '입력', menus: [] },
    { key: 'MODIFY', title: '수정', menus: [] },
    { key: 'VIEW', title: '조회', menus: [] },
    { key: 'LIST', title: '목록', menus: [] },
  ],
  activeTabKey: '1',
  isShowEditor: false,
  viewData: {
    WORK_SEQ: -1,
    COMP_TYPE: 'VIEW',
    COMP_TAG: '',
    NAME_KOR: 'BASIC',
    ORD: 1,
    PRNT_SEQ: -1,
    CONFIG: {
      info: { type: 'VIEW' },
      property: {
        layerIdxKey: `layerIdx_${getNewKey()}`,
        layer: {
          groups: [
            {
              key: getNewKey(),
              type: 'group',
              title: '',
              useTitle: false,
              rows: [
                {
                  key: getNewKey(),
                  type: 'row',
                  gutter: [8, 8],
                  cols: [
                    { key: getNewKey(), type: 'col', rowSpan: 1, span: 1, style: { height: '35px' } },
                    { key: getNewKey(), type: 'col', rowSpan: 1, span: 1, style: { height: '35px' } },
                    { key: getNewKey(), type: 'col', rowSpan: 1, span: 1, style: { height: '35px' } },
                    { key: getNewKey(), type: 'col', rowSpan: 1, span: 1, style: { height: '35px' } },
                  ],
                },
                {
                  key: getNewKey(),
                  type: 'row',
                  gutter: [8, 8],
                  cols: [
                    { key: getNewKey(), type: 'col', rowSpan: 1, span: 1, style: { height: '35px' } },
                    { key: getNewKey(), type: 'col', rowSpan: 1, span: 1, style: { height: '35px' } },
                    { key: getNewKey(), type: 'col', rowSpan: 1, span: 1, style: { height: '35px' } },
                    { key: getNewKey(), type: 'col', rowSpan: 1, span: 1, style: { height: '35px' } },
                  ],
                },
                {
                  key: getNewKey(),
                  type: 'row',
                  gutter: [8, 8],
                  cols: [
                    { key: getNewKey(), type: 'col', rowSpan: 1, span: 1, style: { height: '35px' } },
                    { key: getNewKey(), type: 'col', rowSpan: 1, span: 1, style: { height: '35px' } },
                    { key: getNewKey(), type: 'col', rowSpan: 1, span: 1, style: { height: '35px' } },
                    { key: getNewKey(), type: 'col', rowSpan: 1, span: 1, style: { height: '35px' } },
                  ],
                },
                {
                  key: getNewKey(),
                  type: 'row',
                  gutter: [8, 8],
                  cols: [
                    { key: getNewKey(), type: 'col', rowSpan: 1, span: 1, style: { height: '35px' } },
                    { key: getNewKey(), type: 'col', rowSpan: 1, span: 1, style: { height: '35px' } },
                    { key: getNewKey(), type: 'col', rowSpan: 1, span: 1, style: { height: '35px' } },
                    { key: getNewKey(), type: 'col', rowSpan: 1, span: 1, style: { height: '35px' } },
                  ],
                },
              ],
            },
          ],
          hiddenField: [],
        },
        bodyStyle: {
          width: '100%',
          height: '100%',
        },
      },
      option: {},
    },
  },
  selectedKeys: [],
  canMerge: {
    row: false,
    col: false,
  },
  canDivide: {
    row: false,
    col: false,
  },
  selectedStyleCells: [],
  compData: [],
  workInfo: {},
  compPoolList: [],
  compGroupList: [],
  compTreeData: [],
  selectedComp: {},
  selectedField: {},
  sysMetaList: [],
  isLoadingContent: true,
});

const initialSearchGroup = fromJS({
  key: getNewKey(),
  type: 'searchGroup',
  title: '',
  useTitle: false,
  rows: [
    {
      key: getNewKey(),
      type: 'row',
      gutter: [8, 8],
      cols: [
        { key: getNewKey(), type: 'col', span: 6, style: { height: '35px' } },
        { key: getNewKey(), type: 'col', span: 6, style: { height: '35px' } },
        { key: getNewKey(), type: 'col', span: 6, style: { height: '35px' } },
        { key: getNewKey(), type: 'col', span: 6, style: { height: '35px' } },
      ],
    },
    {
      key: getNewKey(),
      type: 'row',
      gutter: [8, 8],
      cols: [
        { key: getNewKey(), type: 'col', span: 6, style: { height: '35px' } },
        { key: getNewKey(), type: 'col', span: 6, style: { height: '35px' } },
        { key: getNewKey(), type: 'col', span: 6, style: { height: '35px' } },
        { key: getNewKey(), type: 'col', span: 6, style: { height: '35px' } },
      ],
    },
  ],
});

const initialListGroup = fromJS({
  key: getNewKey(),
  type: 'listGroup',
  title: '',
  useTitle: false,
  rows: [
    {
      key: getNewKey(),
      type: 'row',
      gutter: [8, 8],
      cols: [
        { key: getNewKey(), type: 'col', rowSpan: 1, span: 4, style: { width: '16.6%', height: '35px' } },
        { key: getNewKey(), type: 'col', rowSpan: 1, span: 4, style: { width: '16.6%', height: '35px' } },
        { key: getNewKey(), type: 'col', rowSpan: 1, span: 4, style: { width: '16.6%', height: '35px' } },
        { key: getNewKey(), type: 'col', rowSpan: 1, span: 4, style: { width: '16.6%', height: '35px' } },
        { key: getNewKey(), type: 'col', rowSpan: 1, span: 4, style: { width: '16.6%', height: '35px' } },
        { key: getNewKey(), type: 'col', rowSpan: 1, span: 4, style: { width: '16.6%', height: '35px' } },
      ],
    },
  ],
});

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_INIT_DATA_REDUCER: {
      const { workSeq, viewType } = action;
      const reloadState = initialState;
      return reloadState
        .set('workInfo', fromJS({ workSeq, viewType }))
        .setIn(['viewData', 'WORK_SEQ'], workSeq)
        .setIn(['viewData', 'COMP_TAG'], viewType);
    }
    case actionTypes.SET_INIT_LIST_DATA_REDUCER: {
      const { workSeq, viewType } = action;
      const reloadState = initialState;
      return reloadState
        .set('workInfo', fromJS({ workSeq, viewType }))
        .setIn(['viewData', 'WORK_SEQ'], workSeq)
        .setIn(['viewData', 'COMP_TAG'], viewType)
        .setIn(['viewData', 'CONFIG', 'property', 'layer', 'groups'], fromJS([initialSearchGroup, initialListGroup]));
    }
    case actionTypes.SET_WORK_INFO_REDUCER: {
      const { workSeq, viewType } = action;
      return state.set('workInfo', fromJS({ workSeq, viewType }));
    }

    case actionTypes.SET_VIEW_DATA_REDUCER: {
      const { viewData } = action;
      return state.set('viewData', fromJS(viewData));
    }
    case actionTypes.SET_COMP_DATA_REDUCER: {
      const { compData } = action;
      return state.set('compData', fromJS(compData));
    }
    case actionTypes.SET_TOP_MENUS_REDUCER: {
      const { topMenus } = action;
      return state.set('topMenus', fromJS(topMenus));
    }
    case actionTypes.SET_VIEW_DATA_COMP_ITEM_REDUCER: {
      const { compItem } = action;
      const selectedKeys = state.get('selectedKeys').toJS();
      const layerIdxKey = state.getIn(['viewData', 'CONFIG', 'property', 'layerIdxKey']);
      const viewType = state.getIn(['viewData', 'COMP_TAG']);
      const layerIdx = (compItem.CONFIG.property.layerIdx && compItem.CONFIG.property.layerIdx[layerIdxKey]) || null;
      let dataValidFlag = false;
      if (layerIdx) {
        const keyGroup = layerIdx.split('-');
        const colData = state
          .getIn(['viewData', 'CONFIG', 'property', 'layer', 'groups', Number(keyGroup[0]), 'rows', Number(keyGroup[1]), 'cols', Number(keyGroup[2])])
          .toJS();
        if (!colData || !colData.comp || !colData.comp.CONFIG) {
          dataValidFlag = true;
          delete compItem.CONFIG.property.layerIdx[layerIdxKey];
        } else {
          dataValidFlag = colData.comp.CONFIG.property.compKey !== compItem.CONFIG.property.compKey;
        }
      }

      if (selectedKeys.length === 1 && selectedKeys[0] === '999-0-0') {
        return addHiddenComp(state, compItem);
      }
      if (selectedKeys.length === 1 && (dataValidFlag || !layerIdx || (viewType === 'LIST' && selectedKeys[0].split('-')[0] !== layerIdx[0].split('-')[0]))) {
        return setCompItem(state, compItem, selectedKeys);
      }
      return state.set('selectedField', compItem);
    }
    case actionTypes.SET_COMPONENT_POOL_REDUCER: {
      const { list, group } = action;
      const flatData = group.map(node => {
        const tempList = list.filter(fNode => fNode.COL_GROUP_IDX === node.COL_GROUP_IDX) || [];
        if (tempList.length > 0)
          return {
            ...node,
            label: node.COL_GROUP_NAME,
            value: node.COL_GROUP_IDX,
            children: tempList.map(temp => ({ ...temp, label: temp.COMP_NAME, value: temp.COMP_POOL_IDX, extras: { ...temp } })),
          };
        return { ...node, label: node.COL_GROUP_NAME, value: node.COL_GROUP_IDX };
      });
      const treeData = getTreeFromFlatData({ flatData, getKey: node => node.COL_GROUP_IDX, getParentKey: node => node.COL_GROUP_PIDX, rootKey: -1 });
      return state
        .set('compPoolList', fromJS(list))
        .set('compGroupList', fromJS(group))
        .set('compTreeData', fromJS(treeData));
    }
    case actionTypes.SET_SYSMETA_LIST_REDUCER: {
      const { list, compList } = action;
      const sysList = [];
      list.forEach(node => {
        if (compList.findIndex(iNode => iNode.COMP_FIELD === node.COMP_FIELD) === -1) sysList.push(node);
      });
      return state.set('sysMetaList', fromJS(sysList));
    }
    case actionTypes.SET_SYS_COMP_ITEM_REDUCER: {
      const { compItem } = action;
      const workSeq = state.getIn(['workInfo', 'workSeq']);
      const sysList = state.get('sysMetaList');
      const compList = state.get('compData');
      const sysIdx = sysList.findIndex(iNode => iNode.get('COMP_FIELD') === compItem.COMP_FIELD);
      compItem.WORK_SEQ = workSeq;
      compItem.CONFIG.property.compKey = `Comp_${getNewKey()}`;
      return state.set('compData', compList.push(fromJS(compItem))).deleteIn(['sysMetaList', sysIdx]);
    }
    case actionTypes.ENABLE_CONTENT_LOADING: {
      return state.set('isLoadingContent', true);
    }
    case actionTypes.DISABLE_CONTENT_LOADING: {
      return state.set('isLoadingContent', false);
    }
    case actionTypes.ON_CHANGE_WIDTHS: {
      const { groupIndex, widths } = action;
      console.debug('@ Widths', groupIndex, widths);
      return state.setIn(['viewData', 'CONFIG', 'property', 'layer', 'groups', groupIndex, 'widths'], widths);
    }
    case actionTypes.ON_CHANGE_HEIGHTS: {
      const { groupIndex, heights } = action;
      console.debug('@ Heights', groupIndex, heights);
      const condition = ['viewData', 'CONFIG', 'property', 'layer', 'groups', groupIndex, 'rows'];
      return state.updateIn(condition, rows =>
        rows.map((row, rowIndex) => {
          const rowHeights = heights[rowIndex];
          return row.update('cols', cols =>
            cols.map(col => {
              if (col) {
                const span = col.get('span');
                return span && span > 0 ? col.setIn(['style', 'height'], rowHeights.shift()) : col;
              }
              return null;
            }),
          );
        }),
      );
    }
    case actionTypes.UPDATE_CELL_STYLE: {
      const { groupIndex, rowIndex, colIndex, key, value } = action;
      console.debug('@ Cell Style', groupIndex, rowIndex, colIndex, key, value);
      const condition = ['viewData', 'CONFIG', 'property', 'layer', 'groups', groupIndex, 'rows', rowIndex, 'cols', colIndex];
      const nextCol = state.getIn(['viewData', 'CONFIG', 'property', 'layer', 'groups', groupIndex, 'rows', rowIndex, 'cols', colIndex]);
      const nextColStyle = nextCol.get('style') || fromJS({});
      return state.setIn([...condition], nextCol.set('style', nextColStyle.set(key, value)));
    }
    default:
      return state;
  }
};

const setCompItem = (state, compItem, selectedKeys) => {
  const workSeq = state.getIn(['workInfo', 'workSeq']);
  let groups = state.getIn(['viewData', 'CONFIG', 'property', 'layer', 'groups']);
  let compData = state.get('compData');
  const layerIdxKey = state.getIn(['viewData', 'CONFIG', 'property', 'layerIdxKey']);
  const key = selectedKeys[0];
  const keyGroup = key.split('-');
  const colData = groups.getIn([Number(keyGroup[0]), 'rows', Number(keyGroup[1]), 'cols', Number(keyGroup[2])]).toJS();
  if (!colData.comp || !colData.comp.COMP_TAG) {
    if (!compItem.WORK_SEQ || compItem.WORK_SEQ < 1) compItem.WORK_SEQ = workSeq;
    if (!compItem.CONFIG.property.compKey || compItem.CONFIG.property.compKey.length === 0) compItem.CONFIG.property.compKey = `Comp_${getNewKey()}`;
    if (compItem.CONFIG.property.layerIdx) compItem.CONFIG.property.layerIdx[layerIdxKey] = key;
    else compItem.CONFIG.property.layerIdx = { [layerIdxKey]: key };
    let compIdx = compData.findIndex(iNode => iNode.getIn(['CONFIG', 'property', 'compKey']) === compItem.CONFIG.property.compKey);
    if (compIdx === -1) compIdx = compData.findIndex(iNode => iNode.get('COMP_FIELD') === compItem.COMP_FIELD);
    if (compItem.FIELD_TYPE === 'SYS' && compIdx === -1) compData = compData.push(fromJS(compItem));
    else compData = compData.set(compIdx, fromJS(compItem));
    compData = compData.set(compIdx, fromJS(compItem));
    groups = groups
      .setIn([Number(keyGroup[0]), 'rows', Number(keyGroup[1]), 'cols', Number(keyGroup[2]), 'className'], `view-designer-${compItem.COMP_TAG.toLowerCase()}`)
      .setIn([Number(keyGroup[0]), 'rows', Number(keyGroup[1]), 'cols', Number(keyGroup[2]), 'comp'], fromJS(compItem));
  }
  return state.setIn(['viewData', 'CONFIG', 'property', 'layer', 'groups'], groups).set('compData', compData);
};

const addHiddenComp = (state, compItem) => {
  const hiddenField = state.getIn(['viewData', 'CONFIG', 'property', 'layer', 'hiddenField']);
  const compData = state.get('compData');
  const compDataIdx = compData.findIndex(
    iNode => iNode.getIn(['CONFIG', 'property', 'compKey']) === compItem.CONFIG.property.compKey && iNode.get('COMP_FIELD') === compItem.COMP_FIELD,
  );
  const layerIdxKey = state.getIn(['viewData', 'CONFIG', 'property', 'layerIdxKey']);
  const { layerIdx, compKey } = compItem.CONFIG.property;
  let layerKeyFlag = false;
  if (!layerIdx || !layerIdx[layerIdxKey] || layerIdx[layerIdxKey].length === 0) {
    layerKeyFlag = true;
  }
  if (!compKey || compKey.length === 0) compItem.CONFIG.property.compKey = `Comp_${getNewKey()}`;
  if (!hiddenField && layerKeyFlag) {
    return state.setIn(['viewData', 'CONFIG', 'property', 'layer', 'hiddenField'], fromJS([compItem])).setIn(['compData', compDataIdx], fromJS(compItem));
  }
  const compIdx = hiddenField.findIndex(iNode => iNode.getIn(['CONFIG', 'property', 'compKey']) === compItem.CONFIG.property.compKey);
  if (compIdx === -1 && layerKeyFlag) {
    return state
      .setIn(['viewData', 'CONFIG', 'property', 'layer', 'hiddenField'], hiddenField.push(fromJS(compItem)))
      .setIn(['compData', compDataIdx], fromJS(compItem));
  }
  return state;
};

export default reducer;
