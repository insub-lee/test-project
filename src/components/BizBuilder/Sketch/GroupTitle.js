import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Checkbox, InputNumber, Form, Button } from 'antd';
import styled from 'styled-components';
import { debounce } from 'lodash';

const Styled = styled.div`
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  background: #fff;
  min-height: 3rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.07);
  border-radius: 4px 4px 0 0;
  -webkit-transition: background-color 0.4s ease-out;
  transition: background-color 0.4s ease-out;
  margin: 5px;

  h2 {
    -webkit-box-flex: 1;
    -ms-flex: 1;
    flex: 1;
    font-size: 0.875rem;
    margin: 0;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    line-height: 3rem;
    color: inherit;
    color: #333;
    position: relative;
    font-weight: 500;
  }

  & > :first-child {
    padding-left: 1rem;
  }

  h2:not(:only-child) {
    margin-right: 0.66667rem;
  }

  .input-title {
    width: 100%;
    margin: 10px 0;
    border: none;
  }

  .group-title-options {
    text-align: right;
  }
`;

class GroupTitle extends Component {
  constructor(props) {
    super(props);
    this.handleChangeTitle = debounce(this.handleChangeTitle, 300);
    this.formRef = React.createRef();
  }

  handleChangeTitle = value => {
    this.props.onChange(value);
  };

  sendTableSize = e => {
    const { onChangeTableSize } = this.props;
    e.preventDefault();
    const formData = new FormData(e.target);
    const rowSize = Number(formData.get('rowSize'));
    const colSize = Number(formData.get('colSize'));

    const nextRowSize = rowSize > 10 ? 10 : rowSize;
    const nextColSize = colSize > 10 ? 10 : colSize;

    const tableSize = [nextRowSize, nextColSize];
    onChangeTableSize(tableSize);
  };

  render() {
    const { title, onChange, onChangeUseTitle, useOption, useTitle, tableSize, onChangeTableSize } = this.props;
    return (
      <Styled>
        <h2>
          {useOption ? (
            <input
              type="text"
              className="input-title"
              defaultValue={title}
              onChange={e => this.handleChangeTitle(e.target.value)}
              placeholder="Insert Title..."
            />
          ) : (
            title
          )}
        </h2>
        {useOption && (
          <div className="group-title-options">
            <Checkbox defaultChecked={useTitle} onChange={e => onChangeUseTitle(e.target.checked)}>
              Use Title
            </Checkbox>
            <Form ref={this.formRef} layout="inline" onSubmit={this.sendTableSize}>
              <Form.Item label="테이블 사이즈">
                <InputNumber id="table-rowSize" name="rowSize" min={1} max={40} step={1} size="small" style={{ width: 50 }} defaultValue={tableSize[0]} />
                <span style={{ marginLeft: 10, marginRight: 10 }}>
                  <i className="fa fa-times" />
                </span>
                <InputNumber id="table-colSize" name="colSize" min={1} max={40} step={1} size="small" style={{ width: 50 }} defaultValue={tableSize[1]} />
                <Button type="primary" htmlType="submit" size="small" style={{ marginLeft: 10 }}>
                  반영
                </Button>
              </Form.Item>
            </Form>
          </div>
        )}
      </Styled>
    );
  }
}

GroupTitle.propTypes = {
  title: PropTypes.string,
  onChange: PropTypes.func,
  useOption: PropTypes.bool,
  useTitle: PropTypes.bool,
  onChangeUseTitle: PropTypes.func,
  tableSize: PropTypes.arrayOf(PropTypes.number),
  onChangeTableSize: PropTypes.func,
};

GroupTitle.defaultProps = {
  title: '',
  onChange: () => {},
  useOption: false,
  useTitle: false,
  onChangeUseTitle: () => {},
  tableSize: [1, 1],
  onChangeTableSize: () => {},
};

export default GroupTitle;
