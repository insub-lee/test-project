import styled from 'styled-components';

const Styled = styled.div`
  height: 100%;
  position: fixed;
  left: -190px;
  flex: 0 0 235px;
  max-width: 235px;
  min-width: 235px;
  width: 235px;
  opacity: 1;
  background-color: #152434;
  border-left: 1px solid #35414e;
  z-index: 9998;
  transition: left 0.3s ease-out 0s;

  &.active {
    left: 45px;
    transition: left 0.3s ease-out 0s;
  }

  .area-title {
    padding: 10px 15px;
    font-size: 18px;
    font-weight: 600;
    color: ${props => (props.blackThema ? '#000' : '#fff')};
  }

  .divider {
    margin: 10px 15px;
    height: 0;
    border-bottom: 1px solid #d2d2d2;
  }

  .profile-area {
    > div {
      padding: 30px 20px 20px;
    }
  }

  .category-menu-area {
    height: calc(100vh - 149px);
  }

  .timeline-area {
    height: calc((100vh - 171px) / 2);
  }

  .active-btn {
    position: absolute;
    top: 40%;
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
    background-color: rgb(21, 36, 52);
    background-repeat: no-repeat;
    border-radius: 0;
  }

  .btn-page-move {
    background: transparent;
  }
`;

export default Styled;
