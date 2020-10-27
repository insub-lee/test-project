import styled from 'styled-components';
import iconDate from '../../../images/icon_date.png';

export const StyledForm = styled.form`
  .sub_form {
    font-size: 0;
    text-align: left;
    margin-top: -10px;

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
      margin-bottom: 3px;
      font-size: 15px;
      clear: both;
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
      width: 20px;
      height: 46px;
      background: url(${iconDate}) no-repeat center;
      border-bottom: 1px solid #d9e0e7;
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
      text-align: center;
      float: left;
      width: 6% !important;
      font-size: 10px;
      vertical-align: middle;
      height: 48px;
      line-height: 48px;
    }
  }

  .mb30 {
    margin-bottom: 30px !important;
  }

  .cr {
    clear: both;
  }

  .btn_wrap {
    font-size: 0;
    text-align: center;
    overflow: hidden;
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
      line-height: 80px;
    }
  }

  @media screen and (max-width: 860px) {
  }
`;
