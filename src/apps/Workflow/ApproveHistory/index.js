import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Timeline, Icon } from 'antd';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';

import reducer from './reducer';
import saga from './saga';
import * as selectors from './selectors';
import * as actions from './actions';

class ApproveHistory extends Component {
  componentDidMount() {
    const { draftId, getDraftQueHistoryList } = this.props;
    if (draftId !== -1) {
      getDraftQueHistoryList(draftId);
    }
  }

  render() {
    const { draftQueHistoryList } = this.props;

    return (
      <div style={{ margin: '20px', borderTop: '1px solid rgb(217,224,231)' }}>
        <div style={{ padding: '20px 10px' }}>
          <h4>결재 타임라인</h4>
        </div>
        <Timeline>
          {draftQueHistoryList.map(item => (
            <Timeline.Item
              key={`history_${item.HISTORY_ID}`}
              dot={
                item.APPV_STATUS === 2 ? (
                  <Icon type="check-circle" theme="twoTone" twoToneColor="#52c41a" />
                ) : (
                  <Icon type="close-circle" theme="twoTone" twoToneColor="#ff1212" />
                )
              }
            >
              <p>
                <span style={{ width: '200px', display: 'inline-block' }}>{item.APPV_DTTM}</span>
                <span style={{ width: '300px', display: 'inline-block' }}>
                  {`[${item.NODE_NAME_KOR}] ${item.APPV_USER_NAME_KOR} ${item.APPV_USER_PSTN_NAME_KOR}`}
                </span>
                <span>{item.OPINION}</span>
              </p>
            </Timeline.Item>
          ))}
        </Timeline>
      </div>
    );
  }
}

ApproveHistory.propTypes = {
  draftId: PropTypes.number,
  draftQueHistoryList: PropTypes.array,
  getDraftQueHistoryList: PropTypes.func,
};

ApproveHistory.defaultProps = {
  draftId: -1,
  draftQueHistoryList: [],
};

const mapStateToProps = createStructuredSelector({
  draftQueHistoryList: selectors.makeSelectDraftQueHistoryList(),
});

const mapDispatchToProps = dispatch => ({
  getDraftQueHistoryList: draftId => dispatch(actions.getDraftQueHistoryList(draftId)),
});

const withReducer = injectReducer({
  key: 'apps.WorkFlow.ApproveHistory.reducer',
  reducer,
});

const withSaga = injectSaga({
  key: 'apps.WorkFlow.ApproveHistory.saga',
  saga,
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withSaga, withReducer, withConnect)(ApproveHistory);
