import React from 'react';
import { Button, Input } from 'antd';
import { fromJS } from 'immutable';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';

import * as feed from 'components/Feedback/functions';
import selectors from '../../selectors';
import * as actions from '../../actions';

import StyleManualTab from './StyleManualTab';

const ManualTab = ({ addTabInfo, tabInfo, selectedTabIdx, handleChangeTabIdx, removeTabInfo, handleChangeTabName }) => (
  <StyleManualTab>
    <div className="manualtabwrap">
      <ul>
        {tabInfo.map((item, idx) =>
          item.get('IS_REMOVE') === 'N' ? (
            <li key={`manual_tab_${item.get('MUAL_TAB_IDX')}`}>
              <span onClick={() => (selectedTabIdx === item.get('MUAL_TAB_IDX') ? false : handleChangeTabIdx(item.get('MUAL_TAB_IDX'), idx))}>
                <i className="fa fa-table"></i>
                {selectedTabIdx === item.get('MUAL_TAB_IDX') ? (
                  <Input
                    type="text"
                    defaultValue={item.get('MUAL_TABNAME') || 'New Tab'}
                    onChange={e => handleChangeTabName(e.target.value, item.get('MUAL_TAB_IDX'))}
                  />
                ) : (
                  item.get('MUAL_TABNAME') || 'New Tab'
                )}
              </span>
              <Button
                onClick={() => {
                  feed.showConfirm('삭제 하시겠습니까?', '', () => removeTabInfo(item.get('MUAL_TAB_IDX')));
                }}
              >
                <i className="fa fa-times"></i>
              </Button>
            </li>
          ) : (
            ''
          ),
        )}
      </ul>
    </div>
    <div className="manualtabbuttonwrap">
      <Button onClick={addTabInfo}>
        <i className="fa fa-plus"></i>
      </Button>
      {/* <Button>
        <i className="fa fa-angle-down"></i>
      </Button> */}
    </div>
  </StyleManualTab>
);

ManualTab.propTypes = {
  addTabInfo: PropTypes.func,
  handleChangeTabIdx: PropTypes.func,
  removeTabInfo: PropTypes.func,
  handleChangeTabName: PropTypes.func,
  tabInfo: PropTypes.object,
  selectedTabIdx: PropTypes.number,
};

ManualTab.defaultProps = {
  addTabInfo: () => false,
  handleChangeTabIdx: () => false,
  removeTabInfo: () => false,
  handleChangeTabName: () => false,
  tabInfo: fromJS([]),
  selectedTabIdx: 1,
};

const mapStateToProps = createStructuredSelector({
  tabInfo: selectors.makeSelectTabInfo(),
  selectedTabIdx: selectors.makeSelectTabIdx(),
});

const mapDispatchToProps = dispatch => ({
  addTabInfo: () => dispatch(actions.addTabInfoByReduc()),
  handleChangeTabIdx: (tabIdx, idx) => dispatch(actions.setTabIdxByReduc(tabIdx, idx)),
  removeTabInfo: tabIdx => dispatch(actions.removeTabInfoByReduc(tabIdx)),
  handleChangeTabName: (tabName, tabIdx) => dispatch(actions.setTabNameByReduc(tabName, tabIdx)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ManualTab);
