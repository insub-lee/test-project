import styled from 'styled-components';

const StyledHtmlTable = styled.div`
  table {
    border-spacing: 0;
    width: 100%;
    table-layout: fixed;

    thead th,
    thead td {
      font-size: 12px;
      text-align: center;
      color: #000;
      padding: 6px 8px;
      font-weight: 500;
    }

    thead th {
      padding: 8px;
    }

    tbody {
      tr {
        th {
          text-align: center;
          color: #000;
          font-size: 12px;
          padding: 6px 8px;
          width: 130px;
          font-weight: 500;
        }

        td {
          padding: 6px 8px;
          font-size: 12px;
          width: auto;
          color: #666;
          &:last-child {
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
          }
        }
        &.tr-total td {
        }
      }
    }

    tfoot {
      tr td {
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
    }

    /* border 있는 버전 */
    &.table-border {
      thead tr {
        th,
        td {
          &:last-child {
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

  .table-title {
    font-size: 14px;
    color: #000;
    margin-bottom: 5px;
  }
`;

export default StyledHtmlTable;
