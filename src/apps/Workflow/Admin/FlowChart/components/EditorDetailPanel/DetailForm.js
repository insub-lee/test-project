import React, { Fragment } from 'react';
import { Card, Form, Input, Select, Checkbox } from 'antd';
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
  state = {
    process: 'approve',
  };

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
    this.setState({ process: e });
    this.handleSubmit();
  };

  handleStepSubmit = step => {
    const { propsAPI } = this.props;
    const { getSelected, update } = propsAPI;
    const item = getSelected()[0];
    update(item, {
      step,
    });
  };

  nodeTypeHandle = e => {
    const { propsAPI } = this.props;
    const { getSelected, update } = propsAPI;
    const item = getSelected()[0];
    update(item, {
      stepType: e,
    });
  };

  appveTypeHanlde = e => {
    const { propsAPI } = this.props;
    const { getSelected, update } = propsAPI;
    const item = getSelected()[0];
    update(item, {
      agreeType: e,
    });
  };

  isRequiredTypeHanlde = e => {
    const { propsAPI } = this.props;
    const { getSelected, update } = propsAPI;
    const item = getSelected()[0];
    update(item, {
      isRequired: e,
    });
  };

  renderEdgeShapeSelect = () => (
    <Select onChange={this.handleSubmit}>
      <Option value="flow-smooth">Smooth</Option>
      <Option value="flow-polyline">Polyline</Option>
      <Option value="flow-polyline-round">Polyline Round</Option>
    </Select>
  );

  renderNodeDetail = () => {
    const { form } = this.props;
    const { label, step, SRC_PATH, stepType, agreeType, isRequired } = this.item.getModel();
    console.debug('form', form);
    return (
      <>
        <Item label="Label" {...inlineFormItemLayout}>
          {form.getFieldDecorator('label', {
            initialValue: label,
          })(<Input onBlur={this.handleSubmit} />)}
        </Item>
        <Item label="Step" {...inlineFormItemLayout}>
          {form.getFieldDecorator('Step', {
            initialValue: step,
          })(
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
              <Option value={11}>11</Option>
              <Option value={12}>12</Option>
              <Option value={13}>13</Option>
              <Option value={14}>14</Option>
              <Option value={15}>15</Option>
              <Option value={16}>16</Option>
              <Option value={17}>17</Option>
              <Option value={18}>18</Option>
              <Option value={19}>19</Option>
              <Option value={20}>20</Option>
            </Select>,
          )}
        </Item>
        <Item label="유형" {...inlineFormItemLayout}>
          {form.getFieldDecorator('stepType', {
            initialValue: stepType,
          })(
            <Select onChange={this.nodeTypeHandle}>
              <Option value="NU">사용자</Option>
              <Option value="ND">부서</Option>
              <Option value="NG">그룹</Option>
              <Option value="NS">시스템</Option>
            </Select>,
          )}
        </Item>
        <Item label="결재유형" {...inlineFormItemLayout}>
          {form.getFieldDecorator('agreeType', {
            initialValue: agreeType,
          })(
            <Select onChange={this.appveTypeHanlde}>
              <Option value="SA">순차</Option>
              <Option value="PO">병렬(OR)</Option>
              <Option value="PA">병렬(AND)</Option>
            </Select>,
          )}
        </Item>
        <Item label="필수체크" {...inlineFormItemLayout}>
          {form.getFieldDecorator('isRequired', {
            initialValue: isRequired,
          })(
            <Select onChange={this.isRequiredTypeHanlde}>
              <Option value="0">불필요</Option>
              <Option value="1">필요</Option>
            </Select>,
          )}
        </Item>
      </>
    );
  };

  renderEdgeDetail = () => {
    const { form } = this.props;
    const { process } = this.item.getModel();
    let edgeName = '';
    switch (process) {
      case 'approve': {
        edgeName = '승인';
        break;
      }
      case 'reject': {
        edgeName = '반려';
        break;
      }
      case 'review': {
        edgeName = '검토';
        break;
      }
      default:
        break;
    }
    console.debug(process);
    return (
      <>
        <Item style={{ display: 'none' }} label="Label" {...inlineFormItemLayout}>
          {form.getFieldDecorator('label', {
            initialValue: edgeName,
          })(<Input onBlur={this.handleSubmit} />)}
        </Item>
        <Item label="Process" {...inlineFormItemLayout}>
          {form.getFieldDecorator('process', {
            initialValue: process,
          })(
            <Select value={process} placeholder="선택" onChange={this.handleProcessSubmit}>
              <Option value="approve">승인</Option>
              <Option value="reject">반려</Option>
              <Option value="review">검토</Option>
            </Select>,
          )}
        </Item>
      </>
    );
  };

  renderGroupDetail = () => {
    const { form } = this.props;
    const { label = 'getModel' } = this.item.getModel();

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
