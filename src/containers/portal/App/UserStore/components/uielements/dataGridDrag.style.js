import styled from 'styled-components';
import dragHand from 'images/common/widget-icon-draggable.png';

const StyleDataGrid = styled.div`
  font-size: 12px;

  .react-grid-Main {
    outline: none;

    .react-grid-Grid {
      border: 0;
      
      // Header 영역
      .react-grid-Header {
        height: 51px !important;
        box-shadow: none;
        background: #ffffff;
        border-bottom: 1px solid #222222;

        .react-grid-HeaderRow {
          height: 51px !important;
          overflow-y: hidden;

          > div {
            height: 51px !important;

            .react-grid-HeaderCell {
              //height: 50px !important;
              padding: 10px 0 0 0;
              border-right: none;
              border-bottom: none;
              background: #ffffff;
              color: #707070;
              font-size: 13px;
              font-weight: 400;
              line-height: 40px;
              text-align: center;

              > .react-grid-checkbox-container > .react-grid-checkbox-label {
                display: none;
              }
            }
          }
        }
      }

      .react-grid-Viewport {
        top: 51px !important;
        border-bottom: 1px solid #dadbdb;

        .react-grid-Row {
          height: 60px !important;
          
          &:not(:last-child) {
            border-bottom-color: #dadbdb;
          }

          &:hover {
            .rdg-drag-row-handle {
              position: absolute;
              left: 0;
              width: 18px;
              height: 32px;
              background-image: url(${dragHand});
              background-position: 4px 50%;
            }

            .rdg-row-index {
              display: block;
            }
          }

          &.row-context-menu .react-grid-Cell, 
          &:hover .react-grid-Cell {
            background-color: #f5f5f5;
          }

          .react-grid-Cell {
            height: 60px !important;
            // margin: 0 0 13px 0;
            padding-left: 3px;
            padding-right: 3px;
            border-right: none;
            color: #404040;
            text-align: center;

            &:focus {
              outline: none;
            }

            &.editing {
              height: 60px !important;
              margin: 0;
              padding: 14px 3px;
              border-bottom: 1px solid #cccccc;
            }

            .react-grid-Cell__value {
              height: 32px;
              border: 1px solid #cccccc;
              cursor: text;
              line-height: 32px;
              background-color: #ffffff;

              input.editor-main:focus,
              select.editor-main:focus {
                height: 30px !important;
                margin: 0;
                padding: 0 8px !important;
                font-size: 12px;
                border-color: #cccccc;
                border: none;
                border-radius: 0;
              }

              > div > span > div {
                position: relative;
              }
            }

            &.react-grid-Cell--locked, &:nth-child(7) {
              .react-grid-Cell__value {
                padding: 0;
                border: none;
                background-color: transparent;
                cursor: default;
              }
            }

            .drag-handle {
              display: none;
            }

          }
        }
      }

    }
  }

`;

export default StyleDataGrid;
