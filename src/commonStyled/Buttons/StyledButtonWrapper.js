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
`;

export default StyledButtonWrapper;
