import styled from 'styled-components';

const StyleAppStore = styled.div`
  // max-width: 1200px;
  max-width: 1450px;
  min-width: 900px;
  width: 100%;
  margin: 12px auto 0;

  @media only screen and (max-width: 1660px) {
    padding: 0 20px;
  }

  @media only screen and (max-width: 1280px) {
    width: 900px;

    .pageContent {
      height: 100vh !important;
    }
  }

  .appstoreTreeWrapper {
    float: left;
    width: 312px;
    height: calc(100vh - 160px);
    padding-top: 10px;
    padding-left: 10px;
    margin-top: 10px;
    background: #f5f5f5;

    // > div > div:not(.ant-select) {max-height: 480px;}
    > div > div:not(.ant-select) {max-height: calc(100vh - 170px)}

    @media only screen and (max-width: 1280px) {
      > div > div:not(.ant-select) {
        height: calc(100vh - 45px) !important;
      }
    }

    .ant-select {width: calc(100% - 10px);}
  }

  .appstoreContents {
    float: right;
    width: calc(100% - 332px);

    h4 {
      height: 40px;
      margin-top: 10px;
      color: #404040;
      font-size: 14px;
      line-height: 40px;
      text-align: center;
    }

    .custom-scrollbar {
      // max-height: 160px !important;
      border-top: 1px solid #222222;

      @media only screen and (max-width: 1280px) {
        max-height: 120px !important;
      }

      > div:first-child {
        // max-height: 212px !important;
      }
    }

    //새 위젯 추가
    .addNew {
      height: 100px !important;

      .isoWidgetsWrapper {
        border-color: transparent;
        background: transparent;
        text-align: center;

        .widgetBody {
          height: 100% !important;
          cursor: default;
        }
      }
    }
  }
  .buttonWrapper {
    float: right;
    // width: calc(100% - 332px);
    text-align: right;
    padding: 20px 0 0;

    > button {
      margin-left: 10px;
    }
  }
`;

export default StyleAppStore;
