import styled, { css } from 'styled-components';

const btnWrapRight = css`
  text-align: right;
`;

const btnWrapCenter = css`
  text-align: center;
`;

const btnWrapMt20 = css`
  margin-top: 20px;
`;

const btnWrapInline = css`
  display: inline-block;
  width: auto;
  padding: 0;
  margin-left: 10px;
`;

const StyledButtonWrapper = styled.div`
  width: 100%;
  padding: 10px 0;
  &.btn-wrap-inline {
    ${btnWrapInline}
  }
  &.btn-wrap-right {
    ${btnWrapRight}
  }
  &.btn-wrap-center {
    ${btnWrapCenter}
  }
  &.btn-wrap-mt-20 {
    ${btnWrapMt20}
  }
`;

export default StyledButtonWrapper;
