import React from 'react';
import { Button, Input } from 'antd';
import { fromJS } from 'immutable';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';

import * as feed from 'components/Feedback/functions';
import selectors from '../../selectors';
import * as actions from '../../actions';
import IconCollection from '../../../../../user/components/IconCollection';

import StyleManualTab from './StyleManualTab';

const ManualTab = ({ addTabInfo, tabInfo, selectedTabIdx, handleChangeTabIdx, removeTabInfo, handleChangeTabName }) => (
  <StyleManualTab>
    <div className="manualtabwrap">
      <ul>
        <li className="icon-tab-wrap">
          <IconCollection className="icon-tabs" />
        </li>
        {tabInfo.map((item, idx) =>
          item.get('IS_REMOVE') === 'N' ? (
            <li key={`manual_tab_${item.get('MUAL_TAB_IDX')}`} className={selectedTabIdx === item.get('MUAL_TAB_IDX') ? 'active' : ''}>
              <IconCollection className="icon-tabs"></IconCollection>
              <div className="tab-dividers" />
              <div className="tab-background">
                <svg version="1.1" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <symbol id="tab-geometry-left" viewBox="0 0 214 36">
                      <path d="M17 0h197v36H0v-2c4.5 0 9-3.5 9-8V8c0-4.5 3.5-8 8-8z" />
                    </symbol>
                    <symbol id="tab-geometry-right" viewBox="0 0 214 36">
                      <use xlinkHref="#tab-geometry-left" />
                    </symbol>
                    <clipPath id="crop">
                      <rect className="mask" width="100%" height="100%" x="0" />
                    </clipPath>
                  </defs>
                  <svg width="52%" height="100%">
                    <use xlinkHref="#tab-geometry-left" width="214" height="36" className="tab-geometry" />
                  </svg>
                  <g transform="scale(-1, 1)">
                    <svg width="52%" height="100%" x="-100%" y="0">
                      <use xlinkHref="#tab-geometry-right" width="214" height="36" className="tab-geometry" />
                    </svg>
                  </g>
                </svg>
              </div>
              <div
                className="tab-content"
                onClick={() => (selectedTabIdx === item.get('MUAL_TAB_IDX') ? false : handleChangeTabIdx(item.get('MUAL_TAB_IDX'), idx))}
              >
                <div className="tab-title">
                  {selectedTabIdx === item.get('MUAL_TAB_IDX') ? (
                    <Input
                      type="text"
                      defaultValue={item.get('MUAL_TABNAME') || 'New Tab'}
                      onChange={e => handleChangeTabName(e.target.value, item.get('MUAL_TAB_IDX'))}
                    />
                  ) : (
                    item.get('MUAL_TABNAME') || 'New Tab'
                  )}
                </div>
              </div>
              <Button
                onClick={() => {
                  feed.showConfirm('삭제 하시겠습니까?', '', () => removeTabInfo(item.get('MUAL_TAB_IDX')));
                }}
              >
                <IconCollection className="icon-close" />
              </Button>
            </li>
          ) : (
            ''
          ),
        )}
        <li className="last-new-tab">
          <div className="tab-dividers" />
          <div className="manualtabbuttonwrap">
            <Button onClick={addTabInfo}>
              <IconCollection className="icon-plus" />
            </Button>
            {/* <Button>
            <i className="fa fa-angle-down"></i>
          </Button> */}
          </div>
        </li>
      </ul>
      <div className="chrome-tabs-bottom-bar"></div>
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
