import styled from 'styled-components';

const primaryColor = '#886ab5';
const primaryColor2 = '#6a60b9';
const reversePrimaryColor = '#c1b2d9';

const StyledLineTable = Component => styled(Component)`
  padding: 10px;

  .ant-table .ant-table-content {
    .ant-table-body table {
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
        border-top: 1px solid #aeb4be;
        border-bottom: 2px solid #aeb4be;
        font-size: 0.85rem;
      }
      .ant-table-tbody > tr > td {
        cursor: pointer;
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
  }

  .ant-pagination-jump-next,
  .ant-pagination-jump-prev,
  .ant-pagination-next,
  .ant-pagination-prev {
    min-width: 28px;
    height: 28px;
    line-height: 28px;
  }

  .ant-pagination-item a {
    color: ${reversePrimaryColor};
  }

  .ant-pagination-item-active {
    border-color: ${primaryColor2};
    background-color: ${primaryColor2};
    color: #ffffff;
  }

  .ant-pagination-item-active a {
    color: ${reversePrimaryColor};
  }

  .ant-table-pagination.ant-pagination {
    float: none;
    margin: 20px auto;
    text-align: center;
    font-size: 11px;
  }

  .ant-pagination-item-link .anticon {
    vertical-align: inherit;
  }
`;

export default StyledLineTable;
