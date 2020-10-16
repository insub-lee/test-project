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
      font-size: 12px;
      text-align: center;
      color: #000;
      padding: 6px 8px;
      border-bottom: 1px solid #e8e8e8;
      border-right: 1px solid #e8e8e8;
      font-weight: 500;
    }

    thead th {
      padding: 8px;
    }

    tbody {
      tr {
        th {
          background: #f7f7f7;
          text-align: center;
          color: #000;
          font-size: 12px;
          padding: 6px 8px;
          border-bottom: 1px solid #e8e8e8;
          width: 130px;
          font-weight: 500;
          border-right: 1px solid #e8e8e8;
        }

        td {
          border-bottom: 1px solid #e8e8e8;
          padding: 6px 8px;
          font-size: 12px;
          width: auto;
          background-color: #ffffff;
          color: #666;
          border-right: 1px solid #e8e8e8;
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
        .td-left {
          text-align: left !important;
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
        &.tr-total td {
          background: #c5c9cd;
        }
      }
    }

    tfoot {
      tr td {
        background: #fafafa;
        border-bottom: 1px solid #e8e8e8;
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
          border: 1px solid #e8e8e8;
          border-left: 0;
          &:last-child {
            border-right: 0;
          }
        }
      }
    }
  }

  .app-workflow-user-draft-docu {
    thead tr th {
      border: 1px solid #e8e8e8;
    }
    tbody tr:last-child td {
      border: 1px solid #e8e8e8;
      border-bottom: 0;
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

  .table-title {
    font-size: 14px;
    color: #000;
    margin-bottom: 5px;
  }
`;

export default StyledHtmlTable;
