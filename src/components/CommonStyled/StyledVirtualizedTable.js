import styled from 'styled-components';

const StyledVirtualizedTable = styled.div`
  position: relative;
  display: flex;
  padding: 5px;
  margin-bottom: 3px;
  flex: 1 0 auto;
  flex-direction: column;
  overflow: auto;
  border-top: 2px solid #999;

  .ReactVirtualized__Table__headerRow {
    background-color: #886ab5;
    color: #ffffff;
    font-size: 12px;
    padding: 10px;
  }

  .ReactVirtualized__Table__row {
    background: #ffffff;
    border-bottom: 1px solid #ddd;
    padding: 10px;
    color: #666;
    font-size: 12px;

    &:hover {
      background: #e6f7ff;
    }
  }
`;

export default StyledVirtualizedTable;
