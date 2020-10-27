import styled from 'styled-components';

const StyledButton = styled.button`
  width: 100%;
  height: 100%;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  position: relative;
  color: #4f5a66;
  border: 1px solid #4f5a66;
  text-align: left;

  &:hover,
  &.active {
    border-color: #ffffff;
    color: #ffffff;
  }

  .text {
    padding: 0 12px;
    height: 30px;
    line-height: 30px;
  }
`;

export default StyledButton;
