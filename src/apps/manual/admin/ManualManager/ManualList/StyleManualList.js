import styled from 'styled-components';

const StyleManualList = styled.div`
  .manualListTitle {
    max-width: 400px;
    height: auto;
    margin-bottom: 1.2px;
    span {
      text-overflow: ellipsis;
      white-space: nowrap;
      word-wrap: normal;
      width: 100%;
      overflow: hidden;
      color: #666;
      font-size: 12px;
    }
  }
  table > .ant-table-tbody > tr.ant-table-expanded-row > td {
    background-color: #fbfbfb;
  }
`;

export default StyleManualList;
