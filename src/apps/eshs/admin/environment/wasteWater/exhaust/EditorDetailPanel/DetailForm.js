import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Card, Form, Input, Modal } from 'antd';
import { withPropsAPI } from 'gg-editor';
import upperFirst from 'lodash/upperFirst';

const { Item } = Form;

class DetailForm extends Component {
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

  renderEdgeDetail = () => {
    const { form } = this.props;
    const { label } = this.item.getModel();
    if (!this.item) {
      return null;
    }

    return (
      <Item label="단위(t/d)" labelCol={{ sm: { span: 12 } }} wrapperCol={{ sm: { span: 12 } }}>
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
        <Form onSubmit={this.handleSubmit}>{type === 'edge' && this.renderEdgeDetail()}</Form>
      </Card>
    );
  }
}

DetailForm.propTypes = {
  form: PropTypes.object,
  propsAPI: PropTypes.object,
  type: PropTypes.string,
};

DetailForm.defaultProps = {};

export default Form.create()(withPropsAPI(DetailForm));
