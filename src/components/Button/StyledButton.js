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
  &:hover,
  &:focus {
    color: #fff;
    background-color: #7453a6;
    border-color: #6e4e9e;
  }
`;

const btnSecondary = css`
  color: #fff;
  background-color: #868e96;
  border-color: #868e96;
  box-shadow: 0 2px 6px 0 rgba(134, 142, 150, 0.5);
  &:hover,
  &:focus {
    color: #fff;
    background-color: #727b84;
    border-color: #6c757d;
  }
`;

const btnDefault = css`
  color: #444;
  background-color: #f5f5f5;
  background-image: linear-gradient(to top, #f5f5f5, #f1f1f1);
  border: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: none;
  &:hover,
  &:focus {
    box-shadow: none;
    border: 1px solid #c6c6c6;
    color: #333;
    z-index: 2;
  }
`;

const btnSuccess = css`
  color: #fff;
  background-color: #1dc9b7;
  border-color: #1dc9b7;
  box-shadow: 0 2px 6px 0 rgba(29, 201, 183, 0.5);
  &:hover,
  &:focus {
    color: #fff;
    background-color: #18a899;
    border-color: #179c8e;
  }
`;

const btnWarning = css`
  color: #212529;
  background-color: #ffc241;
  border-color: #ffc241;
  box-shadow: 0 2px 6px 0 rgba(255, 194, 65, 0.5);
  &:hover,
  &:focus {
    color: #212529;
    background-color: #ffb61b;
    border-color: #ffb20e;
  }
`;

const btnInfo = css`
  color: #fff;
  background-color: #2196f3;
  border-color: #2196f3;
  box-shadow: 0 2px 6px 0 rgba(33, 150, 243, 0.5);
  &:hover,
  &:focus {
    color: #fff;
    background-color: #0c83e2;
    border-color: #0c7cd5;
  }
`;

const btnDanger = css`
  color: #fff;
  background-color: #fd3995;
  border-color: #fd3995;
  box-shadow: 0 2px 6px 0 rgba(253, 57, 149, 0.5);
  &:hover,
  &:focus {
    color: #fff;
    background-color: #fd1381;
    border-color: #fc077a;
  }
`;

const btnDark = css`
  color: #fff;
  background-color: #505050;
  border-color: #505050;
  box-shadow: 0 2px 6px 0 rgba(80, 80, 80, 0.5);
  &:hover,
  &:focus {
    color: #fff;
    background-color: #3d3d3d;
    border-color: #363636;
  }
`;

const btnLight = css`
  color: #212529;
  background-color: #fff;
  border-color: rgba(0, 0, 0, 0.15);
  box-shadow: 0 2px 6px 0 rgba(255, 255, 255, 0.5);
  &:hover,
  &:focus {
    color: #212529;
    background-color: #ececec;
    border-color: rgba(0, 0, 0, 0.25);
  }
`;

const bntOutlinePrimary = css`
  color: #886ab5;
  border-color: #886ab5;
  background-color: #fff;
  &:hover,
  &:focus {
    color: #fff;
    background-color: #886ab5;
    border-color: #886ab5;
  }
`;

const bntOutlineSecondary = css`
  color: #868e96;
  border-color: #868e96;
  background-color: #fff;
  &:hover,
  &:focus {
    color: #fff;
    background-color: #868e96;
    border-color: #868e96;
  }
`;

const bntOutlineDefault = css`
  background-color: transparent;
  color: #212529;
  border-color: #e5e5e5;
  &:hover,
  &:focus {
    color: #212529;
    background-color: #f9f9f9;
    border-color: #e5e5e5;
  }
`;

const bntOutlineSuccess = css`
  color: #1dc9b7;
  border-color: #1dc9b7;
  background-color: #fff;
  &:hover,
  &:focus {
    color: #fff;
    background-color: #1dc9b7;
    border-color: #1dc9b7;
  }
`;

const bntOutlineWarning = css`
  color: #ffc241;
  border-color: #ffc241;
  background-color: #fff;
  &:hover,
  &:focus {
    color: #212529;
    background-color: #ffc241;
    border-color: #ffc241;
  }
`;

const bntOutlineInfo = css`
  color: #2196f3;
  border-color: #2196f3;
  background-color: #fff;
  &:hover,
  &:focus {
    color: #fff;
    background-color: #2196f3;
    border-color: #2196f3;
  }
`;

const btnOutlineDanger = css`
  color: #fd3995;
  border-color: #fd3995;
  background-color: #fff;
  &:hover,
  &:focus {
    color: #fff;
    background-color: #fd3995;
    border-color: #fd3995;
  }
`;

const bntOutlineDark = css`
  color: #505050;
  border-color: #505050;
  background-color: #fff;
  &:hover,
  &:focus {
    color: #fff;
    background-color: #505050;
    border-color: #505050;
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
  transition: all 0.2s ease-in-out;

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
