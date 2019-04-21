import styled from 'styled-components';
import SelectArrow from '../../images/common/icon-select-arrow-down.png';

const AntSelect = ComponentName => styled(ComponentName)`

  &.ant-select {
    box-sizing: border-box;
    display: inline-block;
    position: relative;
    color: #404040;
    font-size: 13px;

    .ant-select-selection {
      background-color: #fff;
      border-radius: 4px;
      border: 1px solid #c1c1c1;

      &.ant-select-selection--single {
        height: 30px;
        position: relative;
        cursor: pointer;
      }

      .ant-select-selection__rendered {
        margin-left: 10px;
        margin-right: 10px;
        line-height: 29px;
      }

      .ant-select-arrow {

        &:before {
          content: '';
          width: 10px;
          height: 6px;
          margin-top: 3px;
          background: url(${SelectArrow}) 0 0;
        }
      }

      &:hover {
        border-color: #c1c1c1;
      }
    }

    &.ant-select-focused {
      .ant-select-selection {
        &:focus, &:active {
          border-color: #c1c1c1 !important;
          outline: 0;
        }
      }
    }

    &.ant-select-open {
      .ant-select-selection {
        border-color: #c1c1c1;
        outline: 0;
      }
    }

    .ant-select-selection--multiple > ul > li,
    .ant-select-selection--multiple .ant-select-selection__rendered > ul > li {
      margin-top: 4px;
      height: 26px;
      line-height: 26px;
    }

    .ant-select-tree li a {
      font-size: 13px;
    }
  }
`;

const AntSelectOption = ComponentName => styled(ComponentName)`
`;

export { AntSelect, AntSelectOption };
