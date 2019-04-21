import styled from 'styled-components';

const WidgetSettingStyle = styled.div`
  width: 100%;
  max-height: 600px;
  position: relative;

  .contentWrapper {
    width: 100%;
  }

  .btnWrapper {
    margin: 10px 0 20px;
    text-align: center;
  }

  .widgetSettingFooter {
    text-align: right;
    position: absolute;
    bottom: -45px;
    right: 0px;
  }

  .orgActivityInnerBody {
    .leftActivity {
      width: calc(100% - 33.3333% - 15px) !important

      ul.nav-tabs {
        width: calc(100% - 30px);
      }

      .tab-content {
        width: 46%;

        .members > div:not(.userGridResult) {
          width: 100% !important;

          .inputWrapper {
            width: 100% !important;
          }
        }
      }

      .userGridResult {
        width: calc(100% - 46% - 60px);

        .inputWrapper {
          width: calc(100% - 30px) !important;
        }

        .react-grid-Container {
          width: 100%;
        }
      }
    }
  
    .rightActivity {
      width: 33.3333% !important;
    }
  }
`;

export default WidgetSettingStyle;
