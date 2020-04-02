import styled from 'styled-components';

const primaryColor = '#886ab5';

const StyledLineTable = Component => styled(Component)`
  padding: 10px;

  .ant-table .ant-table-content {
    .ant-table-body {
      border-bottom: 1px solid #eee;
      table {
        border: 0;
        .ant-table-tbody > tr > td,
        .ant-table-thead > tr > th {
          padding: 8px 16px;
          border-radius: 0;
          font-size: 12px;
          border-right: 0;
        }
        .ant-table-thead > tr > th {
          background-color: #fff;
          color: #000;
          border-top: 1px solid #bbb;
          border-bottom: 1px solid #e4e4e4;
          font-size: 0.85rem;
        }
        .ant-table-tbody > tr {
          &.ant-table-row-selected {
            td {
              background: #fffbf1;
            }
          }
          td {
            cursor: pointer;
          }
        }
      }
    }
    .ant-table-placeholder {
      border-radius: 0;
      border: 0;
      border-bottom: 1px solid #e8e8e8;
    }
    .ant-table-footer {
      border: 0;
      border-bottom: 1px solid #e4e4e4;
      font-size: 12px;
      color: #666;
      text-align: center;
      padding: 5px;
      &:before {
        top: 0;
      }
    }
  }
  /* table 끝 */
  /* thead */
  .ant-table-thead > tr:first-child > th:first-child {
    border-top-left-radius: 0;
  }

  .ant-table-thead > tr:first-child > th:last-child {
    border-top-right-radius: 0;
  }

  .ant-table-thead > tr > th {
    background-color: ${primaryColor};
    color: #ffffff;
    text-align: center;
    font-size: 12px;
    padding: 10px;
  }

  /* tbody */
  .ant-table-tbody > tr {
    &:nth-child(even) > td {
      background-color: #f6f8fa;
    }
    > td {
      border-bottom: 0;
    }
  }

  /* checkbox */
  .ant-checkbox-indeterminate .ant-checkbox-inner:after {
    background-color: ${primaryColor};
  }

  .ant-checkbox-checked .ant-checkbox-inner {
    border-color: ${primaryColor};
    background-color: ${primaryColor};
  }

  .ant-checkbox-checked:after {
    background-color: ${primaryColor};
    border-color: ${primaryColor};
  }

  .ant-checkbox-input:focus + .ant-checkbox-inner,
  .ant-checkbox-wrapper:hover .ant-checkbox-inner,
  .ant-checkbox:hover .ant-checkbox-inner {
    border-color: ${primaryColor};
  }

  /* Pagination */
  .ant-pagination-item {
    border: none;
    min-width: 28px;
    height: 28px;
    line-height: 28px;
    a {
      color: #666;
    }
  }

  .ant-pagination-jump-next,
  .ant-pagination-jump-prev,
  .ant-pagination-next,
  .ant-pagination-prev {
    min-width: 28px;
    height: 28px;
    line-height: 28px;
  }

  .ant-pagination-item-active {
    border: 0;
    background-color: #636a78;
    color: #ffffff;
    border-radius: 50%;
    a {
      color: #fff;
    }
  }

  .ant-table-pagination.ant-pagination {
    float: none;
    margin: 20px auto;
    text-align: center;
    font-size: 11px;
  }

  .ant-pagination-item-link {
    border-radius: 50%;
    background: #f9f9f9;
    border: 0;
    .anticon {
      vertical-align: inherit;
    }
  }
  &.tableCodeWrapper {
    .ant-table .ant-table-content .ant-table-body table .ant-table-thead > tr > th {
      padding: 0;
      .ant-table-header-column {
        width: 100%;
        .th-label {
          padding: 6px 8px;
          display: block;
          border-bottom: 1px solid #ddd;
          text-align: center;
          &.th-label-left {
            text-align: left;
          }
        }
        .td-input-wrapper {
          padding: 6px 8px;
          height: 42px;
          .span-item {
            font-size: 12px;
            display: block;
            line-height: 32px;
            text-align: center;
          }
        }
      }
    }
  }
`;

export default StyledLineTable;
