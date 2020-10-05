import styled from 'styled-components';

const Styled = styled.div`
  position: fixed;
  padding: ${props => (props.marginLeft ? '0px 0px 8px 0px' : '0px 0px 8px 45px')};
  width: ${props => (props.marginLeft ? 'calc(100% - 280px)' : '100%')};
  bottom: 0;
  right: 0;
  transition: left 0.1s ease-out 0s, ease-out 0s, ease-out 0s, ease-out 0s;
  opacity: 1;
  background-color: ${props => (props.blackThema ? '#868e96' : '#15222d')};
  z-index: 50;

  .eshs-quicklink-title {
    font-size: 13px;
    color: #fff;
    margin: 0px 10px 0px 10px;
    width: 165px;
  }

  .eshs-quicklink {
    margin-top: 10px;
    width: 100%;
    height: 100%;
    min-width: 1068px;
  }
`;

export default Styled;
