import styled from 'styled-components';
import imformationIcon from 'images/bizstore/no-result_sm.png';
import iconSearch from 'images/common/icon-search2.png';

const StyleAppOpinion = styled.div`
  max-width: 1200px;
  min-width: 900px;
  width: 100%;
  margin: 20px auto;

  @media only screen and (max-width: 1440px) {
    width: 1050px;
  }

  @media only screen and (max-width: 1280px) {
    width: 900px;
  }

  .searchBox {
    width: 100%;
    padding: 20px 24px;
    border: 4px solid #efefef;

    .searchWrapper {
      position: relative;
      width: 246px;
      height: 30px;
      float: right;

      > input {
        position: relative;
        padding-right: 30px;
        border: 1px solid #c1c1c1;
        font-size: 13px;
      }

      > .searchBtn {
        position: absolute;
        top: 0;
        right: 0;
        width: 30px;
        height: 30px;
        border: 0;
        background: url(${iconSearch}) no-repeat 50% 50%;
        background-size: 50% 50%;
        cursor: pointer;
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

        .react-grid-HeaderCell {
          &:nth-child(4),
          &:nth-child(5),
          &:nth-child(6),
          &:nth-child(7),
          &:nth-child(8) {
            text-align: left !important;
            padding-left: 10px !important;
          }
        }

        .react-grid-Canvas {
          // height: calc(100vh - 306px) !important;
        }
      }
    }
  }

  // Data Grid 링크 효과
  .react-grid-Row {
    // cursor: pointer;
    .react-grid-Cell {
      &:nth-child(4),
      &:nth-child(5),
      &:nth-child(6),
      &:nth-child(7),
      &:nth-child(8) {
        text-align: left !important;
        padding-left: 10px !important;
      }

      a {
        color: #404040;
        &:hover {
          color: #404040;
        }
      }
    }
  }

  .buttonWrapper {
    width: 100%;
    padding: 20px 0 0;
    text-align: right;
  }

  .inform {
    width: 100%;
    heigth: 100%;
    background: url(${imformationIcon}) no-repeat 50% 50%;
  }

  .rdg-cell-action-last {
    margin-right: 0;
  }
`;

export default StyleAppOpinion;
