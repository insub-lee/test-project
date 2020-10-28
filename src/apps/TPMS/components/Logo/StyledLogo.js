import styled from 'styled-components';
import defaultLogo from '../../../../images/logo.png';

const StyledLogo = styled.h1`
  width: 141px;
  height: 31px;
  margin: 0 auto 50px auto;
  display: block;

  a {
    width: 141px;
    height: 31px;
    display: block;
    background: url(${({ img }) => img || defaultLogo}) no-repeat;
    text-indent: -9999px;
  }

  @media screen and (max-width: 736px) {
    width: 100px;
    height: 22px;
    margin: auto;

    a {
      width: 100px;
      height: 22px;
      background-size: 100px auto;
    }
  }
`;

export default StyledLogo;
