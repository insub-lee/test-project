import React, { Fragment } from 'react';
import { Card, Form, Input, Select } from 'antd';
import { withPropsAPI } from 'gg-editor';
import upperFirst from 'lodash/upperFirst';

const { Item } = Form;
const { Option } = Select;

const inlineFormItemLayout = {
  labelCol: {
    sm: { span: 8 },
  },
  wrapperCol: {
    sm: { span: 16 },
  },
};

class DetailForm extends React.Component {
  get item() {
    const { propsAPI } = this.props;

    return propsAPI.getSelected()[0];
  }

  handleSubmit = e => {
    if (e && e.preventDefault) {
      e.preventDefault();
    }

    const { form, propsAPI } = this.props;
    const { getSelected, executeCommand, update } = propsAPI;

    setTimeout(() => {
      form.validateFieldsAndScroll((err, values) => {
        if (err) {
          return;
        }

        const item = getSelected()[0];
        console.log('item : ', item);

        if (!item) {
          return;
        }

        executeCommand(() => {
          update(item, {
            ...values,
          });
        });
      });
    }, 0);
  };

  handleProcessSubmit = e => {
    const { propsAPI } = this.props;
    const { getSelected, update } = propsAPI;
    const item = getSelected()[0];
    update(item, {
      process: e,
    });
  };

  handleStepSubmit = e => {
    const { propsAPI } = this.props;
    const { getSelected, update } = propsAPI;
    const item = getSelected()[0];
    update(item, {
      step: e,
    });
  };

  renderEdgeShapeSelect = () => (
    <Select onChange={this.handleSubmit}>
      <Option value="flow-smooth">Smooth</Option>
      <Option value="flow-polyline">Polyline</Option>
      <Option value="flow-polyline-round">Polyline Round</Option>
    </Select>
  );

  renderProcessSelect = () => (
    <Select onChange={this.handleProcessSubmit}>
      <Option value="reject">반려</Option>
      <Option value="approval">승인</Option>
    </Select>
  );

  renderStepSelect = () => (
    <Select onChange={this.handleStepSubmit}>
      <Option value={1}>1</Option>
      <Option value={2}>2</Option>
      <Option value={3}>3</Option>
      <Option value={4}>4</Option>
      <Option value={5}>5</Option>
      <Option value={6}>6</Option>
      <Option value={7}>7</Option>
      <Option value={8}>8</Option>
      <Option value={9}>9</Option>
      <Option value={10}>10</Option>
    </Select>
  );

  renderNodeDetail = () => {
    const { form } = this.props;
    const { label, step } = this.item.getModel();

    return (
      <Fragment>
        <Item label="Label" {...inlineFormItemLayout}>
          {form.getFieldDecorator('label', {
            initialValue: label,
          })(<Input onBlur={this.handleSubmit} />)}
        </Item>
        {/*
        <Item label="Step" {...inlineFormItemLayout}>
          {form.getFieldDecorator('step', {
            initialValue: step,
          })(this.renderStepSelect())}
        </Item>
      */}
      </Fragment>
    );
  };

  renderEdgeDetail = () => {
    const { form } = this.props;
    const { label = '', process } = this.item.getModel();

    return (
      <Fragment>
        <Item label="Label" {...inlineFormItemLayout}>
          {form.getFieldDecorator('label', {
            initialValue: label,
          })(<Input onBlur={this.handleSubmit} />)}
        </Item>
        {/*
        <Item label="Process" {...inlineFormItemLayout}>
          {form.getFieldDecorator('process', {
            initialValue: process,
          })(this.renderProcessSelect())}
        </Item>
        */}
      </Fragment>
    );
  };

  renderGroupDetail = () => {
    const { form } = this.props;
    const { label = '新建分组' } = this.item.getModel();

    return (
      <Item label="Label" {...inlineFormItemLayout}>
        {form.getFieldDecorator('label', {
          initialValue: label,
        })(<Input onBlur={this.handleSubmit} />)}
      </Item>
    );
  };

  render() {
    const { type } = this.props;

    if (!this.item) {
      return null;
    }

    return (
      <Card type="inner" size="small" title={upperFirst(type)} bordered={false}>
        <Form onSubmit={this.handleSubmit}>
          {type === 'node' && this.renderNodeDetail()}
          {type === 'edge' && this.renderEdgeDetail()}
          {type === 'group' && this.renderGroupDetail()}
        </Form>
      </Card>
    );
  }
}

export default Form.create()(withPropsAPI(DetailForm));
