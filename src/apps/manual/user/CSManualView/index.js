import React, { Component } from 'react';
import { fromJS } from 'immutable';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';

import reducer from './reducer';
import saga from './saga';
import selectors from './selectors';
import * as actions from './actions';
// import Header from './Header';
import Tab from '../components/Tab';
import StyledTabPanel from '../components/Tab/StyledTabPanel';
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

  getTabData = (maulTabList, setScrollComponent) =>
    maulTabList.map(item => ({
      MUAL_TAB_IDX: item.MUAL_TAB_IDX,
      MUAL_IDX: item.MUAL_IDX,
      SORT_SQ: item.SORT_SQ,
      TabComponent: item.MUAL_TABNAME,
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
        <Tab
          tabs={this.getTabData(maulTabList.toJS(), setScrollComponent)}
          keyName="MUAL_TAB_IDX"
          selectedTabIdx={selectedTabIdx}
          setSelectedTabIdx={setSelectedTabIdx}
        />
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
