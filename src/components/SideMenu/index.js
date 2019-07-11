import styled from 'styled-components';

const StyledSideMenu = styled.div`
  height: 100%;
  position: fixed;
  margin-top: 40px;
  left: 0;
  flex: 0 0 45px;
  max-width: 45px;
  min-width: 45px;
  width: 45px;
  transition: left 0.1s ease-out 0s, ease-out 0s, ease-out 0s, ease-out 0s;
  opacity: 1;
  background-color: #868e96;
  text-align: center;
  z-index: 3;
`;

export default StyledSideMenu;
