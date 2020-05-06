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
      border-color: #636a78;
      outline: 0;
      box-shadow: 0 0 0 0.2rem transparent;
    }

    &:disabled {
      background: #f5f5f5;
    }
  }

  &.ant-input-mid {
    padding: 0.4rem 0.875rem;
    height: auto;
  }

  &.ant-input-sm {
    padding: 0.313rem 0.613rem;
    font-size: 0.75rem;
    line-height: 1.5;
    height: auto;
  }

  &.ant-input-xs {
    padding: 0.2rem 0.5rem;
    font-size: 0.75rem;
    line-height: 1.5;
    height: auto;
  }

  &.ant-input-xxs {
    padding: 0.1rem 0.4rem;
    font-size: 0.75rem;
    line-height: 1.5;
    height: auto;
  }

  &.ant-input-inline {
    display: inline-block;
    vertical-align: middle;
  }

  &.ant-input-full {
    padding: 0;
    border: 0;
    width: 100%;
    height: 29px;
    border-radius: 0;
    line-height: normal;
    text-align: center;

    &:hover,
    &:focus {
      box-shadow: none;
    }
  }

  &.mr5 {
    margin-right: 5px;
  }

  &.ml5 {
    margin-left: 5px;
  }

  &.ant-input-pointer {
    cursor: pointer;
  }

  &.ant-input-center {
    text-align: center;
  }

  &.ant-input-left {
    text-align: left;
  }

  &.ant-input-right {
    text-align: right;
  }

  &.ant-input-affix-wrapper {
    .ant-input-suffix {
      right: 18px;
    }
  }
`;

export default StyledInput;
