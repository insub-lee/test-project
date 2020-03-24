import styled from 'styled-components';

const StyledSelectTable = styled.div`
  > table {
    border-top: 1px solid #999999;
    border-spacing: 0;
    width: 100%;
  }
  table thead th {
    background: #e7e1f0;
    font-size: 14px;
    text-align: center;
    /* font-weight: 600; */
    color: #000;
    padding: 10px;
  }
  table tbody th {
    background: #f7f7f7;
    text-align: center;
    color: rgba(0, 0, 0, 0.65);
    /* font-weight: 600; */
    font-size: 12px;
    padding: 5px 5px;
    border-right: 1px solid #e8e8e8;
    border-bottom: 1px solid #e8e8e8;
    width: 130px;
  }
  table tbody td {
    border-right: 1px solid #e8e8e8;
    padding: 5px 5px;
    font-size: 12px;
    width: auto;
  }

  .ant-checkbox-wrapper {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    margin-bottom: 4px;
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
