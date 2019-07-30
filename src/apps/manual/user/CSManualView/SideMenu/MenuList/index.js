import React from 'react';
import { fromJS } from 'immutable';
import PropTypes from 'prop-types';

import Styled from './Styled';

const renderListItem = (componentList, pIdx, level, setSelectedCompIdx, selectedCompIdx) => {
  const filterList = componentList.filter(item => item.MUAL_TABCOMP_PIDX === pIdx && item.TYPE.indexOf('index') > -1);
  let childNode = [];
  let resultList = filterList.map(item => {
    const childrenList = componentList.filter(node => node.MUAL_TABCOMP_PIDX === item.MUAL_TABCOMP_IDX && node.TYPE.indexOf('index') > -1);
    if (childrenList.length > 0 && level > 2) {
      childNode = renderListItem(componentList, item.MUAL_TABCOMP_IDX, level + 1, setSelectedCompIdx, selectedCompIdx);
    }
    return (
      <li className="active" key={`MenuList_${item.MUAL_TABCOMP_IDX}`}>
        <a href={`#manualViewIndexComp_${item.MUAL_TABCOMP_IDX}`} onClick={() => setSelectedCompIdx(item.MUAL_TABCOMP_IDX)}>
          {item.MUAL_COMPVIEWINFO}
          <i className="icon-plus"></i>
        </a>
        {childrenList.length > 0 && level < 3 && (
          <ul>{renderListItem(componentList, item.MUAL_TABCOMP_IDX, level + 1, setSelectedCompIdx, selectedCompIdx)}</ul>
        )}
      </li>
    );
  });
  if (childNode.length > 0) {
    resultList = resultList.concat(childNode);
  }
  return resultList;
};

const MenuList = ({ componentList, setSelectedCompIdx, selectedCompIdx }) => (
  <Styled>
    <ul>{renderListItem(componentList ? componentList.toJS() : [], 0, 1, setSelectedCompIdx, selectedCompIdx)}</ul>
  </Styled>
);

MenuList.propTypes = {
  componentList: PropTypes.object,
  setSelectedCompIdx: PropTypes.func,
  selectedCompIdx: PropTypes.object,
};

MenuList.defaultProps = {
  componentList: fromJS([]),
  setSelectedCompIdx: () => false,
  selectedCompIdx: fromJS([]),
};

export default MenuList;
