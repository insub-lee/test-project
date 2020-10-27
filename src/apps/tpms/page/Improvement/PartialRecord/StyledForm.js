import styled from 'styled-components';
import iconDate from '../../../images/icon_date.png';
import iconRadio from '../../../images/icon_radio.png';
import iconSelect from '../../../images/icon_select.png';

const StyledForm = styled.form`
  .sub_form {
    font-size: 0;
    text-align: left;
    margin-top: -10px;

    .radio {
      display: inline-block;
      line-height: 48px;
      & > div {
        padding: 0 12px 0 0;
      }
    }

    .radio input[type='radio'] {
      display: none;
    }

    .radio,
    .sub_form .checkbox {
      line-height: 48px;
    }

    .radio input[type='radio'] + label {
      cursor: pointer;
      color: #777;
      font-size: 16px;
    }

    .radio input[type='radio'] + label span {
      display: inline-block;
      margin-right: 6px;
      background: #d3dbe5;
      width: 16px;
      height: 16px;
      border-radius: 100%;
      margin-top: -3px;
      vertical-align: middle;
    }

    .radio input[type='radio']:checked + label span {
      background: url(${iconRadio}) no-repeat center;
    }

    .fl {
      float: left !important;
    }

    .fr {
      float: right !important;
    }

    & > li {
      position: relative;
      min-height: 49px;
      padding-left: 250px;
      margin-bottom: 10px;
      font-size: 15px;
      clear: both;

      &.flCustom {
        float: left;
      }

      &.frCustom {
        float: right;
      }

      &.width50 {
        width: calc(50% - 20px);
        clear: none;
      }

      &.width33 {
        width: calc(32% - 20px);
        clear: none;
        margin-right: 58px;
      }

      &.marginNone {
        margin-right: 0;
      }
    }

    li.half {
      clear: none;
      width: calc(46% - 250px);
    }

    &.small2 > li {
      padding-left: 120px;
    }

    &.small2 li.half,
    &.small2 li.half2,
    &.small2 li.half_mo {
      width: calc(46% - 110px);
    }

    & > li > .title {
      position: absolute;
      left: 0;
      top: 0;
      height: 48px;
      line-height: 48px;
    }

    .input_date {
      position: relative;
      padding-right: 20px;
    }

    .input_date_wrap .input_date {
      width: calc(47% - 20px);
      float: left;
      vertical-align: middle;
    }

    .icon {
      text-indent: -9999px;
      display: inline-block;
      vertical-align: middle;
    }

    .icon_date {
      width: 40px;
      height: 46px;
      background: #e7e7e7 url(${iconDate}) no-repeat right 10px center;
      border-bottom: 0px solid #d9e0e7;
      vertical-align: bottom;
      margin-top: 0;
    }

    .input_date .icon_date {
      position: absolute;
      right: 0;
      bottom: 0;
    }

    .hi {
      display: inline-block;
      width: 35px;
      text-align: center;
    }
  }

  .mb30 {
    margin-bottom: 30px !important;
  }

  .cr {
    clear: both;
  }

  .btn_wrap {
    padding-top: 30px;
    font-size: 0;
    text-align: center;
    overflow: hidden;
    clear: both;
  }

  .w25 {
    width: 25% !important;
  }

  .w40 {
    width: 40% !important;
  }

  .w70 {
    width: 70% !important;
  }

  .ant-select-selection--single,
  .ant-select-selection {
    vertical-align: middle;
    font-size: 15px;
    border-color: #d9d9d9;
    vertical-align: middle;
    font-size: 15px;
    border: 0px;
    box-shadow: none;
    background: rgb(231, 231, 231);
    height: 48px;
    border-radius: 0px;

    &:hover,
    &:focus,
    &:active {
      border-color: #d9d9d9;
    }
    box-shadow: none;
    .ant-select-selection__rendered {
      line-height: 48px;
    }
  }

  .ant-select-focused,
  .ant-select-open {
    .ant-select-selection--single,
    .ant-select-selection {
      vertical-align: middle;
      font-size: 15px;
      border-color: #d9d9d9;
      vertical-align: middle;
      font-size: 15px;
      border: 0px;
      box-shadow: none;
      background: rgb(231, 231, 231);
      height: 48px;
      border-radius: 0px;

      &:hover,
      &:focus,
      &:active {
        border-color: #d9d9d9;
      }
      box-shadow: none;

      .ant-select-selection__rendered {
        line-height: 48px;
      }
    }
  }

  @media screen and (max-width: 1710px) {
    .sub_form.small2 > li {
      &.width33 {
        width: 100%;
        float: none;
      }
    }
  }

  @media screen and (max-width: 1260px) {
    .sub_form {
      margin-top: -26px;
    }

    .sub_form > li,
    .sub_form.small > li,
    .sub_form.small2 > li {
      padding-left: 0;
    }

    .sub_form li.half,
    .sub_form.small li.half,
    .sub_form.small2 li.half,
    .sub_form li.half_mo {
      width: 47%;
    }

    .sub_form.small2 li.half,
    .sub_form.small2 li.half2,
    .sub_form.small2 li.half_mo {
      width: calc(50% - 10px);
    }

    .sub_form > li > .title {
      position: relative;
      display: block;
    }
    .sub_form > li > div.title {
      margin-bottom: 15px;
    }
    .sub_form.small2 > li {
      &.width50 {
        width: 100%;
        float: none;
      }
    }
  }

  @media screen and (max-width: 860px) {
  }
`;

export default StyledForm;
