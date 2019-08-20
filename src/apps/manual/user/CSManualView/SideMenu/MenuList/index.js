import React from 'react';
import { fromJS } from 'immutable';
import PropTypes from 'prop-types';

import Styled from './Styled';

const handleOpenPopup = url => window.open(url);

const setScroll = (compIdx, setSelectedCompIdx, scrollComp, widgetId) => {
  const selectedComp = document.querySelector(`#manualViewIndexComp_${compIdx}`);
  const topPosition = selectedComp.getBoundingClientRect().top;
  const scrollTop = scrollComp.getScrollTop();
  scrollComp.scrollTop(scrollTop + topPosition - 161);
  setSelectedCompIdx(compIdx, widgetId);
};

const renderListItem = (componentList, pIdx, level, setSelectedCompIdx, selectedCompIdx, scrollComp, widgetId) => {
  const filterList = componentList.filter(item => item.MUAL_TABCOMP_PIDX === pIdx && item.TYPE.indexOf('index') > -1);
  let childNode = [];
  let resultList = filterList.map(item => {
    const childrenList = componentList.filter(node => node.MUAL_TABCOMP_PIDX === item.MUAL_TABCOMP_IDX && node.TYPE.indexOf('index') > -1);
    if (childrenList.length > 0 && level > 2) {
      childNode = renderListItem(componentList, item.MUAL_TABCOMP_IDX, level + 1, setSelectedCompIdx, selectedCompIdx, scrollComp, widgetId);
    }
    let currentNode = '';
    switch (item.TYPE) {
      case 'index':
        currentNode = (
          <a onClick={() => setScroll(item.MUAL_TABCOMP_IDX, setSelectedCompIdx, scrollComp, widgetId)}>
            {item.MUAL_COMPVIEWINFO}
            <i className="icon-plus"></i>
          </a>
        );
        break;
      case 'indexLink':
        currentNode =
          item.COMP_OPTION.ACTION_TYPE === 'menu' ? (
            <a onClick={() => handleOpenPopup(item.COMP_OPTION.URL)}>
              {item.MUAL_COMPVIEWINFO}
              <i className="icon-plus"></i>
            </a>
          ) : (
            <a onClick={() => setScroll(item.MUAL_TABCOMP_IDX, setSelectedCompIdx, scrollComp, widgetId)}>
              {item.MUAL_COMPVIEWINFO}
              <i className="icon-plus"></i>
            </a>
          );
        break;
      default:
    }
    return (
      <li className="active" key={`MenuList_${item.MUAL_TABCOMP_IDX}`}>
        {currentNode}
        {childrenList.length > 0 && level < 3 && (
          <ul>{renderListItem(componentList, item.MUAL_TABCOMP_IDX, level + 1, setSelectedCompIdx, selectedCompIdx, scrollComp, widgetId)}</ul>
        )}
      </li>
    );
  });
  if (childNode.length > 0) {
    resultList = resultList.concat(childNode);
  }
  return resultList;
};

const MenuList = ({ componentList, setSelectedCompIdx, selectedCompIdx, scrollComp, widgetId }) => (
  <Styled>
    <ul>{renderListItem(componentList ? componentList.toJS() : [], 0, 1, setSelectedCompIdx, selectedCompIdx, scrollComp, widgetId)}</ul>
  </Styled>
);

MenuList.propTypes = {
  componentList: PropTypes.object,
  setSelectedCompIdx: PropTypes.func,
  selectedCompIdx: PropTypes.number,
};

MenuList.defaultProps = {
  componentList: fromJS([]),
  setSelectedCompIdx: () => false,
  selectedCompIdx: fromJS([]),
};

export default MenuList;
