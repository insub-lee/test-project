import styled from 'styled-components';

const StyledDatePicker = Component => styled(Component)`
  &.ant-picker,
  &.ant-calendar-picker {
    vertical-align: middle;

    .ant-input {
      display: block;
      width: 100%;
      height: calc(1.47em + 1rem + 2px);
      padding: 0.5rem 0.875rem;
      font-size: 0.8125rem;
      font-weight: 400;
      line-height: 1.47;
      color: #495057;
      background-clip: padding-box;
      border: 1px solid #e5e5e5;
      border-radius: 4px;
      transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out, -webkit-box-shadow 0.15s ease-in-out;

      input {
        height: auto;

        &.ant-calendar-range-picker-input {
          border: 0;
        }
      }

      &:hover,
      &:focus {
        color: #495057;
        border-color: #636a78;
        outline: 0;
        box-shadow: 0 0 0 0.2rem transparent;
      }

      &:disabled {
        background: #f5f5f5;
      }

      .ant-calendar-range-picker-input {
        padding: 0;
      }
    }
  }

  &.ant-picker-inline {
    display: inline-block;
    vertical-align: middle;
  }

  &.mr5 {
    margin-right: 5px;
  }
  &.ant-picker-mid {
    .ant-input {
      padding: 0.4rem 0.875rem;
      height: auto;
      font-size: 0.75rem;
    }
  }

  &.ant-picker-sm {
    .ant-input {
      padding: 0.313rem 0.844rem;
      font-size: 0.75rem;
      height: auto;
    }
  }

  &.ant-picker-xs {
    .ant-input {
      padding: 0.2rem 0.7rem;
      font-size: 0.75rem;
      height: auto;
    }
  }

  &.ant-picker-pointer {
    cursor: pointer;
  }

  &.ant-picker-center {
    text-align: center;
  }

  &.ant-picker-left {
    text-align: left;
  }

  &.ant-picker-right {
    text-align: right;
  }
`;

export default StyledDatePicker;
