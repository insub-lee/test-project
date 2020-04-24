import styled from 'styled-components';

const Styled = styled.div`
  width: 100%;

  .middleTitle {
    margin: 10px 0px 10px 0px;
    font-weight: bold;
  }

  .searchCmpnyWrap {
    display: inline;
    position: relative;
  }

  .clearInputBtn {
    display: inline;
    /* background-color: #e6e6e6; */
    padding: 5px;
    height: 32px;
    text-align: center;
    border-radius: 3px;
    cursor: pointer;
    position: absolute;
    right: 3%;
  }

  .searchCmpnyBtn {
    display: inline;
    margin-right: 10px;
    background-color: #e6e6e6;
    padding: 5px;
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
