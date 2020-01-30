import styled from 'styled-components';

import iconFiedlCheck from 'images/workbuilder/iconCheckbox_wb.png';
import iconFieldImg from 'images/workbuilder/iconImg_wb.png';
import iconFieldSelect from 'images/workbuilder/iconSelect_wb.png';
import iconSetting from 'images/workbuilder/iconSetting_wb.png';
import iconTrash from 'images/workbuilder/iconTrash_wb.png';

const Styled = styled.div`
  display: inline-block;
  width: 100%;
  .compConfigDiv {
    position: relative;
    display: inline-block;
    &.compConfigRow {
      width: 100%;
    }
    &.compConfigCol {
      &.wid100 {
        width: calc(100% - 18px);
      }
      &.wid100-28 {
        width: calc(100% - 36px);
      }
      &.wid50 {
        width: calc(50% - 18px);
      }
      &.wid28px {
        width: 28px;
      }
      &.wid14px {
        width: 14px;
      }
      &.buttonWrapper {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        right: 0;
        .toolbar-item {
          cursor: pointer;
          display: inline-block;
          vertical-align: middle;
          &.iconSetting {
            background: url(${iconSetting}) no-repeat center;
            background-size: 100%;
            width: 14px;
            height: 14px;
            margin-right: 5px;
          }
          &.iconTrash {
            background: url(${iconTrash}) no-repeat center;
            background-size: 100%;
            width: 13px;
            height: 15px;
          }
        }
      }
    }
    .iconField {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      left: 0;
      display: inline-block;
      width: 16px;
      height: 16px;
      &.iconFieldCheck {
        background: url(${iconFiedlCheck}) no-repeat center;
        background-size: 100%;
      }
      &.iconFieldImg {
        background: url(${iconFieldImg}) no-repeat center;
        background-size: 100%;
      }
      &.iconFieldSelect {
        background: url(${iconFieldSelect}) no-repeat center;
        background-size: 100%;
        width: 25px;
      }
    }
    .componentTit {
      font-size: 13px;
      color: #000;
      padding-left: 22px;
    }
  }
  .compTitleWrapper {
    border-top: 1px solid #ced4da;
    padding-top: 6px;
    margin-top: 6px;
    > p {
      font-size: 13px;
      font-weight: 400;
      color: #000;
    }
  }
  &.popoverWrapper {
    display: block;
    border: 1px solid #a646be;
    padding: 15px;
    border-radius: 3px;
    .popoverItem.popoverItemInput {
      position: relative;
      margin-bottom: 10px;
      padding-left: 150px;
      &:last-child {
        margin-bottom: 0;
      }
      span.spanLabel {
        font-size: 13px;
        color: #000;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        left: 0;
      }
      input {
        border: 1px solid #aaa;
        border-radius: 0;
      }
    }
    .popoverInnerInput {
      padding-bottom: 10px;
      .popoverItem {
        .wid50 {
          width: 50%;
          display: inline-block;
        }
        .ant-input-number-input {
          width: 100%;
          height: 32px;
          padding: 0 11px;
          text-align: left;
          background-color: rgba(0, 0, 0, 0);
          border: 0;
          border-radius: 4px;
          outline: 0;
          -webkit-transition: all 0.3s linear;
          transition: all 0.3s linear;
          -moz-appearance: textfield !important;
        }
        .ant-input-number {
          height: 35px;
        }
      }
    }
    .popoverInner {
      border-top: 1px solid #ddd;
      padding: 10px 0 5px;
      .popover-tit {
        color: #666666;
        font-size: 16px;
        font-weight: 600;
        margin-bottom: 8px;
        &::before {
          content: '';
          background: url(${iconSetting}) no-repeat center;
          background-size: 100%;
          width: 14px;
          height: 14px;
          margin-right: 5px;
          display: inline-block;
        }
      }
      .popoverInnerCom {
        border: 1px solid #adb5bd;
        background: #f1f3f5;
        padding: 12px 20px;
      }
    }
  }
  .ant-popover-inner {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
    .ant-popover-inner-content {
      padding: 3px;
    }
  }
`;

export default Styled;
