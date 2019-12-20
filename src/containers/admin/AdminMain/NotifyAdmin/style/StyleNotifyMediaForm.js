import styled from 'styled-components';
import IconUpload from 'images/common/icon-upload-image.png';

const StyleNotifyImgForm = styled.div`
  .btnReg {
    .containerDiv {
      > table {
        td {
          label.label {
            padding-left: 0;
          }
        }
      }
    }
  }

  .imgReg {
    .containerDiv {
      > table {
        td {
          label.label {
            padding-left: 15px;
          }
        }
      }
    }
  }

  .mediaRegForm {
    margin-bottom: 10px;

    .containerDiv {
      position: relative;
      height: 120px;
      padding: 10px 25px 10px 15px;
      background: #ffffff;
      border: 1px solid #d8d8d8;
      cursor: pointer;

      > table {
        td {
          height: 50px;
          padding: 0 !important;
          border-bottom: none;
          color: #404040;
          font-size: 13px;

          &.up {
            padding: 10px 0 5px 0;
          }

          &.down {
            padding: 5px 0 10px 0;
          }

          .dropzone {
            background: #f5f5f5 url(${IconUpload}) no-repeat 50% 50%;
          }

          label.label {
            display: inline-block;
            width: 65px;
            height: 32px;
            letter-spacing: -0.7px;
            vertical-align: middle;
            line-height: 32px;
          }

          button {
            vertical-align: top;
          }
        }
      }

      /* 나중에 분리 */
      .ant-input {
        width: calc(100% - 65px);
        height: 32px;
        border: 1px solid #cccccc;
        border-radius: 0;
        vertical-align: middle;

        &:focus {
          border-color: #cccccc;
        }
      }

      .delete {
        position: absolute;
        top: 0;
        right: 0;
        opacity: 0.5;

        &:focus,
        &:hover {
          opacity: 1;
        }
      }
    }
  }

  .btnWrapper {
    padding: 15px 0;
    text-align: center;
  }
`;

export default StyleNotifyImgForm;
