import { fromJS } from 'immutable';

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
