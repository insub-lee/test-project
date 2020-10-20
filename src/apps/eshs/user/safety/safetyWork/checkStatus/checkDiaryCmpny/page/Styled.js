import styled from 'styled-components';

const Styled = styled.div`
  width: 100%;

  .ingCheckHeader {
    margin: 20px 0px 0px 0px;
  }

  .middleTitle {
    position: relative;
    margin: 10px 0px 10px 0px;
    font-weight: bold;
  }

  .middleTitleText {
    vertical-align: middle;
    margin-right: 10px;
  }

  .searchCmpnyWrap {
    display: inline;
    position: relative;
  }

  .searchCmpnyBtn {
    display: inline;
    margin-right: 10px;
    background-color: #e6e6e6;
    padding: 1.6px;
    height: 32px;
    text-align: center;
    border-radius: 3px;
    cursor: pointer;
  }

  .searchCmpnyBtn:hover {
    background-color: #bfbfbf;
  }

  .customBtn {
    margin-bottom: 5px;
  }
`;

export default Styled;
