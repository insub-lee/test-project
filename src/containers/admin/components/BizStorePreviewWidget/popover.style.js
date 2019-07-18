import styled from 'styled-components';
import w1x1 from 'images/common/w1x1.png';
import w2x1 from 'images/common/w2x1.png';
import w3x1 from 'images/common/w3x1.png';
import w1x2 from 'images/common/w1x2.png';
import w2x2 from 'images/common/w2x2.png';
import w3x2 from 'images/common/w3x2.png';
import w1x3 from 'images/common/w1x3.png';
import w2x3 from 'images/common/w2x3.png';

const PopoverWrapper = styled.div`
// 규격 설정
.widgetSize {

  //radio 버튼은 투명하게
  .ant-radio-button-wrapper {
    width: 102px;
    height: 102px;
    margin-right: 3px;
    margin-bottom: 3px;
    padding: 0;
    border: none;
    border-radius: 0;
    text-align: center;

    &:hover {
      border-color: transparent;
    }

    &:not(:first-child)::before {
      background-color: transparent;
    }

    &.ant-radio-button-wrapper-checked {
      box-shadow: none;

      &:first-child {
        border-color: transparent;
      }

      // > span > div {
      //   border-color: #000000 !important;
      // }
    }

  .rbox  {
    display: inline-block;
    width: 102px;
    height: 102px;
    margin-right: 3px;
    background-color: #f5f5f5;
    background-repeat: no-repeat;
    background-position: 50% 49%;
    padding-top: 80px;
    border: 2px solid transparent;

    &.w1X1 { background-image: url(${w1x1});}
    &.w2X1 { background-image: url(${w2x1});}
    &.w3X1 { background-image: url(${w3x1});}
    &.w1X2 { background-image: url(${w1x2});}
    &.w2X2 { background-image: url(${w2x2});}
    &.w3X2 { background-image: url(${w3x2});}
    &.w1X3 { background-image: url(${w1x3});}
    &.w2X3 { background-image: url(${w2x3});}

    &:hover { border-color: #000000;}

    > p {
      color: #404040;
      font-size: 12px;
      line-height: 1;
    }
  }
}
`;

export default PopoverWrapper;
