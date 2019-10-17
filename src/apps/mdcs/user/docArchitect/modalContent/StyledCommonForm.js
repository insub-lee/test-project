import styled from 'styled-components';
import searchBtn from 'images/icon/searchBtn.png';
import iconRadio from 'images/icon/icon_radio.png';

const StyledCommonForm = styled.form`
  .sel {
    text-align-last: center;
  }
  .inputform {
    border: 0;
    border-radius: 0;
    width: 100%;
    color: #555;
    text-align: center;
    vertical-align: middle;
    border-bottom: 1px solid #d9e0e7;
    font-size: 15px;
    height: 48px;
    line-height: 48px;
    background: white no-repeat right center;
  }
  .sub_form {
    font-size: 0;
    text-align: left;
    //  margin-top: -10px;
  }
  .sub_form > li {
    position: relative;
    min-height: 49px;
    padding-left: 250px;
    margin-bottom: 10px;
    font-size: 15px;
    clear: both;
  }
  .sub_form > li:last-child {
    margin-bottom: 0;
  }
  .sub_form > li > .title {
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    height: 48px;
    line-height: 48px;
    color: #555;
  }
  .sub_form .radio,
  .sub_form .checkbox {
    line-height: 48px;
  }
  .sub_form .rbtn {
    padding-right: 78px;
  }
  .sub_form .rbtn .btn {
    position: absolute;
    right: 0;
    top: 15px;
  }

  .sub_form .rbtn2 {
    padding-right: 22px;
    position: relative;
  }
  .sub_form .rbtn2 .icon {
    position: absolute;
    right: 0;
    top: 2px;
  }

  .sub_form textarea {
    height: 60px;
    // margin-top: 10px;
    padding: 10px 10px;
    border: 0;
    width: 100%;
    border-bottom: 0px solid #d9e0e7;
    background: #e7e7e7;
    resize: none;
  }
  .sub_form .hi {
    display: inline-block;
    width: 35px;
    text-align: center;
  }
  .sub_form .space {
    display: block;
    height: 48px;
  }
  .sub_form .icon_date {
    margin-top: 0;
  }
  .sub_form li.half {
    clear: none;
    width: calc(46% - 250px);
  }
  .sub_form li.half2 {
    clear: none;
    width: calc(46% - 270px);
    display: inline-block;
  }
  .sub_form li.half2.fr {
    margin-left: 40px;
  }
  .sub_form li.half_mo {
    clear: none;
    width: calc(46% - 250px);
  }
  .sub_form .sub_form {
    padding-top: 10px;
  }

  .sub_form.small > li {
    padding-left: 150px;
  }
  .sub_form.small2 > li {
    padding-left: 120px;
  }
  .sub_form.small2 li.half,
  .sub_form.small2 li.half2,
  .sub_form.small2 li.half_mo {
    //width: calc(46% - 110px);
    width: calc(50% - 60px);
  }
  .sub_form.small2 li.half2.fr {
    //width: calc(46% - 130px);
    width: calc(50% - 60px);
    margin-left: 40px;
  }

  .has_margin {
    margin-bottom: 10px;
    margin-top: 0;
  }

  .btn_wrap {
    margin-top: 30px;
    text-align: center;

    &.modal_btn_wrap {
      margin-bottom: 30px;
    }
  }

  .survey_tit,
  .sub_form_tit {
    font-weight: 500;
    font-size: 16px;
    margin-bottom: 15px;
  }

  .sub_form_tit {
    border-bottom: 0px solid #d9e0e7;
    font-size: 18px;
  }

  .input_with_btn {
    position: relative;
    display: inline-block;
    width: 100%;
    border-bottom: 1px solid #d9e0e7;

    .input {
      width: calc(100% - 40px);
      border-bottom: none;
    }

    .searchNumber {
      position: absolute;
      top: 10px;
      right: 0;
      border: 1px solid #e0e6ec;
      width: 25px;
      height: 25px;
      background: #fff url(${searchBtn}) no-repeat center;
      background-size: 16px;
    }
  }
  .tb_is {
    input[type='number']::-webkit-inner-spin-button,
    input[type='number']::-webkit-outer-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
  }
  .table_radio {
    input[type='radio'] {
      display: none;
    }

    input[type='radio'] + label {
      cursor: pointer;
    }

    input[type='radio'] + label span {
      display: inline-block;
      margin: 0;
      background: #d3dbe5;
      width: 16px;
      height: 16px;
      border-radius: 100%;
      vertical-align: middle;
    }

    input[type='radio']:checked + label span {
      background: url(${iconRadio}) no-repeat center;
    }

    input[type='number']::-webkit-inner-spin-button,
    input[type='number']::-webkit-outer-spin-button {
      -webkit-appearance: none;
      margin: 0;
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
    .sub_form > li > .title {
      position: relative;
      display: block;
      line-height: 80px;
    }
    .sub_form .rbtn .btn {
      top: 65px;
    }
    .sub_form li.half,
    .sub_form.small li.half,
    .sub_form.small2 li.half,
    .sub_form li.half_mo {
      width: 47%;
    }
  }
`;

export default StyledCommonForm;
