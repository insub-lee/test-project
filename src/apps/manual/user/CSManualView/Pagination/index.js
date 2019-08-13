import React from 'react';
import { fromJS } from 'immutable';
import PropTypes from 'prop-types';

import Styled from './Styled';

const handleClickNav = (mualOrgIdx, widgetId, setSelectedMualIdx, setListSelectedMualIdx) => {
  setListSelectedMualIdx(mualOrgIdx, widgetId);
  setSelectedMualIdx(mualOrgIdx, widgetId);
};

const Pagination = ({ pagerProps: { mualHistoryList, selectedMualIdx, setSelectedMualIdx, setListSelectedMualIdx }, widgetId }) => {
  const selectedIdx = mualHistoryList.findIndex(find => find.get('MUAL_IDX') === selectedMualIdx || find.get('MUAL_ORG_IDX') === selectedMualIdx);
  const listSize = mualHistoryList.size;
  let nextIdx = 0;
  if (listSize > selectedIdx + 1 && listSize >= selectedIdx + 1) {
    nextIdx = selectedIdx + 1;
  }
  return (
    <Styled>
      <div>
        {selectedIdx > 0 && (
          <div className="btn-wrap btn-prev">
            <button
              type="button"
              className="prev-btn"
              onClick={() => handleClickNav(mualHistoryList.getIn([selectedIdx - 1, 'MUAL_ORG_IDX']), widgetId, setSelectedMualIdx, setListSelectedMualIdx)}
            >
              {mualHistoryList.getIn([selectedIdx - 1, 'MUAL_NAME']) || ''}
            </button>
          </div>
        )}
        <div className="present-tit">
          <span>{mualHistoryList.getIn([selectedIdx, 'MUAL_NAME']) || ''}</span>
        </div>
        {nextIdx > 0 && (
          <div className="btn-wrap btn-next">
            <button
              type="button"
              className="next-btn"
              onClick={() => handleClickNav(mualHistoryList.getIn([nextIdx, 'MUAL_ORG_IDX']), widgetId, setSelectedMualIdx, setListSelectedMualIdx)}
            >
              {mualHistoryList.getIn([nextIdx, 'MUAL_NAME']) || ''}
            </button>
          </div>
        )}
      </div>
    </Styled>
  );
};

Pagination.propTypes = {
  pagerProps: PropTypes.shape({
    mualHistoryList: PropTypes.object,
    selectedMualIdx: PropTypes.number,
    setSelectedMualIdx: PropTypes.func,
    setListSelectedMualIdx: PropTypes.func,
  }),
};

Pagination.defaultProps = {
  pagerProps: { mualHistoryList: fromJS([]), selectedMualIdx: 0, setSelectedMualIdx: () => false, setListSelectedMualIdx: () => false },
};

export default Pagination;
