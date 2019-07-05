import styled from 'styled-components';

const Styled = styled.div`
  position: relative;

  &.hover-layer {
    outline: 3px dashed #3b97e3 !important;
  }
  &.active-layer {
    outline: 3px solid #3b97e3 !important;
  }
`;

export default Styled;
