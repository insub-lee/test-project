import styled from 'styled-components';

const RadioWrapper = ComponentName => styled(ComponentName)`
  & .ant-radio {
    & .ant-radio-inner {
      width: 1.125rem;
      height: 1.125rem;
      border: #adb5bd solid 2px;
    }
    &.ant-radio-checked {
      &:after {
        border: 1px solid #6e4e9e;
      }
      & .ant-radio-inner {
        background-color: #7a59ad;
        border-color: #6e4e9e;
        &:after {
          width: 8px;
          height: 8px;
          top: 3px;
          left: 3px;
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
  }
`;
const RadioGroupWrapper = ComponentName => styled(ComponentName)``;

export { RadioWrapper, RadioGroupWrapper };
