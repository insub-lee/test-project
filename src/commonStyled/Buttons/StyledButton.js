import styled, { css } from 'styled-components';

const btnRadiusNone = css`
  border-radius: 0;
`;

const btnRadius = css`
  border-radius: 30px;
`;

const btnLarge = css`
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  line-height: 1.5;
`;

const btnSmall = css`
  padding: 0.313rem 0.844rem;
  font-size: 0.75rem;
  line-height: 1.5;
`;

const btnSmallMid = css`
  padding: 0.2rem 0.7rem;
  font-size: 0.75rem;
  line-height: 1.5;
`;

const btnXsmall = css`
  padding: 1px 0.844rem;
  font-size: 0.7rem;
  line-height: 1.5;
`;

const btnPrimary = css`
  color: #fff;
  background-color: #1fb5ad;
  border-color: #1fb5ad;
  &:hover {
    color: #fff;
    background-color: #17a9a1;
    border-color: #1fb5ad;
  }
`;

const btnGray = css`
  color: #fff;
  background-color: #636a78;
  border-color: #636a78;
  &:hover {
    color: #fff;
    background-color: #474c56;
    border-color: #636a78;
  }
`;

const btnLight = css`
  color: #333;
  background-color: #fff;
  border-color: #636a78;
  &:hover {
    color: #fff;
    background-color: #636a78;
    border-color: #636a78;
  }
`;

const btnWhite = css`
  color: #fff;
  background-color: transparent;
  border-color: #fff;
  &:hover {
    color: #4491e0;
    background-color: #fff;
  }
`;

const StyledButton = styled.button`
  border: 1px solid transparent;
  background-color: transparent;
  cursor: pointer;
  padding: 0.4rem 1.125rem;
  font-size: 0.8125rem;
  line-height: 1.47;
  font-weight: 400;
  border-radius: 3px;
  color: #212529;
  text-align: center;
  vertical-align: middle;
  transition: all 0.2s ease-in-out;

  &:focus {
    border: 1px solid transparent;
  }

  &.btn-radius-none {
    ${btnRadiusNone}
  }

  &.btn-radius {
    ${btnRadius}
  }

  &.btn-lg {
    ${btnLarge}
  }

  &.btn-sm {
    ${btnSmall}
  }

  &.btn-sm2 {
    ${btnSmallMid}
  }

  &.btn-xs {
    ${btnXsmall}
  }

  &.btn-primary {
    ${btnPrimary}
  }

  &.btn-gray {
    ${btnGray}
  }

  &.btn-light {
    ${btnLight}
  }

  &.btn-white {
    ${btnWhite}
  }

  &.btn-first {
    margin-right: 5px;
  }
`;

export default StyledButton;
