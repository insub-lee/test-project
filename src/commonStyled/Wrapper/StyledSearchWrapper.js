import styled from 'styled-components';

const StyledSearchWrapper = styled.div`
  margin-bottom: 40px;
  background: #f2f4f7;
  border-radius: 5px;
  border: 2px solid #b5bdcb;
  padding: 15px 10px;

  .view-designer-group-search-wrap {
    width: 100%;
    display: block;

    .view-designer-table {
      border: 0;
      border-spacing: 0;
      width: 100%;
      table-layout: fixed;

      .view-designer-row {
        .view-designer-col {
          padding: 4px 8px;
          font-size: 12px;
          width: auto;
          background-color: transparent;
          color: #666;
          border: 0;
          &.view-designer-label {
            text-align: left;
            color: #000;
            width: 130px;
            font-weight: 500;
          }
        }
      }
    }
  }

  .view-designer-group-search-btn-wrap {
    display: block;
    text-align: center;
    margin-top: 20px;
  }
`;

export default StyledSearchWrapper;
