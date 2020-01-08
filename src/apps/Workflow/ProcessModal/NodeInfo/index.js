import React, { Component } from 'react';
import { Form, Input, Button, Select, Checkbox, Radio } from 'antd';
import PropTypes from 'prop-types';

const { Option } = Select;
const CheckboxGroup = Checkbox.Group;

class NodeInfo extends Component {
  componentDidMount() {}

  handleSubmit = () => {
    console.debug('submit!!');
  };

  authChange = checked => {
    this.setState(prevState => {
      const { checkedList } = prevState;
      const targetIndex = checkedList.indexOf(checked);
      if (targetIndex > -1) {
        checkedList.splice(targetIndex, 1);
      } else {
        checkedList.push(checked);
      }
      return {
        checkedList,
      };
    });
  };

  render() {
    const { optionList, checkedList } = this.props;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };

    return (
      <Form {...formItemLayout} onSubmit={this.handleSubmit}>
        <Form.Item label="단계">
          <Input defaultValue="1" style={{ width: 100 }} />
        </Form.Item>
        <Form.Item label="유형">
          <Select defaultValue="1" style={{ width: 120 }}>
            <Option value="1">사용자</Option>
            <Option value="2">부서</Option>
            <Option value="3">그룹</Option>
          </Select>
        </Form.Item>
        <Form.Item label="결재구분">
          <Select defaultValue="1" style={{ width: 120 }}>
            <Option value="1">결재</Option>
            <Option value="2">합의(개인)</Option>
            <Option value="3">합의(부서)</Option>
            <Option value="4">전결</Option>
          </Select>
        </Form.Item>
        <Form.Item label="승인자">
          <>
            <Input style={{ width: '70%' }} />
            <Button size="small" type="primary" style={{ right: '-10px' }}>
              선택
            </Button>
          </>
        </Form.Item>
        <Form.Item label="권한">
          <CheckboxGroup options={optionList} value={checkedList} onChange={this.authChange} />
        </Form.Item>
        <Form.Item label="합의구분">
          <Radio.Group value={1}>
            <Radio value={1}>순차합의</Radio>
            <Radio value={2}>병렬합의</Radio>
          </Radio.Group>
        </Form.Item>
      </Form>
    );
  }
}

NodeInfo.propTypes = {
  optionList: PropTypes.array,
  checkedList: PropTypes.array,
};

NodeInfo.defaultProps = {
  optionList: ['문서변경', '권한위임'],
  checkedList: ['문서변경'],
};

export default Form.create({ name: 'register' })(NodeInfo);
