import { createGlobalStyle } from 'styled-components';

import iconSelct from '../../images/icon_select.png';
import iconSearchW from '../../images/icon_search_white.png';
import iconCloseBtn from '../../images/icon_pclose.png';
import iconSelct2 from '../../images/icon_select2.png';

export default createGlobalStyle`
  
  
  .tpms-view {
    font-family: 'Roboto', 'Noto Sans KR', 'Apple SD Gothic Neo', 'Dotum', '돋움', sans-serif;
  
    [class^='icon-custom-'],
    [class*=' icon-custom-'] {
      /* use !important to prevent issues with browser extensions that change fonts */
      font-family: 'icomoon' !important;
      speak: none;
      font-style: normal;
      font-weight: normal;
      font-variant: normal;
      text-transform: none;
      line-height: 1;
  
      /* Better Font Rendering =========== */
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }
  
    .icon-custom-layout_type00:before {
      content: '\\\\\\e900';
    }
    .icon-custom-layout_type01:before {
      content: '\\\\\\e901';
    }
    .icon-custom-layout_type02:before {
      content: '\\\\\\e902';
    }
  
    select {
      -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;
      border: 0;
      border-radius: 0;
      width: 100%;
      color: #555;
      vertical-align: middle;
      border-bottom: 0px solid #d9e0e7;
      font-size: 15px;
      height: 48px;
      line-height: 48px;
      background: #e7e7e7 url(${iconSelct}) no-repeat right 10px center;
      padding-left: 10px;
    }
    //
    input {
      -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;
      border: 0;
      border-radius: 0;
      background: 0;
      width: 100%;
    }
    //
    dl,
    dt,
    dd {
      margin: 0;
      padding: 0;
    }
  
    .input {
      // border-bottom: 1px solid #d9e0e7;
      background: #e7e7e7;
      padding: 0 10px;
      font-size: 15px;
      height: 45px;
      line-height: 45px;
      color: #555;
      vertical-align: middle;
    }
  
    .mb20 {
      margin-bottom: 20px;
    }
  
    .icon {
      text-indent: -9999px;
      display: inline-block;
      vertical-align: middle;
    }
  
    .icon_search_white {
      width: 40px;
      height: 40px;
      background: #636a78 url(${iconSearchW}) no-repeat center;
      border-radius: 100%;
    }
  
    .icon_pclose {
      width: 30px;
      height: 30px;
      background: url(${iconCloseBtn}) no-repeat center;
      border-radius: 100%;
      border: 1px solid white;
    }
  
    .btn_wrap {
      font-size: 0;
      text-align: center;
      overflow: hidden;
    }
  
    .btn_wrap a,
    .btn_wrap button {
      margin: 3px !important;
    }
  
    .overlay {
      position: fixed;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      z-index: 1;
      background: rgba(0, 0, 0, 0.7);
      cursor: pointer;
    }
  
    .modal {
      position: fixed;
      z-index: 2;
      margin: 0 20px 20px 230px;
      width: calc(100% - 250px);
      top: 50%;
      left: 0;
      transform: translateY(-50%);
  
      &.small {
        width: 420px;
        margin: 0;
        left: 50%;
        margin-left: -195px;
      }
    }
  
    .grid {
      overflow: hidden;
  
      & > div {
        float: left;
        margin: 0 0.5% 14px 0.5%;
        //background: white;
  
        & > section {
          border-radius: 5px;
          position: relative;
          background: white;
        }
      }
    }
  
    .grid_item {
      position: relative;
      //margin: 0 0.5% 14px 0.5%;
      margin: 0 8px 14px 8px;
  
      & > section {
        border-radius: 5px;
        position: relative;
        background: white;
      }
    }
  
    .grid_setting {
      position: absolute;
      width: 100%;
      height: 100%;
      text-align: right;
      //background-color: yellow;
      top: 0;
      right: 0;
  
      .setting {
        display: none;
        margin: 0 15px 0 0;
        line-height: 50px;
        text-align: center;
        color: #646464 !important;
  
        &:hover {
          color: #000000 !important;
        }
      }
    }
  
    .grid6 {
      //width: 99%;
      width: calc(100% - 16px);
    }
    .grid3 {
      //width: 49%;
      width: calc(50% - 16px);
    }
    .grid2 {
      //width: 32.33%;
      width: calc(33.3% - 16px);
    }
    .grid1 {
      //width: 15.66%;
      width: calc(16.6% - 16px);
    }
  
    .employee_modal {
      position: fixed;
      z-index: 2;
      padding: 0px;
      margin: 0px;
      width: 824px;
      top: 50%;
      left: calc(50% - 412px);
      transform: translateY(-50%);
      border: none;
      //max-width: 60%;
      height: 570px;
      background: rgb(255, 255, 255);
    }
  
    .ReactModal__Overlay.ReactModal__Overlay--after-open {
      z-index: 1;
    }
  
    .rc-notification {
      position: fixed;
      z-index: 1000;
      right: -20px !important;
      left: inherit !important;
      top: 30px !important;
      bottom: 30px;
    }
  
    .rdw-editor-toolbar {
      li {
        min-height: 25px !important;
        display: flex !important;
        align-items: center !important;
        padding: 0 5px !important;
        margin: 0 !important;
      }
    }
  
    .styles_modal__gNwvD {
      padding: 0 !important;
      //height: 100%;
      background-color: white;
    }
  
    .styles_overlay__CLSq- {
      flex-direction: column;
    }
  
    // Table
    .tb_wrap {
      clear: both;
    }
    .tb_wrap_scroll {
      overflow-x: scroll;
    }
    .tb01 {
      width: 100%;
      margin-bottom: 20px;
    }
    .tb01 th,
    .tb01 td {
      font-size: 15px;
      padding: 14px;
      text-align: center;
    }
    .tb01 .bt {
      border-top: 0;
    }
    .tb01 .bb2 {
      border-bottom: 0;
    }
    .tb01 th {
      border-top: 1px solid #aeb4be;
      border-bottom: 1px solid #aeb4be;
      font-weight: 400;
    }
    .tb01 tr.con {
      display: none;
    }
    .tb01 th.br,
    .tb01 td.br {
      border-right: 1px solid #eaecee;
    }
    .tb01 th.bb,
    .tb01 td.bb {
      border-bottom: 1px solid #eaecee;
    }
    .tb01 .bd th {
      border: 1px solid #aeb4be;
    }
    .tb01 .bd th:first-child {
      border-left: 1px solid #fff !important;
    }
    .tb01 .bd th:last-child {
      border-right: 1px solid #fff !important;
    }
    .tb01 th button {
      font-size: 15px;
    }
    .tb01 td {
      color: #555;
    }
    .tb01 td .title {
      display: block;
      color: #555;
      text-align: left;
    }
    .tb01 td .title.tc {
      text-align: center;
      width: 100%;
    }
    .tb01 th button .icon,
    .tb01 td .title .icon {
      margin: 0 0 0 5px;
      vertical-align: middle;
    }
    .tb01 tr.bg th,
    .tb01 tr.bg td {
      background: #f6f8fa;
    }
  
    .tb01 .checkbox input[type='checkbox'] + label span {
      margin-right: 0;
    }
    .tb01 .dot_red {
      display: inline-block;
      background: #ff5d5d;
      width: 12px;
      height: 12px;
      border-radius: 100%;
    }
    .tb01 .dot_green {
      display: inline-block;
      background: #1fb5ad;
      width: 12px;
      height: 12px;
      border-radius: 100%;
    }
  
    .ta_wrap {
      margin-top: 15px;
    }
  
    .tb02 {
      width: 100%;
    }
    .tb02 caption {
      color: #333;
      font-size: 15px;
      margin-bottom: 10px;
      text-align: right;
    }
    .tb02 th,
    .tb02 td {
      font-size: 14px;
      padding: 12px 10px;
      text-align: center;
      vertical-align: middle;
    }
    .tb02.wb th,
    .tb02.wb td,
    .tb02.wb a,
    .tb02.wb button {
      word-break: break-all;
    }
    .tb02 th {
      color: white;
      background: #6e7b95;
      font-weight: 400;
      padding: 8px 10px;
    }
    .tb02 .bd th {
      border: 1px solid #5a6885;
    }
    .tb02 td {
      color: #555;
      border: 1px solid #eaecee;
      // border: 1px solid #5a6885;
      padding: 10px;
    }
    .tb02 .bb {
      border-bottom: 2px solid #eaecee;
    }
    .tb02 th .checkbox label {
      color: white;
    }
    .checkbox_ck.checkbox input[type='checkbox'] + label span {
      margin-right: 0;
    }
  
    .tb_is {
      padding: 0 !important;
    }
  
    .tb_is .rc-time-picker-input {
      border: none !important;
    }
  
    .tb_is .dates {
      padding: 0 10px;
    }
  
    .tb_is .dates input[type='text'] {
      height: 40px;
      line-height: 40px;
      border: none;
    }
  
    .tb_is .dates button.icon_date {
      height: 40px;
      border: none;
    }
  
    .tb_excel td {
      padding: 0 !important;
    }
    .tb_is input {
      //width: calc(100% - 20px);
      width: 100%;
      height: 40px;
      line-height: 40px;
      text-align: center;
      padding: 0 10px;
    }
    .tb_is input:focus {
      border: 2px solid #ff7f29;
      //width: calc(100% - 24px);
      //width: calc(100% - 4px);
      width: 100%;
      height: 40px;
      //height: calc(40px - 4px);
    }
    .tb_is select {
      border: 0;
      background: url(${iconSelct2}) no-repeat right 10px center;
      height: 40px;
      line-height: 40px;
      text-indent: 10px;
    }
    .tb_is select:focus {
      border: 2px solid #ff7f29;
      line-height: 35px;
      max-width: 100%;
    }
    .tb_is2 .fl,
    .tb_is2 .fr {
      width: 50%;
    }
    .tb_is2 .fl {
      border-right: 1px solid #dadada;
      width: calc(50% - 1px);
    }
    .tb_is3 .fl,
    .tb_is3 .fr {
      width: 33.33%;
    }
    .tb_is3 .fl {
      border-right: 1px solid #dadada;
      width: calc(33.33% - 1px);
    }
    .tb_is4 .fl,
    .tb_is4 .fr {
      width: 25%;
    }
    .tb_is4 .fl {
      border-right: 1px solid #dadada;
      width: calc(25% - 1px);
    }
    .tb_is4 .radio {
      margin: 11px 0;
    }
    .tb_is textarea {
      padding: 10px;
      width: calc(100% - 20px);
      border: 0;
      max-height: 80px;
    }
  
    .tb_date .icon_date {
      border: 0;
      height: 40px;
      line-height: 40px;
      background-position: center 7px;
    }
    .tb_date input {
      text-align: center;
      width: calc(100% - 50px);
      margin-left: 10px;
      height: 40px;
      line-height: 40px;
    }
  
    .th_date .icon_date {
      vertical-align: middle;
      margin-left: 10px;
      border: 0;
    }
    .th_date02 .icon_date {
      vertical-align: middle;
      margin-left: 0px;
      border: 0;
    }
  
    .tb02 .input_date_wrap {
      padding-right: 5px;
    }
    .tb02 .input_date_wrap .icon_date {
      border: 0 !important;
    }
    .tb02 .input_date_wrap .hi {
      height: 40px;
      line-height: 40px;
    }
  
    .cr {
      clear: both;
    }
  
    .fl {
      float: left;
    }
  
    .fr {
      float: right;
    }
  
    .survey_tit {
      font-weight: 500;
      font-size: 16px;
      margin-bottom: 15px;
    }
    .survey_form {
      border-bottom: 1px solid #dadada;
      margin-bottom: -1px;
    }
    .survey_form dt {
      border-top: 1px solid #dadada;
      border-bottom: 1px solid #dadada;
      padding: 15px;
      background: #fafafa;
      font-size: 16px;
      font-weight: 500;
    }
    .survey_form ul {
      padding: 10px 15px;
    }
    .survey_form li {
      margin: 10px 0;
      position: relative;
    }
    .survey_form li.pl {
      padding-left: 80px;
    }
    .survey_form li .tit {
      position: absolute;
      left: 0;
      top: 50%;
      font-size: 16px;
      font-weight: 500;
      transform: translateY(-50%);
    }
  
    .tootip {
      cursor: pointer;
      color: #0000ee;
    }
  
    .pop_tit {
      border-top-left-radius: 5px;
      border-top-right-radius: 5px;
    }
  
    .ant-popover {
      z-index: 1050 !important;
    }
  
    .ant-popover-center {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  
    .rc-calendar-picker {
      z-index: 1050 !important;
    }
  
    p {
      margin: 0;
    }

    .rc-notification {
      z-index: 9999;
    }
  
    .btn.border {
      background: white;
      border: 1px solid #636a78;
      color: #333 !important;
    }
  
    .btn.fa i {
      vertical-align: middle;
      display: block;
      margin: 0 auto;
    }
  
    .btn.small {
      //padding: 0 16px;
      height: 30px;
      line-height: 30px !important;
      font-size: 14px;
      border-radius: 30px;
    }
  
    .btn.small.fa {
      width: 30px;
      font-size: 14px;
    }
  
    .ant-notification-notice {
      -webkit-box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4) !important;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4) !important;
    }
  
    @media screen and (max-width: 1260px) {
      .grid6,
      .grid3,
      .grid2 {
        width: 100%;
        margin-left: 0 !important;
        margin-right: 0 !important;
      }
      .grid1 {
        width: 32.33%;
      }    
    }
  
    @media screen and (max-width: 860px) {
      .grid1 {
        width: 49%;
      }
  
      .employee_modal {
        width: 562px;
        left: calc(50% - 275px);
      }
  
      .tb_wrap {
        overflow-x: scroll;
      }
    }
  }
`;
