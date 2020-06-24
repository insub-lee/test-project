import styled from 'styled-components';

const StyledSelect = Component => styled(Component)`
  &.ant-select {
    vertical-align: middle;

    .ant-select-selection {
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

      &:hover,
      &:focus {
        color: #495057;
        border-color: #636a78;
        outline: 0;
        box-shadow: 0 0 0 0.2rem transparent;
      }

      .ant-select-selection__rendered {
        line-height: 1.47;
        margin-left: 0;
      }
    }

    &.mr5 {
      margin-right: 5px;
    }

    &.ml5 {
      margin-left: 5px;
    }

    &.select-xs {
      .ant-select-selection {
        padding: 0.2rem 0.7rem;
        font-size: 0.75rem;
        height: auto;
      }
    }

    &.select-sm {
      .ant-select-selection {
        padding: 0.313rem 0.844rem;
        font-size: 0.75rem;
        height: auto;
      }
    }

    &.select-mid {
      .ant-select-selection {
        padding: 0.4rem 0.875rem;
        font-size: 0.75rem;
        height: auto;
      }
    }

    &.select-sm {
      .ant-select-selection {
        padding: 0.313rem 0.613rem;
        font-size: 0.75rem;
        height: auto;
      }
    }

    &.select-xs {
      .ant-select-selection {
        padding: 0.2rem 0.5rem;
        font-size: 0.75rem;
        height: auto;
      }
    }

    &.ant-select-disabled {
      .ant-select-selection {
        background: #f5f5f5;
      }
    }
  }
`;

export default StyledSelect;
