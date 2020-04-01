import styled from 'styled-components';

const Styled = styled.div`
  width: 100%;

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

  .ant-table-tbody > tr {
    td {
      cursor: default !important;
    }
  }
`;

export default Styled;
