import styled from 'styled-components';

const StyledInputNumber = Component => styled(Component)`
  &.ant-input-number {
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

  &.ant-input-number-inline {
    display: inline-block;
    vertical-align: middle;
  }

  &.mr5 {
    margin-right: 5px;
  }

  &.ant-input-number-mid {
    padding: 0.4rem 0.875rem;
    height: auto;
    font-size: 0.75rem;

    input {
      height: auto;
      padding: 0;
    }
  }

  &.ant-input-number-sm {
    padding: 0.313rem 0.844rem;
    font-size: 0.75rem;
    height: auto;

    input {
      height: auto;
      padding: 0;
    }
  }

  &.ant-input-number-xs {
    padding: 0.2rem 0.7rem;
    font-size: 0.75rem;
    height: auto;
    input {
      height: auto;
      padding: 0;
    }
  }

  &.ant-input-number-pointer {
    cursor: pointer;
  }

  &.ant-input-number-center {
    text-align: center;
  }

  &.ant-input-number-left {
    text-align: left;
  }

  &.ant-input-number-right {
    text-align: right;
  }
`;

export default StyledInputNumber;
