import styled from 'styled-components';

const StyledVirtualizedList = styled.div`
  min-height: ${({ minHeight = 300 }) => `${minHeight}px`};

  .ReactVirtualized__Table__headerRow.virtualized_row {
    background: #6e7b95;
  }

  .row_list {
    width: 100%;
    border: 1px solid #ddd;
    margin-top: 15px;

    .row {
      height: 100%;
      display: flex;
      flex-direction: row;
      align-items: center;
      padding: 0 25px;
      background-color: #fff;
      border-bottom: 1px solid #e0e0e0;

      &:hover,
      &.row_checked {
        background-color: rgba(31, 181, 173, 0.8);
        color: #f1f3f5;
      }
    }
  }
`;

export default StyledVirtualizedList;
