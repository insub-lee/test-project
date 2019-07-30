import styled from 'styled-components';

const StyleDataGrid = styled.div`
  font-size: 12px;

  .react-grid-Main {
    outline: none;

    .react-grid-Grid {
      border: 0;
      
      // Header 영역
      .react-grid-Header {
        height: 47px !important;
        box-shadow: none;
        background: #ffffff;
        border-bottom: 2px solid #e9e9e9;

        .react-grid-HeaderRow {
          height: 47px !important;
          overflow-y: hidden;

          > div {
            height: 45px !important;

            .react-grid-HeaderCell {
              height: 45px !important;
              padding: 0;
              border-right: none;
              border-bottom: none;
              background: #ffffff;
              color: #212529;
              font-weight: 600;
              line-height: 45px;
              text-align: center;
              font-size: .8125rem;

              &:nth-child(2), &:nth-child(3), &:nth-child(4), &:nth-child(5) {
                text-align: left;
                padding-left: 10px;
              }
              
              > .react-grid-checkbox-container > .react-grid-checkbox-label {
                // top: 5px !important;
                transform: translateY(0);
                top: 0 !important;
              }
            }
          }
        }
      }

      .react-grid-Cell:focus{outline:0px solid #66afe9;outline-offset:-2px}
      .react-grid-Viewport {
        top: 47px !important;
        border-bottom: 1px solid #dadbdb;

        .react-grid-Row {
          // 스크롤 버그 확인용 주석
          // height: 45px !important;

          .react-grid-Cell {
            // 스크롤 버그 확인용 주석
            // height: 45px !important;
            padding-left: 0;
            padding-right: 0;
            border-right: none;
            border-bottom-color: #e9e9e9;
            color: #404040;
            text-align: center;

            &:nth-child(2), &:nth-child(3), &:nth-child(4), &:nth-child(5) {
              text-align: left;
              padding: 0 10px;
            }

            &:nth-child(3), &:nth-child(4), &:nth-child(5) {
              div {
                text-overflow: ellipsis;
                white-space: nowrap;
                overflow: hidden;
              }
            }
          }
        }
      }

      // checkbox style
      // 1. 기존 style reset
      .radio-custom+.radio-custom-label:before,
      .react-grid-checkbox+.react-grid-checkbox-label:before {
        height: 16px;
        border: none;
        background-color: transparent;
      }

      .react-grid-checkbox:checked+.react-grid-checkbox-label:before {
        background-color: transparent;
        box-shadow: none;
      }

      .radio-custom+.radio-custom-label, 
      .react-grid-checkbox+.react-grid-checkbox-label {
        position: relative;
        width: 13px;
        height: 13px;
        border: none;
        border: 1px solid #707070;
        background-color: #ffffff;
      }

      .react-grid-checkbox:checked+.react-grid-checkbox-label:before {
        position: absolute;
        top: 1px;
        left: 4.7px;
        display: table;
        width: 5.71428571px;
        height: 9.14285714px;
        border: 2px solid #707070;
        border-top: 0;
        border-left: 0;
        background-color: #ffffff;
        transform: rotate(45deg) scale(1);
      }

    }
  }
  // admin > 다국어 메시지
  &.globalLang {
    //체크박스 checked 위치
    .react-grid-checkbox:checked+.react-grid-checkbox-label:before {
      top: 0 !important;
      left: 3px !important;
    }
  }
`;

export default StyleDataGrid;
