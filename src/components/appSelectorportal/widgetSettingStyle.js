import styled from 'styled-components';
import DeleteApp from '../../images/common/icon-delete.png';
import DnDIcon from '../../images/common/widget-icon-draggable.png';

const WidgetSettingStyle = styled.div`
  width: 100%;

  .titleTxt {
    padding: 12px 0 10px;
    color: #808080;
    font-size: 13px;
  }

  .dndTblWrapper {
    padding: 5px 10px 0 10px;
    background: #f5f5f5;

    // > div {
    //   cursor: n-resize;
    // }
  }

  .widgetSettingFooter {
    text-align: right;
    position: absolute;
    bottom: 21px;
    right: 20px;
  }

  .dndItemWrapper {
    height: 40px;
    padding: 0;

    > table {
      display: inline-block;
      width: 100%;

      .dndTBody, tr, td {
        display: inline-block;
        width: 100%;
  
        .dndItem {
          position: relative;
          height: 40px;
          padding: 7px 50px 8px;
          line-height: 1.1;
          cursor: n-resize;

          .delApp {
            position: absolute;
            top: 0;
            right: 0;
            @media screen and (-ms-high-contrast: active), (-ms-high-contrast: none) {  
              /* IE10+ specific styles go here */
              right: 10px;
            }
            width: 50px;
            height: 40px;
            background: url(${DeleteApp}) no-repeat 50% 10px;
          }
        }
      }
    }
  }
`;

export default WidgetSettingStyle;
