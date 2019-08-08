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
      color: #666;
      font-size: 12px;
    }
  }
`;

export default StyleManualList;
