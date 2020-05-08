import styled from 'styled-components';

const StyledSearchWrapper = styled.div`
  margin-bottom: 40px;
  .view-designer-group-search-wrap {
    width: 100%;
    display: block;

    .view-designer-table {
      border: 1px solid #ddd;
      border-spacing: 0;
      width: 100%;
      table-layout: fixed;

      .view-designer-row {
        .view-designer-col {
          border-bottom: 1px solid #ddd;
          padding: 6px 8px;
          font-size: 12px;
          width: auto;
          background-color: #ffffff;
          color: #666;
          border-right: 1px solid #ddd;
          &.view-designer-label {
            background: #f7f7f7;
            text-align: center;
            color: #000;
            font-size: 12px;
            padding: 6px 8px;
            border-bottom: 1px solid #ddd;
            width: 130px;
            font-weight: 500;
            border-right: 1px solid #ddd;
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
