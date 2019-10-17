import styled from 'styled-components';

const StyledProfile = styled.div`
  position: relative;
  background: #4491e0;
  text-align: center;
  padding: 20px 20px;
  min-height: 295px;
  & .widgetHeader > i {
    display: none;
  }
  & .user-img {
    position: relative;
    overflow: hidden;
    width: 110px;
    height: 110px;
    text-align: center;
    margin: 0 auto;
    border-radius: 100%;
    img {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      max-width: 100%;
      height: auto;
    }
  }
  & .user-info {
    margin-top: 10px;
    & > span {
      display: block;
      font-size: 20px;
      color: #fff;
      font-weight: 600;
      &.user-info-name {
        margin-bottom: 5px;
      }
    }
  }
  button {
    background-color: transparent !important;
  }
`;

export default StyledProfile;
