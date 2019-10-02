import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { Scrollbars } from 'react-custom-scrollbars';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { InputSearch } from 'components/FormStuff/Input';

import reducer from './reducer';
import saga from './saga';
import * as selectors from './selectors';
import * as actions from './actions';
import Title from './Title';
import Timeline from './Timeline';
import Styled from './Styled';

class NotiTimeLineWidget extends Component {
  componentDidMount() {
    this.props.getNotifyList();
  }

  render() {
    const { notifyList } = this.props;
    return (
      <Styled>
        <Scrollbars>
          {/* <div className="title-wrap">
            <Title title="알림 Timeline" />
          </div> */}
          {/* <div className="list-wrap">
            <div className="searchInput">
              <InputSearch placeholder="검색어를 입력해 주세요." />
            </div>
          </div> */}
          {notifyList.map(notify => (
            <Timeline key={notify.MSG_ID} notify={notify} />
          ))}
        </Scrollbars>
      </Styled>
    );
  }
}

NotiTimeLineWidget.propTypes = {
  notifyList: PropTypes.array,
  getNotifyList: PropTypes.func,
};

NotiTimeLineWidget.defaultProps = {
  notifyList: [],
};

const mapStateToProps = createStructuredSelector({
  notifyList: selectors.makeSelectNotifyList(),
});

const mapDispatchToProps = dispatch => ({
  getNotifyList: () => dispatch(actions.getNotifyList()),
});

const withReducer = injectReducer({ key: 'apps.NotiTimeLineWidget', reducer });
const withSaga = injectSaga({ key: 'apps.NotiTimeLineWidget', saga });
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withSaga,
  withReducer,
  withConnect,
)(NotiTimeLineWidget);
