import styled from 'styled-components';
import closeImg from '../../../images/icon_pclose.png';

const Styled = styled.div`
  .pop_tit {
    height: 50px;
    line-height: 50px;
    padding: 0 22px;
    background: #4491e0;
    font-size: 19px;
    font-weight: 500;
    color: white;
    position: relative;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;

    .icon.icon_pclose {
      text-indent: -9999px;
      display: inline-block;
      vertical-align: middle;
      width: 30px;
      height: 30px;
      background: url(${closeImg}) no-repeat center;
      border-radius: 100%;
      border: 1px solid white;
      position: absolute;
      right: 20px;
      top: 50%;
      margin-top: -15px;
      display: none;
    }
  }

  .pop_con {
    position: relative;
    background-color: rgb(255, 255, 255);
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    padding: 10px 30px;
    .tableBody {
      margin-bottom: 10px;
      border-width: 2px 1px 1px;
      border-style: solid;
      border-color: rgb(153, 153, 153) rgb(221, 221, 221) rgb(221, 221, 221);
      border-image: initial;
      border-top: 2px solid rgb(153, 153, 153);
      padding: 5px;
      .ant-col {
        font-size: 12px;
        color: rgb(0, 0, 0);
        padding: 5px 10px;

        &.viewEditorCol {
          border: solid 1px #e2e2e2;
        }
        .ant-input {
          border-top-style: initial;
          border-right-style: initial;
          border-left-style: initial;
          border-top-color: initial;
          border-right-color: initial;
          border-left-color: initial;
          height: 30px;
          line-height: 30px;
          color: rgb(51, 51, 51);
          vertical-align: middle;
          font-size: 12px;
          border-width: 0px 0px 1px;
          border-image: initial;
          border-bottom: 1px solid rgb(217, 224, 231);
          border-radius: 0px;
          padding: 0px 10px;
          .ant-input:read-only {
            background: rgb(243, 243, 243);
          }
        }
        .ant-select .ant-select-selection {
          border-top-style: initial;
          border-right-style: initial;
          border-left-style: initial;
          border-width: 0px 0px 1px;
          border-image: initial;
          border-bottom: 1px solid;
          border-radius: 0px;
          border-color: rgb(217, 224, 231) !important;
          .ant-select-selection__placeholder {
            font-size: 12px;
          }
          .ant-select-arrow {
            transform: translateY(-50%);
            right: 0px;
            margin-top: -2px;
            border-width: 1px;
            border-style: solid;
            border-color: rgb(217, 224, 231);
            border-image: initial;
            padding: 3px;
            background: rgb(255, 255, 255);
          }
        }
      }
    }
  }

  .alignCenter {
    text-align: center;
  }
  .alignLeft {
    text-align: left;
  }
  .alignRight {
    text-align: right;
  }

  .compBase {
    cursor: pointer;
    border: #ffffff 4px solid;
    height: 100%;
    &:hover {
      border: #c8c8c8 4px dotted;
    }
    &.active {
      border: #c8c8c8 4px solid;
    }
  }

  .compConfig {
    .toolbar-item {
      cursor: pointer;
    }
  }
`;

export default Styled;
