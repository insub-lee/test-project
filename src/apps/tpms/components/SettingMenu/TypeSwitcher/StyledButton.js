import styled from 'styled-components';

const StyledButton = styled.button`
  width: 100%;
  height: 100%;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  position: relative;
  color: #4f5a66;

  .icon_box {
    //margin: 0 8px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    width: 100%;
    height: 62px;
    position: absolute;
    top: 0;
    left: 0;
    border: 1px solid #4f5a66;
    font-size: 30px;
    line-height: 62px;
  }

  &:hover,
  &.active {
    color: #ffffff;

    .icon_box,
    .icon {
      border-color: #ffffff;
    }
  }

  .text {
    width: 100%;
    height: 30px;
    line-height: 30px;
    font-size: 14px;
    position: absolute;
    bottom: 0;
    left: 0;
  }
`;

export default StyledButton;
