import styled from 'styled-components';
import iconSearch from 'images/common/icon-search2.png';
import iconDelete from 'images/common/icon-delete.png';
import iconAddRow from 'images/common/widget-icon-add.png';

const StyleServiceDtl = styled.div`
max-width: 400px;
min-width: 400px;
width: 100%;
margin: 20px auto;

@media only screen and (max-width: 1660px) {
  padding: 0 20px;
}

@media only screen and (max-width: 1280px) {
  width: 900px;
  padding:  0;
}

  .searchBox {
    width: 100%;
    height: 70px;
    padding-top: 16px;
    padding-right: 20px;
    margin-top: 20px;
    border: 4px solid #efefef;
    text-align: right;

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

  .deleteRow {
    width: 25px;
    height: 32px;
    background: url(${iconDelete}) no-repeat 50% 50%;
    @media screen and (-ms-high-contrast: active), (-ms-high-contrast: none) {
      background: url(${iconDelete}) no-repeat 0 50%;
    }
    cursor: pointer;
  }

  .buttonWrapper {
    position: relative;
    padding-top: 16px;
    text-align: right;

    button {
      margin-left: 10px;
    }

    .addRow {
      position: absolute;
      left: 50%;
      width: 24px;
      height: 24px;
      margin-left: -12px;
      border: 1px solid #909090;
      border-radius: 50%;
      background: url(${iconAddRow}) no-repeat 50% 50%;
    }
  }

  // 어드민 공통코드 상세 페이지
  .modeD {
    .react-grid-Row {
      &:hover {
        .rdg-drag-row-handle {
          display: none;
          cursor: default;
        }

        .rdg-row-index {
          display: block;
        }
      }

      &.row-context-menu .react-grid-Cell, 
      &:hover .react-grid-Cell {
        background-color: #ffffff !important;
      }

      .react-grid-Cell__value {
        border: none !important;
        cursor: default !important;
      }
    }
  }

`;

export default StyleServiceDtl;
