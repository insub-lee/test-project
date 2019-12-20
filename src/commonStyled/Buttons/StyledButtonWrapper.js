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

const StyledButtonWrapper = styled.div`
  width: 100%;
  padding: 10px 0;
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
