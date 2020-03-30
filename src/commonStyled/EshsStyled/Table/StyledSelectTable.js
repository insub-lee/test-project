import styled from 'styled-components';

const StyledSelectTable = styled.div`
  table {
    border: 1px solid #e8e8e8;
    border-top: 1px solid #999999;
    border-spacing: 0;
    width: 100%;
    thead th {
      background: #e7e1f0;
      font-size: 14px;
      text-align: center;
      color: #000;
      padding: 10px;
    }
    tbody {
      th {
        background: #f7f7f7;
        text-align: center;
        color: rgba(0, 0, 0, 0.65);
        font-size: 12px;
        padding: 8px 0px;
      }
      td {
        padding: 8px;
        font-size: 12px;
        width: auto;
        table.subTable {
          border: 0;
          th {
            border-right: 1px solid #e8e8e8;
            border-bottom: 1px solid #e8e8e8;
          }
          td {
            border-right: 1px solid #e8e8e8;
          }
        }
        &:last-child table.subTable {
          th,
          td {
            border-right: 0;
          }
        }
      }
    }
  }

  .ant-checkbox-wrapper {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    padding: 0;
    color: rgba(0, 0, 0, 0.65);
    display: table-row-group;
    font-size: 12px;
    font-variant: tabular-nums;
    line-height: 1.5;
    list-style: none;
    -webkit-font-feature-settings: 'tnum';
    font-feature-settings: 'tnum';
    width: 100px;
    cursor: pointer;
    height: 24px;
    line-height: 24px;

    &.ant-checkbox-wrapper-checked {
      color: #ffffff;
      background-color: #999999;
      display: block;
      margin: 0px;
    }

    .ant-checkbox {
      display: none;
    }

    span {
      white-space: nowrap;
      display: inline-block;
    }
  }

  .ant-checkbox-group {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    color: rgba(0, 0, 0, 0.65);
    font-size: 14px;
    font-variant: tabular-nums;
    line-height: 1.5;
    list-style: none;
    -webkit-font-feature-settings: 'tnum';
    font-feature-settings: 'tnum';
    display: inline-block;
  }

  .ant-checkbox-inner {
    width: 1rem;
    height: 1rem;
    border: 1px solid #adb5bd;
    display: 'none';
  }
`;

export default StyledSelectTable;
