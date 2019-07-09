import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { Form, Descriptions, List, Row, Col, Select, Divider } from 'antd';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';

import * as selectors from './selectors';
import * as actions from './actions';
import reducer from './reducer';
import saga from './saga';
import Wrapper from './Wrapper';

const fixedList = [
  { title: '저장', type: 'save' },
  { title: '새버전', type: 'revision' },
  { title: '수정', type: 'modify' },
  { title: '삭제', type: 'delete' },
];

class Info extends Component {
  componentDidMount() {
    console.debug('Boot......두두두두두두 기본정보', this.props.id);
    const { fetchData, id } = this.props;
    fetchData(id);
  }

  render() {
    const { info } = this.props;
    return (
      <Wrapper>
        <Form>
          <Descriptions bordered border size="small" column={2}>
            <Descriptions.Item label="업무 빌더명">{info.title}</Descriptions.Item>
            <Descriptions.Item label="물리 테이블명">{info.tableName}</Descriptions.Item>
            <Descriptions.Item label="설명">
              <p>{info.desc}</p>
            </Descriptions.Item>
          </Descriptions>
          <Divider orientation="left">Event Options</Divider>
          <List
            size="small"
            bordered
            dataSource={fixedList}
            renderItem={item => (
              <List.Item>
                {item.title}
                <Row gutter={16}>
                  <Col span={24}>
                    Data Handler (sql)
                    <div className="handler-options">
                      <Row gutter={16}>
                        <Col span={12}>
                          <Form.Item>
                            <Select placeholder="조회 전" />
                          </Form.Item>
                        </Col>
                        <Col span={12}>
                          <Form.Item>
                            <Select placeholder="조회 후" />
                          </Form.Item>
                        </Col>
                      </Row>
                    </div>
                  </Col>
                  <Col span={24}>
                    Process Handler (sql)
                    <div className="handler-options">
                      <Row gutter={16}>
                        <Col span={12}>
                          <Form.Item>
                            <Select placeholder="조회 전" />
                          </Form.Item>
                        </Col>
                        <Col span={12}>
                          <Form.Item>
                            <Select placeholder="조회 후" />
                          </Form.Item>
                        </Col>
                      </Row>
                    </div>
                  </Col>
                </Row>
              </List.Item>
            )}
          />
        </Form>
      </Wrapper>
    );
  }
}

Info.propTypes = {
  info: PropTypes.object.isRequired,
  id: PropTypes.string.isRequired,
  fetchData: PropTypes.func,
};

Info.defaultProps = {
  fetchData: () => console.debug('no bind events'),
};

const mapStateToProps = createStructuredSelector({
  info: selectors.makeSelectInfo(),
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
