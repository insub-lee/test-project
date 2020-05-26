import styled from 'styled-components';

const StyledAntdPointTable = Component => styled(Component)`
  &.ant-table-wrapper {
    .ant-table {
      background: #fff;
      border: 0;
      border-top: 1px solid #4491e0;
      border-radius: 0;

      .ant-table-header {
        .ant-table-thead {
          font-size: 13px;

          th {
            border-bottom: 1px solid #e8e8e8;
          }

          th,
          td {
            padding: 7px;
          }
        }
      }
      .ant-table-tbody {
        font-size: 12px;
      }
    }
  }

  &.page-custom {
    .ant-table {
      colgroup > col.ant-table-selection-col {
        width: 30px;
      }

      .ant-table-thead tr:first-child th:last-child {
        display: none;
      }
    }
  }

  &.non-top-border {
    .ant-table {
      border: 0;
    }
  }
`;

export default StyledAntdPointTable;
