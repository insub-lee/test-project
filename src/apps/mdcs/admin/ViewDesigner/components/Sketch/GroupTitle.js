import React from 'react';
import PropTypes from 'prop-types';
import { Checkbox } from 'antd';
import styled from 'styled-components';

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

const GroupTitle = ({ title, onChange, onChangeUseTitle, useOption, useTitle }) => (
  <Styled>
    {useOption ? (
      <h2>
        <input type="text" className="input-title" defaultValue={title} onChange={e => onChange(e.target.value)} placeholder="Insert Title..." />
      </h2>
    ) : (
      <h2>{title}</h2>
    )}
    {useOption && (
      <div className="group-title-options">
        <Checkbox defaultChecked={useTitle} onChange={e => onChangeUseTitle(e.target.checked)}>
          Use Title
        </Checkbox>
      </div>
    )}
  </Styled>
);

GroupTitle.propTypes = {
  title: PropTypes.string,
  onChange: PropTypes.func,
  useOption: PropTypes.bool,
  useTitle: PropTypes.bool,
  onChangeUseTitle: PropTypes.func,
};

GroupTitle.defaultProps = {
  title: '',
  onChange: () => {},
  useOption: false,
  useTitle: false,
  onChangeUseTitle: () => {},
};

export default GroupTitle;
