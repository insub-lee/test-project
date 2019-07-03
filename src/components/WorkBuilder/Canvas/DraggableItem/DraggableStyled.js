import styled, { css } from 'styled-components';

const DraggableStyled = styled.div`
  position: relative;

  &.hover-layer {
    outline: 3px dashed #3b97e3 !important;
  }
  &.active-layer {
    outline: 3px solid #3b97e3 !important;
  }

  .form-layer {
    outline: transparent;
  }

  .form-group {
    position: relative;
  }
`;

export default DraggableStyled;
