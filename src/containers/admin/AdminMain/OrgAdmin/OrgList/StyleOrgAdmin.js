import styled from 'styled-components';

const StyleOrgAdmin = styled.div`
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

  .modalContents.orgAcivityBody {
    height: calc(100vh - 175px);
    padding: 0;

    .leftActivity {
      width: calc(100% - 415px);

      @media only screen and (max-width: 1280px) {
        width: calc(100% - 345px);
      }

      .tab-content {
        width: auto;
        height: calc(100vh - 249px);

        .members, .pstn, .duty, .grp {
          > div:not(.userGridResult) {
            width: calc(100% - 416px) !important;
            height: calc(100vh - 251px) !important;

            @media only screen and (max-width: 1280px) {
              width: calc(100% - 288px) !important;
            }

            .inputWrapper {
              width: 100% !important;
            }
          }

          // width는 px로 고정
          .userGridResult {
            float: none;
            right: 15px;
            height: calc(100vh - 255px) !important;

            @media only screen and (max-width: 1280px) {
              width: 260px;
            }

            .userSearch .inputWrapper {
              width: calc(100% - 30px);
            }

            > div:not(.userSearch) {
              height: calc(100vh - 307px) !important;

              .react-grid-Grid {
                height: calc(100vh - 309px) !important;

                .react-grid-Header, .react-grid-HeaderRow, .react-grid-HeaderCell {
                  height: 10px !important;
                }

                .react-grid-HeaderRow {
                  overflow-y: hidden;
                }

                .react-grid-Viewport {
                  top: 10px !important;
                  height: calc(100vh - 319px);

                  .react-grid-Cell:first-child {width: 100% !important;}
                }
              }

            }
          }
        }
      }
    }

    .rightActivity {
      height: calc(100vh - 205px);

      @media only screen and (max-width: 1280px) {
        width: 330px;
      }

      .userInfoDetails {
        height: calc(100vh - 450px);

        table {
          height: 100%;

          .majorJob td {
            height: calc(100vh - 543px);

            &:last-child > div {
              height: 100% !important;
            }
          }
        }
      }
    }
  }

  .react-grid-Viewport .react-grid-Cell {
    left: 0 !important;
    width: 100% !important;
    padding-left: 8px;

    .react-grid-Cell__value > div > span > div > div > div:not(.listDivImg) {
      width: calc(100% - 40px);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      cursor: pointer;
    }
  }
`;

export default StyleOrgAdmin;
