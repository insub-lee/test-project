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
    const { item, viewMualIdx } = this.props;

    let mualCheck = false;
    if (viewMualIdx !== undefined && viewMualIdx > -1) {
      mualCheck = true;
    }

    console.log('프롭스 들어옴', viewMualIdx);

    return (
      <StyleWiget>
        {mualCheck ? (
          <div className="bookmarkWidget_wrap">
            <CSManualView mualIdx={viewMualIdx} widgetId={item.WIDGET_ID} widgetYn />
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
};

CSManualBookmarkWidget.defaultProps = {
  viewMualIdx: -1,
  setWidgetInitData: () => false,
};

const mapStateToProps = createStructuredSelector({
  viewMualIdx: selectors.selectViewMualIdx(),
});

const mapDispatchToProps = dispatch => ({
  setWidgetInitData: item => dispatch(actions.setWidgetInitDataByReducer(item)),
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
