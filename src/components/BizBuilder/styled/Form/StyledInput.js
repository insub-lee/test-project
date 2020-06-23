import styled from 'styled-components';

const StyledInput = Component => styled(Component)`
  &.ant-input,
  &.ant-input-affix-wrapper input {
    display: inline-block;
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
    vertical-align: middle;

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

  &.ant-input.ant-input-mid,
  &.ant-input-mid input {
    padding: 0.4rem 0.875rem;
    font-size: 0.75rem;
    height: auto;
  }

  &.ant-input.ant-input-sm,
  &.ant-input-sm input {
    padding: 0.313rem 0.613rem;
    font-size: 0.75rem;
    height: auto;
  }

  &.ant-input.ant-input-xs,
  &.ant-input-xs input {
    padding: 0.2rem 0.5rem;
    font-size: 0.75rem;
    height: auto;
  }

  &.ant-input.ant-input-xxs,
  &.ant-input-xxs input {
    padding: 0.1rem 0.4rem;
    font-size: 0.75rem;
    height: auto;
  }

  &.ant-input-inline {
    display: inline-block;
    vertical-align: middle;
  }

  &.ant-input-block {
    display: block;
  }

  &.ant-input-full {
    padding: 0;
    border: 0;
    width: 100%;
    height: 29px;
    border-radius: 0;
    line-height: normal;
    text-align: center;
    display: block;

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
    height: auto;

    .ant-input-suffix {
      right: 18px;
    }

    .ant-input:not(.ant-input-disabled) {
      border-color: #636a78;
    }
  }
`;

export default StyledInput;
