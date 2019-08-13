import styled from 'styled-components';
import DeleteApp from 'images/common/icon-delete.png';
import IconDraggable from 'images/common/widget-icon-draggable.png';

const SelectedUser = styled.div`
  padding: 0 10px 0 9px;
  border: 2px solid #c1c1c1;

  // 선택목록 
  .SUTitle {
    position: relative;
    height: 33px;
    padding-left: 6px;
    border-bottom: 1px solid #cdcdcd;
    color: #404040;
    font-size: 13px;
    line-height: 33px;
    text-align: center;
    letter-spacing: -0.5px;

    h3 {
      font-size: 13px;
      line-height: 29px;
    }
  }

  .selectedBoardList {
    margin-top: 5px;
    overflow: hidden;
    color: #404040;
    font-size: 13px;

    .react-grid-Main {
      outline: none;

      .react-grid-Grid {
        border: none;

        .react-grid-Viewport {
          .react-grid-Canvas {
            overflow: hidden;
            &::-webkit-scrollbar { width: 0 !important }

            .react-grid-Row {
              //column width 강제 조정
              .react-grid-Cell {
                padding-left: 0;
                padding-right: 0;
                border-right: none;
                border-bottom: none;

                &:first-child {
                  //left: 20px !important;
                  width: calc(100% - 20px) !important;
                }

                &:nth-child(2) {
                  left: calc(100% - 30px) !important;
                  right: 0 !important;
                  text-align: right;
                }

                &.rdg-row-actions-cell.react-grid-Cell--locked {
                  width: 20px !important;
                  text-indent: -9999px;
                }
              }

              &:hover .rdg-drag-row-handle {
                width: 20px;
                background-image: url(${IconDraggable});
                background-position: 50% 50%;
                opacity: 0.2;
              }
            }
          }
        }
      }
    }

    .delApp {
      position: relative;
      @media screen and (-ms-high-contrast: active), (-ms-high-contrast: none) {  
        /* IE10+ specific styles go here */
        padding-right: 10px;
      }
      width: 30px;
      height: 35px;
      background: url(${DeleteApp}) no-repeat 50% 50%;
    }
  }

`;

export default SelectedUser;
