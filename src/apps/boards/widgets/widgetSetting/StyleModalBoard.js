import styled from 'styled-components';
import iconSearch from 'images/portal/icon-search.png';
import iconIn from 'images/portal/icon-in2.png';
import iconOut from 'images/portal/icon-out.png';

const StyleModalBoard = styled.div`
  position: relative;
  display: flex;
  height: 529px;
  margin-top: 15px;

  .innerBody {
    height: 100%;
    overflow: hidden;
    margin-left: 0 !important;
    margin-right: 0 !important;
    border: 1px solid #c1c1c1;
  }

  .ant-row > div:not(.rightActivity) {
    padding-left: 0 !important;
  }

  .ant-row > div:not(.leftActivity) {
    margin-bottom: 0 !important;
  }

  .leftActivity {
    position: relative;
    width: 693px;
    height: 100%;
    padding: 0 40px 0 0 !important;
    margin-bottom: 0 !important;

    > div:not(.userGridResult, .boardList) {
      // width: 292px;
      margin: 15px 0 15px 15px;
    }

    // 게시판 그룹 영역
    .boardGroupList, .boardList {
      display: flex;
      flex-direction: column;
      height: calc(100% - 30px);
      padding: 0 10px;
      background: #f5f5f5;

      // 검색 폼
      .userSearch {
        height: 45px;
        padding-top: 0;
      }
    }
    
    .secTitle {
      // height: 35px;
      padding: 7px 0;
      border-bottom: 1px solid #dadbdb;
      color: #404040;
      font-size: 13px;
      text-align: center;

      &.noBorder { border-bottom: none; }
    }

    // Data Grid 테이블
    .userGridResult {
      // position: absolute;
      // top: 15px;
      // right: 40px;
      // width: 336px;
      // height: calc(100% - 30px);

      
      .react-grid-Container {

        .react-grid-Grid {
          min-height: 439px !important;
          height: 439px !important;

          .react-grid-HeaderRow {
            width: 100% !important;

            > div {
              width: 100% !important;

              .react-grid-HeaderCell:first-child {
                width: calc(100% - 40px) !important;
              }
            }
          }
          .react-grid-Viewport {
            height: 399px !important;
            
            .react-grid-Row {
              .react-grid-Cell:first-child {
                .listDivImg {
                  border-radius: 6px;
                }
                .contents {
                  width: calc(100% - 90px) !important;
                }
              }
            }
          }
        }

      }
    }
    // 검색 폼
    .userSearch {
      width: 100%;
      height: 58px;
      padding-top: 14px;
      background: #f5f5f5;

      .inputWrapper {
        position: relative;
        // width: 260px;
        width: 100%;
        height: 30px;
        margin: auto;

        .ant-input {
          height: 30px;
          border-color: #c1c1c1;
        }

        .searchButton {
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
  .inBtn, .outBtn {
    position: absolute;
    top: 50%;
    right: 5px;
    width: 26px;
    height: 70px;
    border: 0;
  }

  .leftActivity .inBtn {
    margin-top: -35px;
    background: url(${iconIn}) no-repeat 50% 50%;
  }

  .leftActivity .outBtn {
    margin-top: 6px;
    background: url(${iconOut}) no-repeat 50% 50%;
  }

  .rightActivity {
    position: relative;
    width: 365px;
    height: 100%;
    padding: 15px 15px 15px 0 !important;
    border: none;
  }
`;

export default StyleModalBoard;
