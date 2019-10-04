import styled from 'styled-components';

const CheckWrapper = ComponentName => styled(ComponentName)`
  .ant-checkbox {
    .ant-checkbox-inner {
      width: 1.125rem;
      height: 1.125rem;
      border: #adb5bd solid 2px;
    }
    &.ant-checkbox-checked {
      &:after {
        border: 1px solid #6e4e9e;
      }
      .ant-checkbox-inner {
        background-color: #7a59ad;
        border-color: #6e4e9e;
        &:after {
          background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8'%3e%3cpath fill='%23fff' d='M6.564.75l-3.59 3.612-1.538-1.55L0 4.26 2.974 7.25 8 2.193z'/%3e%3c/svg%3e");
          background-size: 50% 50%;
          position: absolute;
          display: block;
          width: 1.125rem;
          height: 1.125rem;
          content: '';
          background-repeat: no-repeat;
          background-position: 0.125rem 0.125rem;
          top: initial;
          left: initial;
          border: none;
          -webkit-transform: none;
          -ms-transform: none;
          transform: none;
        }
      }
    }
  }
`;
const CheckBoxGroupWrapper = ComponentName => styled(ComponentName)``;

export { CheckWrapper, CheckBoxGroupWrapper };
