import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import Preloader from 'components/Preloader';
import Process from 'apps/WorkFlow/Admin/Process';

import reducer from './reducer';
import saga from './saga';
import * as selectors from './selectors';
import * as actions from './actions';


class ProcessDesigner extends Component {
  componentDidMount() {
    const { fetchData, id } = this.props;
    fetchData(id);
  }

  componentWillUnmount() {
    const { resetData } = this.props;
    resetData();
  }

  processCallbackFunc = (prcId) => {
    const { setProcessId } = this.props;
    setProcessId(prcId);
  };

  render() {
    const { isLoading, useWorkFlow, config: { info: { PRC_ID } } } = this.props;
    return (
      <Preloader spinning={isLoading}>
        {useWorkFlow ? (
          <Process processCallbackFunc={this.processCallbackFunc} prcId={PRC_ID} />
        ) : (
          '현재 Work Flow 사용을 하고 있지 않습니다.'
        )}
      </Preloader>
    );
  }
}

ProcessDesigner.propTypes = {
  id: PropTypes.string.isRequired,
  fetchData: PropTypes.func,
  isLoading: PropTypes.bool,
  useWorkFlow: PropTypes.bool,
  resetData: PropTypes.func,
  setProcessId: PropTypes.func,
  config: PropTypes.object.isRequired,
};

ProcessDesigner.defaultProps = {
  fetchData: () => console.debug('no bind events'),
  resetData: () => console.debug('no bind events'),
  isLoading: true,
  useWorkFlow: false,
  setProcessId: () => console.debug('no bind events'),
};

const mapStateToProps = createStructuredSelector({
  useWorkFlow: selectors.makeSelectUseWorkFlow(),
  isLoading: selectors.makeSelectIsLoading(),
  config: selectors.makeSelectWorkFlowInfoConfig(),
});

const mapDispatchToProps = dispatch => ({
  fetchData: id => dispatch(actions.fetchData(id)),
  resetData: () => dispatch(actions.resetData()),
  setProcessId: prcId => dispatch(actions.setProcessId(prcId)),
});

const withReducer = injectReducer({ key: 'work-builder-detail-process-designer', reducer });
const withSaga = injectSaga({ key: 'work-builder-detail-process-designer', saga });
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withReducer,
  withConnect,
  withSaga,
)(ProcessDesigner);
