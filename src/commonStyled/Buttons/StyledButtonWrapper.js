import styled, { css } from 'styled-components';

const StyledButtonWrapper = styled.div`
  width: 100%;

  &.btn-wrap-inline {
    display: inline-block;
    width: auto;
    padding: 0;
  }

  &.btn-wrap-right {
    text-align: right;
  }

  &.btn-wrap-center {
    text-align: center;
  }

  &.btn-wrap-mt-20 {
    margin-top: 20px;
  }

  &.btn-wrap-mb-10 {
    margin-bottom: 10px;
  }

  &.btn-wrap-mr-5 {
    margin-right: 5px;
  }

  &.btn-wrap-ml-5 {
    margin-left: 5px;
  }
`;

export default StyledButtonWrapper;
