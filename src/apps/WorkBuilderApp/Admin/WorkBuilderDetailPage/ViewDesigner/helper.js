import { fromJS } from 'immutable';
import uuid from 'uuid/v1';
import { sortBy } from 'lodash';
import diff from 'redux-logger/src/diff';

const getNewKey = () => uuid();

export const getSelectedKeyObjects = selectedKeys =>
  selectedKeys.map(key => {
    const keyGroup = key.split('-');
    return { groupIndex: Number(keyGroup[0]), rowIndex: Number(keyGroup[1]), colIndex: Number(keyGroup[2]) };
  });

export const checkEqualRowSpan = (selectedKeys, groups) => {
  if (selectedKeys.length === 0) return false;
  const testKeys = getSelectedKeyObjects(selectedKeys);

  return !testKeys.some((key, index) => {
    if (index > 0) {
      let differ = 1;
      let prevCol = groups[testKeys[index - differ].groupIndex].rows[testKeys[index - differ].rowIndex].cols[testKeys[index - differ].colIndex];
      const currentCol = groups[key.groupIndex].rows[key.rowIndex].cols[key.colIndex];

      while (!prevCol && index - differ > 0) {
        prevCol = groups[testKeys[index - differ].groupIndex].rows[testKeys[index - differ].rowIndex].cols[testKeys[index - differ].colIndex];
        differ += 1;
      }
      return prevCol.rowSpan !== currentCol.rowSpan;
    }
    return false;
  });
};

export const checkEqualColSpan = (selectedKeys, groups) => {
  if (selectedKeys.length === 0) return false;
  const testKeys = getSelectedKeyObjects(selectedKeys);

  return !testKeys.some((key, index) => {
    if (index > 0) {
      let differ = 1;
      let prevCol = groups[testKeys[index - differ].groupIndex].rows[testKeys[index - differ].rowIndex].cols[testKeys[index - differ].colIndex];
      const currentCol = groups[key.groupIndex].rows[key.rowIndex].cols[key.colIndex];

      while (!prevCol && index - differ > 0) {
        prevCol = groups[testKeys[index - differ].groupIndex].rows[testKeys[index - differ].rowIndex].cols[testKeys[index - differ].colIndex];
        differ += 1;
      }
      return prevCol.span !== currentCol.span;
    }
    return false;
  });
};

export const checkCanRemoveRow = ({ groupIndex, rowIndex, colIndex }, groups) => {
  const currentGroup = groups[groupIndex];
  const currentCols = currentGroup.rows[rowIndex].cols;
  const result = !currentCols.some((col, index) => {
    if (col === null) {
      return true;
    }
    if (index > 0) {
      return col.rowSpan !== currentCols[index - 1].rowSpan;
    }
    return false;
  });

  if (!result) window.alert('병합된 셀을 분할 후 가능합니다.');

  return result;
};

export const checkCanRemoveCol = ({ groupIndex, rowIndex, colIndex }, groups) => {
  const currentGroup = groups[groupIndex];
  const currentRows = currentGroup.rows;

  // if (currentRows.some((row, index) => index > 0 && row.cols[colIndex])

  const result = !currentRows.some((row, index) => {
    const currentCol = row.cols[colIndex];
    if (currentCol === null) {
      let differ = 1;

      let prevCol = row.cols[colIndex - differ];

      while (!prevCol && colIndex - differ > -1) {
        prevCol = currentRows[index].cols[colIndex - differ];
        if (!prevCol && colIndex - differ > 0) {
          differ += 1;
        }
      }

      /* Must Check */
      if (prevCol.span > differ) {
        return true;
      }
    }

    if (currentCol && index > 0) {
      let differ = 1;
      let prevRowCol = currentRows[index - differ].cols[colIndex];

      while (!prevRowCol && index - differ > -1) {
        prevRowCol = currentRows[index - differ].cols[colIndex];
        differ += 1;
      }

      return prevRowCol.span !== currentCol.span;
    }
    return false;
  });

  if (!result) window.alert('병합된 셀을 분할 후 가능합니다.');

  return result;
};

export const checkRowContinuity = (selectedKeys, groups) => {
  if (selectedKeys.length === 0) return false;
  const testKeys = getSelectedKeyObjects(selectedKeys);

  if (testKeys.some((key, index) => index > 0 && key.groupIndex !== testKeys[index - 1].groupIndex)) {
    return false;
  }

  if (testKeys.some((key, index) => index > 0 && key.colIndex !== testKeys[index - 1].colIndex)) {
    return false;
  }

  const sortedKeys = sortBy(testKeys, ['rowIndex']);

  const { groupIndex, colIndex } = testKeys[0];

  return (
    !sortedKeys.some((key, index) => {
      if (index > 0) {
        const { rowSpan } = groups[groupIndex].rows[sortedKeys[index - 1].rowIndex].cols[colIndex];
        return key.rowIndex !== sortedKeys[index - 1].rowIndex + rowSpan;
      }
      return false;
    }) && checkEqualColSpan(selectedKeys, groups)
  );
};

export const checkColContinuity = (selectedKeys, groups) => {
  if (selectedKeys.length === 0) return false;
  const testKeys = getSelectedKeyObjects(selectedKeys);

  if (testKeys.some((key, index) => index > 0 && key.groupIndex !== testKeys[index - 1].groupIndex)) {
    return false;
  }

  if (testKeys.some((key, index) => index > 0 && key.rowIndex !== testKeys[index - 1].rowIndex)) {
    return false;
  }

  const sortedKeys = sortBy(testKeys, ['colIndex']);

  const { groupIndex, rowIndex } = testKeys[0];

  return (
    !sortedKeys.some((key, index) => {
      if (index > 0) {
        const { span } = groups[groupIndex].rows[rowIndex].cols[sortedKeys[index - 1].colIndex];
        return key.colIndex !== sortedKeys[index - 1].colIndex + span;
      }
      return false;
    }) && checkEqualRowSpan(selectedKeys, groups)
  );
};

/* col 이 전부 null 인 경우 (단 위에 Row사이즈가 1인경우만) clean */
export const cleanAllNullArray = rows =>
  rows.filter((row, index) =>
    index > 0
      ? !(rows[index - 1].cols.every(col => (col ? col.rowSpan : 1) === 1) && row.cols.every(col => col === null))
      : !row.cols.every(col => col === null),
  );

export const checkMergeAble = selectedKeys => {
  if (selectedKeys.size === 0) return false;
  const testKeys = selectedKeys.map(key => {
    const keyGroup = key.split('-');
    return fromJS({ groupIndex: Number(keyGroup[0]), rowIndex: Number(keyGroup[1]), colIndex: Number(keyGroup[2]) });
  });

  const isNotSameLayer = testKeys.some((key, index) => {
    if (index > 0) {
      return key.get('groupIndex') !== testKeys.getIn([index - 1, 'groupIndex']) || key.get('rowIndex') !== testKeys.getIn([index - 1, 'rowIndex']);
    }
    return false;
  });

  if (isNotSameLayer) return false;

  const sortedNumbers = testKeys.map(key => key.get('colIndex')).sort();
  if (sortedNumbers.size < 2) {
    return false;
  }
  const cantMerge = sortedNumbers.some((number, index) => {
    if (index > 0) {
      return sortedNumbers.get(index - 1) + 1 !== number;
    }
    return false;
  });
  return !cantMerge;
};

export const setGroupsLayerIdxKey = (groups, oldKey, newKey) =>
  groups.map(node => {
    if (node.rows.length > 0) {
      return {
        ...node,
        rows: node.rows.map(row => {
          if (row.cols.length > 0) {
            return {
              ...row,
              cols: row.cols.map(col => {
                if (col.comp && col.comp.CONFIG && col.comp.CONFIG.property.layerIdx && col.comp.CONFIG.property.layerIdx[oldKey]) {
                  const tempComp = col.comp;
                  tempComp.CONFIG.property.layerIdx[newKey] = tempComp.CONFIG.property.layerIdx[oldKey];
                  return { ...col, comp: tempComp };
                }
                return { ...col };
              }),
            };
          }
          return { ...row };
        }),
      };
    }
    return { ...node };
  });

export const setInitListGroups = compList => {
  const titleComp = compList[compList.findIndex(iNode => iNode.COMP_FIELD === 'TITLE')];
  const regUserNameComp = compList[compList.findIndex(iNode => iNode.COMP_FIELD === 'REG_USER_NAME')];
  const regDttmComp = compList[compList.findIndex(iNode => iNode.COMP_FIELD === 'REG_DTTM')];
  if (!titleComp.CONFIG.property.compKey || titleComp.CONFIG.property.compKey.length === 0) titleComp.CONFIG.property.compKey = `Comp_${getNewKey()}`;
  if (!regUserNameComp.CONFIG.property.compKey || regUserNameComp.CONFIG.property.compKey.length === 0)
    regUserNameComp.CONFIG.property.compKey = `Comp_${getNewKey()}`;
  if (!regDttmComp.CONFIG.property.compKey || regDttmComp.CONFIG.property.compKey.length === 0) regDttmComp.CONFIG.property.compKey = `Comp_${getNewKey()}`;

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
          { key: getNewKey(), type: 'col', span: 6, style: { width: '25%', height: '35px' } },
          { key: getNewKey(), type: 'col', span: 6, style: { width: '25%', height: '35px' } },
          { key: getNewKey(), type: 'col', span: 6, style: { width: '25%', height: '35px' } },
          { key: getNewKey(), type: 'col', span: 6, style: { width: '25%', height: '35px' } },
        ],
      },
      {
        key: getNewKey(),
        type: 'row',
        gutter: [8, 8],
        cols: [
          { key: getNewKey(), type: 'col', span: 6, style: { width: '25%', height: '35px' } },
          { key: getNewKey(), type: 'col', span: 6, style: { width: '25%', height: '35px' } },
          { key: getNewKey(), type: 'col', span: 6, style: { width: '25%', height: '35px' } },
          { key: getNewKey(), type: 'col', span: 6, style: { width: '25%', height: '35px' } },
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
          { key: getNewKey(), type: 'col', span: 12, style: { width: '50%', height: '35px' }, comp: titleComp },
          { key: getNewKey(), type: 'col', span: 6, style: { width: '25%', height: '35px' }, comp: regUserNameComp },
          { key: getNewKey(), type: 'col', span: 6, style: { width: '25%', height: '35px' }, comp: regDttmComp },
        ],
      },
    ],
  });
  return [initialSearchGroup, initialListGroup];
};
