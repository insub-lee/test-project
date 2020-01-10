import styled from 'styled-components';

const TableWrapper = styled.div`
  padding: 24px;
  font-size: 14px;
  line-height: 1.5;
  word-wrap: break-word;
  .inner {
    width: 100%;
    overflow: hidden;
    border-radius: 4px;
    border: 1px solid #e8e8e8;
    table {
      width: 100%;
      table-layout: auto;
      tr.item {
        border-bottom: 1px solid #e8e8e8;
        th.item-title {
          color: rgba(0, 0, 0, 0.85);
          font-weight: 400;
          font-size: 14px;
          line-height: 1.5;
          white-space: nowrap;
          padding: 8px 16px;
          background-color: #fafafa;
        }
        td.item-cont {
          padding: 8px 16px;
          color: rgba(0, 0, 0, 0.65);
          font-size: 14px;
          line-height: 1.5;
          border-right: 1px solid #e8e8e8;
          &:last-child {
            border-right: 0;
          }
          > div {
            -webkit-box-sizing: border-box;
            box-sizing: border-box;
            padding: 0;
            color: rgba(0, 0, 0, 0.65);
            font-size: 14px;
            font-variant: tabular-nums;
            line-height: 1.5;
            list-style: none;
            margin: 0;
            vertical-align: top;
          }
        }
      }
    }
  }
`;

export default TableWrapper;
