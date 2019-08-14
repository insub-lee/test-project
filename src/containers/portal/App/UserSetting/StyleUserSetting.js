import styled from 'styled-components';
import menuIcon01 from 'images/portal/settings-menu01.png';
import menuIcon01on from 'images/portal/settings-menu01-on.png';
import menuIcon02 from 'images/portal/settings-menu02.png';
import menuIcon02on from 'images/portal/settings-menu02-on.png';
import menuIcon03 from 'images/portal/settings-menu03.png';
import menuIcon03on from 'images/portal/settings-menu03-on.png';

const StyleUserSetting = styled.div`
  position: fixed;
  top: 0;
  left: 0; // 커스텀 스크롤바 숨기기
  width: 100vw;
  height: 100vh;
  padding: 45px;
  background-color: #ffffff;
  z-index: 1; //footer 내용 가리기 + 사이드바 보이기

  @media only screen and (max-width: 1024px) {padding: 0 20px;}

  .userSettingWrapper {
    width: 1000px;
    margin: 0 auto;  //커스텀 스크롤바로 이동된 만큼 중앙에 맞추기

    @media only screen and (max-width: 1024px) {width: 100% !important;}

    .pageHeader {
      width: 100%;
      height: 55px;
      border-bottom: 1px solid #222222;
      color: #222222;
      font-size: 18px;
      line-height: 55px;
      text-align: center;
    }
    
    .navigation {
      width: 240px;
      padding-top: 15px;

      @media only screen and (max-width: 1024px) {width: 100%;}

      ul {
        display: inline-block;
        width: 100%;

        > li {
          height: 40px;
          padding-right: 20px;

          @media only screen and (max-width: 1024px) {float: left; padding-right: 0;}

          > button {
            width: 100%;
            height: 40px;
            padding-left: 44px;
            border: none;
            border-radius: 0;
            color: #555555;
            font-size: 15px;
            text-align: left;
            background-repeat: no-repeat;
            background-position: 16px 50%;

            &:hover {background-color: #f1f1f2;}
            &.current {background-color: #8e8f91; color: #ffffff; cursor: default;}

            @media only screen and (max-width: 650px) {padding-left: 34px; font-size: 14px; background-position: 10px 50%;}
          }

          &:first-child > button {background-image: url(${menuIcon01});

            &.current {background-image: url(${menuIcon01on});}
          }

          &:nth-child(2) > button {background-image: url(${menuIcon02});

            &.current {background-image: url(${menuIcon02on});}
          }

          &:last-child > button {background-image: url(${menuIcon03});

            &.current {background-image: url(${menuIcon03on});}
          }
        }
      }
    }
    .navContent {
      float: right;
      width: calc(100% - 240px);
      height: calc(100vh - 130px);
      margin-top: 15px;
      border: 1px solid #d8d8d8;

      @media only screen and (max-width: 1024px) {float: none; width: 100%;}

      // 토스트 메시지 수신
      .msgBoxWrapper {
        width: 100%;
        height: calc(100vh - 200px);
        padding: 0 0 0 10px;

        > div > div {
          padding: 27px 2px 23px 10px;
        }

        .totalCheckbox {
          height: 35px;
          line-height: 35px;
          > span:not(.ant-checkbox) {
            color: #000000;
            font-size: 13px;
          }
        }

        .eachCheckbox {
          &.ant-checkbox-group {width: 100%;}

          > label {
            margin-right: 0;
            width: 33.33%; // 3 COLS 해당
            height: 35px;
            line-height: 35px;

            > .ant-checkbox {top: -13px;}

            > span:not(.ant-checkbox) {
              display: inline-block;
              width: calc(100% - 1.125rem);
              color: #404040;
              font-size: 13px;
              text-overflow: ellipsis;
              white-space: nowrap;
              overflow: hidden;
            }
          }
        }
      }
      // 토스트 메시지 수신(Mobile)
      .msgBoxWrapperMobile {
        width: 100%;
        height: calc(100vh - 200px);
        padding: 0 0 0 10px;

        > div > div {
          padding: 27px 2px 23px 10px;
        }

        .totalCheckbox {
          height: 35px;
          line-height: 35px;

          > span:not(.ant-checkbox) {
            color: #000000;
            font-size: 13px;
          }
        }
        .eachCheckbox {
          &.ant-checkbox-group {width: 100%;}

          > label {
            margin-right: 0;
            width: 20%; // 5 COLS 해당
            height: 35px;
            line-height: 35px;

            @media only screen and (max-width: 1600px) {
              width: 25%; // 4 COLS 해당
            }
            @media only screen and (max-width: 1440px) {
              width: 33.33%; // 3 COLS 해당
            }
            @media only screen and (max-width: 1280px) {
              width: 50%; // 2 COLS 해당
            }

            > .ant-checkbox {
              top: -13px;
            }
            > span:not(.ant-checkbox) {
              display: inline-block;
              width: calc(100% - 15px);
              color: #404040;
              font-size: 13px;
              text-overflow: ellipsis;
              white-space: nowrap;
              overflow: hidden;
            }
          }
        }
      }
      // 스킨
      .skinWrapper {
        display: flex;
        width: 534px;
        height: calc(100vh - 200px);
        align-items: center;
        margin: 0 auto;

        > div {
          width: 100%;
          .skinList {
            display: inline-block;
            width: 100%;
            > li {
              position: relative;
              float: left;
              padding: 0 20px;
              text-align: center;
              .ant-radio-wrapper {
                position: relative;
                height: 180px;
                margin-right: 0;
                span.ant-radio + * {
                  padding-left: 0;
                  padding-right: 0;
                }
              }
              .ant-radio {
                position: absolute;
                bottom: 15px;
                left: 50%;
                margin-left: -8px;
              }
              .skinItem {
                display: inline-block;
                width: 100%;
              }
              p {
                height: 30px;
                font-size: 13px;
                color: #404040;
                line-height: 30px;
              }
            }
          }
        }
      }
      // 다국어
      .languageWrapper {
        display: flex;
        align-items: center;
        width: 650px;
        margin: 0 auto;

        @media only screen and (max-width: 650px) {
          width: 100%;
        }

        .ant-radio-group {
          width: 100%;

          .languageList {
            display: inline-block;
            width: 100%;
            height: 100%;
            padding: 0;

            > li {
              float: left;
              width: 216px;
              padding: 0 75px;
              text-align: center;

              @media only screen and (max-width: 650px) {
                width: 33.3%;
                padding: 0;
              }

              .ant-radio-wrapper {
                position: relative;
                height: 90px;
                margin-right: 0;

                .ant-radio {
                  position: absolute;
                  bottom: 0;
                  left: 50%;
                  margin-left: -8px;

                  & + * {
                    padding-left: 0;
                    padding-right: 0;
                  }
                }
              }
            }
          }
        }
      }
      
      .languageWrapper .languageList > li .langIcon {
        display: block;
        margin: 0 auto;
      }
      .languageWrapper .languageList .langTxt {
        display: block;
        height: 30px;
        color: #404040;
        font-size: 13px;
        line-height: 30px;
      }
      .responseTxt {
        width: calc(100% - 40px);
        height: 68px;
        margin: 0 auto;
        border-top: 1px solid #d8d8d8;
        line-height: 68px;
        color: #404040;
        font-size: 16px;
        text-align: center;
      }
    }
    // 모바일 ( < 650px)
    .navContentMobile {
      width: 100%;
      height: calc(100vh - 277px);
      margin-top: 15px;
      border: 1px solid #d8d8d8;

      // 토스트 메시지 수신
      .msgBoxWrapper {
        width: 100%;
        height: calc(100vh - 280px);
        padding: 0 0 0 10px;

        > div > div {
          padding: 27px 2px 23px 10px;

          @media only screen and (max-width: 1024px) {padding: 0;}
        }
        .totalCheckbox {
          height: 35px;
          line-height: 35px;

          > span:not(.ant-checkbox) {
            color: #000000;
            font-size: 13px;
          }
        }
        .eachCheckbox {
          &.ant-checkbox-group {width: 100%;}

          > label {
            margin-right: 0;
            width: 20%; // 5 COLS 해당
            height: 35px;
            line-height: 35px;

            @media only screen and (max-width: 1600px) {
              width: 25%; // 4 COLS 해당
            }

            @media only screen and (max-width: 1440px) {
              width: 33.33%; // 3 COLS 해당
            }
            
            @media only screen and (max-width: 1280px) {
              width: 50%; // 2 COLS 해당
            }

            > .ant-checkbox {top: -13px;}
            
            > span:not(.ant-checkbox) {
              display: inline-block;
              width: calc(100% - 15px);
              color: #404040;
              font-size: 13px;
              text-overflow: ellipsis;
              white-space: nowrap;
              overflow: hidden;
            }
          }
        }
      }
      // 스킨
      .skinWrapper {
        display: flex;
        width: 100%;
        max-width: 534px;
        height: calc(100vh - 277px);
        align-items: center;
        margin: 0 auto;

        @media only screen and (max-width: 650px) {
          // width: 335px;
          // padding-top: 20px;
          flex-flow: column;
          justify-content: flex-start;
          overflow-y: auto;
        }

        > div {
          width: 100%;

          .skinList {
            display: inline-block;
            width: 100%;

            @media only screen and (max-width: 414px) {
              display: flex;
              flex-flow: column;
              justify-content: center;
              padding-top: 20px;
            }

            > li {
              position: relative;
              float: left;
              padding: 0 20px;
              text-align: center;
              // width: 180px;

              .ant-radio-wrapper {
                position: relative;
                height: 180px;
                margin-right: 0;

                span.ant-radio + * {
                  padding-left: 0;
                  padding-right: 0;
                }
              }

              .ant-radio {
                position: absolute;
                bottom: 15px;
                left: 50%;
                margin-left: -8px;
              }

              .skinItem {
                display: inline-block;
                width: 100%;
              }

              p {
                height: 30px;
                font-size: 13px;
                color: #404040;
                line-height: 30px;
              }
            }
          }
        }
      }
      // 다국어
      .languageWrapper {
        display: flex;
        align-items: center;
        width: 650px;
        margin: 0 auto;

        @media only screen and (max-width: 650px) {
          width: 100%;
        }

        .ant-radio-group {
          width: 100%;

          .languageList {
            display: inline-block;
            width: 100%;
            height: 100%;
            padding: 0;

            > li {
              float: left;
              width: 216px;
              padding: 0 75px;
              text-align: center;

              @media only screen and (max-width: 650px) {
                width: 33.3%;
                padding: 0;
              }

              .ant-radio-wrapper {
                position: relative;
                height: 90px;
                margin-right: 0;

                .ant-radio {
                  position: absolute;
                  bottom: 0;
                  left: 50%;
                  margin-left: -8px;

                  & + * {
                    padding-left: 0;
                    padding-right: 0;
                  }
                }
              }
            }
          }
        }
      }
      
      .languageWrapper .languageList > li .langIcon {
        display: block;
        margin: 0 auto;
      }
      .languageWrapper .languageList .langTxt {
        display: block;
        height: 30px;
        color: #404040;
        font-size: 13px;
        line-height: 30px;
      }
      .responseTxt {
        width: calc(100% - 40px);
        height: 68px;
        margin: 0 auto;
        border-top: 1px solid #d8d8d8;
        line-height: 68px;
        color: #404040;
        font-size: 16px;
        text-align: center;

        @media only screen and (max-width: 1024px) {line-height: 1.5em;}
      }
    }
  }
`;
export default StyleUserSetting;