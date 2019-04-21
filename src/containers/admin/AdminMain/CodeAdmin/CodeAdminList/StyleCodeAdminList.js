import styled from 'styled-components';
import iconSearch from '../../../../../images/common/icon-search2.png';

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

  .react-grid-HeaderCell {
    .react-grid-HeaderCell-sortable {
      text-align: left;
    }

    
    &.react-grid-HeaderCell--locked {
      padding-left: 0 !important;
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

  // sortable icon
  .pull-right {
    // margin-right: 5px;
    font-size: 10px;
  }

  // cell에서 생략부호 보여주기
  .react-grid-Cell__value div span format,
  .react-grid-Cell__value div span div:not(.checkbox-align) {
    display: block;
    text-align: left;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }

  // 링크 표시 (등록일자 제외)
  .react-grid-Cell:not(:nth-child(4)) .react-grid-Cell__value div span format {
    cursor: pointer;
  }
`;

export default StyleAdminList;
