import styled from 'styled-components';

const StyledButton = component => styled(component)`
  border: 1px solid transparent;
  background-color: transparent;
  cursor: pointer;
  padding: 0.4rem 1.125rem;
  font-size: 0.8125rem;
  line-height: 1.47;
  font-weight: 400;
  border-radius: 3px;
  color: #212529;
  text-align: center;
  transition: all 0.2s ease-in-out;
  height: auto;
  vertical-align: middle;

  &:focus {
    border: 1px solid transparent;
  }

  &.btn-radius-none {
    border-radius: 0;
  }

  &.btn-radius {
    border-radius: 30px;
  }

  &.btn-lg {
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
  }

  &.btn-sm {
    padding: 0.313rem 0.844rem;
    font-size: 0.75rem;
  }

  &.btn-xs {
    padding: 0.2rem 0.7rem;
    font-size: 0.75rem;
  }

  &.btn-xxs {
    padding: 2px 0.5rem;
    font-size: 0.7rem;
  }

  &.btn-primary {
    color: #fff;
    background-color: #4491e0;
    border-color: #4491e0;
    &:hover {
      color: #fff;
      background-color: #2a81da;
      border-color: #4491e0;
    }
  }

  &.btn-gray {
    color: #fff;
    background-color: #636a78;
    border-color: #636a78;
    &:hover {
      color: #fff;
      background-color: #474c56;
      border-color: #636a78;
    }
  }

  &.btn-light {
    color: #333;
    background-color: #fff;
    border-color: #636a78;
    &:hover {
      color: #fff;
      background-color: #636a78;
      border-color: #636a78;
    }
  }

  &.btn-white {
    color: #fff;
    background-color: transparent;
    border-color: #fff;
    &:hover {
      color: #4491e0;
      background-color: #fff;
    }
  }

  &.btn-first {
    margin-right: 5px;
  }

  &.mr5 {
    margin-right: 5px;
  }

  .ant-btn > .anticon + span,
  .ant-btn > span + .anticon {
    vertical-align: middle;
    margin-left: 2px;
  }
`;

export default StyledButton;
