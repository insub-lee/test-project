import styled from 'styled-components';

const StyledHtmlTable = styled.div`
  table {
    border-top: 2px solid #888;
    border-spacing: 0;
    width: 100%;
    thead th {
      background: #f7f7f7;
      font-size: 14px;
      text-align: center;
      color: #000;
      padding: 10px;
      border-bottom: 1px solid #e8e8e8;
    }
    tbody {
      th {
        background: #f7f7f7;
        text-align: center;
        color: #000;
        font-size: 0.8rem;
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
        &:first {
          border-left: 1px solid #ddd;
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
    .applyButtonWrapper {
      text-align: center;
      margin-top: 10px;
    }
  }
  &.radioFoundryResult {
  }
`;

export default StyledHtmlTable;
