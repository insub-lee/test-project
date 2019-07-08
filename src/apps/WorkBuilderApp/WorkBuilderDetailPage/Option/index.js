import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { Row, Col, Divider, Collapse, Select, Checkbox } from 'antd';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';

import * as selectors from './selectors';
import * as actions from './actions';
import reducer from './reducer';
import saga from './saga';
import Wrapper from './Wrapper';

class Option extends Component {
  componentDidMount() {
    console.debug('Boot......두두두두두두', this.props.id);
    const { fetchData, id } = this.props;
    fetchData(id);
  }

  render() {
    const { useWorkFlow, useDynamicWorkFlow, toggleUseWorkFlow, toggleUseDynamicWorkFlow } = this.props;
    return (
      <Wrapper>
        <Row gutter={16}>
          <Col span={12}>
            <div className="content-body">
              <Divider orientation="left">Option</Divider>
              <Collapse defaultActiveKey={['0']} bordered={false}>
                <Collapse.Panel header="목록화면 정의" key="0">
                  <Select defaultValue="table" style={{ width: '100%' }}>
                    <Select.Option value="table">게시판</Select.Option>
                    <Select.Option value="list">리스트</Select.Option>
                    <Select.Option value="grid">Grid</Select.Option>
                  </Select>
                </Collapse.Panel>
                <Collapse.Panel header="기타 정의" key="1">
                  준비 중입니다.
                </Collapse.Panel>
              </Collapse>
            </div>
          </Col>
          <Col span={12}>
            <div className="content-body">
              <Divider orientation="left">Process</Divider>
              <Collapse defaultActiveKey={['0']} bordered={false}>
                <Collapse.Panel header="WorkFlow" key="0">
                  <Checkbox defaultChecked={useWorkFlow} onChange={toggleUseWorkFlow}>
                    WorkFlow 사용
                  </Checkbox>
                  {useWorkFlow && (
                    <Checkbox defaultChecked={useDynamicWorkFlow} onChange={toggleUseDynamicWorkFlow}>
                      Dynamic WorkFlow 사용
                    </Checkbox>
                  )}
                </Collapse.Panel>
                <Collapse.Panel header="기타 정의" key="1">
                  준비 중입니다.
                </Collapse.Panel>
              </Collapse>
            </div>
          </Col>
        </Row>
      </Wrapper>
    );
  }
}

Option.propTypes = {
  useWorkFlow: PropTypes.bool.isRequired,
  useDynamicWorkFlow: PropTypes.bool.isRequired,
  toggleUseWorkFlow: PropTypes.func,
  toggleUseDynamicWorkFlow: PropTypes.func,
  id: PropTypes.string.isRequired,
  fetchData: PropTypes.func,
};

Option.defaultProps = {
  toggleUseWorkFlow: () => console.debug('no bind events'),
  toggleUseDynamicWorkFlow: () => console.debug('no bind events'),
  fetchData: () => console.debug('no bind events'),
};

const mapStateToProps = createStructuredSelector({
  useWorkFlow: selectors.makeSelectUseWorkFlow(),
  useDynamicWorkFlow: selectors.makeSelectUseDynamicWorkFlow(),
});

const mapDispatchToProps = dispatch => ({
  toggleUseWorkFlow: dispatch(actions.toggleUseWorkFlow()),
  toggleUseDynamicWorkFlow: dispatch(actions.toggleUseDynamicWorkFlow()),
  fetchData: id => dispatch(actions.fetchData(id)),
});

const withReducer = injectReducer({ key: 'work-builder-detail-option', reducer });
const withSaga = injectSaga({ key: 'work-builder-detail-option', saga });
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withReducer,
  withConnect,
  withSaga,
)(Option);
