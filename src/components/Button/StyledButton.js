import styled, { css } from 'styled-components';

const btnLarge = css`
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  line-height: 1.5;
`;

const btnSmall = css`
  padding: 0.275rem 0.644rem;
  font-size: 0.75rem;
  line-height: 1.5;
`;

const btnXsmall = css`
  padding: 1px 0.844rem;
  font-size: 0.7rem;
  line-height: 1.5;
  border-radius: 0.25rem;
`;

const btnPills = css`
  border-radius: 15px;
`;

const btnPrimary = css`
  color: #fff;
  background-color: #886ab5;
  border-color: #886ab5;
  box-shadow: 0 2px 6px 0 rgba(136, 106, 181, 0.5);
  &:hover {
    color: #fff;
    background-color: #7453a6;
    border-color: #6e4e9e;
  }
  &:focus {
    box-shadow: 0 0 0 0.2rem rgba(154, 128, 192, 0.5);
  }
`;

const btnSecondary = css`
  color: #fff;
  background-color: #868e96;
  border-color: #868e96;
  box-shadow: 0 2px 6px 0 rgba(134, 142, 150, 0.5);
  &:hover {
    color: #fff;
    background-color: #727b84;
    border-color: #6c757d;
  }
  &:focus {
    box-shadow: 0 0 0 0.2rem rgba(152, 159, 166, 0.5);
  }
`;

const btnDefault = css`
  color: #444;
  background-color: #f5f5f5;
  background-image: linear-gradient(to top, #f5f5f5, #f1f1f1);
  border: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: none;
  &:hover {
    box-shadow: none;
    border: 1px solid #c6c6c6;
    color: #333;
    z-index: 2;
  }
  &:focus {
    border-color: #b19dce !important;
  }
`;

const btnSuccess = css`
  color: #fff;
  background-color: #1dc9b7;
  border-color: #1dc9b7;
  box-shadow: 0 2px 6px 0 rgba(29, 201, 183, 0.5);
  &:hover {
    color: #fff;
    background-color: #18a899;
    border-color: #179c8e;
  }
  &:focus {
    box-shadow: 0 0 0 0.2rem rgba(63, 209, 194, 0.5);
  }
`;

const btnWarning = css`
  color: #212529;
  background-color: #ffc241;
  border-color: #ffc241;
  box-shadow: 0 2px 6px 0 rgba(255, 194, 65, 0.5);
  &:hover {
    color: #212529;
    background-color: #ffb61b;
    border-color: #ffb20e;
  }
  &:focus {
    box-shadow: 0 0 0 0.2rem rgba(222, 170, 61, 0.5);
  }
`;

const btnInfo = css`
  color: #fff;
  background-color: #2196f3;
  border-color: #2196f3;
  box-shadow: 0 2px 6px 0 rgba(33, 150, 243, 0.5);
  &:hover {
    color: #fff;
    background-color: #0c83e2;
    border-color: #0c7cd5;
  }
  &:focus {
    box-shadow: 0 0 0 0.2rem rgba(66, 166, 245, 0.5);
  }
`;

const btnDanger = css`
  color: #fff;
  background-color: #fd3995;
  border-color: #fd3995;
  box-shadow: 0 2px 6px 0 rgba(253, 57, 149, 0.5);
  &:hover {
    color: #fff;
    background-color: #fd1381;
    border-color: #fc077a;
  }
  &:focus {
    box-shadow: 0 0 0 0.2rem rgba(253, 87, 165, 0.5);
  }
`;

const btnDark = css`
  color: #fff;
  background-color: #505050;
  border-color: #505050;
  box-shadow: 0 2px 6px 0 rgba(80, 80, 80, 0.5);
  &:hover {
    color: #fff;
    background-color: #3d3d3d;
    border-color: #363636;
  }
  &:focus {
    box-shadow: 0 0 0 0.2rem rgba(106, 106, 106, 0.5);
  }
`;

const btnLight = css`
  color: #212529;
  background-color: #fff;
  border-color: rgba(0, 0, 0, 0.15);
  box-shadow: 0 2px 6px 0 rgba(255, 255, 255, 0.5);
  &:hover {
    color: #212529;
    background-color: #ececec;
    border-color: rgba(0, 0, 0, 0.25);
  }
  &:focus {
    box-shadow: 0 0 0 0.2rem rgba(222, 222, 223, 0.5);
  }
`;

const bntOutlinePrimary = css`
  color: #886ab5;
  border-color: #886ab5;
  background-color: #fff;
  &:hover {
    color: #fff;
    background-color: #886ab5;
    border-color: #886ab5;
  }
  &:focus {
    box-shadow: 0 0 0 0.2rem rgba(136, 106, 181, 0.5);
  }
`;

const bntOutlineSecondary = css`
  color: #868e96;
  border-color: #868e96;
  background-color: #fff;
  &:hover {
    color: #fff;
    background-color: #868e96;
    border-color: #868e96;
  }
  &:focus {
    box-shadow: 0 0 0 0.2rem rgba(134, 142, 150, 0.5);
  }
`;

const bntOutlineDefault = css`
  background-color: transparent;
  color: #212529;
  border-color: #e5e5e5;
  &:hover,
  &:active {
    color: #212529;
    background-color: #f9f9f9;
    border-color: #e5e5e5;
  }
`;

const bntOutlineSuccess = css`
  color: #1dc9b7;
  border-color: #1dc9b7;
  background-color: #fff;
  &:hover {
    color: #fff;
    background-color: #1dc9b7;
    border-color: #1dc9b7;
  }
  &:focus {
    box-shadow: 0 0 0 0.2rem rgba(29, 201, 183, 0.5);
  }
`;

const bntOutlineWarning = css`
  color: #ffc241;
  border-color: #ffc241;
  background-color: #fff;
  &:hover {
    color: #212529;
    background-color: #ffc241;
    border-color: #ffc241;
  }
  &:focus {
    box-shadow: 0 0 0 0.2rem rgba(255, 194, 65, 0.5);
  }
`;

const bntOutlineInfo = css`
  color: #2196f3;
  border-color: #2196f3;
  background-color: #fff;
  &:hover {
    color: #fff;
    background-color: #2196f3;
    border-color: #2196f3;
  }
  &:focus {
    box-shadow: 0 0 0 0.2rem rgba(33, 150, 243, 0.5);
  }
`;

const btnOutlineDanger = css`
  color: #fd3995;
  border-color: #fd3995;
  background-color: #fff;
  &:hover {
    color: #fff;
    background-color: #fd3995;
    border-color: #fd3995;
  }
  &:focus {
    box-shadow: 0 0 0 0.2rem rgba(253, 57, 149, 0.5);
  }
`;

const bntOutlineDark = css`
  color: #505050;
  border-color: #505050;
  background-color: #fff;
  &:hover {
    color: #fff;
    background-color: #505050;
    border-color: #505050;
  }
  &:focus {
    box-shadow: 0 0 0 0.2rem rgba(80, 80, 80, 0.5);
  }
`;

const StyledButton = styled.button`
  border: 1px solid transparent;
  background-color: transparent;
  cursor: pointer;
  padding: 0.5rem 1.125rem;
  font-size: 0.8125rem;
  line-height: 1.47;
  border-radius: 4px;
  font-weight: 400;
  color: #212529;
  text-align: center;
  vertical-align: middle;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out,
    -webkit-box-shadow 0.15s ease-in-out;
  touch-action: manipulation;

  &:active {
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15) inset !important;
  }

  &:focus {
    outline: 0;
    box-shadow: 0 0 0 0.2rem transparent;
  }

  &.waves-effect {
    position: relative;
    display: inline-block;
    overflow: hidden;
    user-select: none;
    -webkit-tap-highlight-color: transparent;
  }

  &.btn-lg {
    ${btnLarge}
  }

  &.btn-sm {
    ${btnSmall}
  }

  &.btn-xs {
    ${btnXsmall}
  }

  &.btn-pills {
    ${btnPills}
  }

  &.btn-primary {
    ${btnPrimary}
  }

  &.btn-secondary {
    ${btnSecondary}
  }

  &.btn-default {
    ${btnDefault}
  }

  &.btn-success {
    ${btnSuccess}
  }

  &.btn-warning {
    ${btnWarning}
  }

  &.btn-info {
    ${btnInfo}
  }

  &.btn-danger {
    ${btnDanger}
  }

  &.btn-dark {
    ${btnDark}
  }

  &.btn-light {
    ${btnLight}
  }

  &.btn-outline-primary {
    ${bntOutlinePrimary}
  }

  &.btn-outline-secondary {
    ${bntOutlineSecondary}
  }

  &.btn-outline-default {
    ${bntOutlineDefault}
  }

  &.btn-outline-success {
    ${bntOutlineSuccess}
  }

  &.btn-outline-warning {
    ${bntOutlineWarning}
  }

  &.btn-outline-info {
    ${bntOutlineInfo}
  }

  &.btn-outline-danger {
    ${btnOutlineDanger}
  }

  &.btn-outline-dark {
    ${bntOutlineDark}
  }

  &.btn-bs-none {
    box-shadow: none;
  }
`;

export const StyledLabelButton = styled.label`
  width: 45px;
  text-align: center;
  flex: 1 1 auto;
  -webkit-box-flex: 1;
  display: inline-block;
  cursor: pointer;
  padding: 0.4rem 0;
  text-align: center;
  border-radius: 0px;
  border-right: 1px solid;

  input[type='checkbox'],
  input[type='radio'] {
    position: absolute;
    clip: rect(0, 0, 0, 0);
    pointer-events: none;
  }
  span {
    display: block;
  }
  &.btn-primary {
    ${btnPrimary}
  }
  &.btn-default {
    color: #444;
    background-color: #f5f5f5;
    background-image: linear-gradient(to top, #f5f5f5, #f1f1f1);
    border: 0;
    border-right: 1px solid;
    border-color: rgba(0, 0, 0, 0.1);
    &:hover {
      box-shadow: none;
      color: #333;
      z-index: 2;
    }
  }
`;

export default StyledButton;
