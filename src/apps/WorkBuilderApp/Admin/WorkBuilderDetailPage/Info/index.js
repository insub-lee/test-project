import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { Spin, Descriptions } from 'antd';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';

import * as selectors from './selectors';
import * as actions from './actions';
import reducer from './reducer';
import saga from './saga';
import Wrapper from './Wrapper';

class Info extends Component {
  componentDidMount() {
    const { fetchData, id } = this.props;
    fetchData(id);
  }

  render() {
    const { info: { WORK_ID, NAME_KOR, DSCR }, isLoading } = this.props;
    return (
      <Wrapper>
        <Spin spinning={false}>
          <Descriptions bordered border size="small" column={2}>
            <Descriptions.Item label="업무 빌더명">{NAME_KOR}</Descriptions.Item>
            <Descriptions.Item label="물리 테이블명">{WORK_ID}</Descriptions.Item>
            <Descriptions.Item label="설명">
              <p>{DSCR}</p>
            </Descriptions.Item>
          </Descriptions>
        </Spin>
      </Wrapper>
    );
  }
}

Info.propTypes = {
  info: PropTypes.object.isRequired,
  id: PropTypes.string.isRequired,
  fetchData: PropTypes.func,
  isLoading: PropTypes.bool,
};

Info.defaultProps = {
  fetchData: () => console.debug('no bind events'),
  isLoading: true,
};

const mapStateToProps = createStructuredSelector({
  info: selectors.makeSelectInfo(),
  isLoading: selectors.makeSelectIsLoading(),
});

const mapDispatchToProps = dispatch => ({
  fetchData: id => dispatch(actions.fetchData(id)),
});

const withReducer = injectReducer({ key: 'work-builder-detail-info', reducer });
const withSaga = injectSaga({ key: 'work-builder-detail-info', saga });
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withReducer,
  withConnect,
  withSaga,
)(Info);
