import styled from 'styled-components';

const StyledFillTable = Component => styled(Component)`
  &.ant-table-wrapper {
    .ant-table {
      border-radius: 3px;
      border: 1px solid #e8e8e8;
      .ant-table-header {
        background: #e8e8e8;
        .ant-table-thead {
          font-size: 13px;
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
