import styled from 'styled-components';

const Wrapper = styled.div`
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

  //padding: 48px;
  //width: 100%;
  //height: 100%;

  .title {
    position: relative;
    .action-buttons {
      position: absolute;
      top: 0;
      right: 0;
    }
  }

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

  .react-grid-Main {
    outline: none;

    .react-grid-Grid {
      border: 0;

      .react-grid-Header {
        height: 41px !important;
        box-shadow: none;
        background: #ffffff;
        border-bottom: 1px solid #222222;

        .react-grid-HeaderRow {
          height: 41px !important;
          overflow-y: hidden;

          > div {
            height: 41px !important;

            .react-grid-HeaderCell {
              //height: 40px !important;
              padding: 0;
              border-right: none;
              border-bottom: none;
              background: #ffffff;
              color: #707070;
              font-weight: 400;
              line-height: 40px;
              text-align: center;

              &:nth-child(2),
              &:nth-child(3),
              &:nth-child(4),
              &:nth-child(5) {
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

      .react-grid-Cell:focus {
        //outline: 0px solid #66afe9;
        //outline-offset: -2px;
        outline: none;
      }

      .react-grid-Viewport {
        top: 41px !important;
        border-bottom: 1px solid #dadbdb;

        .react-grid-Row {
          height: 38px !important;

          .react-grid-Cell {
            height: 38px !important;
            padding-left: 0;
            padding-right: 0;
            border-right: none;
            border-bottom-color: #dadbdb;
            color: #404040;
            text-align: center;

            &:nth-child(2),
            &:nth-child(3),
            &:nth-child(4),
            &:nth-child(5) {
              text-align: left;
              padding: 0 10px;
            }

            &:nth-child(3),
            &:nth-child(4),
            &:nth-child(5) {
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
      .radio-custom + .radio-custom-label:before,
      .react-grid-checkbox + .react-grid-checkbox-label:before {
        height: 16px;
        border: none;
        background-color: transparent;
      }

      .react-grid-checkbox:checked + .react-grid-checkbox-label:before {
        background-color: transparent;
        box-shadow: none;
      }

      .radio-custom + .radio-custom-label,
      .react-grid-checkbox + .react-grid-checkbox-label {
        position: relative;
        width: 13px;
        height: 13px;
        border: 1px solid #707070;
        background-color: #ffffff;
      }

      .react-grid-checkbox:checked + .react-grid-checkbox-label:before {
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

  .rdg-selected {
    border: none;
  }
`;

export default Wrapper;
