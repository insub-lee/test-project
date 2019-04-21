import styled from 'styled-components';
import iconCalendar from 'images/common/icon-calendar.png';
import DelListItem from 'images/common/widget-icon-delete.png';

const StyleNotifyAdminForm = styled.div`
  max-width: 1200px;
  min-width: 900px;
  width: 100%;
  margin: 0 auto;
  border-top: 1px solid #222222;

  .notifyCenterTbl {
    td {
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
              line-height: 1;

              .RangePicker {
                position: relative;
                padding-left: 30px;
                border: 1px solid #c1c1c1;
                border-radius: 4px;

                //커스텀 캘린더 아이콘으로 교체
                &:before {
                  content: "";
                  display: block;
                  width: 30px;
                  height: 30px;
                  position: absolute;
                  top: 0;
                  left: 0;
                  background: url(${iconCalendar}) no-repeat 50% 50%;
                }

                //기존 캘린더 아이콘 숨기기
                .anticon.anticon-calendar.ant-calendar-picker-icon {display: none;}
                //캘린더 초기화 아이콘 숨기기
                .anticon.anticon-close-circle.ant-calendar-picker-clear {display: none;}

                .ant-calendar-picker-input.ant-input {
                  height: 32px;
                  line-height: 32px;
                  margin-top: -2px;
                  padding: 0;
                  border-color: transparent !important;
                  background: transparent !important;
        
                  .ant-calendar-range-picker-input {
                    width: 90px;
                    height: 30px;
                    line-height: 30px;
                    background: #ffffff;
                    border-color: #ffffff !important;
                  }
                }
        
                .ant-calendar-range-picker-separator {line-height: 30px;}
              }

              // 권한 목록
              .authorityList {
                min-height: 33px;
                border: 1px solid #cccccc;

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

              .textLinkBtn {
                position: absolute;
                bottom: 0;
                right: -160px;
                width: 160px;
                height: 33px;
                padding: 0 10px;
                color: #222222;
                font-size: 13px;
                text-align: left;
                text-decoration: underline;
                background: #ffffff;
              }

            }
          }
        }
      }

      textarea.ant-input {
        position: relative;
        min-height: 32px !important;
      }

      // 이미지와 버튼 추가(+) 아이콘
      .btnWrapper {
        padding: 15px 0; text-align: center;

        > button {vertical-align: middle;}
      }
    }
`;

export default StyleNotifyAdminForm;
