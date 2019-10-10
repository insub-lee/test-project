import styled from 'styled-components';
import iconSearch from '../../../../../images/common/icon-search2.png';

const StyleMyAppList = styled.div`
  max-width: 1200px;
  min-width: 900px;
  width: 100%;
  margin: 20px auto 0;

  @media only screen and (max-width: 1440px) {
    width: 1050px;
  }

  @media only screen and (max-width: 1280px) {
    width: 900px;
  }

  .pageTitle {
    color: #404040;
    font-size: 17px;
    margin-bottom: 8px;
  }

  .searchBox {
    width: 100%;
    /* padding: 20px 24px; */
    /* border: 1px solid #d6d3da; */
    text-align: right;
    /* background: #f7f7f7; */
    /* border-radius: 3px; */
    margin-bottom: 15px;

    .searchWrapper {
      position: relative;
      width: 246px;
      height: 30px;
      float: right;

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
        right: 0;
        width: 30px;
        height: 30px;
        border: 0;
        background: url(${iconSearch}) no-repeat 50% 50%;
        background-size: 50% 50%;
        cursor: pointer;
      }
    }

    .ant-select {
      margin-right: 5px;
      .ant-select-selection.ant-select-selection--single {
        height: calc(1.27em + 1rem + 2px);
        .ant-select-selection__rendered {
          line-height: calc(1.27em + 1rem + 2px);
        }
      }
    }
  }

  //테이블 높이
  .react-grid-Container {
    width: 100% !important;
    height: calc(100vh - 265px);

    .react-grid-Main {
      height: 100%;

      .react-grid-Grid {
        height: 100%;
      }
    }
  }

  // Data Grid 링크 효과
  .react-grid-Row {
    // cursor: pointer;
    .react-grid-Cell a {
      color: #404040;
      &:hover {
        color: #404040;
      }
    }
  }

  .buttonWrapper {
    width: 100%;
    padding: 20px 0 0;
    text-align: right;
  }
`;

export default StyleMyAppList;
