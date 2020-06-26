import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal, Descriptions, Form, Input, Divider, List, Row, Col, Select } from 'antd';

import Wrapper from './Wrapper';

const { Option } = Select;

const fixedList = [
  { title: '저장', type: 'save' },
  { title: '새버전', type: 'revision' },
  { title: '수정', type: 'modify' },
  { title: '삭제', type: 'delete' },
];

const totalBuilderList = [
  { TOTAL_BUILDER_SEQ: 1, NAME_KOR: 'Basic' },
  { TOTAL_BUILDER_SEQ: 2, NAME_KOR: 'MDCS' },
  { TOTAL_BUILDER_SEQ: 3, NAME_KOR: 'ESHS' },
  { TOTAL_BUILDER_SEQ: 4, NAME_KOR: 'WTS' },
  { TOTAL_BUILDER_SEQ: 5, NAME_KOR: 'MXLIFE' },
];

// eslint-disable-next-line react/prefer-stateless-function
class FormModal extends Component {
  render() {
    const {
      visible,
      loading,
      handleOk,
      handleCancel,
      form: { getFieldDecorator },
    } = this.props;
    return (
      <Modal title="업무테이블 작성" visible={visible} onOk={handleOk} onCancel={handleCancel} confirmLoading={loading} destroyOnClose>
        <Wrapper>
          <Form>
            <Descriptions bordered size="small" column={1}>
              <Descriptions.Item label="업무 빌더명">
                <Form.Item hasFeedback>
                  {getFieldDecorator('NAME_KOR', {
                    rules: [{ required: true, message: 'Please input builder name', whitespace: true }],
                  })(<Input name="NAME_KOR" />)}
                </Form.Item>
              </Descriptions.Item>
              <Descriptions.Item label="물리 테이블명">
                <Form.Item hasFeedback>
                  {getFieldDecorator('WORK_ID', {
                    rules: [{ required: true, message: 'Please input table name', whitespace: true, pattern: /[0-9A-Z_][0-9A-Z]+$/ }],
                  })(<Input name="WORK_ID" />)}
                </Form.Item>
              </Descriptions.Item>
              <Descriptions.Item label="빌더 구분">
                <Form.Item hasFeedback>
                  {getFieldDecorator('TOTAL_BUILDER_SEQ', {
                    rules: [{ required: true, message: 'Please select gubun' }],
                  })(
                    <Select name="TOTAL_BUILDER_SEQ" defaultValue={1}>
                      {totalBuilderList.map(node => (
                        <Option value={node.TOTAL_BUILDER_SEQ}>{node.NAME_KOR}</Option>
                      ))}
                    </Select>,
                  )}
                </Form.Item>
              </Descriptions.Item>
              <Descriptions.Item label="설명">
                <Form.Item hasFeedback>
                  {getFieldDecorator('DSCR', {
                    rules: [],
                  })(<Input.TextArea name="DSCR" />)}
                </Form.Item>
              </Descriptions.Item>
            </Descriptions>
            {/*
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
            */}
          </Form>
        </Wrapper>
      </Modal>
    );
  }
}

FormModal.propTypes = {
  visible: PropTypes.bool,
  loading: PropTypes.bool,
  form: PropTypes.object.isRequired,
  handleOk: PropTypes.func,
  handleCancel: PropTypes.func,
};

FormModal.defaultProps = {
  visible: false,
  loading: false,
  handleOk: () => false,
  handleCancel: () => false,
};

const WrappedFormModal = Form.create({ name: 'register-form-modal' })(FormModal);

export default WrappedFormModal;
