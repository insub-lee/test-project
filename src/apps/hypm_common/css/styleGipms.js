import styled from 'styled-components';
import searchWhite from './svg/search-white.svg';
import excelWhite from './svg/excel-white.svg';
import excelGreen from './svg/excel-green.svg';

const StyleGipms = styled.section`
  .gipms {
    width: 100%;
    padding: 20px 50px;
    color: #404040;

    * {
    font-size: 12px;
    }

    header {
      border-bottom: 1px solid #333;
      display: block;

      h2 {
        float: left;
        font-family: 'NotoSans';
        font-size: 17px;
        font-weight: 600;
        line-height: 34px;
        letter-spacing: -.5px;

        .ant-breadcrumb {
          float: right;
          line-height: 34px;
        }
      }

      &::after {
        content: "";
        display: block;
        clear: both;
        visibility: hidden;
        height: 0; 
      }
    }

    .search-area {
      border-bottom: 1px solid #d8d8d8;
      background-color: #f6f6f6;
      padding: 16px 16px 0 16px;
      position: relative;
      margin-bottom: 10px;
    }
    .search-item-area::after {
      content: "";
      display: block;
      clear: both;
      visibility: hidden;
      height: 0;
    }
    .search-item {
      float: left;
      width: 20%;
      margin-bottom: 5px;
    }
    .search-label {
      float: left;
      width: 30%;
      font-size: 12px;
      line-height: 26px;
      padding-left: 20px;
      position: relative;
      white-space: nowrap;

      &::before {
        content: "";
        display: inline-block;
        position: absolute;
        width: 5px;
        height: 5px;
        top: calc(50% - 2.5px);
        left: 10px;
        background-color: #c4c4c4;
        border-radius: 50%; 
      }
      &.required::before {
        background-color: #ea002c;
      }
    }
    /* */
    .btn-area {
      display: block; 
      margin: 11px 0 0 0;
      padding: 10px 0;
      border-top: 1px solid #c7c7c7;
      text-align: right;
      
      .btn-search {
        background-color: #333;
        height: 30px; 
        line-height: 29px;
        border: none;
        padding: 0 20px 0 17px;
        border-top-left-radius: 30px;
        border-top-right-radius: 30px;
        border-bottom-left-radius: 30px;
        border-bottom-right-radius: 30px;
        color: #fff;
        font-size: 12px;
        text-transform: uppercase;
        
        &::before {
          content: "";
          display: inline-block;
          width: 14px;
          height: 14px;
          margin-right: 8px;
          vertical-align: middle;
          background: url(${searchWhite}) no-repeat 50% 50%;
          background-size: 100%;
          position: static;
          opacity: .7;
        }
      }
    }
    /* antd reset */
    /* select */
    [class^="ant-select"] {
      font-size: 12px !important;
    }
    .ant-select {
      width: 100%;
    }
    .ant-select .ant-select-selection {
      border-radius: 0 !important;
      border-color: #ddd !important;
    }
    .ant-select .ant-select-selection__rendered {
      line-height: 26px;
    }
    .ant-select .ant-input {
      height: 26px;
    }
    .ant-select .ant-select-selection--single {
      height: 26px;
    }
    .ant-select .ant-select-selection__rendered {
      line-height: 24px;
    }
    .ant-select .ant-select-selection--multiple {
      min-height: 24px;
    }
    .ant-select .ant-select-selection--multiple .ant-select-selection__rendered li {
      height: 18px;
      line-height: 16px;
    }
    .ant-select-arrow {
      right: 8px;
    }
    /* */
    /* button */
    .btn-group .ant-btn {
      font-size: 12px;
      height: 24px; 
      line-height: 22px;
      border-top-right-radius: 24px;
      border-top-left-radius: 24px;
      border-bottom-right-radius: 24px;
      border-bottom-left-radius: 24px;
      margin-right: 4px;
    }
    .btn-group .left {
      float: left;
      margin-bottom: 8px;
    }
    .btn-group .right {
      float: right;
      margin-bottom: 8px;
    }
    .btn-group::after {
      content: "";
      display: block;
      clear: both;
      height: 0;
      visibility: hidden;
    } 
    .btn-excel::before {
      content: "";
      display: inline-block;
      width: 14px;
      height: 14px;
      margin-right: 5px;
      margin-top: -3px;
      vertical-align: middle;
      background: url(${excelGreen}) no-repeat 50% 50%;
      background-size: 100%;
      position: static;
      opacity: 1;
    }
    .btn-normal {
      background-color: #666;
      border: none;
    }
    .btn-apply {
      background-color: #333;
      border: none;
    }
    .btn-apply.excel::before {
      content: "";
      display: inline-block;
      width: 14px;
      height: 14px;
      margin-right: 5px;
      margin-top: -3px;
      vertical-align: middle;
      background: url(${excelWhite}) no-repeat 50% 50%;
      background-size: 100%;
      position: static;
      opacity: 1;
    }
    .ant-btn::before {
      background-color: transparent;
      border-radius: 0;
    }
    /* ag Grid */
    .ag-root {
      border-right: none !important;
      border-left: none !important;
      border-top-color: #000 !important;
    }
    /* tabs */
    .ant-tabs-tab {
      font-size: 13px;
    }
    .ant-tabs-nav .ant-tabs-tab {
      padding: 12px 30px;
    }
    .ant-tabs-nav .ant-tabs-tab-active {
      color: #404040;
    }
    .ant-tabs-ink-bar {
      height: 3px;
      width: 100% !important;
    }
  }

`;
export default StyleGipms;
