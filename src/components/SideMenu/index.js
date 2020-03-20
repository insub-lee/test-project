import styled from 'styled-components';

const StyledSideMenu = styled.div`
  height: 100%;
  position: fixed;
  left: 0;
  flex: 0 0 45px;
  max-width: 45px;
  min-width: 45px;
  width: 45px;
  transition: left 0.1s ease-out 0s, ease-out 0s, ease-out 0s, ease-out 0s;
  opacity: 1;
  background-color: ${props => (props.blackThema ? '#868e96' : '#152434')};
  text-align: center;
  z-index: 3;
  border-right: ${props => (props.blackThema ? '0' : '1px solid #35414e')};
`;

export default StyledSideMenu;
