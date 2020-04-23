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
