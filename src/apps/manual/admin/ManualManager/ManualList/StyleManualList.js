import styled from 'styled-components';

const StyleManualList = styled.div`
  .manualListTitle {
    max-width: 400px;
    span {
      text-overflow: ellipsis;
      white-space: nowrap;
      word-wrap: normal;
      width: 100%;
      overflow: hidden;
      color: rgba(0, 0, 0, 0.65);
    }
  }
`;

export default StyleManualList;
