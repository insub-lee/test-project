import styled from 'styled-components';

const Header = styled.div`
  position: relative;
  height: 50px;
  background-image: -webkit-gradient(linear, right top, left top, from(rgba(51, 148, 225, 0.18)), to(transparent));
  background-image: linear-gradient(270deg, rgba(51, 148, 225, 0.18), transparent);
  background-color: #584475;
  color: #fff;
  > .button--group--left {
    position: absolute;
    top: 50%;
    left: 10px;
    transform: translateY(-50%);
    text-align: left;
  }
  > .button--group--right {
    position: absolute;
    top: 50%;
    right: 10px;
    transform: translateY(-50%);
    text-align: right;
    .viewNameInput {
      width: 200px;
      height: 32px;
      margin-left: 10px;
    }
    button {
      background: transparent;
      color: rgba(255, 255, 255, 0.7);
      margin-left: 10px;
    }
  }
`;

export default Header;
