import { fromJS } from 'immutable';
import uuid from 'uuid/v1';

const getNewKey = () => uuid();

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
          { key: getNewKey(), type: 'col', span: 12, style: { width: '50%', height: '70px' }, comp: titleComp },
          { key: getNewKey(), type: 'col', span: 6, style: { width: '25%', height: '70px' }, comp: regUserNameComp },
          { key: getNewKey(), type: 'col', span: 6, style: { width: '25%', height: '70px' }, comp: regDttmComp },
        ],
      },
    ],
  });
  return [initialSearchGroup, initialListGroup];
};
