import styled from 'styled-components';

const StyledFillTable = Component => styled(Component)`
  &.ant-table-wrapper {
    .ant-table {
      background: #fff;
      border-top: 1px solid #4491e0;
      border-radius: 0;
      border-bottom: 0;
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
`;

export default StyledFillTable;
