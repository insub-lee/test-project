import styled from 'styled-components';
import DeleteItem from '../../../images/common/widget-icon-delete.png';
import DnDIcon from '../../../images/common/widget-icon-draggable.png';

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

    // 화면 너비가 100%될 때
    @media only screen and (max-width: 650px) {
      // width: 100% !important;
    }

    > div {
      cursor: n-resize;
    }
  }

  .widgetSettingFooter {
    text-align: right;
    position: absolute;
    bottom: 21px;
    right: 20px;
  }

  .dndItemWrapper {
    height: 30px;
    padding: 0;

    td.tableItem {
      position: relative;
      padding: 0 30px;
      color: #404040;
      font-size: 13px;

      .dndIcon {
        position: absolute;
        top: 0;
        left: 0;
        display: inline-block;
        width: 8px;
        height: 100%;
        background: url(${DnDIcon}) no-repeat 0 50%;
        opacity: 0.3;
      }

      .deleteItem {
        position: absolute;
        top: 0;
        right: 0;
        width: 20px;
        height: 30px;
        background: url(${DeleteItem}) no-repeat 50% 50%;
        opacity: 0.3;

        &:hover {
          opacity: 1;
        }
      }
    }
  }
`;

export default WidgetSettingStyle;
