import React, { Component } from 'react';
import { fromJS } from 'immutable';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';
import { Modal } from 'antd';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import PreviewSelectors from 'apps/manual/admin/ManualManager/ManualMaster/selectors';
import * as newsfeedAction from '../newsFeed/widgets/action';
import Tab from '../components/Tab';
import TabTitle from '../components/Tab/TabTitle';
import StyledTabPanel from '../components/Tab/StyledTabPanel';
import TopbarBtnWrap from './TopbarBtnWrap';
import IconCollection from '../components/IconCollection';
import * as listActions from '../CSManualList/actions';
import * as bookmarkViewWidgetAction from '../CSManualBookmark/action';
import * as editorActions from '../../admin/ManualManager/ManualMaster/actions';

import reducer from './reducer';
import saga from './saga';
import selectors from './selectors';
import * as actions from './actions';
import ContentBody from './ContentBody';
import Styled from './Styled';
// import CSDiffView from '../CSDiffView';

class ManualView extends Component {
  constructor(props) {
    super(props);
    this.handleClickTopBarButton = this.handleClickTopBarButton.bind(this);
  }

  componentWillUnmount() {
    const { removeReduxState } = this.props;
    removeReduxState('preview');
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
    const {
      resetManualView,
      setIsViewContents,
      setSelectedMualIdx,
      setListSelectedMualIdx,
      widgetId,
      setNewsfeedModalView,
      setNewsfeedModalIdx,
      setEditorPreviewModal,
    } = this.props;
    setIsViewContents(false, widgetId);
    setNewsfeedModalIdx(undefined, widgetId);
    setNewsfeedModalView(false, widgetId);
    resetManualView(widgetId);
    setSelectedMualIdx(0, widgetId);
    setListSelectedMualIdx(0, widgetId);
    setEditorPreviewModal(false);
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

  getTabData = (maulTabList, setScrollComponent, widgetId, bookmarkWidgetData, pagerProps, mualMaster, navList, quickProps, indexRelationList) =>
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
            indexRelationList={indexRelationList}
            bookmarkWidgetData={bookmarkWidgetData}
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
      indexRelationList,
      setbookmarkWidgetViewIdx,
      bookmarkWidgetData,
    } = this.props;

    const isBookmark = mualBookmarkList.findIndex(find => find.get('MUAL_IDX') === selectedMualIdx || find.get('MUAL_ORG_IDX') === selectedMualIdx) > -1;

    const topBarButton = [
      {
        key: isBookmark ? 'mualViewNookmarkN' : 'mualViewNookmarkY',
        title: isBookmark ? '북마크해제' : '북마크',
        event: isBookmark ? this.handleClickTopBarButton : this.handleClickTopBarButton,
        widgetId,
      },
      { key: 'diffView', title: '비교보기', event: undefined },
      // { key: 'viewTopbar2', title: '오류신고2', event: undefined },
    ];

    return (
      <Styled id={`#csManualView_${widgetId}`} bookmarkWidgetData={bookmarkWidgetData}>
        <div className="tab-wrap">
          <Tab
            tabs={this.getTabData(
              maulTabList.toJS(),
              setScrollComponent,
              widgetId,
              bookmarkWidgetData,
              {
                mualHistoryList,
                selectedMualIdx,
                setSelectedMualIdx,
                setListSelectedMualIdx,
                mualBookmarkList,
                setNewsfeedModalIdx,
                setbookmarkWidgetViewIdx,
              },
              mualMaster.toJS(),
              navList.toJS(),
              {
                relationList: relationList.toJS(),
                widgetId,
                addManualHistory,
                setListSelectedMualIdx,
              },
              indexRelationList.toJS(),
            )}
            keyName="MUAL_TAB_IDX"
            selectedTabIdx={selectedTabIdx}
            setSelectedTabIdx={setSelectedTabIdx}
            widgetId={widgetId}
          />
          <TopbarBtnWrap
            className="tab-btn-wrap"
            data={topBarButton}
            mualMaster={mualMaster}
            action={{
              setSelectedMualIdx,
              setListSelectedMualIdx,
              setNewsfeedModalIdx,
              setbookmarkWidgetViewIdx,
            }}
            widgetId={widgetId}
          />
          {!bookmarkWidgetData.widgetYn && (
            <button type="button" className="tab-btn-close" onClick={() => this.handleCloseModal()}>
              <IconCollection className="icon-close" />
            </button>
          )}
        </div>
        {/* <Modal
          width={1198}
          bodyStyle={{ height: 'calc(100vh - 66px)', padding: '4px' }}
          style={{ top: 42 }}
          visible
          footer={null}
          // onCancel={() => this.handleCloseModal()}
          closable={false}
          // getContainer={() => document.querySelector(`#csManualView_${widgetId}`)}
        >
          <CSDiffView widgetId={widgetId} maulTabList={maulTabList.toJS()} />
        </Modal> */}
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
  indexRelationList: PropTypes.object,
  setbookmarkWidgetViewIdx: PropTypes.func,
  bookmarkWidgetData: PropTypes.object,
  setEditorPreviewModal: PropTypes.func,
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
  indexRelationList: fromJS([]),
  bookmarkWidgetData: { widgetYn: false, appCount: 0, isTitle: true },
  setbookmarkWidgetViewIdx: () => false,
  setEditorPreviewModal: () => false,
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
  indexRelationList: selectors.makeSelectManualViewIndexRelationList(),
  oldVerMual: selectors.makeSelectOldVersionManual(),
});

const mapDispatchToProps = dispatch => ({
  getManualView: (widgetId, flag) => dispatch(actions.getManualViewBySaga(widgetId, flag)),
  setNewsfeedModalView: (modalView, widget_id) => dispatch(newsfeedAction.setModalView(modalView, widget_id)),
  setNewsfeedModalIdx: (mualIdx, widget_id) => dispatch(newsfeedAction.setModalIdx(mualIdx, widget_id)),
  setSelectedTabIdx: (idx, widgetId) => dispatch(actions.setSelectedTabIdxByReducr(idx, widgetId)),
  setSelectedMualIdx: (idx, widgetId, isLastVersion) => dispatch(actions.setSelectedMualIdxByReducr(idx, widgetId, isLastVersion)),
  setScrollComponent: (item, widgetId) => dispatch(actions.setScrollComponentByReducr(item, widgetId)),
  setIsViewContents: (flag, widgetId) => dispatch(listActions.setIsViewContentsByReducr(flag, widgetId)),
  setListSelectedMualIdx: (idx, widgetId) => dispatch(listActions.setSelectedMualIdxByReducr(idx, widgetId)),
  resetManualView: widgetId => dispatch(actions.resetManualViewByReducr(widgetId)),
  setMualBookmark: (flag, widgetId) => dispatch(actions.setManualBookmarkBySaga(flag, widgetId)),
  addManualHistory: (widgetId, mualIdx, mualOrgIdx) => dispatch(actions.addManualHistoryBySaga(widgetId, mualIdx, mualOrgIdx)),
  setbookmarkWidgetViewIdx: (widgetId, selectedMual) => dispatch(bookmarkViewWidgetAction.setWidgetMualIdxByReducer(widgetId, selectedMual)),
  setEditorPreviewModal: flag => dispatch(editorActions.setPreviewModalByReducr(flag)),
  getOldVerManual: (widgetId, mualIdx) => dispatch(actions.getOldVersionManualBySaga(widgetId, mualIdx)),
  removeReduxState: widgetId => dispatch(actions.removeReduxState(widgetId)),
});

const withReducer = injectReducer({
  key: 'apps-manual-user-ManualView-reducer',
  reducer,
});
const withSaga = injectSaga({ key: 'apps-manual-user-ManualView-saga', saga });
const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withSaga, withReducer, withConnect)(ManualView);
