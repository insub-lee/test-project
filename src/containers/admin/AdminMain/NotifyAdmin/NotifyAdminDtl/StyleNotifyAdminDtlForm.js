import styled from 'styled-components';
import DelListItem from 'images/common/widget-icon-delete.png';

const StyleNotifyAdminDtlForm = styled.div`
  max-width: 1200px;
  min-width: 900px;
  width: 100%;
  margin: 0 auto;
  border-top: 1px solid #222222;

  .notifyCenterTbl {
    td {
      height: 59px; //상세화면에서 값이 없더라도 높이는 일관성 있게 보이도록 (min-height 효과 없음)

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
            }
          }
        }
      }

      //Input 스타일 (나중에 빼기)
      .ant-input {
        width: 100%;
        font-size: 13px;
      }

      textarea.ant-input {
        position: relative;
        top: -3px;
        min-height: 32px !important;
      }
    }
  }
`;

export default StyleNotifyAdminDtlForm;
