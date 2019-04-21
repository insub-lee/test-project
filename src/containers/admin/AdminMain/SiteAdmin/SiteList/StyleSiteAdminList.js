import styled from 'styled-components';
import iconSearch from 'images/common/icon-search2.png';

const StyleAdminList = styled.div`
  max-width: 1200px;
  min-width: 900px;
  width: 100%;
  margin: 12px auto 0;

  @media only screen and (max-width: 1660px) {
    padding: 0 20px;
  }

  @media only screen and (max-width: 1280px) {
    width: 900px;
  }

  .pageTitle {

    .searchBox {
      display: inline-block;
      float: right;
      width: auto;
      padding: 0;

      .selectOpt {
        width: 120px;
        margin-right: 10px;
        float: left;

        &:after {
          content: " ";
          display: block;
          clear:both;
        }
      }

      .searchWrapper {
        position: relative;
        display: inline-block;
        width: 246px;
        height: 32px;

        > input {
          position: relative;
          float: left;
          padding-right: 30px;
          border: 1px solid #c1c1c1;
          border-radius: 4px;
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
  }

  // 텍스트 좌측 정렬
  .react-grid-HeaderCell-sortable, .react-grid-Cell__value {
    text-align: left;
  }

  .react-grid-Cell__value {
    padding-left: 5px;
  }

  // sortable icon
  .pull-right {
    margin-right: 5px;
    font-size: 10px;
  }

  //테이블 헤더 체크박스 
  .react-grid-HeaderCell.react-grid-HeaderCell--locked {
    padding-left: 0 !important;

    .react-grid-checkbox-label {
      left: 2px;
    }
  }

  //테이블 높이
  .react-grid-Container {
    width: 100% !important;
    height: calc(100vh - 210px);

    .react-grid-Main {
      height: 100%;

      .react-grid-Grid {
        height: 100%;
      }
    }
  }

  // cell에서 생략부호 보여주기
  .react-grid-Cell__value div span hltext,
  .react-grid-Cell__value div span div {
    display: block;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }

  // 링크 표시
  .react-grid-Cell__value div span hltext {
    cursor: pointer;
  }
`;

export default StyleAdminList;
