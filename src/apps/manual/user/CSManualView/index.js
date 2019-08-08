import React, { Component } from 'react';
import { fromJS } from 'immutable';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import Tab from '../components/Tab';
import TabTitle from '../components/Tab/TabTitle';
import StyledTabPanel from '../components/Tab/StyledTabPanel';
import TopbarBtnWrap from '../components/TopbarBtnWrap';
import IconCollection from '../components/IconCollection';
import * as listActions from '../CSManualList/actions';

import reducer from './reducer';
import saga from './saga';
import selectors from './selectors';
import * as actions from './actions';
import ContentBody from './ContentBody';
import Styled from './Styled';

class ManualView extends Component {
  componentDidMount() {
    const { getManualView, selectedMualIdx, mualIdx, setSelectedMualIdx } = this.props;
    if (selectedMualIdx !== mualIdx) setSelectedMualIdx(mualIdx);
    getManualView();
  }

  componentDidUpdate(prevProps) {
    const { selectedMualIdx, getManualView, mualIdx, setSelectedMualIdx } = this.props;
    if (selectedMualIdx !== mualIdx) setSelectedMualIdx(mualIdx);
    if (selectedMualIdx > 0 && prevProps.selectedMualIdx != selectedMualIdx) {
      getManualView();
    }
  }

  handleCloseModal = () => {
    const { resetManualView, setIsViewContents, setSelectedMualIdx, setListSelectedMualIdx } = this.props;
    setIsViewContents(false);
    resetManualView();
    setSelectedMualIdx(0);
    setListSelectedMualIdx(0);
  };

  getTabData = (maulTabList, setScrollComponent) =>
    maulTabList.map(item => ({
      MUAL_TAB_IDX: item.MUAL_TAB_IDX,
      MUAL_IDX: item.MUAL_IDX,
      SORT_SQ: item.SORT_SQ,
      TabComponent: <TabTitle title={item.MUAL_TABNAME} />,
      TabPanelComponent: (
        <StyledTabPanel>
          <ContentBody componentList={item.MUAL_TABVIEWINFO} setScrollComponent={setScrollComponent} />
        </StyledTabPanel>
      ),
      disabled: false,
    }));

  render() {
    const { maulTabList, selectedTabIdx, setSelectedTabIdx, setScrollComponent } = this.props;
    return (
      <Styled>
        <div className="tab-wrap">
          <Tab
            tabs={this.getTabData(maulTabList.toJS(), setScrollComponent)}
            keyName="MUAL_TAB_IDX"
            selectedTabIdx={selectedTabIdx}
            setSelectedTabIdx={setSelectedTabIdx}
          />
          <TopbarBtnWrap className="tab-btn-wrap" />
          <button type="button" className="tab-btn-close" onClick={() => this.handleCloseModal()}>
            <IconCollection className="icon-close" />
          </button>
        </div>
      </Styled>
    );
  }
}

ManualView.propTypes = {
  getManualView: PropTypes.func,
  maulTabList: PropTypes.object,
  selectedTabIdx: PropTypes.number,
  setSelectedTabIdx: PropTypes.func,
};

ManualView.defaultProps = {
  getManualView: () => false,
  maulTabList: fromJS([]),
  selectedTabIdx: 0,
  setSelectedTabIdx: () => false,
};

const mapStateToProps = createStructuredSelector({
  selectedMualIdx: selectors.makeSelectedMualIdx(),
  maulTabList: selectors.makeSelectMaulTabList(),
  selectedTabIdx: selectors.makeSelectedTabIdx(),
});

const mapDispatchToProps = dispatch => ({
  getManualView: () => dispatch(actions.getManualViewBySaga()),
  setSelectedTabIdx: idx => dispatch(actions.setSelectedTabIdxByReducr(idx)),
  setSelectedMualIdx: idx => dispatch(actions.setSelectedMualIdxByReducr(idx)),
  setScrollComponent: item => dispatch(actions.setScrollComponentByReducr(item)),
  setIsViewContents: flag => dispatch(listActions.setIsViewContentsByReducr(flag)),
  setListSelectedMualIdx: idx => dispatch(listActions.setSelectedMualIdxByReducr(idx)),
  resetManualView: () => dispatch(actions.resetManualViewByReducr()),
});

const withReducer = injectReducer({ key: 'apps-manual-user-ManualView-reducer', reducer });
const withSaga = injectSaga({ key: 'apps-manual-user-ManualView-saga', saga });
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withSaga,
  withReducer,
  withConnect,
)(ManualView);
