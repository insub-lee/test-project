import styled from 'styled-components';

const AntRadiobox = ComponentName => styled(ComponentName)`

  // 1) 기본 스타일
  &.ant-radio-wrapper, .ant-radio-wrapper {

    .ant-radio-inner {
      &:after {
        width: 8px;
        height: 8px;
        top: 3px;
        left: 3px;
        background-color: #f85023;
      }
    }

    &:hover, &.ant-radio-focused {
      .ant-radio-inner {
        border-color: #f85023;
      }
    }

    .ant-radio-checked:after, 
    .ant-radio-checked .ant-radio-inner {
      border: 1px solid #f85023;
    }

    .ant-radio-disabled .ant-radio-inner:after {
      background-color: #ccc;
    }

    .ant-radio-wrapper-disabled:hover .ant-radio-inner {
      border-color: #d9d9d9 !important;
    }
  }

  // IE에서 radio checked 모양이 한쪽으로 기울여 보이는 문제가 있음
  @media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {
    
    /* IE10+ CSS styles go here */
    .ant-radio-inner {
      width: 17px !important;
      height: 17px !important;
      
      &::after {
        width: 8px !important;
        height: 8px !important;
        top: 50% !important;
        left: 50% !important;
        margin-top: -4px;
        margin-left: -4px;
      }
    }
  }  
`;

export default AntRadiobox;
