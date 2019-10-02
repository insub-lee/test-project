import styled from 'styled-components';

const StyleCategoryManage = styled.div`
  padding-top: 12px;

  .categoryWrapper {
    max-width: 1200px;
    min-width: 900px;
    width: 100%;
    margin: 0 auto;
    background-color: #ffffff;
    display: table;
    padding: 15px;
    border: 1px solid rgb(220, 220, 221);

    > .categoryTitleWrapper {
      position: relative;
      height: 50px;
      line-height: 50px;
      > h3 {
        display: inline-block;
        font-weight: 600;
        height: auto;
        line-height: normal;
        border-bottom: 0;
      }
      button {
        position: absolute;
        right: 0px;
        font-size: 12px;
        height: auto;
        box-shadow: none;
        top: 50%;
        transform: translateY(-50%);
      }
    }

    .categoryTreeWrapper {
      float: left;
      width: 312px;
      height: calc(100vh - 160px);
      padding: 10px;
      background: #ece3f1;

      > div > div:not(.ant-select) {
        max-height: 100%;
      }

      @media only screen and (max-width: 1280px) {
        > div > div:not(.ant-select) {
          height: calc(100vh - 45px) !important;
        }
      }

      .ant-select {
        width: calc(100% - 10px);
      }
    }

    .categoryContents {
      float: right;
      width: 100%;
      & > .title {
        position: relative;
        width: 100%;
        background-color: #eef8fe;
        height: 40px;
        line-height: 40px;
        border-top: 1px solid #076dac;
        border-bottom: 1px solid #dcdcdc;
        padding: 0 15px;
        & > h4 {
          position: relative;
          display: inline-block;
          color: #076dac;
          font-size: 15px;
          margin: 0;
          padding: 0;
          font-weight: 600;
          padding-left: 15px;
          &:before {
            content: '';
            display: inline-block;
            width: 10px;
            height: 10px;
            border-radius: 50%;
            background: #fff;
            border: 3px solid #076dac;
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            left: 0px;
          }
        }
      }

      .custom-scrollbar {
        max-height: 160px !important;
        border-top: 1px solid #222222;

        @media only screen and (max-width: 1280px) {
          max-height: 120px !important;
        }

        > div:first-child {
          max-height: 212px !important;
        }
      }
    }
    .buttonWrapper {
      float: right;
      width: 100%;
      text-align: right;
      padding: 20px 0 0;

      > button {
        margin-left: 10px;
      }
    }
    .categoryContentWrapper {
      float: right;
      width: calc(100% - 332px);
    }
    .categoryManageWrapper .ant-affix {
      z-index: 2;
    }
  }

  @media only screen and (max-width: 1660px) {
    padding: 0 20px;
  }

  @media only screen and (max-width: 1280px) {
    width: 900px;

    .pageContent {
      height: 100vh !important;
    }
  }
`;

export default StyleCategoryManage;
