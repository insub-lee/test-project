import styled from 'styled-components';

const FormGroup = styled.div`
  position: relative;
  margin-bottom: 1.5rem;

  &.hover-layer {
    outline: 3px dashed #3b97e3 !important;
  }
  &.active-layer {
    outline: 3px solid #3b97e3 !important;
  }

  .form-label {
    display: inline-block;
    font-weight: 500;
    margin-bottom: 0.3rem;
  }
`;

export default FormGroup;
