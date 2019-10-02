import styled from 'styled-components';

const Styled = styled.div`
  &.manual-descriptions-view {
    width: 100%;
    overflow: hidden;
    border-top: 2px solid #e5e5e5;
    table-layout: auto;
    border-collapse: collapse;

    table {
      width: 100%;
      table-layout: auto;

      tr {
        border-bottom: 1px solid #e8e8e8;

        th.manual-descriptions-item-label,
        td.manual-descriptions-item-content {
          font-size: 12px;
          font-weight: normal;
          padding: 6px 24px;
          line-height: 1.5;
          word-break: break-all;
        }

        th.manual-descriptions-item-label {
          background-color: #f3f1f5;
          color: #000;
          text-align: center;
          white-space: nowrap;
        }

        td.manual-descriptions-item-content {
          display: table-cell;
          background-color: #fff;
          color: #666;
        }
      }
    }
  }
`;

export default Styled;
