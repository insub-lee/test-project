import styled from 'styled-components';

const Sidebar = styled.div`
  //flex: 0 0 auto;
  flex: 0 0 auto;
  position: relative;
  outline: none;
  padding-top: 15px;
  width: 210px;
  //height: 100%;
  //min-height: 100vh;
  background-color: #152434;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;

  @media screen and (max-width: 736px) {
    width: 100%;
    height: 50px;

    div.menu {
      position: fixed;
      width: 200px;
      height: 100%;
      background: #111b27;
      left: -201px;
      top: 0;
      padding-top: 15px;
      z-index: 2;
      -webkit-transition: all 0.5s;
      -moz-transition: all 0.5s;
      -ms-transition: all 0.5s;
      -o-transition: all 0.5s;
      transition: all 0.5s;

      &.active {
        left: 0;
      }
    }
  }
`;

export default Sidebar;
