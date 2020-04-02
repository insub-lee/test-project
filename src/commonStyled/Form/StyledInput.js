import styled from 'styled-components';

const StyledInput = Component => styled(Component)`
  &.ant-input {
    display: block;
    width: 100%;
    height: calc(1.47em + 1rem + 2px);
    padding: 0.5rem 0.875rem;
    font-size: 0.8125rem;
    font-weight: 400;
    line-height: 1.47;
    color: #495057;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #e5e5e5;
    border-radius: 4px;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out, -webkit-box-shadow 0.15s ease-in-out;
    &:hover,
    &:focus {
      color: #495057;
      background-color: #fff;
      border-color: #886ab5;
      outline: 0;
      box-shadow: 0 0 0 0.2rem transparent;
    }
    &:disabled {
      background: #e5e5e5;
    }
  }
  &.ant-input-inline {
    display: inline-block;
    vertical-align: middle;
  }
  &.mr5 {
    margin-right: 5px;
  }
  &.input-mid {
    padding: 0.4rem 0.875rem;
    height: auto;
  }
  &.input-sm {
    padding: 0.313rem 0.844rem;
    font-size: 0.75rem;
    line-height: 1.5;
    height: auto;
  }
  &.input-xs {
    padding: 0.2rem 0.7rem;
    font-size: 0.75rem;
    line-height: 1.5;
    height: auto;
  }
  &.input-pointer {
    cursor: pointer;
  }
  &.input-center {
    text-align: center;
  }
  &.input-left {
    text-align: left;
  }
  &.input-right {
    text-align: right;
  }
`;

export default StyledInput;
