import styled from 'styled-components';

const StyledProfile = styled.div`
  position: relative;
  text-align: center;
  & .widgetHeader > i {
    display: none;
  }
  & .user-img {
    position: relative;
    overflow: hidden;
    width: 85px;
    height: 85px;
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
      border: 1px solid gray;
      border-radius: inherit;
    }
  }
  & .user-info {
    margin-top: 20px;
    & > span {
      display: block;
      font-size: 15px;
      font-weight: 600;
      &.user-info-name {
        font-size: 20px;
        margin-bottom: 5px;
      }
    }
  }
  button {
    background-color: transparent !important;
  }
`;

export default StyledProfile;
