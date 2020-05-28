import { fromJS } from 'immutable';
import uuid from 'uuid/v1';
import { getTreeFromFlatData } from 'react-sortable-tree';
import { sortBy } from 'lodash';
import { isJSON } from 'utils/helpers';
import { VIEW_TYPE_IDX } from 'components/BizBuilder/Common/Constants';

import * as actionTypes from './constants';
import { fieldInfoBasic, checkRowContinuity, checkColContinuity, checkCanRemoveRow, checkCanRemoveCol } from './helper';

const getNewKey = () => uuid();

const initialCol = () => fromJS({ key: getNewKey(), type: 'col', rowSpan: 1, span: 1, style: { height: '35px' } });

const generateCols = colSize => {
  const result = [];
  for (let i = 0; i < colSize; i += 1) {
    result.push({ key: getNewKey(), type: 'col', rowSpan: 1, span: 1, style: { height: '35px' } });
  }
  return result;
};

const generateRowsWithCols = ([rowSize, colSize]) => {
  const result = [];
  for (let i = 0; i < rowSize; i += 1) {
    result.push({
      key: getNewKey(),
      type: 'row',
      gutter: [8, 8],
      cols: generateCols(colSize),
    });
  }
  return result;
};

const initialGroup = () =>
  fromJS({
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
    ],
  });

const initialRowByColSize = size => {
  const cols = [];
  for (let i = 0; i < size; i += 1) {
    cols.push({ key: getNewKey(), type: 'col', rowSpan: 1, span: 1, style: { height: '35px' } });
  }
  return fromJS({ key: getNewKey(), type: 'row', gutter: [8, 8], cols });
};

const initialRow = () =>
  fromJS({
    key: getNewKey(),
    type: 'row',
    gutter: [8, 8],
    cols: [
      { key: getNewKey(), type: 'col', rowSpan: 1, span: 1, style: { height: '35px' } },
      { key: getNewKey(), type: 'col', rowSpan: 1, span: 1, style: { height: '35px' } },
      { key: getNewKey(), type: 'col', rowSpan: 1, span: 1, style: { height: '35px' } },
      { key: getNewKey(), type: 'col', rowSpan: 1, span: 1, style: { height: '35px' } },
    ],
  });

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
  classNameList: [],
  viewList: [],
  inputViewList: [],
  modifyViewList: [],
  viewViewList: [],
  listViewList: [],
  viewChangeProcesslist: [],
  dataNodeList: [],
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
    case actionTypes.OPEN_JSON_CODE_EDITOR:
      return state.set('isShowEditor', true);
    case actionTypes.CLOSE_JSON_CODE_EDITOR:
      return state.set('isShowEditor', false);
    case actionTypes.UPDATE_JSON_CODE: {
      const { jsObject } = action;
      return state.set('rows', fromJS(jsObject));
    }
    case actionTypes.SELECT_CELL: {
      const { groupIndex, rowIndex, colIndex, isCombine } = action;
      const newKey = `${groupIndex}-${rowIndex}-${colIndex}`;
      const selectedKeys = state.get('selectedKeys');
      const hasKey = selectedKeys.includes(newKey);
      const checkCondition = ['viewData', 'CONFIG', 'property', 'layer', 'groups'];
      if (isCombine) {
        if (hasKey) {
          const targetIndex = selectedKeys.findIndex(key => key === newKey);
          const nextSelectedKeys = selectedKeys.delete(targetIndex);
          const canMerge = {
            row: checkRowContinuity(nextSelectedKeys.toJS(), state.getIn(checkCondition).toJS()),
            col: checkColContinuity(nextSelectedKeys.toJS(), state.getIn(checkCondition).toJS()),
          };
          return state
            .set('selectedKeys', nextSelectedKeys)
            .set('canMerge', fromJS(canMerge))
            .set('canDivide', fromJS({ row: false, col: false }));
        }
        const nextSelectedKeys = selectedKeys.push(newKey);
        const canMerge = {
          row: checkRowContinuity(nextSelectedKeys.toJS(), state.getIn(checkCondition).toJS()),
          col: checkColContinuity(nextSelectedKeys.toJS(), state.getIn(checkCondition).toJS()),
        };
        return state
          .set('selectedKeys', nextSelectedKeys)
          .set('canMerge', fromJS(canMerge))
          .set('canDivide', fromJS({ row: false, col: false }));
      }
      if (hasKey) {
        return state
          .set('selectedKeys', fromJS([]))
          .set('canMerge', fromJS({ row: false, col: false }))
          .set('canDivide', fromJS({ row: false, col: false }));
      }
      const condition = ['viewData', 'CONFIG', 'property', 'layer', 'groups', groupIndex, 'rows', rowIndex, 'cols', colIndex];
      const canDivideRow = (state.getIn([...condition, 'rowSpan']) || 1) > 1;
      const canDivideCol = (state.getIn([...condition, 'span']) || 1) > 1;
      return state
        .set('selectedKeys', fromJS([newKey]))
        .set('canMerge', fromJS({ row: false, col: false }))
        .set('canDivide', fromJS({ row: canDivideRow, col: canDivideCol }));
    }
    case actionTypes.UPDATE_STYLE_WIDTH: {
      const { groupIndex, rowIndex, colIndex, width, diff } = action;
      if (colIndex === state.getIn(['viewData', 'CONFIG', 'property', 'layer', 'groups', groupIndex, 'rows', rowIndex, 'cols']).size - 1) {
        return state
          .setIn(['viewData', 'CONFIG', 'property', 'layer', 'groups', groupIndex, 'rows', rowIndex, 'cols', colIndex, 'style', 'width'], width)
          .updateIn(
            ['viewData', 'CONFIG', 'property', 'layer', 'groups', groupIndex, 'rows', rowIndex, 'cols', colIndex - 1, 'style', 'width'],
            targetWidth => `${parseFloat(targetWidth) - diff}%`,
          );
      }
      const nextTargetWidth = state.getIn([
        'viewData',
        'CONFIG',
        'property',
        'layer',
        'groups',
        groupIndex,
        'rows',
        rowIndex,
        'cols',
        colIndex + 1,
        'style',
        'width',
      ]);
      const nextWidth = `${parseFloat(nextTargetWidth) - diff}%`;
      return state
        .setIn(['viewData', 'CONFIG', 'property', 'layer', 'groups', groupIndex, 'rows', rowIndex, 'cols', colIndex, 'style', 'width'], width)
        .setIn(['viewData', 'CONFIG', 'property', 'layer', 'groups', groupIndex, 'rows', rowIndex, 'cols', colIndex + 1, 'style', 'width'], nextWidth);
    }
    case actionTypes.UPDATE_STYLE_HEIGHT: {
      const { groupIndex, rowIndex, colIndex, height } = action;
      return state.setIn(['viewData', 'CONFIG', 'property', 'layer', 'groups', groupIndex, 'rows', rowIndex, 'cols', colIndex, 'style', 'height'], height);
    }
    case actionTypes.UPDATE_BODY_STYLE: {
      const { width, height } = action;
      return state.setIn(['bodyStyle', 'width'], width).setIn(['bodyStyle', 'height'], height);
    }
    case actionTypes.UPDATE_STYLE_ROW_HEIGHT: {
      const { groupIndex, rowIndex, colIndex } = action;
      const currentHeight = state.getIn([
        'viewData',
        'CONFIG',
        'property',
        'layer',
        'groups',
        groupIndex,
        'rows',
        rowIndex,
        'cols',
        colIndex,
        'style',
        'height',
      ]);
      return state.updateIn(['viewData', 'CONFIG', 'property', 'layer', 'groups', groupIndex, 'rows', rowIndex, 'cols'], cols =>
        cols.map(col => col.setIn(['style', 'height'], currentHeight)),
      );
    }
    case actionTypes.SELECT_STYLE_CELL: {
      const { groupIndex, rowIndex, colIndex } = action;
      const newKey = `${groupIndex}-${rowIndex}-${colIndex}`;
      const selectedStyleCells = state.get('selectedStyleCells');
      const hasKey = selectedStyleCells.includes(newKey);
      if (hasKey) {
        return state.set('selectedStyleCells', fromJS([]));
      }
      return state.set('selectedStyleCells', fromJS([newKey]));
    }
    case actionTypes.CHANGE_ACTIVE_TAB: {
      const { activeKey } = action;
      return state
        .set('activeTabKey', activeKey)
        .set('selectedKeys', fromJS([]))
        .set('selectedStyleCells', fromJS([]));
    }
    case actionTypes.ADD_GROUP: {
      const tempGroup = initialGroup().toJS();
      tempGroup.key = getNewKey();
      tempGroup.rows[0].key = getNewKey();
      tempGroup.rows[0].cols[0].key = getNewKey();
      tempGroup.rows[0].cols[1].key = getNewKey();
      tempGroup.rows[0].cols[2].key = getNewKey();
      tempGroup.rows[0].cols[3].key = getNewKey();
      return state.updateIn(['viewData', 'CONFIG', 'property', 'layer', 'groups'], groups => groups.push(fromJS(tempGroup)));
    }
    case actionTypes.REMOVE_GROUP: {
      const { groupIndex } = action;
      return state.deleteIn(['viewData', 'CONFIG', 'property', 'layer', 'groups', groupIndex]);
    }
    case actionTypes.CHANGE_GROUP_TITLE: {
      const { groupIndex, title } = action;
      return state.setIn(['viewData', 'CONFIG', 'property', 'layer', 'groups', groupIndex, 'title'], title);
    }
    case actionTypes.CHANGE_GROUP_DATA_REDUCER: {
      const { groupIndex, key, value } = action;
      return state.setIn(['viewData', 'CONFIG', 'property', 'layer', 'groups', groupIndex, key], value);
    }
    case actionTypes.CHANGE_USE_GROUP_TITLE: {
      const { groupIndex, useTitle } = action;
      return state.setIn(['viewData', 'CONFIG', 'property', 'layer', 'groups', groupIndex, 'useTitle'], useTitle);
    }
    case actionTypes.SET_SELECT_TOOLBAR_ITEM_REDUCER: {
      const { comp } = action;
      const selectedKeys = state.get('selectedKeys').toJS();
      if (selectedKeys.length === 1 && selectedKeys[0] === '999-0-0') {
        return addHiddenCompItem(state, comp);
      }
      if (selectedKeys.length > 0 && selectedKeys.findIndex(iNode => iNode === '999-0-0') === -1) {
        return addCompItem(state, comp, selectedKeys);
      }
      return state.set('selectedComp', fromJS(comp));
    }
    case actionTypes.CHANGE_COMPDATA_REDUCER: {
      const { groupIndex, rowIndex, colIndex, key, value } = action;
      const setValue = typeof value === 'object' ? fromJS(value) : value;
      let compData = state.get('compData');
      const layerIdxKey = state.getIn(['viewData', 'CONFIG', 'property', 'layerIdxKey']);
      const compIdx = compData.findIndex(node => node.getIn(['CONFIG', 'property', 'layerIdx', layerIdxKey]) === `${groupIndex}-${rowIndex}-${colIndex}`);
      if (compIdx > -1) {
        let compItem = compData.get(compIdx);
        compItem = compItem.set(key, setValue);
        const compField = compItem.COMP_FIELD;
        const layerIdxs = compItem.getIn(['CONFIG', 'property', 'layerIdx']);
        const keySet = Object.keys(layerIdxs.toJS());
        if (keySet.length > 0) {
          keySet.forEach(layerKey => {
            if (layerKey !== layerIdxKey) {
              const viewIdx = compData.findIndex(iNode => iNode.get('COMP_TYPE') === 'VIEW' && iNode.getIn(['CONFIG', 'property', 'layerIdxKey']) === layerKey);
              if (viewIdx > -1) {
                const keys = layerIdxs.get(layerKey).split('-');
                if (
                  compData.getIn([viewIdx, 'CONFIG', 'property', 'layer', 'groups', keys[0], 'rows', keys[1], 'cols', keys[2], 'comp', key]) &&
                  compData.getIn([viewIdx, 'CONFIG', 'property', 'layer', 'groups', keys[0], 'rows', keys[1], 'cols', keys[2], 'comp', 'COMP_FIELD']) ===
                    compField
                ) {
                  compData = compData.setIn(
                    [viewIdx, 'CONFIG', 'property', 'layer', 'groups', keys[0], 'rows', keys[1], 'cols', keys[2], 'comp', key],
                    setValue,
                  );
                }
              }
            }
          });
          state = state.set('compData', compData);
        }
        return state
          .setIn(['viewData', 'CONFIG', 'property', 'layer', 'groups', groupIndex, 'rows', rowIndex, 'cols', colIndex, 'comp'], compItem)
          .setIn(['compData', compIdx], compItem);
      }
      let compItem = state.getIn(['viewData', 'CONFIG', 'property', 'layer', 'groups', groupIndex, 'rows', rowIndex, 'cols', colIndex, 'comp']);
      compItem = compItem.set(key, setValue);
      return state.setIn(['viewData', 'CONFIG', 'property', 'layer', 'groups', groupIndex, 'rows', rowIndex, 'cols', colIndex, 'comp'], compItem);
    }
    case actionTypes.CHANGE_COMP_CONFIG_REDUCER: {
      const { groupIndex, rowIndex, colIndex, subKey, key, value } = action;
      const setValue = typeof value === 'object' ? fromJS(value) : value;
      let compData = state.get('compData');
      const layerIdxKey = state.getIn(['viewData', 'CONFIG', 'property', 'layerIdxKey']);
      const compIdx = compData.findIndex(node => node.getIn(['CONFIG', 'property', 'layerIdx', layerIdxKey]) === `${groupIndex}-${rowIndex}-${colIndex}`);
      if (compIdx > -1) {
        let compItem = compData.get(compIdx);
        compItem = compItem.setIn(['CONFIG', subKey, key], setValue);
        const compField = compItem.COMP_FIELD;
        const layerIdxs = compItem.getIn(['CONFIG', 'property', 'layerIdx']);
        const keySet = Object.keys(layerIdxs.toJS());
        if (keySet.length > 0) {
          keySet.forEach(layerKey => {
            if (layerKey !== layerIdxKey) {
              const viewIdx = compData.findIndex(iNode => iNode.get('COMP_TYPE') === 'VIEW' && iNode.getIn(['CONFIG', 'property', 'layerIdxKey']) === layerKey);
              if (viewIdx > -1) {
                const keys = layerIdxs.get(layerKey).split('-');
                if (
                  compData.getIn([
                    viewIdx,
                    'CONFIG',
                    'property',
                    'layer',
                    'groups',
                    keys[0],
                    'rows',
                    keys[1],
                    'cols',
                    keys[2],
                    'comp',
                    'CONFIG',
                    subKey,
                    key,
                  ]) &&
                  compData.getIn([viewIdx, 'CONFIG', 'property', 'layer', 'groups', keys[0], 'rows', keys[1], 'cols', keys[2], 'comp', 'COMP_FIELD']) ===
                    compField
                ) {
                  compData = compData.setIn(
                    [viewIdx, 'CONFIG', 'property', 'layer', 'groups', keys[0], 'rows', keys[1], 'cols', keys[2], 'comp', 'CONFIG', subKey, key],
                    setValue,
                  );
                }
              }
            }
          });
          state = state.set('compData', compData);
        }
        return state
          .setIn(['viewData', 'CONFIG', 'property', 'layer', 'groups', groupIndex, 'rows', rowIndex, 'cols', colIndex, 'comp', 'CONFIG', subKey, key], setValue)
          .setIn(['compData', compIdx], compItem);
      }
      let compItem = state.getIn(['viewData', 'CONFIG', 'property', 'layer', 'groups', groupIndex, 'rows', rowIndex, 'cols', colIndex, 'comp']);
      compItem = compItem.setIn(['CONFIG', subKey, key], setValue);
      return state.setIn(
        ['viewData', 'CONFIG', 'property', 'layer', 'groups', groupIndex, 'rows', rowIndex, 'cols', colIndex, 'comp', 'CONFIG', subKey, key],
        setValue,
      );
    }
    case actionTypes.CHANGE_VIEW_COMPDATA_REDUCER: {
      const { groupIndex, rowIndex, colIndex, key, value } = action;
      let compData = state.get('compData');
      const layerIdxKey = state.getIn(['viewData', 'CONFIG', 'property', 'layerIdxKey']);
      const compKey = state.getIn([
        'viewData',
        'CONFIG',
        'property',
        'layer',
        'groups',
        groupIndex,
        'rows',
        rowIndex,
        'cols',
        colIndex,
        'comp',
        'CONFIG',
        'property',
        'compKey',
      ]);
      const compIdx = compData.findIndex(iNode => iNode.getIn(['CONFIG', 'property', 'compKey']) === compKey);
      compData = compData.setIn([compIdx, 'CONFIG', 'property', 'viewLayerConfig', layerIdxKey, key], typeof value === 'object' ? fromJS(value) : value);
      return state
        .setIn(
          ['viewData', 'CONFIG', 'property', 'layer', 'groups', groupIndex, 'rows', rowIndex, 'cols', colIndex, 'comp', key],
          typeof value === 'object' ? fromJS(value) : value,
        )
        .set('compData', compData);
    }
    case actionTypes.SET_INIT_DATA_REDUCER: {
      const { workSeq, viewType, viewName } = action;
      const reloadState = initialState;
      return reloadState
        .set('workInfo', fromJS({ workSeq, viewType }))
        .setIn(['viewData', 'WORK_SEQ'], workSeq)
        .setIn(['viewData', 'COMP_TAG'], viewType)
        .setIn(['viewData', 'NAME_KOR'], viewName || '기본 입력 화면')
        .setIn(['viewData', 'CONFIG', 'property', 'layerIdxKey'], `layerIdx_${getNewKey()}`);
    }
    case actionTypes.SET_INIT_LIST_DATA_REDUCER: {
      const { workSeq, viewType, viewName } = action;
      const reloadState = initialState;
      return reloadState
        .set('workInfo', fromJS({ workSeq, viewType }))
        .setIn(['viewData', 'WORK_SEQ'], workSeq)
        .setIn(['viewData', 'COMP_TAG'], viewType)
        .setIn(['viewData', 'NAME_KOR'], viewName)
        .setIn(['viewData', 'CONFIG', 'property', 'layerIdxKey'], `layerIdx_${getNewKey()}`)
        .setIn(['viewData', 'CONFIG', 'property', 'layer', 'groups'], fromJS([initialSearchGroup, initialListGroup]));
    }
    case actionTypes.SET_WORK_INFO_REDUCER: {
      const { workSeq, viewType } = action;
      return state.set('workInfo', fromJS({ workSeq, viewType }));
    }
    case actionTypes.REMOVE_COL_COMP_REDUCER: {
      const { groupIndex, rowIndex, colIndex } = action;
      const compKey = state.getIn([
        'viewData',
        'CONFIG',
        'property',
        'layer',
        'groups',
        groupIndex,
        'rows',
        rowIndex,
        'cols',
        colIndex,
        'comp',
        'CONFIG',
        'property',
        'compKey',
      ]);
      const compData = state.get('compData');
      const layerIdxKey = state.getIn(['viewData', 'CONFIG', 'property', 'layerIdxKey']);
      const compIdx = compData.findIndex(findNode => findNode.getIn(['CONFIG', 'property', 'compKey']) === compKey);
      return state
        .deleteIn(['viewData', 'CONFIG', 'property', 'layer', 'groups', groupIndex, 'rows', rowIndex, 'cols', colIndex, 'comp'])
        .deleteIn(['compData', compIdx, 'CONFIG', 'property', 'layerIdx', layerIdxKey])
        .deleteIn(['compData', compIdx, 'CONFIG', 'property', 'viewLayerConfig', layerIdxKey])
        .setIn(['viewData', 'CONFIG', 'property', 'layer', 'groups', groupIndex, 'rows', rowIndex, 'cols', colIndex, 'className'], '');
    }
    case actionTypes.REMOVE_COMPITEM_REDUCER: {
      const { layerIdx, compKey } = action;
      let compData = state.get('compData');
      const compIdx = compData.findIndex(findNode => findNode.getIn(['CONFIG', 'property', 'compKey']) === compKey);
      const metaSeq = compData.getIn([compIdx, 'META_SEQ']) || -1;
      const layerIdxs = compData.getIn([compIdx, 'CONFIG', 'property', 'layerIdx']);
      const compField = compData.getIn([compIdx, 'COMP_FIELD']);
      if (metaSeq > 0) compData = compData.setIn([compIdx, 'isRemove'], true).deleteIn([compIdx, 'CONFIG', 'property', 'layerIdx']);
      else compData = compData.delete(compIdx);
      if (layerIdxs && layerIdxs.size > 0) {
        const keySet = Object.keys(layerIdxs.toJS());
        keySet.forEach(key => {
          const keyGroup = layerIdxs.get(key).split('-');
          const viewIdx = compData.findIndex(fNode => fNode.get('COMP_TYPE') === 'VIEW' && fNode.getIn(['CONFIG', 'property', 'layerIdxKey']) === key);
          if (
            compField ===
            compData.getIn([
              viewIdx,
              'CONFIG',
              'property',
              'layer',
              'groups',
              Number(keyGroup[0]),
              'rows',
              Number(keyGroup[1]),
              'cols',
              Number(keyGroup[2]),
              'comp',
              'COMP_FIELD',
            ])
          ) {
            compData = compData
              .deleteIn([
                viewIdx,
                'CONFIG',
                'property',
                'layer',
                'groups',
                Number(keyGroup[0]),
                'rows',
                Number(keyGroup[1]),
                'cols',
                Number(keyGroup[2]),
                'comp',
              ])
              .setIn(
                [viewIdx, 'CONFIG', 'property', 'layer', 'groups', Number(keyGroup[0]), 'rows', Number(keyGroup[1]), 'cols', Number(keyGroup[2]), 'className'],
                '',
              );
          }
        });
      }
      if (layerIdx && layerIdx.length > 0) {
        const keyGroup = layerIdx.split('-');
        return state
          .set('compData', compData)
          .deleteIn([
            'viewData',
            'CONFIG',
            'property',
            'layer',
            'groups',
            Number(keyGroup[0]),
            'rows',
            Number(keyGroup[1]),
            'cols',
            Number(keyGroup[2]),
            'comp',
          ])
          .setIn(
            ['viewData', 'CONFIG', 'property', 'layer', 'groups', Number(keyGroup[0]), 'rows', Number(keyGroup[1]), 'cols', Number(keyGroup[2]), 'className'],
            '',
          );
      }
      return state.set('compData', compData);
    }
    case actionTypes.CHANGE_VIEW_DESIGNER_NAME_REDUCER: {
      const { value } = action;
      return state.setIn(['viewData', 'NAME_KOR'], value);
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
        const tempColData = state.getIn([
          'viewData',
          'CONFIG',
          'property',
          'layer',
          'groups',
          Number(keyGroup[0]),
          'rows',
          Number(keyGroup[1]),
          'cols',
          Number(keyGroup[2]),
        ]);
        const colData = tempColData ? tempColData.toJS() : null;
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
    case actionTypes.REMOVE_HIDDEN_COMP_REDUCER: {
      const { compIdx } = action;
      return state.deleteIn(['viewData', 'CONFIG', 'property', 'layer', 'hiddenField', compIdx]);
    }
    case actionTypes.CHANGE_COL_CONFIG_REDUCER: {
      const { groupIndex, rowIndex, colIndex, key, value } = action;
      return state.setIn(['viewData', 'CONFIG', 'property', 'layer', 'groups', groupIndex, 'rows', rowIndex, 'cols', colIndex, key], value);
    }
    case actionTypes.ENABLE_CONTENT_LOADING: {
      return state.set('isLoadingContent', true);
    }
    case actionTypes.DISABLE_CONTENT_LOADING: {
      return state.set('isLoadingContent', false);
    }
    case actionTypes.INCREASE_ROW: {
      const { groupIndex, rowIndex, colIndex } = action;
      const condition = ['viewData', 'CONFIG', 'property', 'layer', 'groups', groupIndex, 'rows', rowIndex, 'cols', colIndex, 'rowSpan'];
      return state
        .setIn(condition, (state.getIn(condition) || 1) + 1)
        .set('canMerge', fromJS({ row: false, col: false }))
        .set('canDivide', fromJS({ row: false, col: false }));
    }
    case actionTypes.DECREASE_ROW: {
      const { groupIndex, rowIndex, colIndex } = action;
      const condition = ['viewData', 'CONFIG', 'property', 'layer', 'groups', groupIndex, 'rows', rowIndex, 'cols', colIndex, 'rowSpan'];
      return state
        .setIn(condition, (state.getIn(condition) || 1) - 1)
        .set('canMerge', fromJS({ row: false, col: false }))
        .set('canDivide', fromJS({ row: false, col: false }));
    }
    case actionTypes.INCREASE_COL: {
      const { groupIndex, rowIndex, colIndex } = action;
      const condition = ['viewData', 'CONFIG', 'property', 'layer', 'groups', groupIndex, 'rows', rowIndex, 'cols', colIndex, 'span'];
      return state
        .setIn(condition, (state.getIn(condition) || 1) + 1)
        .set('canMerge', fromJS({ row: false, col: false }))
        .set('canDivide', fromJS({ row: false, col: false }));
    }
    case actionTypes.DECREASE_COL: {
      const { groupIndex, rowIndex, colIndex } = action;
      const condition = ['viewData', 'CONFIG', 'property', 'layer', 'groups', groupIndex, 'rows', rowIndex, 'cols', colIndex, 'span'];
      return state
        .setIn(condition, (state.getIn(condition) || 1) - 1)
        .set('canMerge', fromJS({ row: false, col: false }))
        .set('canDivide', fromJS({ row: false, col: false }));
    }
    case actionTypes.ADD_ROW_TO_UP: {
      const { groupIndex, rowIndex } = action;
      const condition = ['viewData', 'CONFIG', 'property', 'layer', 'groups', groupIndex, 'rows'];
      let retRows = state.getIn(['viewData', 'CONFIG', 'property', 'layer', 'groups', groupIndex, 'rows']);
      let compList = state.get('compData');
      const layerIdxKey = state.getIn(['viewData', 'CONFIG', 'property', 'layerIdxKey']);

      const targetCols = state.getIn([...condition, rowIndex, 'cols']);
      if (targetCols.map(col => (col ? col.get('span') || 1 : 0)).reduce((acc, cul) => acc + cul) !== targetCols.size) {
        window.alert('병합된 셀이 있어 불가능 합니다.');
        return state;
      }

      const tempSize = state
        .getIn([...condition, 0, 'cols'])
        .map(col => (col ? col.get('span') || 1 : 0))
        .reduce((acc, curt) => acc + curt);

      compList = compList.map(node => {
        if (node.getIn(['CONFIG', 'property', 'layerIdx']) && node.getIn(['CONFIG', 'property', 'layerIdx', layerIdxKey])) {
          const compLayerIdx = node.getIn(['CONFIG', 'property', 'layerIdx', layerIdxKey]);
          const keyGroup = compLayerIdx.split('-');
          if (keyGroup.length > 0 && Number(keyGroup[0]) === groupIndex && Number(keyGroup[1]) >= rowIndex) {
            retRows = retRows.setIn(
              [Number(keyGroup[1]), 'cols', Number(keyGroup[2]), 'comp', 'CONFIG', 'property', 'layerIdx', layerIdxKey],
              `${Number(keyGroup[0])}-${Number(keyGroup[1]) + 1}-${Number(keyGroup[2])}`,
            );
            return node.setIn(['CONFIG', 'property', 'layerIdx', layerIdxKey], `${Number(keyGroup[0])}-${Number(keyGroup[1]) + 1}-${Number(keyGroup[2])}`);
          }
        }
        return node;
      });
      retRows = retRows.update(rows => rows.insert(rowIndex, initialRowByColSize(tempSize)));
      return state
        .setIn(['viewData', 'CONFIG', 'property', 'layer', 'groups', groupIndex, 'rows'], retRows)
        .set('selectedKeys', fromJS([]))
        .set('canMerge', fromJS({ row: false, col: false }))
        .set('canDivide', fromJS({ row: false, col: false }))
        .set('compData', compList);
      // .updateIn(condition, rows => rows.insert(rowIndex, initialRowByColSize(tempSize)))
    }
    case actionTypes.ADD_ROW_TO_DOWN: {
      const { groupIndex, rowIndex } = action;
      const condition = ['viewData', 'CONFIG', 'property', 'layer', 'groups', groupIndex, 'rows'];
      let retRows = state.getIn(['viewData', 'CONFIG', 'property', 'layer', 'groups', groupIndex, 'rows']);
      let compList = state.get('compData');
      const layerIdxKey = state.getIn(['viewData', 'CONFIG', 'property', 'layerIdxKey']);

      const targetNextRow = state.getIn([...condition, rowIndex + 1]);
      if (targetNextRow && targetNextRow.get('cols').some(col => !col)) {
        window.alert('병합된 셀이 있어 불가능 합니다.');
        return state;
      }

      const tempSize = state
        .getIn([...condition, 0, 'cols'])
        .map(col => (col ? col.get('span') || 1 : 0))
        .reduce((acc, curt) => acc + curt);

      if (retRows.size === rowIndex + 1) {
        return state
          .updateIn(condition, rows => rows.insert(rowIndex + 1, initialRowByColSize(tempSize)))
          .set('selectedKeys', fromJS([]))
          .set('canMerge', fromJS({ row: false, col: false }))
          .set('canDivide', fromJS({ row: false, col: false }));
      }
      compList = compList.map(node => {
        if (node.getIn(['CONFIG', 'property', 'layerIdx']) && node.getIn(['CONFIG', 'property', 'layerIdx', layerIdxKey])) {
          const compLayerIdx = node.getIn(['CONFIG', 'property', 'layerIdx', layerIdxKey]);
          const keyGroup = compLayerIdx.split('-');
          if (keyGroup.length > 0 && Number(keyGroup[0]) === groupIndex && Number(keyGroup[1]) > rowIndex) {
            retRows = retRows.setIn(
              [Number(keyGroup[1]), 'cols', Number(keyGroup[2]), 'comp', 'CONFIG', 'property', 'layerIdx', layerIdxKey],
              `${Number(keyGroup[0])}-${Number(keyGroup[1]) + 1}-${Number(keyGroup[2])}`,
            );
            return node.setIn(['CONFIG', 'property', 'layerIdx', layerIdxKey], `${Number(keyGroup[0])}-${Number(keyGroup[1]) + 1}-${Number(keyGroup[2])}`);
          }
        }
        return node;
      });

      retRows = retRows.update(rows => rows.insert(rowIndex + 1, initialRowByColSize(tempSize)));
      return state
        .setIn(['viewData', 'CONFIG', 'property', 'layer', 'groups', groupIndex, 'rows'], retRows)
        .set('selectedKeys', fromJS([]))
        .set('canMerge', fromJS({ row: false, col: false }))
        .set('canDivide', fromJS({ row: false, col: false }))
        .set('compData', compList);
    }
    case actionTypes.ADD_COL_TO_LEFT: {
      const { groupIndex, rowIndex, colIndex } = action;
      const condition = ['viewData', 'CONFIG', 'property', 'layer', 'groups', groupIndex, 'rows'];
      let compList = state.get('compData');
      const layerIdxKey = state.getIn(['viewData', 'CONFIG', 'property', 'layerIdxKey']);
      let rows = state.getIn(condition);

      const checkResult = rows.some((row, index) => {
        if (row.getIn(['cols', colIndex]) === null) {
          return rows.getIn([index - 1, 'cols', colIndex]) === null;
        }
        return false;
      });

      if (checkResult) {
        window.alert('병합된 셀이 있어 불가능 합니다.');
        return state;
      }

      compList = compList.map(node => {
        if (node.getIn(['CONFIG', 'property', 'layerIdx']) && node.getIn(['CONFIG', 'property', 'layerIdx', layerIdxKey])) {
          const compLayerIdx = node.getIn(['CONFIG', 'property', 'layerIdx', layerIdxKey]);
          const keyGroup = compLayerIdx.split('-');
          if (keyGroup.length > 0 && Number(keyGroup[0]) === groupIndex && Number(keyGroup[1]) === rowIndex && Number(keyGroup[2]) >= colIndex) {
            rows = rows.map(subNode => {
              const tempKey = subNode.getIn(['cols', Number(keyGroup[2]), 'comp', 'CONFIG', 'property', 'layerIdx', layerIdxKey]);
              if (tempKey) {
                const tempKeyGroup = tempKey.split('-');
                return subNode.setIn(
                  ['cols', Number(keyGroup[2]), 'comp', 'CONFIG', 'property', 'layerIdx', layerIdxKey],
                  `${Number(keyGroup[0])}-${Number(tempKeyGroup[1])}-${Number(keyGroup[2]) + 1}`,
                );
              }
              return subNode;
            });
            return node.setIn(['CONFIG', 'property', 'layerIdx', layerIdxKey], `${Number(keyGroup[0])}-${Number(keyGroup[1])}-${Number(keyGroup[2]) + 1}`);
          }
        }
        return node;
      });

      const nextRows = rows.update(rowsData => rowsData.map(row => row.set('cols', row.get('cols').insert(colIndex, initialCol()))));
      return state
        .setIn(condition, nextRows)
        .set('selectedKeys', fromJS([]))
        .set('canMerge', fromJS({ row: false, col: false }))
        .set('canDivide', fromJS({ row: false, col: false }))
        .set('compData', compList);
    }
    case actionTypes.ADD_COL_TO_RIGHT: {
      const { groupIndex, rowIndex, colIndex } = action;
      const condition = ['viewData', 'CONFIG', 'property', 'layer', 'groups', groupIndex, 'rows'];
      let compList = state.get('compData');
      const layerIdxKey = state.getIn(['viewData', 'CONFIG', 'property', 'layerIdxKey']);
      let rows = state.getIn(condition);

      const disableCondition1 =
        rows
          .map(row => {
            const currentCol = row.getIn(['cols', colIndex]);
            return currentCol ? currentCol.get('rowSpan') || 1 : 0;
          })
          .toJS()
          .reduce((acc, cul) => acc + cul) !== rows.size;
      const colSpanSizes = rows
        .map(row => {
          const currentCol = row.getIn(['cols', colIndex]);
          return currentCol ? currentCol.get('span') || 1 : 0;
        })
        .filter(size => size !== 0);

      const disableCondition2 = colSpanSizes.some((size, index) => {
        if (index > 0 && size !== 0) {
          return size !== colSpanSizes.get(index - 1);
        }
        return false;
      });

      if (disableCondition1 || disableCondition2) {
        window.alert('병합된 셀이 있어 불가능 합니다.');
        return state;
      }

      compList = compList.map(node => {
        if (node.getIn(['CONFIG', 'property', 'layerIdx']) && node.getIn(['CONFIG', 'property', 'layerIdx', layerIdxKey])) {
          const compLayerIdx = node.getIn(['CONFIG', 'property', 'layerIdx', layerIdxKey]);
          const keyGroup = compLayerIdx.split('-');
          if (keyGroup.length > 0 && Number(keyGroup[0]) === groupIndex && Number(keyGroup[1]) === rowIndex && Number(keyGroup[2]) > colIndex) {
            rows = rows.map(subNode => {
              const tempKey = subNode.getIn(['cols', Number(keyGroup[2]), 'comp', 'CONFIG', 'property', 'layerIdx', layerIdxKey]);
              if (tempKey) {
                const tempKeyGroup = tempKey.split('-');
                return subNode.setIn(
                  ['cols', Number(keyGroup[2]), 'comp', 'CONFIG', 'property', 'layerIdx', layerIdxKey],
                  `${Number(keyGroup[0])}-${Number(tempKeyGroup[1])}-${Number(keyGroup[2]) + 1}`,
                );
              }
              return subNode;
            });
            return node.setIn(['CONFIG', 'property', 'layerIdx', layerIdxKey], `${Number(keyGroup[0])}-${Number(keyGroup[1])}-${Number(keyGroup[2]) + 1}`);
          }
        }
        return node;
      });

      // const nextRows = rows.update(rowsData => rowsData.map(row => row.set('cols', row.get('cols').push(initialCol()))));
      const nextRows = rows.update(rowsData => rowsData.map(row => row.set('cols', row.get('cols').insert(colIndex + 1, initialCol()))));
      return state
        .setIn(condition, nextRows)
        .set('selectedKeys', fromJS([]))
        .set('canMerge', fromJS({ row: false, col: false }))
        .set('canDivide', fromJS({ row: false, col: false }))
        .set('compData', compList);
    }
    case actionTypes.REMOVE_ROW: {
      const { groupIndex, rowIndex, colIndex } = action;
      const condition = ['viewData', 'CONFIG', 'property', 'layer', 'groups'];
      let compList = state.get('compData');
      const layerIdxKey = state.getIn(['viewData', 'CONFIG', 'property', 'layerIdxKey']);

      /* Rows length 가 1인 경우 삭제 X */
      if (state.getIn([...condition, groupIndex, 'rows']).size < 2) {
        window.alert('행 사이즈가 1인 경우 삭제 불가능합니다.');
        return state;
      }

      /* Check Using Component */
      if (state.getIn([...condition, groupIndex, 'rows', rowIndex, 'cols']).some(col => col && col.get('comp'))) {
        window.alert('Component를 사용하는 경우 삭제 불가능합니다.');
        return state;
      }

      const canRemoveRow = checkCanRemoveRow({ groupIndex, rowIndex, colIndex }, state.getIn(condition).toJS());
      if (canRemoveRow) {
        const rowSpanSize = state.getIn([...condition, groupIndex, 'rows', rowIndex, 'cols', colIndex, 'rowSpan']) || 1;
        return state
          .updateIn([...condition, groupIndex, 'rows'], rows => {
            let i = 0;
            let nextRows = rows;
            if (nextRows.size > rowIndex + 1) {
              compList = compList.map(node => {
                if (node.getIn(['CONFIG', 'property', 'layerIdx']) && node.getIn(['CONFIG', 'property', 'layerIdx', layerIdxKey])) {
                  const compLayerIdx = node.getIn(['CONFIG', 'property', 'layerIdx', layerIdxKey]);
                  const keyGroup = compLayerIdx.split('-');
                  if (keyGroup.length > 0 && Number(keyGroup[0]) === groupIndex && Number(keyGroup[1]) === rowIndex) {
                    return node.deleteIn(['CONFIG', 'property', 'layerIdx', layerIdxKey]);
                  }
                  if (keyGroup.length > 0 && Number(keyGroup[0]) === groupIndex && Number(keyGroup[1]) > rowIndex) {
                    if (nextRows.getIn([Number(keyGroup[1]), 'cols', Number(keyGroup[2]), 'comp', 'CONFIG', 'property', 'layerIdx', layerIdxKey])) {
                      nextRows = nextRows.setIn(
                        [Number(keyGroup[1]), 'cols', Number(keyGroup[2]), 'comp', 'CONFIG', 'property', 'layerIdx', layerIdxKey],
                        `${Number(keyGroup[0])}-${Number(keyGroup[1]) - 1}-${Number(keyGroup[2])}`,
                      );
                    }
                    return node.setIn(
                      ['CONFIG', 'property', 'layerIdx', layerIdxKey],
                      `${Number(keyGroup[0])}-${Number(keyGroup[1]) - 1}-${Number(keyGroup[2])}`,
                    );
                  }
                }
                return node;
              });
            }
            while (i < rowSpanSize) {
              nextRows = nextRows.remove(rowIndex);
              i += 1;
            }
            return nextRows;
          })
          .set('selectedKeys', fromJS([]))
          .set('canMerge', fromJS({ row: false, col: false }))
          .set('canDivide', fromJS({ row: false, col: false }));
      }
      return state;
      // return state
      //   .updateIn(condition, rows => rows.remove(rowIndex))
      //   .set('selectedKeys', fromJS([]))
      //   .set('canMerge', fromJS({ row: false, col: false }))
      //   .set('canDivide', fromJS({ row: false, col: false }));
    }
    case actionTypes.REMOVE_COL: {
      const { groupIndex, rowIndex, colIndex } = action;
      const condition = ['viewData', 'CONFIG', 'property', 'layer', 'groups'];
      let compList = state.get('compData');
      const layerIdxKey = state.getIn(['viewData', 'CONFIG', 'property', 'layerIdxKey']);

      /* Cols length 가 1인 경우 삭제 X */
      if (state.getIn([...condition, groupIndex, 'rows', rowIndex, 'cols']).size < 2) {
        window.alert('열 사이즈가 1인 경우 삭제 불가능합니다.');
        return state;
      }

      /* Check Using Component */
      if (state.getIn([...condition, groupIndex, 'rows']).some(row => row.getIn(['cols', colIndex]) && row.getIn(['cols', colIndex]).get('comp'))) {
        window.alert('Component를 사용하는 경우 삭제 불가능합니다.');
        return state;
      }

      const canRemoveCol = checkCanRemoveCol({ groupIndex, rowIndex, colIndex }, state.getIn(condition).toJS());

      if (canRemoveCol) {
        const colSpanSize = state.getIn([...condition, groupIndex, 'rows', rowIndex, 'cols', colIndex, 'span']);
        /* 빈 열 삭제  */
        return state
          .updateIn([...condition, groupIndex, 'rows'], rows => {
            let newRows = rows;
            compList = compList.map(node => {
              if (node.getIn(['CONFIG', 'property', 'layerIdx']) && node.getIn(['CONFIG', 'property', 'layerIdx', layerIdxKey])) {
                const compLayerIdx = node.getIn(['CONFIG', 'property', 'layerIdx', layerIdxKey]);
                const keyGroup = compLayerIdx.split('-');
                if (keyGroup.length > 0 && Number(keyGroup[0]) === groupIndex && Number(keyGroup[1]) === rowIndex && Number(keyGroup[2]) > colIndex) {
                  newRows = newRows.map(subNode => {
                    const tempKey = subNode.getIn(['cols', Number(keyGroup[2]), 'comp', 'CONFIG', 'property', 'layerIdx', layerIdxKey]);
                    if (tempKey && subNode.getIn(['cols', Number(keyGroup[2]), 'comp', 'CONFIG', 'property', 'layerIdx', layerIdxKey])) {
                      const tempKeyGroup = tempKey.split('-');
                      return subNode.setIn(
                        ['cols', Number(keyGroup[2]), 'comp', 'CONFIG', 'property', 'layerIdx', layerIdxKey],
                        `${Number(keyGroup[0])}-${Number(tempKeyGroup[1])}-${Number(keyGroup[2]) - 1}`,
                      );
                    }
                    return subNode;
                  });
                  return node.setIn(
                    ['CONFIG', 'property', 'layerIdx', layerIdxKey],
                    `${Number(keyGroup[0])}-${Number(keyGroup[1])}-${Number(keyGroup[2]) - 1}`,
                  );
                }
              }
              return node;
            });
            return newRows.map(row => {
              let i = 0;
              let nextRow = row;
              while (i < colSpanSize) {
                nextRow = nextRow.removeIn(['cols', colIndex]);
                i += 1;
              }
              return nextRow;
            });
          })
          .set('selectedKeys', fromJS([]))
          .set('canMerge', fromJS({ row: false, col: false }))
          .set('canDivide', fromJS({ row: false, col: false }));
      }
      return state;
    }
    case actionTypes.MERGE_ROW: {
      const testKeys = state
        .get('selectedKeys')
        .toJS()
        .map(key => {
          const keyGroup = key.split('-');
          return { groupIndex: Number(keyGroup[0]), rowIndex: Number(keyGroup[1]), colIndex: Number(keyGroup[2]) };
        });
      const sortedSelectedKeys = sortBy(testKeys, ['rowIndex']);
      const { groupIndex, colIndex, rowIndex } = sortedSelectedKeys[0];
      const { rowIndex: lastRowIndex } = sortedSelectedKeys[sortedSelectedKeys.length - 1];

      const condition = ['viewData', 'CONFIG', 'property', 'layer', 'groups', groupIndex, 'rows'];

      const rowSize = sortedSelectedKeys
        .map(obj => state.getIn([...condition, obj.rowIndex, 'cols', obj.colIndex, 'rowSpan']) || 1)
        .reduce((acc, cul) => acc + cul);

      let i = 0;
      let nextRows = state.getIn(condition);
      while (i + rowIndex < lastRowIndex + 1) {
        if (i > 0) {
          nextRows = nextRows.setIn([rowIndex + i, 'cols', colIndex], null);
        } else {
          nextRows = nextRows.setIn([rowIndex, 'cols', colIndex, 'rowSpan'], rowSize);
        }
        i += 1;
      }

      return state
        .setIn(condition, fromJS(nextRows))
        .set('selectedKeys', fromJS([]))
        .set('canMerge', fromJS({ row: false, col: false }))
        .set('canDivide', fromJS({ row: false, col: false }));
    }
    case actionTypes.MERGE_COL: {
      const testKeys = state
        .get('selectedKeys')
        .toJS()
        .map(key => {
          const keyGroup = key.split('-');
          return { groupIndex: Number(keyGroup[0]), rowIndex: Number(keyGroup[1]), colIndex: Number(keyGroup[2]) };
        });
      const sortedSelectedKeys = sortBy(testKeys, ['colIndex']);
      const { groupIndex, rowIndex, colIndex } = sortedSelectedKeys[0];
      const { colIndex: lastColIndex } = sortedSelectedKeys[sortedSelectedKeys.length - 1];
      const condition = ['viewData', 'CONFIG', 'property', 'layer', 'groups', groupIndex, 'rows', rowIndex, 'cols'];

      const colSize = sortedSelectedKeys.map(obj => state.getIn([...condition, obj.colIndex, 'span'])).reduce((acc, cul) => acc + cul);

      let i = 0;
      let nextCols = state.getIn(condition);
      while (i + colIndex < lastColIndex + 1) {
        if (i > 0) {
          nextCols = nextCols.set(colIndex + i, null);
        } else {
          nextCols = nextCols.setIn([colIndex, 'span'], colSize);
        }
        i += 1;
      }
      return state
        .setIn(condition, nextCols)
        .set('selectedKeys', fromJS([]))
        .set('canMerge', fromJS({ row: false, col: false }))
        .set('canDivide', fromJS({ row: false, col: false }));
    }
    case actionTypes.DIVIDE_ROW: {
      const testKeys = state
        .get('selectedKeys')
        .toJS()
        .map(key => {
          const keyGroup = key.split('-');
          return { groupIndex: Number(keyGroup[0]), rowIndex: Number(keyGroup[1]), colIndex: Number(keyGroup[2]) };
        });
      const { groupIndex, rowIndex, colIndex } = testKeys[0];

      const condition = ['viewData', 'CONFIG', 'property', 'layer', 'groups', groupIndex, 'rows'];

      const currentCol = state.getIn([...condition, rowIndex, 'cols', colIndex]);
      const colSize = (currentCol && currentCol.get('span')) || 1;
      const rowSize = (currentCol && currentCol.get('rowSpan')) || 1;

      let i = 0;
      let nextRows = state.getIn(condition);
      while (i < rowSize) {
        if (i > 0) {
          nextRows = nextRows.setIn([rowIndex + i, 'cols', colIndex], initialCol().set('span', colSize));
        } else {
          nextRows = nextRows.setIn([rowIndex, 'cols', colIndex, 'rowSpan'], 1);
        }
        i += 1;
      }

      return state
        .setIn(condition, nextRows)
        .set('selectedKeys', fromJS([]))
        .set('canMerge', fromJS({ row: false, col: false }))
        .set('canDivide', fromJS({ row: false, col: false }));
    }
    case actionTypes.DIVIDE_COL: {
      const testKeys = state
        .get('selectedKeys')
        .toJS()
        .map(key => {
          const keyGroup = key.split('-');
          return { groupIndex: Number(keyGroup[0]), rowIndex: Number(keyGroup[1]), colIndex: Number(keyGroup[2]) };
        });
      const { groupIndex, rowIndex, colIndex } = testKeys[0];
      /* by cols */
      const condition = ['viewData', 'CONFIG', 'property', 'layer', 'groups', groupIndex, 'rows', rowIndex, 'cols'];

      const currentCol = state.getIn([...condition, colIndex]);

      const colSize = currentCol.get('span') || 1;
      const rowSize = currentCol.get('rowSpan') || 1;

      let i = 0;
      let nextCols = state.getIn(condition);
      while (i < colSize) {
        if (i > 0) {
          nextCols = nextCols.setIn([colIndex + i], initialCol().set('rowSpan', rowSize));
        } else {
          nextCols = nextCols.setIn([colIndex, 'span'], 1);
        }
        i += 1;
      }

      return state
        .setIn(condition, nextCols)
        .set('selectedKeys', fromJS([]))
        .set('canMerge', fromJS({ row: false, col: false }))
        .set('canDivide', fromJS({ row: false, col: false }));
    }
    case actionTypes.ON_CHANGE_TABLE_SIZE: {
      const { groupIndex, tableSize } = action;

      const condition = ['viewData', 'CONFIG', 'property', 'layer', 'groups'];

      if (tableSize.includes(0)) {
        window.alert('가로, 세로 최소값은 1입니다.');
        return state;
      }

      console.debug();

      if (tableSize.some(size => size > 10)) {
        window.alert('가로, 세로 최대값은 10입니다.');
        tableSize[0] = tableSize[0] > 10 ? 10 : tableSize[0];
        tableSize[1] = tableSize[1] > 10 ? 10 : tableSize[1];
      }

      /* Check Using Component */
      if (state.getIn([...condition, groupIndex, 'rows']).some(row => row.get('cols').some(col => col.get('comp')))) {
        window.alert('Component를 사용하는 조절이 불가능합니다.');
        return state;
      }

      console.debug(groupIndex, tableSize);

      const newRows = generateRowsWithCols(tableSize);

      return state.setIn([...condition, groupIndex, 'rows'], fromJS(newRows));
    }
    case actionTypes.CHANGE_COMP_FIELD_DATA_REDUCER: {
      const { compKey, key, value } = action;
      const setValue = typeof value === 'object' ? fromJS(value) : value;
      const compData = state.get('compData').toJS();
      const compIdx = compData.findIndex(iNode => iNode.CONFIG.property.compKey === compKey);
      return state.setIn(['compData', compIdx, key], setValue);
    }
    case actionTypes.CHANGE_HIDDEN_COMP_DATA_REDUCER: {
      const { compIdx, key, value } = action;
      const setValue = typeof value === 'object' ? fromJS(value) : value;
      return state.setIn(['viewData', 'CONFIG', 'property', 'layer', 'hiddenField', compIdx, key], setValue);
    }
    case actionTypes.SET_CLASSNAMELIST_REDUCER: {
      const { list } = action;
      return state.set('classNameList', fromJS(list));
    }
    case actionTypes.SET_VIEW_LIST_REDUCER: {
      const { list, viewChangeProcesslist } = action;
      return state
        .set('viewList', fromJS(list))
        .set('inputViewList', fromJS(list.filter(fNode => fNode.COMP_TAG === 'INPUT')))
        .set('modifyViewList', fromJS(list.filter(fNode => fNode.COMP_TAG === 'MODIFY')))
        .set('viewViewList', fromJS(list.filter(fNode => fNode.COMP_TAG === 'VIEW')))
        .set('listViewList', fromJS(list.filter(fNode => fNode.COMP_TAG === 'LIST')))
        .set('viewChangeProcesslist', fromJS(viewChangeProcesslist));
    }
    case actionTypes.SET_VIEW_CHANGE_PROCESS_LIST_REDUCER: {
      const { list } = action;
      return state.set('viewChangeProcesslist', fromJS(list));
    }
    case actionTypes.SET_DATA_NODE_LIST_REDUCER: {
      const { dataNodeList } = action;
      return state.set('dataNodeList', fromJS(dataNodeList));
    }
    default:
      return state;
  }
};

const addCompItem = (state, selectedComp, selectedKeys) => {
  let groups = state.getIn(['viewData', 'CONFIG', 'property', 'layer', 'groups']);
  let compData = state.get('compData');
  const workSeq = state.getIn(['workInfo', 'workSeq']);
  const layerIdxKey = state.getIn(['viewData', 'CONFIG', 'property', 'layerIdxKey']);
  selectedKeys.forEach(key => {
    const keyGroup = key.split('-');
    const colData = groups.getIn([Number(keyGroup[0]), 'rows', Number(keyGroup[1]), 'cols', Number(keyGroup[2])]).toJS();
    if (!colData.comp || !colData.comp.COMP_TAG) {
      const { COMP_TAG, COMP_SRC, COMP_SETTING_SRC, COL_DB_TYPE, COL_GROUP_IDX, COMP_CONFIG, COMP_NAME, COL_TYPE_IDX } = selectedComp;
      let COMP_TYPE = 'FIELD';
      let COMP_FIELD = '';
      let info = { type: COL_DB_TYPE, nullable: true, defaultValue: '', size: 0 };
      let property = {
        COMP_SRC,
        COMP_SETTING_SRC,
        layerIdx: { [layerIdxKey]: key },
        compKey: `Comp_${getNewKey()}`,
        COMP_NAME,
      };
      if (COMP_CONFIG && COMP_CONFIG.length > 0 && isJSON(COMP_CONFIG)) {
        const compConfig = JSON.parse(COMP_CONFIG);
        if (JSON.parse(COMP_CONFIG).info) info = { ...info, ...compConfig.info };
        if (JSON.parse(COMP_CONFIG).property) property = { ...property, ...compConfig.property };
      }
      if (COL_TYPE_IDX === VIEW_TYPE_IDX) {
        COMP_TYPE = 'LABEL';
        COMP_FIELD = `Label_${getNewKey()}`;
        info = { type: COL_DB_TYPE };
      }
      // else {
      //   const { info: basicInfo } = fieldInfoBasic(COMP_TAG);
      //   info = basicInfo;
      // }
      const compItem = fromJS({
        WORK_SEQ: workSeq,
        COMP_TAG,
        COMP_TYPE,
        COMP_FIELD,
        ORD: compData.size + 1,
        PRNT_SEQ: workSeq,
        FIELD_TYPE: 'USER',
        CONFIG: {
          info,
          property,
          option: {},
        },
      });
      groups = groups
        .setIn([Number(keyGroup[0]), 'rows', Number(keyGroup[1]), 'cols', Number(keyGroup[2]), 'className'], `view-designer-${COMP_TAG.toLowerCase()}`)
        .setIn([Number(keyGroup[0]), 'rows', Number(keyGroup[1]), 'cols', Number(keyGroup[2]), 'comp'], compItem);
      // if (COMP_TAG.toUpperCase() === 'RICH-TEXT-EDITOR') {
      //   const colHeight = groups.getIn([Number(keyGroup[0]), 'rows', Number(keyGroup[1]), 'cols', Number(keyGroup[2]), 'style', 'height']);
      //   groups = groups.setIn(
      //     [Number(keyGroup[0]), 'rows', Number(keyGroup[1]), 'cols', Number(keyGroup[2]), 'style', 'height'],
      //     Number(colHeight.replace('px', '')) < 200 ? '200px' : colHeight,
      //   );
      // }
      if (COMP_TYPE === 'FIELD') compData = compData.push(compItem);
    }
  });
  return state.setIn(['viewData', 'CONFIG', 'property', 'layer', 'groups'], groups).set('compData', compData);
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

const addHiddenCompItem = (state, selectedComp) => {
  const { COMP_TAG, COMP_SRC, COMP_SETTING_SRC, COL_DB_TYPE, COL_GROUP_IDX, COMP_CONFIG, COMP_NAME, COL_TYPE_IDX } = selectedComp;
  // if (COL_TYPE_IDX !== VIEW_TYPE_IDX) {
  // const hiddenField = state.getIn(['viewData', 'CONFIG', 'property', 'layer', 'hiddenField']);
  let compData = state.get('compData');
  const workSeq = state.getIn(['workInfo', 'workSeq']);
  const COMP_TYPE = 'FIELD';
  const COMP_FIELD = '';
  let info = { type: COL_DB_TYPE, nullable: true, defaultValue: '', size: 0 };
  let property = {
    COMP_SRC,
    COMP_SETTING_SRC,
    layerIdx: {},
    compKey: `Comp_${getNewKey()}`,
    COMP_NAME,
  };
  if (COMP_CONFIG && COMP_CONFIG.length > 0 && isJSON(COMP_CONFIG)) {
    const compConfig = JSON.parse(COMP_CONFIG);
    if (JSON.parse(COMP_CONFIG).info) info = { ...info, ...compConfig.info };
    if (JSON.parse(COMP_CONFIG).property) property = { ...property, ...compConfig.property };
  }
  const compItem = fromJS({
    WORK_SEQ: workSeq,
    COMP_TAG,
    COMP_TYPE,
    COMP_FIELD,
    ORD: compData.size + 1,
    PRNT_SEQ: workSeq,
    FIELD_TYPE: 'USER',
    CONFIG: {
      info,
      property,
      option: {},
    },
  });
  compData = compData.push(compItem);
  return state.updateIn(['viewData', 'CONFIG', 'property', 'layer', 'hiddenField'], hiddenField => hiddenField.push(compItem)).set('compData', compData);
  // }
  // return state;
};

export default reducer;
