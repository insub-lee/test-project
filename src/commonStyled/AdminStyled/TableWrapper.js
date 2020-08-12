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

    .styled-input {
      display: inline-block;
      height: calc(1.47em + 1rem + 2px);
      padding: 0.5rem 0.875rem;
      font-size: 0.8125rem;
      font-weight: 400;
      line-height: 1.47;
      color: #495057;
      background-clip: padding-box;
      border: 1px solid #ddd;
      border-radius: 4px;
      transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out, -webkit-box-shadow 0.15s ease-in-out;
      vertical-align: middle;
      padding: 0.2rem 0.5rem;
      font-size: 0.75rem;
      height: auto;
      margin-right: 5px;

      &:hover,
      &:focus {
        color: #495057;
        border-color: #636a78;
        outline: 0;
        box-shadow: 0 0 0 0.2rem transparent;
      }

      &:disabled {
        background: #f5f5f5;
      }
    }
  }
`;

export default TableWrapper;
