import styled, { css } from 'styled-components';
import iconDocu from '../../images/icon_docu.png';
import iconArrBig from '../../images/icon_arr_big_w.png';
import iconArrSmall from '../../images/icon_arr_small_w.png';
import iconDouuCk from '../../images/icon_douu_ck.png';
import iconIng1 from '../../images/icon_ing1.png';
import iconIng2 from '../../images/icon_ing2.png';
import iconIng3 from '../../images/icon_ing3.png';
import iconIng4 from '../../images/icon_ing4.png';
import iconIng5 from '../../images/icon_ing5.png';

const limitedHeight = css`
  height: 300px;
`;

const Wrapper = styled.div`
  ${({ limitedSmallView }) => (limitedSmallView ? limitedHeight : '')}

  .sub_tit2 {
    padding: 0 25px;
    background: #4491e0;
    position: relative;
    color: white;
    border-radius: 5px 5px 0 0;
  }
  .sub_tit2 span.icon {
    margin: 2px 5px 0 0;
  }
  .sub_tit2 > span {
    display: inline-block;
    vertical-align: middle;
  }
  .icon_docu {
    width: 18px;
    height: 14px;
    background: url(${iconDocu}) no-repeat center;
  }
  .icon {
    text-indent: -9999px;
    display: inline-block;
    margin-top: -3px;
    vertical-align: middle;
  }
  .sub_tit2 span.big {
    font-weight: 500;
    font-size: 20px;
    height: 55px;
    line-height: 55px;
  }
  .sub_tit2 span.line {
    width: 1px;
    height: 16px;
    background: white;
    margin: 3px 20px 0 20px;
  }
  .sub_tit2 span.small {
    font-size: 20px;
    line-height: 28px;
  }
  .sub_tit2 .btn_wrap {
    float: right;
    padding-top: 8px;
  }
  .btn_wrap {
    font-size: 0;
    text-align: center;
  }
  .btn_wrap a,
  .btn_wrap button {
    margin: 0 5px;
  }
  .icon_arr_big {
    width: 32px;
    height: 32px;
    background: url(${iconArrBig}) no-repeat 9px 8px;
    border: 1px solid white;
    border-radius: 100%;
  }
  .icon_arr_small {
    width: 32px;
    height: 32px;
    background: url(${iconArrSmall}) no-repeat 9px 8px;
    border: 1px solid white;
    border-radius: 100%;
  }
  button {
    overflow: visible;
    /* border: 0; */
    /* background-color: transparent; */
    cursor: pointer;
    outline: none;
  }
  .sub_con {
    padding: 30px;
  }
  .sub_list {
    margin: -10px 0;
  }
  .sub_list li {
    position: relative;
    border-bottom: 1px solid #f1f3f5;

    &:last-child {
      border-bottom: none;
    }
  }
  .sub_list li button {
    position: relative;
    display: block;
    padding: 10px 10px 10px 50px;
    font-size: 17px;
  }
  .sub_list li .icon {
    position: absolute;
    left: 5px;
    top: 15px;
  }
  .icon_douu_ck {
    width: 24px;
    height: 25px;
    background: url(${iconDouuCk}) no-repeat center;
  }
  .btn.border {
    background: white;
    border: 1px solid #636a78;
    color: #333 !important;
  }
  .btn.big {
    padding: 0 20px;
    height: 38px;
    line-height: 38px;
    font-size: 16px;
    border-radius: 38px;
  }
  .btn.border_w {
    background: none;
    border: 1px solid white;
    color: white !important;
  }
  .btn.small {
    padding: 0 16px 1.1px;
    height: 30px;
    font-size: 14px;
    border-radius: 30px;
  }
  .btn {
    display: inline-block;
    font-weight: 500;
    vertical-align: middle;
  }
  .sub_tit2 .sub_ing {
    float: right;
    padding-top: 16px;
    margin-right: 20px;
  }
  .sub_ing {
    font-size: 14px;
    font-family: 'Noto Sans KR';
  }
  .sub_ing li {
    float: left;
    margin-right: 20px;
    color: white;
  }
  fieldset,
  li,
  img {
    border: 0;
    vertical-align: top;
    outline: none;
  }
  .sub_ing .icon {
    margin: -3px 5px 0 0 !important;
  }
  .icon_ing1 {
    width: 21px;
    height: 19px;
    background: url(${iconIng1}) no-repeat center;
  }
  .icon_ing2 {
    width: 21px;
    height: 19px;
    background: url(${iconIng2}) no-repeat center;
  }
  .icon_ing3 {
    width: 21px;
    height: 19px;
    background: url(${iconIng3}) no-repeat center;
  }
  .icon_ing4 {
    width: 21px;
    height: 19px;
    background: url(${iconIng4}) no-repeat center;
  }
  .icon_ing5 {
    width: 21px;
    height: 19px;
    background: url(${iconIng5}) no-repeat center;
  }
`;

export default Wrapper;
