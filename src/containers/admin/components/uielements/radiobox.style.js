import styled from 'styled-components';

const AntRadiobox = ComponentName => styled(ComponentName)`
  // 1) 기본 스타일
  &.ant-radio-wrapper,
  .ant-radio-wrapper {
    .ant-radio-inner {
      width: 1.125rem;
      height: 1.125rem;
      border: #adb5bd solid 2px;
    }
    .ant-radio-checked {
      &:after {
        border: 1px solid #6e4e9e;
      }
      .ant-radio-inner {
        background-color: #7a59ad;
        border-color: #6e4e9e;
        &:after {
          width: 8px;
          height: 8px;
          top: 4px;
          left: 4px;
          background-color: #7a59ad;
          background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='-4 -4 8 8'%3e%3ccircle r='3' fill='%23fff'/%3e%3c/svg%3e");
          position: absolute;
          display: block;
          content: '';
          background-repeat: no-repeat;
          border: none;
          -webkit-transform: none;
          -ms-transform: none;
          -webkit-transform: none;
          -ms-transform: none;
          transform: none;
        }
      }
    }

    &:hover,
    &.ant-radio-focused {
      .ant-radio-inner {
        border-color: #6e4e9e;
      }
    }

    .ant-radio-checked:after,
    .ant-radio-checked .ant-radio-inner {
      border: 1px solid #6e4e9e;
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
