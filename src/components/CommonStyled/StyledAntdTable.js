import styled from 'styled-components';

const primaryColor = '#886ab5';
const reversePrimaryColor = '#c1b2d9';

const StyledAntdTable = Component => styled(Component)`
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
  }

  .ant-pagination-item a {
    color: ${reversePrimaryColor};
  }

  .ant-pagination-item-active {
    border-color: ${primaryColor};
    background-color: ${primaryColor};
  }

  .ant-pagination-item-active a {
    color: ${reversePrimaryColor};
  }
`;

export default StyledAntdTable;
