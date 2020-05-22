import styled from 'styled-components';

const StyledButton = styled.button`
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
  vertical-align: middle;
  transition: all 0.2s ease-in-out;

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
    line-height: 1.5;
  }

  &.btn-sm {
    padding: 0.313rem 0.844rem;
    font-size: 0.75rem;
    line-height: 1.5;
  }

  &.btn-xs {
    padding: 0.2rem 0.7rem;
    font-size: 0.75rem;
    line-height: 1.5;
  }

  &.btn-xxs {
    padding: 1px 0.75rem;
    font-size: 0.7rem;
    line-height: 1.5;
  }

  &.btn-primary {
    color: #fff;
    background-color: #1fb5ad;
    border-color: #1fb5ad;
    &:hover {
      color: #fff;
      background-color: #17a9a1;
      border-color: #1fb5ad;
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

  &.btn-link {
    color: rgba(0,0,0,.65);
    background-color: transparent;
    border: 0;
    cursor: pointer;
    &:hover {
      color: #000;
      text-decoration: underline;
    }
  }

  &.btn-first {
    margin-right: 5px;
  }

  &.mr5 {
    margin-right: 5px;
  }

  &.ml5 {
    margin-left: 5px;
  }

  &.mt5 {
    margin-top: 5px;
  }

  &.btn-block {
    display: block;
  }

  &.btn-block-center-mt5 {
    margin: 5px auto 0;
  }
`;

export default StyledButton;
