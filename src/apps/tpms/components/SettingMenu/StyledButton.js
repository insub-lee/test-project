import styled from 'styled-components';

const StyledButton = styled.button`
  width: 100%;
  height: 100%;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  position: relative;
  color: #4f5a66;

  .icon_box {
    margin: 0 8px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    width: 40px;
    height: 40px;
    position: absolute;
    top: 0;
    left: 0;
    border: 1px solid #4f5a66;
    font-size: 20px;
    line-height: 40px;

    i.rotated {
      transform: rotate(90deg) scaleX(-1);
    }
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
    height: 20px;
    line-height: 20px;
    font-size: 10px;
    position: absolute;
    bottom: 0;
    left: 0;
  }
`;

export default StyledButton;
