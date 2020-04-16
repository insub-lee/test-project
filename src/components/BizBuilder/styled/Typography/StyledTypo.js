import styled, { css } from 'styled-components';

const display1 = css`
  font-size: 5rem;
  font-weight: 300;
  line-height: 1.57;
`;

const display2 = css`
  font-size: 4.5rem;
  font-weight: 300;
  line-height: 1.57;
`;

const display3 = css`
  font-size: 3.5rem;
  font-weight: 300;
  line-height: 1.57;
`;

const display4 = css`
  font-size: 2.5rem;
  font-weight: 300;
  line-height: 1.57;
`;

const StyledTypo = styled.div`
  &.display-1 {
    ${display1}
  }

  &.display-2 {
    ${display2}
  }

  &.display-3 {
    ${display3}
  }

  &.display-4 {
    ${display4}
  }
`

export default StyledTypo;
