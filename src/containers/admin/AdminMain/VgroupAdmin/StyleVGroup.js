import styled from 'styled-components';
import iconAddRow from 'images/common/widget-icon-add.png';
import iconDelete from 'images/common/widget-icon-delete.png';

const StyleVGroup = styled.div`
  max-width: 1200px;
  min-width: 900px;
  width: 100%;
  margin: 12px auto 0;

  @media only screen and (max-width: 1660px) {
    padding: 0 20px;
  }

  @media only screen and (max-width: 1280px) {
    width: 900px;

    .pageContent {
      height: 100vh !important;
    }
  }

  .vgroupTreeWrapper {
    float: left;
    width: 312px;
    height: calc(100vh - 170px);
    padding-top: 10px;
    padding-left: 10px;
    margin-top: 10px;
    background: #f5f5f5;

    @media only screen and (max-width: 1280px) {
      height: 100vh !important;

      > div > div:not(.ant-select) {
        height: calc(100vh - 45px) !important;
      }
    }

    .ant-select {
      width: calc(100% - 10px);
    }
  }

  .vgroupContents {
    float: right;
    width: calc(100% - 332px);

    h4 {
      height: 40px;
      margin-top: 10px;
      color: #404040;
      font-size: 14px;
      line-height: 40px;
      text-align: center;
    }

    .custom-scrollbar {
      max-height: 197px !important;
      border-top: 1px solid #222222;

      @media only screen and (max-width: 1280px) {
        max-height: 120px !important;
      }

      > div:first-child {
        max-height: 212px !important;
      }

      .resultsTableWrapper {
        width: calc(100% - 17px);
        padding: 0;

        tr {
          border-bottom: 1px solid #dadbdb;

          &:hover {
            background: #f5f5f5;
          }

          td {
            height: 38px;
            line-height: 1;

            &.groupName {
              display: none;
            }

            &:first-child {
              width: 100%;
              padding-left: 10px;
            }

            &:last-child {
              width: 35px;

              > button.delete {
                width: 100%;
                height: 38px;
                background: url(${iconDelete}) no-repeat 50% 50%;
                @media screen and (-ms-high-contrast: active), (-ms-high-contrast: none) {
                  background: url(${iconDelete}) no-repeat 0 50%;
                }
                cursor: pointer;
                text-indent: -999999em;
                opacity: 0.3;

                &:hover {
                  opacity: 1;
                }
              }
            }

            &.userPic {
              > p {
                display: inline-block;
                padding: 6px 0 0 5px;
              }
            }

            > div {
              float: left;
            }
          }
        }
      }
    }

    .buttonWrapper {
      position: relative;
      margin-top: 7px;
      text-align: right;

      .addRow {
        position: absolute;
        top: 3px;
        left: 50%;
        width: 24px;
        height: 24px;
        padding: 0;
        margin-left: -12px;
        border: 1px solid #909090;
        border-radius: 50%;
        background: url(${iconAddRow}) no-repeat 50% 50%;
      }
    }
  }
`;

export default StyleVGroup;
