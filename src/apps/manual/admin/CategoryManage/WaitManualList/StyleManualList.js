import styled from 'styled-components';

const StyleManualList = styled.div`
  .manualListTitle {
    max-width: 400px;
    height: auto;
    span {
      text-overflow: ellipsis;
      white-space: nowrap;
      word-wrap: normal;
      width: 100%;
      overflow: hidden;
      color: rgba(0, 0, 0, 0.65);
      font-size: 12px;
    }
  }
  .ant-table-tbody > tr > td {
    padding: 2px;
  }
`;

export default StyleManualList;
