import styled from 'styled-components';
import IconUpload from 'images/common/icon-upload-image.png';

const WidgetSettingStyle = styled.div`
  
  .viewType {
    height: 50px;
    padding-top: 8px;
    line-height: 1;
  }

  .bannerRegForm {
    margin-top: 10px;

    .draggableDiv {
      position: relative;
      height: 140px;
      padding: 10px 63px 10px 69px;
      background: #ffffff;
      border: 1px solid #d8d8d8;
      cursor: n-resize;
  
      > table {

        td {
          height: 50px;
          padding: 0 !important;
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
            width: 100px;
            height: 32px;
            padding-left: 20px;
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
        width: calc(100% - 100px);
        height: 32px;
        border: 1px solid #cccccc;
        border-radius: 0;
        vertical-align: middle;

        &:focus {
          border-color: #cccccc;
        }
      }

      .dnd {
        position: absolute;
        top: 0;
        left: 0;
        opacity: 0.5;
        width: 69px;
        cursor: n-resize;

        &:focus {
          opacity: 1;
        }
      }

      .delete {
        position: absolute;
        top: 0;
        right: 0;
        opacity: 0.5;

        &:focus, &:hover {
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

export default WidgetSettingStyle;
