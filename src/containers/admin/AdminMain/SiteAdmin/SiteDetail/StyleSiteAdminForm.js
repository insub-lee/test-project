import styled from 'styled-components';
import DelListItem from 'images/common/widget-icon-delete.png';

const StyleSiteAdminForm = styled.div`
  max-width: 1200px;
  min-width: 900px;
  width: 100%;
  margin: 0 auto;
  border-top: 1px solid #222222;

  .siteAdminTbl {
    td {
      .mainUrlTxt {
        display: inline-block;
        margin-right: 10px;
        color: #404040;
        font-size: 13px;
      }

      .ant-form-item {
        margin-bottom: 0;

        .ant-form-item-control-wrapper {
          width: 100%;

          .ant-form-item-control {
            &.has-error {
              .ant-input:hover {
                border-color: #cccccc;
              }
            }

            .ant-form-item-children {
              position: relative;
              display: block;

              // 권한 목록
              .authorityList {
                min-height: 33px;
                border: 1px solid #cccccc;

                // IE에서 높이값 지정이 필요한 영역
                > div {
                  min-height: 41px;

                  .message > div {
                    min-height: 41px !important;
                  }
                }
              }

              .resultsTableWrapper {
                width: calc(100% - 17px);
                padding: 5px;
                @media screen and (-ms-high-contrast: active), (-ms-high-contrast: none) {
                  /* IE10+ specific styles go here */
                  margin-bottom: 20px;
                }

                td {
                  padding: 0 5px;
                  border-bottom: none;

                  &.groupName {
                    width: 100%;
                    height: 18px;
                    color: #707070;
                    font-size: 11px;
                    background: #ececec;
                    text-align: center;
                  }

                  &.userPic {
                    > div {
                      float: left;
                      margin-right: 5px;
                    }
                    .ellipsis {
                      width: calc(100% - 35px);
                      line-height: 25px;
                    }
                  }

                  &:last-child:not(.groupName) {
                    text-align: right;

                    > button {
                      width: 30px;
                      background: url(${DelListItem}) no-repeat 50% 50%;
                      text-indent: -999999px;
                      opacity: 0.3;

                      &:hover {
                        opacity: 1;
                      }
                    }
                  }
                }
              }

              .textLinkBtn {
                position: absolute;
                bottom: 0;
                right: -70px;
                font-size: 12px;
              }

              .skinWrapper {
                margin-right: 0;

                .skinOptions {
                  width: 180px;

                  label {
                    width: 100%;

                    .ant-radio,
                    .ant-radio + span {
                      display: inline-block;
                      width: 100%;
                      float: left;
                      padding: 0;
                    }

                    .ant-radio {
                      padding: 15px 30px 10px 0;

                      input.ant-radio-input,
                      .ant-radio-inner {
                        top: 0;
                        left: 50%;
                        margin-left: -8px;
                      }

                      &.ant-radio-checked + span > .skinItem {
                        border: 1px solid #5d5d5d;
                      }

                      &.ant-radio-checked:after {
                        width: 0;
                        height: 0;
                        border-radius: none;
                        border: none;
                        animation: none;
                        animation-fill-mode: none;
                      }
                    }

                    .skinItem {
                      display: inline-block;
                      width: 150px;
                      height: 80px;
                      background: #dadada;

                      > img {
                        width: 100%;
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

export default StyleSiteAdminForm;
