import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import CSManualView from 'apps/manual/user/CSManualView';
import * as selectors from './selector';
import * as actions from './action';
import saga from './saga';
import reducer from './reducer';
import StyleWiget from './StyleWidgets';

class CSManualBookmarkWidget extends PureComponent {
  componentDidMount() {
    const { item, setWidgetInitData } = this.props;
    setWidgetInitData(item);
  }

  render() {
    const { item, viewMualIdx, setWidgetViewIdx, selectedApp } = this.props;

    const appCount = selectedApp.length; // 페이지에 그려지는 앱의 총 갯수

    let mualCheck = false;
    if (viewMualIdx !== undefined && viewMualIdx > -1) {
      mualCheck = true;
    } else if (item.data.selectedBookmark !== undefined && viewMualIdx === undefined) {
      mualCheck = true;
      setWidgetViewIdx(item.WIDGET_ID, item.data.selectedBookmark);
    }

    const bookmarkWidgetData = {
      appCount,
      widgetYn: true,
      isTitle: item.user.isTitle,
    };

    return (
      <StyleWiget appCount={appCount}>
        {mualCheck ? (
          <div className="bookmarkWidget_wrap">
            <CSManualView mualIdx={viewMualIdx} widgetId={item.WIDGET_ID} bookmarkWidgetData={bookmarkWidgetData} />
          </div>
        ) : (
          <div style={{ width: '100%', height: '100%' }}>앱 설정에서 메뉴얼을 선택해 주십시오.</div>
        )}
      </StyleWiget>
    );
  }
}

CSManualBookmarkWidget.propTypes = {
  item: PropTypes.object,
  viewMualIdx: PropTypes.number,
  setWidgetInitData: PropTypes.func,
  setWidgetViewIdx: PropTypes.func,
};

CSManualBookmarkWidget.defaultProps = {
  viewMualIdx: 27975,
  item: {
    WIDGET_ID: 11437,
    data: { selectedBookmark: 27975 },
    user: { isTitle: true },
  },
  setWidgetInitData: () => false,
  setWidgetViewIdx: () => false,
};

const mapStateToProps = createStructuredSelector({
  viewMualIdx: selectors.selectViewMualIdx(),
  selectedApp: selectors.selectedApp(),
});

const mapDispatchToProps = dispatch => ({
  setWidgetInitData: item => dispatch(actions.setWidgetInitDataByReducer(item)),
  setWidgetViewIdx: (widgetId, selectedMual) => dispatch(actions.setWidgetMualIdxByReducer(widgetId, selectedMual)),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withSaga = injectSaga({ key: 'CSManual-Bookmark-Widget', saga });
const withReducer = injectReducer({ key: 'CSManual-Bookmark-Widget', reducer });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(CSManualBookmarkWidget);
