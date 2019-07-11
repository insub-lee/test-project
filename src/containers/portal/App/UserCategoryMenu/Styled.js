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
  opacity: 1;
  background-color: rgb(255, 255, 255);

  box-shadow: rgba(0, 0, 0, 0.15) 2px 2px 4px;
  z-index: 2;  
  transition: left 0.1s ease-out 0s, ease-out 0s, ease-out 0s, ease-out 0s;
  
  &.active {
    left: 45px;
    //max-width: 290px;
    //min-width: 290px;
    //width: 290px;
  }
  
  .area-title {
    padding: 10px 15px;
    font-size: 18px;
    font-weight: 600;
    color: #000;
  }
  
  .divider {
    margin: 10px 15px;
    height: 0;
    border-bottom: 1px solid #d2d2d2;
  }
  
  .profile-area {
    height: 110px;
  }
  
  .category-menu-area {
    height: calc((100vh - 171px) / 2);
  }
  
  .timeline-area {
    height: calc((100vh - 171px) / 2);  
  }
  
  .active-btn {    
    position: absolute;
    top: 50%;
    right: -40px;
    border: 1px solid #e5e5e5;
  }
`;

export default Styled;
