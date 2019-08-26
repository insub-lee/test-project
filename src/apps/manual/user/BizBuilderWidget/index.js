import React, { Component } from 'react';
import { Table } from 'antd';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import moment from 'moment';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import reducer from './reducer';
import saga from './saga';
import selectors from './selectors';
import * as actions from './actions';

class BizBuilderWidget extends Component {
  componentDidMount() {
    const { item, getBizBuilderListSettingBySaga } = this.props;
    getBizBuilderListSettingBySaga(item.id, 'common');
  }

  render() {
    const { bizBuilderList, bizBuilderConfigInfo } = this.props;
    const { sourcecols } = bizBuilderConfigInfo;
    return <Table columns={sourcecols} dataSource={bizBuilderList}></Table>;
  }
}

BizBuilderWidget.propTypes = {
  item: PropTypes.object,
  getBizBuilderListSettingBySaga: PropTypes.func,
  bizBuilderList: PropTypes.object,
  bizBuilderConfigInfo: PropTypes.object,
};

BizBuilderWidget.defaultProps = {
  item: { id: '11078' },
  getBizBuilderListSettingBySaga: () => false,
  bizBuilderList: [],
  bizBuilderConfigInfo: [],
};

const mapStateToProps = createStructuredSelector({
  bizBuilderList: selectors.makeSelectBizBuilderList(),
  bizBuilderConfigInfo: selectors.makeSelectBizBuilderConfigInfo(),
});

const mapDispatchToProps = dispatch => ({
  getBizBuilderListSettingBySaga: (widgetId, type) => dispatch(actions.getBizBuilderListSettingBySaga(widgetId, type)),
});

const withReducer = injectReducer({ key: 'apps-manual-user-BizBuilderWidget-reducer', reducer });
const withSaga = injectSaga({ key: 'apps-manual-user-BizBuilderWidget-saga', saga });
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withSaga,
  withReducer,
  withConnect,
)(BizBuilderWidget);
