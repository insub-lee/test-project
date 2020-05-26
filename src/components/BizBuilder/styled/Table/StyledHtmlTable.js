import styled from 'styled-components';

const StyledHtmlTable = styled.div`
  table {
    border-top: 2px solid #888;
    border-spacing: 0;
    width: 100%;
    table-layout: fixed;

    thead th,
    thead td {
      background: #f7f7f7;
      font-size: 13px;
      text-align: center;
      color: #000;
      padding: 10px;
      border-bottom: 1px solid #ddd;
      font-weight: 500;
    }

    tbody {
      tr {
        th {
          background: #f7f7f7;
          text-align: center;
          color: #000;
          font-size: 12px;
          padding: 6px 8px;
          border-bottom: 1px solid #ddd;
          width: 130px;
          font-weight: 500;
          border-right: 1px solid #ddd;
        }

        td {
          border-bottom: 1px solid #ddd;
          padding: 6px 8px;
          font-size: 12px;
          width: auto;
          background-color: #ffffff;
          color: #666;
          border-right: 1px solid #ddd;
          &:last-child {
            border-right: 0;
          }
          .ant-radio-wrapper,
          .ant-checkbox-wrapper {
            font-size: 12px;
            span.ant-radio + *,
            .ant-checkbox-wrapper + span,
            .ant-checkbox + span {
              padding-left: 5px;
            }
          }
        }
        &.tr-center td {
          text-align: center;
        }
        &.tr-pointer {
          &:hover td {
            cursor: pointer;
            background: #e6f7ff;
          }
        }
      }
    }

    tfoot {
      tr td {
        background: #fafafa;
        border-bottom: 1px solid #ddd;
        font-size: 12px;
        color: #666;
        text-align: center;
        padding: 5px;
      }
    }

    th.th-pointer:hover {
      cursor: pointer;
      color: #1fb5ad;
    }

    td.td-pointer:hover {
      cursor: pointer;
      background: #e6f7ff;
    }

    /* border 있는 버전 */
    &.table-border {
      thead tr {
        th,
        td {
          border: 1px solid #ddd;
          border-left: 0;
          &:last-child {
            border-right: 0;
          }
        }
      }
    }
  }

  .ant-checkbox-wrapper {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    color: rgba(0, 0, 0, 0.65);
    font-size: 12px;
    font-variant: tabular-nums;
    line-height: 1.5;
    list-style: none;
    -webkit-font-feature-settings: 'tnum';
    font-feature-settings: 'tnum';
    display: inline-block;
    line-height: unset;
    cursor: pointer;
  }

  &.radioFoundry {
    margin-top: 7px;
    width: 500px;
    .applyButtonWrapper {
      text-align: center;
      margin-top: 10px;
    }
  }
`;

export default StyledHtmlTable;
