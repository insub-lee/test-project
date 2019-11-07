import { fromJS } from 'immutable';
import uuid from 'uuid/v1';
import * as actionTypes from './constants';
import { checkMergeAble } from './helper';

const getNewKey = () => uuid();

const initialGroup = fromJS({
  key: getNewKey(),
  type: 'group',
  title: '',
  useTitle: true,
  rows: [{ key: getNewKey(), type: 'row', gutter: [8, 8], cols: [{ key: getNewKey(), type: 'col', span: 24, style: { width: '100%', height: '70px' } }] }],
});

const initialRow = fromJS({
  key: getNewKey(),
  type: 'row',
  gutter: [8, 8],
  cols: [{ key: getNewKey(), type: 'col', span: 24, style: { width: '100%', height: '70px' } }],
});

const initialState = fromJS({
  activeTabKey: '1',
  isShowEditor: false,
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
  bodyStyle: {
    width: '100%',
    height: '100%',
  },
  selectedKeys: [],
  canMerge: false,
  selectedStyleCells: [],
  compData: [],
  workInfo: {},
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
      return state.updateIn(['groups', groupIndex, 'rows'], rows => rows.insert(rowIndex + 1, initialRow));
    }
    case actionTypes.REMOVE_ROW: {
      const { groupIndex, rowIndex } = action;
      return state.deleteIn(['groups', groupIndex, 'rows', rowIndex]);
    }
    case actionTypes.MERGE_CELL: {
      let groups = state.get('groups');
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
      return state.set('groups', groups).set('selectedKeys', selectedKeys);
    }
    case actionTypes.DIVIDE_CELL: {
      let groups = state.get('groups');
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
        .set('groups', groups)
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
      if (colIndex === state.getIn(['groups', groupIndex, 'rows', rowIndex, 'cols']).size - 1) {
        return state
          .setIn(['groups', groupIndex, 'rows', rowIndex, 'cols', colIndex, 'style', 'width'], width)
          .updateIn(['groups', groupIndex, 'rows', rowIndex, 'cols', colIndex - 1, 'style', 'width'], targetWidth => `${parseFloat(targetWidth) - diff}%`);
      }
      const nextTargetWidth = state.getIn(['groups', groupIndex, 'rows', rowIndex, 'cols', colIndex + 1, 'style', 'width']);
      const nextWidth = `${parseFloat(nextTargetWidth) - diff}%`;
      return state
        .setIn(['groups', groupIndex, 'rows', rowIndex, 'cols', colIndex, 'style', 'width'], width)
        .setIn(['groups', groupIndex, 'rows', rowIndex, 'cols', colIndex + 1, 'style', 'width'], nextWidth);
    }
    case actionTypes.UPDATE_STYLE_HEIGHT: {
      const { groupIndex, rowIndex, colIndex, height } = action;
      console.debug('@@@@@ Height : ', height);
      return state.setIn(['groups', groupIndex, 'rows', rowIndex, 'cols', colIndex, 'style', 'height'], height);
    }
    case actionTypes.UPDATE_BODY_STYLE: {
      const { width, height } = action;
      return state.setIn(['bodyStyle', 'width'], width).setIn(['bodyStyle', 'height'], height);
    }
    case actionTypes.UPDATE_STYLE_ROW_HEIGHT: {
      const { groupIndex, rowIndex, colIndex } = action;
      const currentHeight = state.getIn(['groups', groupIndex, 'rows', rowIndex, 'cols', colIndex, 'style', 'height']);
      return state.updateIn(['groups', groupIndex, 'rows', rowIndex, 'cols'], cols => cols.map(col => col.setIn(['style', 'height'], currentHeight)));
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
      return state.update('groups', groups => groups.push(initialGroup));
    }
    case actionTypes.CHANGE_GROUP_TITLE: {
      const { groupIndex, title } = action;
      return state.setIn(['groups', groupIndex, 'title'], title);
    }
    case actionTypes.CHANGE_USE_GROUP_TITLE: {
      const { groupIndex, useTitle } = action;
      return state.setIn(['groups', groupIndex, 'useTitle'], useTitle);
    }
    case actionTypes.SET_SELECT_TOOLBAR_ITEM_REDUCER: {
      const { compType } = action;
      const selectedKeys = state.get('selectedKeys').toJS();
      if (selectedKeys.length > 0) {
        return addCompItem(state, compType, selectedKeys);
      }
      return state.set('selectedCompType', compType);
    }
    case actionTypes.CHANGE_COMPDATA_REDUCER: {
      const { groupIndex, rowIndex, colIndex, key, value } = action;
      const compData = state.get('compData');
      const compIdx = compData.findIndex(node => node.getIn(['CONFIG', 'property', 'layerIdx']) === `${groupIndex}-${rowIndex}-${colIndex}`);
      let compItem = compData.get(compIdx);
      switch (key) {
        case 'COMP_FIELD':
          compItem = compItem.set(key, value).setIn(['CONFIG', 'property', key], value);
          break;
        case 'NAME_KOR':
          compItem = compItem.set(key, value).setIn(['CONFIG', 'property', key], value);
          break;
        case 'size':
          compItem = compItem.setIn(['CONFIG', 'info', key], value).setIn(['CONFIG', 'property', 'maxLength'], value);
          break;
        case 'defaultValue':
          compItem = compItem.setIn(['CONFIG', 'info', key], value).setIn(['CONFIG', 'property', key], value);
          break;
        default:
          compItem = compItem.setIn(['CONFIG', 'property', key], value);
      }
      return state.setIn(['groups', groupIndex, 'rows', rowIndex, 'cols', colIndex, 'comp'], compItem).setIn(['compData', compIdx], compItem);
    }
    case actionTypes.SET_WORK_INFO_REDUCER: {
      const { workSeq, viewType } = action;
      return state.set('workInfo', fromJS({ workSeq, viewType }));
    }
    default:
      return state;
  }
};

const addCompItem = (state, compType, selectedKeys) => {
  let groups = state.get('groups');
  let compData = state.get('compData');
  const workSeq = state.getIn(['workInfo', 'workSeq']);
  selectedKeys.forEach(key => {
    const keyGroup = key.split('-');
    const colData = groups.getIn([Number(keyGroup[0]), 'rows', Number(keyGroup[1]), 'cols', Number(keyGroup[2])]).toJS();
    if (!colData.comp || !colData.comp.COMP_TAG) {
      let COMP_SRC = '';
      let COMP_TYPE = 'FIELD';
      let COMP_FIELD = '';
      let info = {};
      switch (compType.toUpperCase()) {
        case 'LABEL':
          COMP_SRC = 'LabelComp';
          COMP_TYPE = 'LABEL';
          COMP_FIELD = `Label_${getNewKey()}`;
          info = { type: 'LABEL' };
          break;
        case 'TEXT':
          COMP_SRC = 'TextComp';
          info = { type: 'STRING', nullable: true, defaultValue: '', size: 100 };
          break;
        case 'RICH-TEXT-EDITOR':
          COMP_SRC = 'EditorComp';
          info = { type: 'STRING', nullable: true, defaultValue: '', size: 0 };
          break;
        default:
      }
      const compItem = fromJS({
        WORK_SEQ: workSeq,
        COMP_TAG: compType,
        COMP_TYPE,
        COMP_FIELD,
        ORD: compData.size + 2,
        PRNT_SEQ: workSeq,
        CONFIG: {
          info,
          property: { WORK_SEQ: workSeq, COMP_TAG: compType, COMP_SRC, COMP_TYPE, COMP_FIELD, layerIdx: key },
          option: {},
        },
      });
      groups = groups.setIn([Number(keyGroup[0]), 'rows', Number(keyGroup[1]), 'cols', Number(keyGroup[2]), 'comp'], compItem);
      compData = compData.push(compItem);
    }
  });
  return state.set('groups', groups).set('compData', compData);
};

export default reducer;
