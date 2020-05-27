import styled from 'styled-components';

const primaryColor = '#636a78';

const StyledAntdTable = Component => styled(Component)`
  padding: 10px;

  &.ant-table-no-pad {
    padding: 0;
  }

  .ant-table .ant-table-content {
    .ant-table-body {
      border-top: 1px solid #bbb;
      border-bottom: 1px solid #eee;
      table {
        border: 0;
        .ant-table-tbody > tr > td,
        .ant-table-thead > tr > th {
          border-radius: 0;
          font-size: 12px;
        }
        .ant-table-thead > tr > th {
          background-color: #fff;
          color: #000;
          border-bottom: 1px solid #e4e4e4;
          padding: 8px 8px;
        }
        .ant-table-tbody > tr > td {
          padding: 6px 8px;
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

    .ant-table-scroll .ant-table-header {
      border-top: 1px solid #bbb;
      .ant-table-thead > tr > th {
        padding: 6px 8px;
        border-radius: 0;
        font-size: 12px;
        border-right: 0;
        background-color: #fff;
        color: #000;
        border-bottom: 1px solid #e4e4e4;
        font-size: 0.85rem;
      }
    }

    .ant-table-placeholder {
      border-radius: 0;
      border: 0;
      border-bottom: 1px solid #e8e8e8;
      &.ant-table-placeholder-none {
        display: none;
      }
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

    .add-row {
      cursor: pointer;

      &:hover {
        color: #1fb5ad;
      }
    }
  }
  /* table 끝 */

  /* bordered 옵션 시 */
  .ant-table-bordered .ant-table-body > table {
    border: 0;
  }

  .ant-table-bordered .ant-table-thead > tr > th,
  .ant-table-bordered .ant-table-tbody > tr > td {
    &:last-child {
      border-right: 0;
    }
  }

  /* thead */
  .ant-table-thead > tr:first-child > th:first-child {
    border-top-left-radius: 0;
  }

  .ant-table-thead > tr:first-child > th:last-child {
    border-top-right-radius: 0;
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
    margin: 20px auto 0;
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
`;

export default StyledAntdTable;
