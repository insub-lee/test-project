import styled from 'styled-components';
// import DnDIcon from '../../../images/common/widget-icon-draggable.png';

const WidgetSettingStyle = styled.div`
  
  .viewType {
    height: 50px;
    border-bottom: 1px solid #333333;
    line-height: 50px;
  }

  .mailRegForm {
    &:first-child {
      margin-top: 10px;
    }

    margin-top: 1px;

    .draggableDiv {
      position: relative;
      padding: 12px 20px 12px 30px;
      background: #f5f5f5;
      cursor: n-resize;
  
      table {
        td {
          height: 32px;
          color: #404040;
          font-size: 13px;

          label {
            letter-spacing: -0.7px;
          }

          button {
            vertical-align: top;
          }
        }

        tr:not(.last){
          td {
            padding: 0 0 8px 0;
          }
        }
      }

      .dnd {
        position: absolute;
        top: 0;
        left: 0;
        opacity: 0.5;
        width: 27px;
        cursor: default;
        // background: url($/*{DnDIcon}*/) no-repeat 0 50%;

        &:focus {
          opacity: 1;
        }
      }

      .delete {
        position: absolute;
        top: 0;
        right: 5px;
        opacity: 0.5;

        &:focus, &:hover {
          opacity: 1;
        }
      }
    }

  }

  .btnWrapper {
    margin: 10px 0 20px;
    text-align: center;
  }

  .guideList {
    margin: 3px 0 15px;
  }

  .guideTitle, .guideList {
    color: #404040;
    font-size: 11px;
  }

  /* 나중에 분리 */
  .ant-input {
    width: 260px;
    height: 32px;
    border: 1px solid #cccccc;
    border-radius: 0;

    &:focus {
      border-color: #cccccc;
    }
  }
  
  .widgetSettingFooter {
    text-align: center;
    position: absolute;
    bottom: 20px;
    right: 20px;
  }
`;

export default WidgetSettingStyle;
