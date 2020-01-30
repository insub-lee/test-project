import { fromJS } from 'immutable';
import uuid from 'uuid/v1';

import { isJSON } from 'utils/helpers';
import * as actionTypes from './constants';
import { checkMergeAble, fieldInfoBasic } from './helper';

const getNewKey = () => uuid();

const initialGroup = fromJS({
  key: getNewKey(),
  type: 'group',
  title: '',
  useTitle: true,
  rows: [
    {
      key: getNewKey(),
      type: 'row',
      gutter: [8, 8],
      cols: [
        { key: getNewKey(), type: 'col', span: 6, style: { width: '25%', height: '70px' } },
        { key: getNewKey(), type: 'col', span: 6, style: { width: '25%', height: '70px' } },
        { key: getNewKey(), type: 'col', span: 6, style: { width: '25%', height: '70px' } },
        { key: getNewKey(), type: 'col', span: 6, style: { width: '25%', height: '70px' } },
      ],
    },
  ],
});

const initialRow = fromJS({
  key: getNewKey(),
  type: 'row',
  gutter: [8, 8],
  cols: [
    { key: getNewKey(), type: 'col', span: 6, style: { width: '25%', height: '70px' } },
    { key: getNewKey(), type: 'col', span: 6, style: { width: '25%', height: '70px' } },
    { key: getNewKey(), type: 'col', span: 6, style: { width: '25%', height: '70px' } },
    { key: getNewKey(), type: 'col', span: 6, style: { width: '25%', height: '70px' } },
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
              useTitle: true,
              rows: [
                {
                  key: getNewKey(),
                  type: 'row',
                  gutter: [8, 8],
                  cols: [
                    { key: getNewKey(), type: 'col', span: 6, style: { width: '25%', height: '70px' } },
                    { key: getNewKey(), type: 'col', span: 6, style: { width: '25%', height: '70px' } },
                    { key: getNewKey(), type: 'col', span: 6, style: { width: '25%', height: '70px' } },
                    { key: getNewKey(), type: 'col', span: 6, style: { width: '25%', height: '70px' } },
                  ],
                },
                {
                  key: getNewKey(),
                  type: 'row',
                  gutter: [8, 8],
                  cols: [
                    { key: getNewKey(), type: 'col', span: 6, style: { width: '25%', height: '70px' } },
                    { key: getNewKey(), type: 'col', span: 6, style: { width: '25%', height: '70px' } },
                    { key: getNewKey(), type: 'col', span: 6, style: { width: '25%', height: '70px' } },
                    { key: getNewKey(), type: 'col', span: 6, style: { width: '25%', height: '70px' } },
                  ],
                },
                {
                  key: getNewKey(),
                  type: 'row',
                  gutter: [8, 8],
                  cols: [
                    { key: getNewKey(), type: 'col', span: 6, style: { width: '25%', height: '70px' } },
                    { key: getNewKey(), type: 'col', span: 6, style: { width: '25%', height: '70px' } },
                    { key: getNewKey(), type: 'col', span: 6, style: { width: '25%', height: '70px' } },
                    { key: getNewKey(), type: 'col', span: 6, style: { width: '25%', height: '70px' } },
                  ],
                },
                {
                  key: getNewKey(),
                  type: 'row',
                  gutter: [8, 8],
                  cols: [
                    { key: getNewKey(), type: 'col', span: 6, style: { width: '25%', height: '70px' } },
                    { key: getNewKey(), type: 'col', span: 6, style: { width: '25%', height: '70px' } },
                    { key: getNewKey(), type: 'col', span: 6, style: { width: '25%', height: '70px' } },
                    { key: getNewKey(), type: 'col', span: 6, style: { width: '25%', height: '70px' } },
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
  canMerge: false,
  selectedStyleCells: [],
  compData: [],
  workInfo: {},
  compPoolList: [],
  compGroupList: [],
  selectedComp: {},
  selectedField: {},
  sysMetaList: [],
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
        { key: getNewKey(), type: 'col', span: 6, style: { width: '25%', height: '70px' } },
        { key: getNewKey(), type: 'col', span: 6, style: { width: '25%', height: '70px' } },
        { key: getNewKey(), type: 'col', span: 6, style: { width: '25%', height: '70px' } },
        { key: getNewKey(), type: 'col', span: 6, style: { width: '25%', height: '70px' } },
      ],
    },
    {
      key: getNewKey(),
      type: 'row',
      gutter: [8, 8],
      cols: [
        { key: getNewKey(), type: 'col', span: 6, style: { width: '25%', height: '70px' } },
        { key: getNewKey(), type: 'col', span: 6, style: { width: '25%', height: '70px' } },
        { key: getNewKey(), type: 'col', span: 6, style: { width: '25%', height: '70px' } },
        { key: getNewKey(), type: 'col', span: 6, style: { width: '25%', height: '70px' } },
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
        { key: getNewKey(), type: 'col', span: 4, style: { width: '16.6%', height: '70px' } },
        { key: getNewKey(), type: 'col', span: 4, style: { width: '16.6%', height: '70px' } },
        { key: getNewKey(), type: 'col', span: 4, style: { width: '16.6%', height: '70px' } },
        { key: getNewKey(), type: 'col', span: 4, style: { width: '16.6%', height: '70px' } },
        { key: getNewKey(), type: 'col', span: 4, style: { width: '16.6%', height: '70px' } },
        { key: getNewKey(), type: 'col', span: 4, style: { width: '16.6%', height: '70px' } },
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
    case actionTypes.ADD_ROW: {
      const { groupIndex, rowIndex } = action;
      let retRows = state.getIn(['viewData', 'CONFIG', 'property', 'layer', 'groups', groupIndex, 'rows']);
      let compList = state.get('compData');
      const layerIdxKey = state.getIn(['viewData', 'CONFIG', 'property', 'layerIdxKey']);
      const tempRow = initialRow.toJS();
      tempRow.key = getNewKey();
      tempRow.cols[0].key = getNewKey();
      tempRow.cols[1].key = getNewKey();
      tempRow.cols[2].key = getNewKey();
      tempRow.cols[3].key = getNewKey();
      if (retRows.size === rowIndex + 1) {
        retRows = retRows.update(rows => rows.insert(rowIndex + 1, fromJS(tempRow)));
        return state.setIn(['viewData', 'CONFIG', 'property', 'layer', 'groups', groupIndex, 'rows'], retRows);
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
      retRows = retRows.update(rows => rows.insert(rowIndex + 1, fromJS(tempRow)));
      return state.setIn(['viewData', 'CONFIG', 'property', 'layer', 'groups', groupIndex, 'rows'], retRows).set('compData', compList);
      // return state.updateIn(['viewData', 'CONFIG', 'property', 'layer', 'groups', groupIndex, 'rows'], rows => rows.insert(rowIndex + 1, fromJS(tempRow)));
    }
    case actionTypes.REMOVE_ROW: {
      const { groupIndex, rowIndex } = action;
      let retRows = state.getIn(['viewData', 'CONFIG', 'property', 'layer', 'groups', groupIndex, 'rows']);
      let compList = state.get('compData');
      const layerIdxKey = state.getIn(['viewData', 'CONFIG', 'property', 'layerIdxKey']);
      if (retRows.size === rowIndex + 1) {
        return state.deleteIn(['viewData', 'CONFIG', 'property', 'layer', 'groups', groupIndex, 'rows', rowIndex]);
      }
      compList = compList.map(node => {
        if (node.getIn(['CONFIG', 'property', 'layerIdx']) && node.getIn(['CONFIG', 'property', 'layerIdx', layerIdxKey])) {
          const compLayerIdx = node.getIn(['CONFIG', 'property', 'layerIdx', layerIdxKey]);
          const keyGroup = compLayerIdx.split('-');
          if (keyGroup.length > 0 && Number(keyGroup[0]) === groupIndex && Number(keyGroup[1]) === rowIndex) {
            return node.deleteIn(['CONFIG', 'property', 'layerIdx', layerIdxKey]);
          }
          if (keyGroup.length > 0 && Number(keyGroup[0]) === groupIndex && Number(keyGroup[1]) > rowIndex) {
            retRows = retRows.setIn(
              [Number(keyGroup[1]), 'cols', Number(keyGroup[2]), 'comp', 'CONFIG', 'property', 'layerIdx', layerIdxKey],
              `${Number(keyGroup[0])}-${Number(keyGroup[1]) - 1}-${Number(keyGroup[2])}`,
            );
            return node.setIn(['CONFIG', 'property', 'layerIdx', layerIdxKey], `${Number(keyGroup[0])}-${Number(keyGroup[1]) - 1}-${Number(keyGroup[2])}`);
          }
        }
        return node;
      });
      retRows = retRows.delete(rowIndex);
      return state.setIn(['viewData', 'CONFIG', 'property', 'layer', 'groups', groupIndex, 'rows'], retRows).set('compData', compList);
    }
    case actionTypes.MERGE_CELL: {
      let groups = state.getIn(['viewData', 'CONFIG', 'property', 'layer', 'groups']);
      let selectedKeys = state.get('selectedKeys');
      if (selectedKeys.size > 1 && checkMergeAble(selectedKeys)) {
        const targetGroupIndex = selectedKeys.getIn([0]).split('-')[0];
        const targetRowIndex = selectedKeys.getIn([0]).split('-')[1];
        const targetColIndexs = selectedKeys
          .map(key => {
            const keyGroup = key.split('-');
            return Number(keyGroup[2]);
          })
          .sort();
        targetColIndexs.forEach((colKey, index) => {
          if (index > 0) {
            groups = groups.updateIn([targetGroupIndex, 'rows', targetRowIndex, 'cols'], cols => {
              const span = cols.getIn([targetColIndexs.get(0), 'span']) + cols.getIn([colKey - (index - 1), 'span']);
              const width = `${parseFloat(cols.getIn([targetColIndexs.get(0), 'style', 'width'])) +
                parseFloat(cols.getIn([colKey - (index - 1), 'style', 'width']))}%`;
              return cols
                .setIn([targetColIndexs.get(0), 'span'], span)
                .setIn([targetColIndexs.get(0), 'style', 'width'], width)
                .delete(colKey - (index - 1));
            });

            const targetIndex = selectedKeys.findIndex(key => key === `${targetGroupIndex}-${targetRowIndex}-${colKey}`);
            if (targetIndex > -1) {
              selectedKeys = selectedKeys.delete(targetIndex);
            }
          }
        });
      }
      return state.setIn(['viewData', 'CONFIG', 'property', 'layer', 'groups'], groups).set('selectedKeys', selectedKeys);
    }
    case actionTypes.DIVIDE_CELL: {
      let groups = state.getIn(['viewData', 'CONFIG', 'property', 'layer', 'groups']);
      const selectedKeys = state.get('selectedKeys').map(key => {
        const keyGroup = key.split('-');
        return fromJS({ groupIndex: Number(keyGroup[0]), rowIndex: Number(keyGroup[1]), colIndex: Number(keyGroup[2]) });
      });

      let newCols = fromJS([]);
      let prevIndex = '';
      let prevAddedIndex = 1;

      selectedKeys.forEach(key => {
        const groupIndex = key.get('groupIndex');
        const rowIndex = key.get('rowIndex');
        const colIndex = key.get('colIndex');

        groups = groups.updateIn([groupIndex, 'rows', rowIndex], row => {
          const targetCol = row.getIn(['cols', colIndex]);
          const currentSpan = targetCol.get('span');
          const style = targetCol.get('style');
          const dividedStyle = style.update('width', width => {
            const widthValue = parseFloat(width);
            const widthType = width.replace(widthValue.toString(), '');
            return `${widthValue / 2}${widthType}`;
          });
          if (currentSpan > 1) {
            const nextSpan = Math.ceil(currentSpan / 2);
            const newSpan = currentSpan - nextSpan;
            if (prevIndex === rowIndex) {
              prevAddedIndex += 1;
              newCols = newCols.push(
                fromJS({
                  targetGroupIndex: groupIndex,
                  targetRowIndex: rowIndex,
                  targetColIndex: colIndex + prevAddedIndex,
                  data: { key: getNewKey(), type: 'col', span: newSpan },
                }).setIn(['data', 'style'], dividedStyle),
              );
            } else {
              prevAddedIndex = 1;
              newCols = newCols.push(
                fromJS({
                  targetGroupIndex: groupIndex,
                  targetRowIndex: rowIndex,
                  targetColIndex: colIndex + prevAddedIndex,
                  data: { key: getNewKey(), type: 'col', span: newSpan },
                }).setIn(['data', 'style'], dividedStyle),
              );
            }
            return row.setIn(['cols', colIndex], targetCol.set('span', nextSpan).set('style', dividedStyle));
          }
          return row;
        });
        prevIndex = 0;
      });
      newCols.forEach(newCol => {
        const targetGroupIndex = newCol.get('targetGroupIndex');
        const targetRowIndex = newCol.get('targetRowIndex');
        const targetColIndex = newCol.get('targetColIndex');
        let targetCols = groups.getIn([targetGroupIndex, 'rows', targetRowIndex, 'cols']);
        targetCols = targetCols.insert(targetColIndex, newCol.get('data'));
        groups = groups.setIn([targetGroupIndex, 'rows', targetRowIndex, 'cols'], targetCols);
      });
      // const nextSelectedKeys = selectedKeys.map(selectedKey => `${selectedKey.get('rowIndex')}-${selectedKey.get('colIndex')}`);
      const nextSelectedKeys = fromJS([]);
      return state
        .setIn(['viewData', 'CONFIG', 'property', 'layer', 'groups'], groups)
        .set('selectedKeys', nextSelectedKeys)
        .set('canMerge', checkMergeAble(nextSelectedKeys));
    }
    case actionTypes.SELECT_CELL: {
      const { groupIndex, rowIndex, colIndex, isCombine } = action;
      const newKey = `${groupIndex}-${rowIndex}-${colIndex}`;
      const selectedKeys = state.get('selectedKeys');
      const hasKey = selectedKeys.includes(newKey);
      if (isCombine) {
        if (hasKey) {
          const targetIndex = selectedKeys.findIndex(key => key === newKey);
          const nextSelectedKeys = selectedKeys.delete(targetIndex);
          return state.set('selectedKeys', nextSelectedKeys).set('canMerge', checkMergeAble(nextSelectedKeys));
        }
        const nextSelectedKeys = selectedKeys.push(newKey);
        return state
          .set('selectedKeys', nextSelectedKeys)
          .set('canMerge', checkMergeAble(nextSelectedKeys))
          .sort();
      }
      if (hasKey) {
        return state.set('selectedKeys', fromJS([]));
      }
      return state.set('selectedKeys', fromJS([newKey])).set('canMerge', false);
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
      const tempGroup = initialGroup.toJS();
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
    case actionTypes.CHANGE_USE_GROUP_TITLE: {
      const { groupIndex, useTitle } = action;
      return state.setIn(['viewData', 'CONFIG', 'property', 'layer', 'groups', groupIndex, 'useTitle'], useTitle);
    }
    case actionTypes.SET_SELECT_TOOLBAR_ITEM_REDUCER: {
      const { comp } = action;
      const selectedKeys = state.get('selectedKeys').toJS();
      if (selectedKeys.length > 0) {
        return addCompItem(state, comp, selectedKeys);
      }
      return state.set('selectedComp', comp);
    }
    case actionTypes.CHANGE_COMPDATA_REDUCER: {
      const { groupIndex, rowIndex, colIndex, key, value } = action;
      const compData = state.get('compData');
      const layerIdxKey = state.getIn(['viewData', 'CONFIG', 'property', 'layerIdxKey']);
      const compIdx = compData.findIndex(node => node.getIn(['CONFIG', 'property', 'layerIdx', layerIdxKey]) === `${groupIndex}-${rowIndex}-${colIndex}`);
      if (compIdx > -1) {
        let compItem = compData.get(compIdx);
        compItem = compItem.set(key, value);
        return state
          .setIn(['viewData', 'CONFIG', 'property', 'layer', 'groups', groupIndex, 'rows', rowIndex, 'cols', colIndex, 'comp'], compItem)
          .setIn(['compData', compIdx], compItem);
      }
      let compItem = state.getIn(['viewData', 'CONFIG', 'property', 'layer', 'groups', groupIndex, 'rows', rowIndex, 'cols', colIndex, 'comp']);
      compItem = compItem.set(key, value);
      return state.setIn(['viewData', 'CONFIG', 'property', 'layer', 'groups', groupIndex, 'rows', rowIndex, 'cols', colIndex, 'comp'], compItem);
    }
    case actionTypes.CHANGE_VIEW_COMPDATA_REDUCER: {
      const { groupIndex, rowIndex, colIndex, key, value } = action;
      return state.setIn(['viewData', 'CONFIG', 'property', 'layer', 'groups', groupIndex, 'rows', rowIndex, 'cols', colIndex, 'comp', key], value);
    }
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
        .setIn(['viewData', 'CONFIG', 'property', 'layer', 'groups', groupIndex, 'rows', rowIndex, 'cols', colIndex, 'className'], '');
    }
    case actionTypes.REMOVE_COMPITEM_REDUCER: {
      const { layerIdx, compKey } = action;
      let compData = state.get('compData');
      const compIdx = compData.findIndex(findNode => findNode.getIn(['CONFIG', 'property', 'compKey']) === compKey);
      const metaSeq = compData.getIn([compIdx, 'META_SEQ']) || -1;
      const layerIdxs = compData.getIn([compIdx, 'CONFIG', 'property', 'layerIdx']);
      if (metaSeq > 0) compData = compData.setIn([compIdx, 'isRemove'], true).deleteIn([compIdx, 'CONFIG', 'property', 'layerIdx']);
      else compData = compData.delete(compIdx);
      if (layerIdxs && layerIdxs.size > 0) {
        const keySet = Object.keys(layerIdxs.toJS());
        keySet.forEach(key => {
          const keyGroup = layerIdxs.get(key).split('-');
          const viewIdx = compData.findIndex(fNode => fNode.get('COMP_TYPE') === 'VIEW' && fNode.getIn(['CONFIG', 'property', 'layerIdxKey']) === key);
          compData = compData
            .deleteIn([viewIdx, 'CONFIG', 'property', 'layer', 'groups', Number(keyGroup[0]), 'rows', Number(keyGroup[1]), 'cols', Number(keyGroup[2]), 'comp'])
            .setIn(
              [viewIdx, 'CONFIG', 'property', 'layer', 'groups', Number(keyGroup[0]), 'rows', Number(keyGroup[1]), 'cols', Number(keyGroup[2]), 'className'],
              '',
            );
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
        const colData = state.getIn([
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
        if (!colData || !colData.comp || !colData.comp.CONFIG) {
          dataValidFlag = true;
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
      return state.set('compPoolList', fromJS(list)).set('compGroupList', fromJS(group));
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
      const { COMP_TAG, COMP_SRC, COMP_SETTING_SRC, COL_DB_TYPE, COL_GROUP_IDX, COMP_CONFIG, COMP_NAME } = selectedComp;
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
      if (COL_GROUP_IDX === 9) {
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
  const { layerIdx, compKey } = compItem.CONFIG.property;
  if (!compKey || compKey.length === 0) compItem.CONFIG.property.compKey = `Comp_${getNewKey()}`;
  if (!hiddenField) {
    return state.setIn(['viewData', 'CONFIG', 'property', 'layer', 'hiddenField'], fromJS([compItem])).setIn(['compData', compDataIdx], fromJS(compItem));
  }
  const layerIdxKey = state.getIn(['viewData', 'CONFIG', 'property', 'layerIdxKey']);
  const compIdx = hiddenField.findIndex(iNode => iNode.getIn(['CONFIG', 'property', 'compKey']) === compItem.CONFIG.property.compKey);
  if (compIdx === -1 && (!layerIdx || !layerIdx[layerIdxKey] || layerIdx[layerIdxKey].length === 0)) {
    return state
      .setIn(['viewData', 'CONFIG', 'property', 'layer', 'hiddenField'], hiddenField.push(fromJS(compItem)))
      .setIn(['compData', compDataIdx], fromJS(compItem));
  }
  return state;
};

export default reducer;
