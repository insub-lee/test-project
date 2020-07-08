import styled from 'styled-components';

const primaryColor = '#636a78';

const StyledAntdTable = Component => styled(Component)`
  /* default table style */
  table {
    border-radius: 0;
    border-top: 1px solid #bbb;
    border-bottom: 1px solid #eee;

    .ant-table-thead {
      tr {
        th {
          background-color: #fff;
          color: #333;
          border-bottom: 1px solid #e4e4e4;
          padding: 8px 8px;
          border-radius: 0;
          font-size: 12px;
          text-align: center;
          position: relative;
        }

        &:not(:last-child) > th[colspan] {
          border-bottom: 1px solid #e4e4e4;
        }

        &:first-child > th:first-child {
          border-radius: 0;
        }
      }
    }

    .ant-table-tbody {
      tr {
        td {
          padding: 6px 8px;
          border-radius: 0;
          font-size: 12px;
          cursor: pointer;
          border-bottom: 0;
        }

        .textAlignColCenter {
          text-align: center;
        }

        &:nth-child(even) > td {
          background-color: #f6f8fa;
        }

        &.ant-table-row-selected {
          td {
            background-color: #fffbf1;
          }
        }
      }
    }
  }

  .ant-table {
    .ant-table-placeholder {
      border-radius: 0;
      border-top: 0;

      &.ant-table-placeholder-none {
        display: none;
      }
    }

    .ant-table-footer {
      border-radius: 0;
      border-top: 0;
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

  /* bordered table style */
  .ant-table-bordered {
    table {
      border-top: 1px solid #bbb;
      border-bottom: 1px solid #eee;
    }
  }

  /* scroll table style */
  .ant-table-scroll > .ant-table-body {
    -ms-overflow-style: scrollbar;
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
