import styled from 'styled-components';

const StyledVirtualizedTable = styled.div`
  position: relative;
  display: flex;
  padding: 20px;
  flex: 1 0 auto;
  flex-direction: column;
  overflow: auto;
  border-top: 1px solid #bbb;
  border-bottom: 1px solid #eee;

  .ReactVirtualized__Table__headerRow {
    background-color: #fff;
    color: #000;
    border-bottom: 1px solid #e4e4e4;
    font-size: 12px;
    padding: 6px;
  }

  .ReactVirtualized__Table__row {
    background: #ffffff;
    padding: 10px;
    color: #666;
    font-size: 12px;
    padding: 4px 6px;

    &:nth-child(even) {
      background-color: #f6f8fa;
    }

    &:hover {
      background: #e6f7ff;
    }
  }
`;

export default StyledVirtualizedTable;
