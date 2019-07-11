import styled from 'styled-components';

const Styled = styled.div`
  margin-top: 40px;
  height: 100%;
  position: fixed;
  left: -245px;
  //left: 45px;
  flex: 0 0 290px;
  max-width: 290px;
  min-width: 290px;
  width: 290px;
  width: 0;
  opacity: 1;
  background-color: rgb(255, 255, 255);

  text-align: center;
  box-shadow: rgba(0, 0, 0, 0.15) 2px 2px 4px;
  z-index: 2;  
  transition: left 0.1s ease-out 0s, ease-out 0s, ease-out 0s, ease-out 0s;
  
  &.active {
    left: 45px;
    //max-width: 290px;
    //min-width: 290px;
    //width: 290px;
  }
  
  
  
  .active-btn {    
    position: absolute;
    top: 50%;
    right: -40px;
    border: 1px solid #e5e5e5;
  }
`;

export default Styled;
