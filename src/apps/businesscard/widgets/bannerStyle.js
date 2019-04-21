import styled from 'styled-components';
import { palette } from 'styled-theme';
import { transition, borderRadius } from '../../../config/style-util';
import WithDirection from '../../../config/withDirection';
import bcbg_f from 'apps/businesscard/images/bc_F.png';
import bcbg_b from 'apps/businesscard/images/bc_B.png';

const BannerWrapper = styled.div`

  .carouselWrapper {
    display: block;
    border: 1px;
    height: 215px;
    
    .buttonWrapper {
      padding: 3px 2px 0px 14px;
      text-align: right;
      
      > button {
        height:25px;
        padding: 0 10px;
        background-color:#333333;
        border: 1px solid #333333;
        border-radius: 3px;
        font-size:13px;
        color:#ffffff;
        line-height: 24px;
        cursor: pointer;

        &:first-child {
         
          margin-right: 10px;
         
        }
      }
    }

    .img-responsive {
      display: block;
      max-width: 100%;
      height: 170px;
      margin: auto;
      padding: auto;
    }

    .item-front
    {
      max-width: 100%;
      max-height: 180px;
      background-image: url(${bcbg_f});
      background-size: 320px 160px;
      padding-left: 47%;
      border-width: 0px;
    }
    .item-back
    {
      max-width: 100%;
      max-height: 180px;
      background-image: url(${bcbg_b});
      background-size: 320px 160px;
      padding-left: 47%;
      border-width: 0px;
    }
    .item-name
    { 
      padding-top: 20px;
      font-size: 12px;
      font-weight: bold;
    }
    .item-jw-dept
    {
      font-size: 5px;
    }
    .item-addr
    {
      font-size: 3px;
      padding-top: 35px;
    }
    .item-tel
    {
      font-size: 3px;
      margin: 0;
      padding: 0;
      border-width: 0px;
    }
    .item-fax
    {
      font-size: 3px;
      margin: 0;
      padding: 0;
      border-width: 0px;
    }
    .item-mobile
    {
      font-size: 3px;
      font-weight: bold;
      margin: 0;
      padding: 0;
      border-width: 0px;
    }
    .item-email
    {
      font-size: 3px;
      margin: 0;
      padding: 0;
      border-width: 0px;
    }
    .item-homepage
    {
      font-size: 3px;
      margin: 0;
      padding: 0;
      border-width: 0px;
    }
    .text-box {
      position: absolute;
      height: 30%;
      text-align: center;
      width: 100%;
      margin: auto;
      top: 0;
      bottom: 0;
      right: 0;
      left: 0;
      font-size: 30px;
    }

    .dataNumber {
      margin-top: auto;
    }
  }
  
  .slideContent {
    position: relative;
    height: 225px;
    text-align: center;

    img {
      position: relative;
      min-width: 100% !important;
      max-height: 225px;
      z-index: -1;
    }

    .slideContentText {
      position: absolute;
      bottom: 0;
      right: 0;
      width: 100%;
      height: 80px;
      padding: 10px 10px 40px 10px;
      background: rgba(0,0,0,0.5);
      text-align: center;
      z-index: 1;

      > p.title {
        color: #ffffff;
        font-size: 17px;
        text-shadow: 0 0 2px #000000;
        line-height: 1.1;
      }
    }
  }
`;

export { BannerWrapper };
