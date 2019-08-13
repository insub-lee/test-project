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
    const { getManualView, selectedMualIdx, mualIdx, setSelectedMualIdx, match, widgetId } = this.props;
    if (match && match.params && match.params.mualIdx) {
      setSelectedMualIdx(match.params.mualIdx, widgetId);
      getManualView(widgetId, match.params.lastVersionYN || 'Y');
    } else if (selectedMualIdx !== mualIdx) {
      setSelectedMualIdx(mualIdx, widgetId);
      // getManualView(widgetId);
    }
  }

  componentDidUpdate(prevProps) {
    const { selectedMualIdx, getManualView, mualIdx, setSelectedMualIdx, widgetId } = this.props;
    if (mualIdx) {
      if (selectedMualIdx !== mualIdx) setSelectedMualIdx(mualIdx, widgetId);
      if (selectedMualIdx > 0 && prevProps.selectedMualIdx !== selectedMualIdx) {
        getManualView(widgetId);
      }
    }
  }

  handleCloseModal = () => {
    const { resetManualView, setIsViewContents, setSelectedMualIdx, setListSelectedMualIdx, widgetId } = this.props;
    setIsViewContents(false, widgetId);
    resetManualView(widgetId);
    setSelectedMualIdx(0, widgetId);
    setListSelectedMualIdx(0, widgetId);
  };

  getTabData = (maulTabList, setScrollComponent, widgetId) =>
    maulTabList.map(item => ({
      MUAL_TAB_IDX: item.MUAL_TAB_IDX,
      MUAL_IDX: item.MUAL_IDX,
      SORT_SQ: item.SORT_SQ,
      TabComponent: <TabTitle title={item.MUAL_TABNAME} />,
      TabPanelComponent: (
        <StyledTabPanel>
          <ContentBody componentList={item.MUAL_TABVIEWINFO} setScrollComponent={setScrollComponent} widgetId={widgetId} />
        </StyledTabPanel>
      ),
      disabled: false,
    }));

  render() {
    const { maulTabList, selectedTabIdx, setSelectedTabIdx, setScrollComponent, widgetId } = this.props;
    const topBarButton = [
      { key: 'viewTopbar', title: '오류신고', event: undefined },
      { key: 'viewTopbar', title: '오류신고', event: undefined },
      { key: 'viewTopbar', title: '오류신고', event: undefined },
      { key: 'viewTopbar', title: '오류신고', event: undefined },
      { key: 'viewTopbar', title: '오류신고', event: undefined },
    ];
    return (
      <Styled>
        <div className="tab-wrap">
          <Tab
            tabs={this.getTabData(maulTabList.toJS(), setScrollComponent, widgetId)}
            keyName="MUAL_TAB_IDX"
            selectedTabIdx={selectedTabIdx}
            setSelectedTabIdx={setSelectedTabIdx}
            widgetId={widgetId}
          />
          <TopbarBtnWrap className="tab-btn-wrap" data={topBarButton} />
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
  setScrollComponent: PropTypes.object,
};

ManualView.defaultProps = {
  getManualView: () => false,
  maulTabList: fromJS([]),
  selectedTabIdx: 0,
  setSelectedTabIdx: () => false,
  setScrollComponent: {},
};

const mapStateToProps = createStructuredSelector({
  selectedMualIdx: selectors.makeSelectedMualIdx(),
  maulTabList: selectors.makeSelectMaulTabList(),
  selectedTabIdx: selectors.makeSelectedTabIdx(),
});

const mapDispatchToProps = dispatch => ({
  getManualView: (widgetId, flag) => dispatch(actions.getManualViewBySaga(widgetId, flag)),
  setSelectedTabIdx: (idx, widgetId) => dispatch(actions.setSelectedTabIdxByReducr(idx, widgetId)),
  setSelectedMualIdx: (idx, widgetId) => dispatch(actions.setSelectedMualIdxByReducr(idx, widgetId)),
  setScrollComponent: (item, widgetId) => dispatch(actions.setScrollComponentByReducr(item, widgetId)),
  setIsViewContents: (flag, widgetId) => dispatch(listActions.setIsViewContentsByReducr(flag, widgetId)),
  setListSelectedMualIdx: (idx, widgetId) => dispatch(listActions.setSelectedMualIdxByReducr(idx, widgetId)),
  resetManualView: widgetId => dispatch(actions.resetManualViewByReducr(widgetId)),
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
