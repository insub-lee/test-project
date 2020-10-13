import styled, { css } from 'styled-components';

const primaryColor = css`
  color: #fff;
  background: #1fb5ad;
  border: 1px solid #1fb5ad;
`;

const defaultColor = css`
  color: #333;
  background: #ffffff;
  border: 1px solid #636a78;
`;

const grayColor = css`
  color: #fff;
  background: #636a78;
  border: 1px solid #636a78;
`;

const grayVer2Color = css`
  color: #fff;
  background: #bbb;
  border: 1px solid #bbb;
`;

const defaultSize = css`
  font-size: 16px;
  font-weight: 400;
  padding: 0 20px;
  height: 35px;
  border-radius: 35px;
`;

const smallSize = css`
  font-size: 14px;
  font-weight: 400;
  padding: 0 16px;
  height: 30px;
  border-radius: 30px;
`;

const hover = css`
  &:hover {
    background-color: rgba(31, 181, 173, 0.8);
    color: #f1f3f5;
  }
`;

const Button = styled.button`
  // Type [primary, default]
  ${({ color }) => {
    switch (color) {
      case 'grayTwo':
        return grayVer2Color;
      case 'default':
        return defaultColor;
      case 'gray':
        return grayColor;
      case 'primary':
      default:
        return primaryColor;
    }
  }}
  // Type []
  ${({ size }) => {
    switch (size) {
      case 'small':
        return smallSize;
      case 'big':
      default:
        return defaultSize;
    }
  }}

  ${({ hoverable }) => (hoverable ? hover : '')}

  //-webkit-transition: all 0.5s;
  //-moz-transition: all 0.5s;
  //-ms-transition: all 0.5s;
  //-o-transition: all 0.5s;
  //transition: all 0.5s;
`;

export default Button;
