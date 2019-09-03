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
import * as newsfeedAction from 'apps/newsFeed/widgets/action';

import reducer from './reducer';
import saga from './saga';
import selectors from './selectors';
import * as actions from './actions';
import ContentBody from './ContentBody';
import Styled from './Styled';

class ManualView extends Component {
  constructor(props) {
    super(props);
    this.handleClickTopBarButton = this.handleClickTopBarButton.bind(this);
  }

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
    const { resetManualView, setIsViewContents, setSelectedMualIdx, setListSelectedMualIdx, widgetId, setNewsfeedModalView, setNewsfeedModalIdx } = this.props;
    setIsViewContents(false, widgetId);
    setNewsfeedModalIdx(undefined, widgetId);
    setNewsfeedModalView(false, widgetId);
    resetManualView(widgetId);
    setSelectedMualIdx(0, widgetId);
    setListSelectedMualIdx(0, widgetId);
  };

  handleClickTopBarButton = key => {
    const { widgetId, setMualBookmark } = this.props;
    switch (key) {
      case 'mualViewNookmarkN':
        setMualBookmark('N', widgetId);
        break;
      case 'mualViewNookmarkY':
        setMualBookmark('Y', widgetId);
        break;
      default:
        console.debug(key);
    }
  };

  getTabData = (maulTabList, setScrollComponent, widgetId, pagerProps, mualMaster, navList, quickProps) =>
    maulTabList.map(item => ({
      MUAL_TAB_IDX: item.MUAL_TAB_IDX,
      MUAL_IDX: item.MUAL_IDX,
      SORT_SQ: item.SORT_SQ,
      TabComponent: <TabTitle title={item.MUAL_TABNAME} />,
      TabPanelComponent: (
        <StyledTabPanel>
          <ContentBody
            componentList={item.MUAL_TABVIEWINFO}
            setScrollComponent={setScrollComponent}
            widgetId={widgetId}
            pagerProps={pagerProps}
            mualMaster={mualMaster}
            navList={navList}
            quickProps={quickProps}
          />
        </StyledTabPanel>
      ),
      disabled: false,
    }));

  render() {
    const {
      maulTabList,
      selectedTabIdx,
      setSelectedTabIdx,
      setScrollComponent,
      widgetId,
      mualHistoryList,
      selectedMualIdx,
      setSelectedMualIdx,
      setListSelectedMualIdx,
      mualBookmarkList,
      mualMaster,
      navList,
      relationList,
      addManualHistory,
      setNewsfeedModalIdx,
    } = this.props;

    const isBookmark = mualBookmarkList.findIndex(find => find.get('MUAL_IDX') === selectedMualIdx || find.get('MUAL_ORG_IDX') === selectedMualIdx) > -1;

    const topBarButton = [
      {
        key: isBookmark ? 'mualViewNookmarkN' : 'mualViewNookmarkY',
        title: isBookmark ? '북마크해제' : '북마크',
        event: isBookmark ? this.handleClickTopBarButton : this.handleClickTopBarButton,
        widgetId,
      },
      { key: 'viewTopbar1', title: '오류신고', event: undefined },
      { key: 'viewTopbar2', title: '오류신고', event: undefined },
      { key: 'viewTopbar3', title: '오류신고', event: undefined },
      { key: 'viewTopbar4', title: '오류신고', event: undefined },
    ];
    return (
      <Styled>
        <div className="tab-wrap">
          <Tab
            tabs={this.getTabData(
              maulTabList.toJS(),
              setScrollComponent,
              widgetId,
              {
                mualHistoryList,
                selectedMualIdx,
                setSelectedMualIdx,
                setListSelectedMualIdx,
                mualBookmarkList,
                setNewsfeedModalIdx,
              },
              mualMaster.toJS(),
              navList.toJS(),
              { relationList: relationList.toJS(), widgetId, addManualHistory, setListSelectedMualIdx },
            )}
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
  setScrollComponent: PropTypes.func,
  mualHistoryList: PropTypes.object,
  setMualBookmark: PropTypes.func,
  mualBookmarkList: PropTypes.object,
  mualMaster: PropTypes.object,
  navList: PropTypes.object,
  relationList: PropTypes.object,
  addManualHistory: PropTypes.func,
};

ManualView.defaultProps = {
  getManualView: () => false,
  maulTabList: fromJS([]),
  selectedTabIdx: 0,
  setSelectedTabIdx: () => false,
  setScrollComponent: {},
  mualHistoryList: fromJS([]),
  setMualBookmark: () => false,
  mualBookmarkList: fromJS([]),
  mualMaster: fromJS({}),
  navList: fromJS([]),
  relationList: fromJS([]),
  addManualHistory: () => false,
};

const mapStateToProps = createStructuredSelector({
  selectedMualIdx: selectors.makeSelectedMualIdx(),
  maulTabList: selectors.makeSelectMaulTabList(),
  selectedTabIdx: selectors.makeSelectedTabIdx(),
  mualHistoryList: selectors.makeSelectHistoryList(),
  mualBookmarkList: selectors.makeSelectBookmarkList(),
  mualMaster: selectors.makeSelectManualMaster(),
  navList: selectors.makeSelectManualViewNavList(),
  relationList: selectors.makeSelectManualViewRelationList(),
});

const mapDispatchToProps = dispatch => ({
  getManualView: (widgetId, flag) => dispatch(actions.getManualViewBySaga(widgetId, flag)),
  setNewsfeedModalView: (modalView, widget_id) => dispatch(newsfeedAction.setModalView(modalView, widget_id)),
  setNewsfeedModalIdx: (mualIdx, widget_id) => dispatch(newsfeedAction.setModalIdx(mualIdx, widget_id)),
  setSelectedTabIdx: (idx, widgetId) => dispatch(actions.setSelectedTabIdxByReducr(idx, widgetId)),
  setSelectedMualIdx: (idx, widgetId) => dispatch(actions.setSelectedMualIdxByReducr(idx, widgetId)),
  setScrollComponent: (item, widgetId) => dispatch(actions.setScrollComponentByReducr(item, widgetId)),
  setIsViewContents: (flag, widgetId) => dispatch(listActions.setIsViewContentsByReducr(flag, widgetId)),
  setListSelectedMualIdx: (idx, widgetId) => dispatch(listActions.setSelectedMualIdxByReducr(idx, widgetId)),
  resetManualView: widgetId => dispatch(actions.resetManualViewByReducr(widgetId)),
  setMualBookmark: (flag, widgetId) => dispatch(actions.setManualBookmarkBySaga(flag, widgetId)),
  addManualHistory: (widgetId, mualIdx, mualOrgIdx) => dispatch(actions.addManualHistoryBySaga(widgetId, mualIdx, mualOrgIdx)),
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
