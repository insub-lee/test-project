import styled from 'styled-components';

const Styled = styled.div`
  .categoryBody {
    padding: 10px;
  }
  button.btnCompTool {
    color: rgba(255, 255, 255, 0.7);
    border: 1px solid #8f8bb4;
    background-color: transparent;
    font-size: 12px;
    height: 32px;
    width: calc(100% - 30px);
    margin-bottom: 5px;
    text-align: left;
    &:hover {
      background-image: -webkit-gradient(linear, right top, left top, from(rgba(51, 148, 225, 0.18)), to(transparent));
      background-image: linear-gradient(270deg, rgba(51, 148, 225, 0.18), transparent);
      background-color: #584475;
    }
  }
  .toolbar-item {
    cursor: pointer;
    display: inline-block;
    text-align: center;
    vertical-align: middle;
    margin-left: 10px;
    &:before {
      color: #cccae0;
    }
  }
`;

export default Styled;
