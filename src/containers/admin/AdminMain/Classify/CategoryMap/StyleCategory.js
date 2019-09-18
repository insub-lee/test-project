import styled from 'styled-components';
import iconSearch from 'images/common/icon-search2.png';

const StyleCategory = styled.div`
  max-width: 1200px;
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

  .categoryTreeWrapper {
    float: left;
    width: 312px;
    height: calc(100vh - 170px);
    padding-top: 10px;
    padding-left: 10px;
    margin-top: 10px;
    background: #f5f5f5;

    > div > div:not(.ant-select) {
      max-height: 480px;
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
    width: calc(100% - 332px);
    text-align: right;
    padding: 20px 0 0;

    > button {
      margin-left: 10px;
    }
  }

  .searchWrapper {
    position: relative;
    width: 100%;
    height: 30px;
    padding-right: 10px;
    /* float: right; */

    > input {
      position: relative;
      border: 1px solid #e5e5e5;
      padding: 0.5rem 0.875rem;
      padding-right: 30px;
      font-size: 0.8125rem;
      height: calc(1.47em + 1rem + 2px);
    }

    > .searchBtn {
      position: absolute;
      top: 4px;
      right: 10px;
      width: 30px;
      height: 30px;
      border: 0;
      background: url(${iconSearch}) no-repeat 50% 50%;
      background-size: 50% 50%;
      cursor: pointer;
    }
  }
`;

export default StyleCategory;
