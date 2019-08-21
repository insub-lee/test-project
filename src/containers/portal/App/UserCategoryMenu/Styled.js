import styled from 'styled-components';

const Styled = styled.div`
  margin-top: 40px;
  height: 100%;
  position: fixed;
  left: -245px;
  flex: 0 0 290px;
  max-width: 290px;
  min-width: 290px;
  width: 290px;
  opacity: 1;
  background-color: rgb(255, 255, 255);

  box-shadow: rgba(0, 0, 0, 0.15) 2px 2px 4px;
  z-index: 2;  
  transition: left 0.3s ease-out 0s;
  
  &.active {
    left: 45px;
    transition: left 0.3s ease-out 0s;
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
    height: calc(100vh - 350px);
  }
  
  .timeline-area {
    height: calc((100vh - 171px) / 2);  
  }
  
  .active-btn {    
    position: absolute;
    top: 4.35%;
    right: -19px;
  }

  .active-btn .ant-btn:not(.ant-btn-circle):not(.ant-btn-circle-outline).ant-btn-icon-only {
    padding-right: 0px;
    padding-left: 0px;
  }

  .active-btn .ant-btn {
    padding: 0px;
    opacity: 1;
    height: 65px;
    cursor: pointer;
    width: 20px;
    color: white;
    background-color: rgba(87, 71, 120, 1);
    background-repeat: no-repeat;
    border-top-left-radius: 3px;
    border-bottom-left-radius: 3px;
  }
`;

export default Styled;
