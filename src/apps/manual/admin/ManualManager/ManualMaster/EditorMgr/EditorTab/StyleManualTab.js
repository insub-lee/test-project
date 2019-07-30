import styled from 'styled-components';

const StyleManualTab = styled.div`
  position: relative;
  width: 100%;
  padding: 1px 0;
  display: inline-block;
  background-color: #eee;
  > div {
    display: inline-block;
  }
  .manualtabwrap {
    width: calc(100% - 50px);
    line-height: 32px;
    ul > li {
      display: inline-block;
      border-top: 1px solid rgba(34, 36, 38, 0.15);
      border-right: 1px solid rgba(34, 36, 38, 0.15);
      span {
        display: inline-block;
        width: 160px;
        padding: 2px 5px;
        i {
          padding-right: 5px;
        }
        input {
          width: 132px;
        }
      }
      > button {
        border: 0;
        background-color: transparent;
        padding-left: 0;
        padding-right: 5px;
        --antd-wave-shadow-color: none;
        :focus,
        :hover {
          color: rgba(0, 0, 0, 0.65);
          border: none;
        }
      }
    }
  }
  .manualtabbuttonwrap {
    button {
      margin: 0 2px;
    }
  }
`;

export default StyleManualTab;
