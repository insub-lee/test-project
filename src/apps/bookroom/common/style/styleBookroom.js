import styled from 'styled-components';
import iconHome from '../images/Home_white.png';
import iconLocation from '../images/Location.png';
import iconLocationSelected from '../images/Location_coral.png';
import iconDateSelectedRoom from '../images/Calendar_lightcoral.png';
import iconTimeSelectedRoom from '../images/Time_lightcoral.png';
import iconLocationSelectedRoom from '../images/Location_lightcoral.png';
import iconDateSearchRoom from '../images/Calendar_white.png';
import iconTimeSearchRoom from '../images/Time_white.png';
import iconLocationSearchRoom from '../images/Location_white.png';
import iconUseTimeUp from '../images/Add_darkgray.png';
import iconUseTimeDown from '../images/Remove_darkgray.png';
import iconArrow from '../images/Arrow_down_darkgray.png';
import iconArrowDisable from '../images/Arrow_down.png';
import iconArrowDropDown from '../images/Arrow_dropdown.png';
import iconArrowDropDownDark from '../images/Arrow_dropdown_darkgray.png';
import iconArrowDropDownWhite from '../images/Arrow_dropdown_white.png';
import iconArrowDropUp from '../images/Arrow_dropup_coral.png';
import iconSearchWhite from '../images/Search_white.png';
import iconSettingWhite from '../images/Setting_white.png';
import iconInfoLegend from '../images/Tooltip_02_darkgray.png';
import iconInfoLegendOn from '../images/Tooltip_02_selected.png';
import iconInfoNotice from '../images/Tooltip_01_darkgray.png';
import iconInfoMap from '../images/Map_darkgray.png';
import iconInfoPerson from '../images/Person.png';
import iconInfoProjector from '../images/BeamProjector.png';
import iconInfoProjectorNo from '../images/BeamProjector_none.png';
import iconInfoPc from '../images/PC.png';
import iconInfoPcNo from '../images/PC_none.png';
import iconInfoConferenceCall from '../images/ConferenceCall.png';
import iconInfoConferenceCallNo from '../images/ConferenceCall_none.png';
import iconInfoVideoCall from '../images/VideoCall.png';
import iconInfoVideoCallNo from '../images/VideoCall_none.png';
import iconNoResult from '../images/graphic_null.png';
import iconCloseComp from '../images/Close_darkgray.png';
import iconCloseCompWhite from '../images/Close_white.png';

const fixWidth = '320px';
const colorInputBorder = '#E6E6E6';
const colorPrimary = '#FF6D60';
const colorPrimaryDark = '#EB584B';
const colorSecondary = '#FFADA6';
const colorSearchInput = '#FF8C82';
const colorLightCoral = '#FFD0CC';
const heightCascader = '45px';
const heightButton = '40px';
const heightButton24 = '24px';
const heightButton34 = '34px';
const borderRadius = '4px';
const boxShadow = '0 2px 8px rgba(0, 0, 0, .15)';
const fontColorBlack = '#262626';

const StyleBookroom = styled.div`
  @viewport {
    zoom: 1;
    width: device-width; // 100vw
    orientation: portrait
  }

  min-width: ${fixWidth};

  .container {
    max-width: ${fixWidth};
    height: 100%;
    margin: 0 auto;
    position: relative;
  }

  .br-now {
    background-color: #fff;
    font-size: 13px;
    padding: 0 0 20px;

    header {
      width: 100%;
      height: ${heightButton};
      background-color: #333;
      position: sticky;
      top: 0;
      z-index: 999;

      .btn-home {
        display: inline-block;
        background: transparent url(${iconHome}) no-repeat;
        background-size: 100%;
        position: absolute;
        top: 10px;
        left: 16px;
        width: 18px;
        height: 18px;
        text-indent: -10000px;
        overflow: hidden;
      }

      h1 {
        display: inline-block;
        position: absolute;
        top: 0;
        left: 40px;
        height: ${heightButton};
        line-height: 38px;
        font-size: 12px;
        color: #fff;
      }
    }

    main {

      &.favor-select {

        .container {
          padding: 10px;
        }

        h2 {
        margin: 60px 20px 0;
        font-size: 18px;
        font-weight: 600;
        text-align: center;
        }

        p {
          margin: 5px 20px 0;
          text-align: center;
          font-weight: 500;
          color: ${fontColorBlack};
        }

        .select-area {
          display: block;
          margin-top: 30px !important;
          margin: 0;
          padding: 0;

          li {
            display: block;
            margin: 0;
            padding: 0;
            margin-bottom: 8px;

            &:last-child {
              margin-bottom: 0;
            }
          }

          .ant-cascader-picker {
            height: ${heightCascader};
            width: 100%;

            &::before {
              content: "";
              display: inline-block;
              position: absolute;
              top: 12px;
              left: 15px;
              width: 22px;
              height: 22px;
              z-index: auto;
              background: transparent url(${iconLocation}) no-repeat;
              background-size: 100%; 
            }

            &-label {
              height: ${heightCascader};
              line-height: ${heightCascader};
              padding-left: ${heightCascader};
              top:0;
              margin-top: 0;
              background-color: #fff;
              font-weight: bold;
              color: ${fontColorBlack};

              &:empty {
                display: none;

                & + input {
                  border-color: ${colorInputBorder};  
                }

                & + input + .anticon-down {
                  background: #fff url(${iconArrowDropDown}) no-repeat 50% 50%;
                  background-size: auto 100%;  
                }
              }

              &::before {
                content: "";
                display: inline-block;
                position: absolute;
                top: 12px;
                left: 15px;
                width: 22px;
                height: 22px;
                z-index: auto;
                background: transparent url(${iconLocationSelected}) no-repeat;
                background-size: 100%; 
              }
            }

            input {
              border-radius: ${borderRadius};
              border-color: #d9d9d9;
              height: ${heightCascader};
              padding-left: ${heightCascader};

              &:hover,
              &:focus,
              &:active {
                border-color: ${colorSecondary} !important;
              }
            }

            &:focus .ant-cascader-input,
            &.ant-cascader-picker-focused .ant-cascader-input {
              border: 1px solid ${colorSecondary} !important;
              box-shadow: none;
            }

            .anticon {
              top: 50%;
              right: 10px;
              width: 22px;
              height: 22px;
              margin-top: -11px;
              z-index: 1;
              background: #fff url(${iconArrowDropDownDark}) no-repeat 50% 50%;
              background-size: auto 100%;

              svg {
                display: none;
              }

              &.anticon-close-circle {
                background: #fff url(${iconCloseComp}) no-repeat 50% 50% !important;
                background-size: auto 70% !important;
                margin-top: -12px;
                right: 34px;
                z-index: 2;
                opacity: 1;
              }
            }
            
            &:focus .anticon,
            &.ant-cascader-picker-focused .anticon {
              background: #fff url(${iconArrowDropUp}) no-repeat 50% 50%;
              background-size: auto 100%;            
            }

            &-focused {

              &::before {
                background: transparent url(${iconLocationSelected}) no-repeat 50% 50% !important;
                background-size: 100% !important;
              }

              .anticon {
                background: #fff url(${iconArrowDropUp}) no-repeat 50% 50% !important;
                background-size: auto 100% !important;
              }
            }            
          }
        }
      }

      &.br-now-main {
        max-width: 100%;

        .room-setting {
          background-color: ${colorPrimary};
          color: ${colorLightCoral};
          font-size: 13px;
          line-height: 19px;
          position: relative;
          z-index: 101;
          min-height: 80px;

          .selected-room, .search-room {
            visibility: hidden;
            position: absolute;
            top: 0;
            width: 100%;
            height: 0;
            opacity: 0;
            transition: all ease 0s;
            z-index: 0;

            &.active {
              visibility: visible;
              position: static;
              height: auto;
              opacity: 1;
              z-index: 1;
            }
          }

          .selected-room {
            padding: 15px 10px;

            ul {
              margin: 0;
              padding: 0;

              li {
                display: block;
                position: relative;
                padding-left: 23px;
                margin-bottom: 5px;
                
                &:before {
                  content: "";
                  position: absolute;
                  top: 1px;
                  left: 0;
                  width: 18px;
                  height: 18px;
                  background-size: auto 100%;
                  background-repeat: no-repeat;
                  background-position: 50% 50%;
                }

                &.date:before {
                  background-image: url(${iconDateSelectedRoom});
                }
                &.time:before {
                  background-image: url(${iconTimeSelectedRoom});
                }
                &.location:before {
                  background-image: url(${iconLocationSelectedRoom});
                }

                dl, dt, dd {
                  margin: 0;
                  display: inline-block;
                }

                &.time {
                  position: relative;

                  dt {
                    margin-left: 4px;

                    &:before {
                      content: "";
                      display: inline-block;
                      width: 6px;
                      height: 12px;
                      border-left: 1px solid ${colorLightCoral};
                      vertical-align: middle;
                    }
                    &:after {
                      content: ":";
                      display: inline-block;
                      width: 7px;
                      text-align: right;
                    }
                  }
                }

                &.location {

                  dl {
                    &:after {
                      content: ",";
                    }

                    &:last-child:after {
                      content: none;
                    }

                    dd {
                      margin-right: 4px;
  
                      &:after {
                        content: "/";
                        display: inline-block;
                        width: 7px;
                        text-align: right;
                      }
  
                      &:last-child:after {
                        content: none;
                      }                   
                    }
                  }
                }
              }
            }
          }
          .search-room {
            color: #fff;

            .container {
              padding: 15px 10px;

              > .btn-area {
                margin-top: 8px;
                text-align: right;
  
                button {
                  background-color: transparent;
                  border-color: #FFADA6;
                  border-radius: 34px;
                  border-width: 1px !important;
                  width: auto;
                  height: 34px;
                  color: #fff;
                  font-size: 13px;
                  font-weight: normal;
                  margin-left: 5px;
                  padding-left: 34px;
                  position: relative;

                  &:before {
                    content: "";
                    display: inline-block;
                    position: absolute;
                    top: 7px;
                    left: 12px;
                    width: 20px;
                    height: 20px;
                    z-index: auto;
                    background-color: transparent;
                    background-size: 100%;
                    background-position: 0 0;
                    background-repeat: no-repeat;
                    opacity: 1;
                  }
  
                  &.research:before {
                    background-image: url(${iconSearchWhite});
                  }
  
                  &.reset:before {
                    background-image: url(${iconSettingWhite});
                  }
                  
                  &:hover, &:focus, &:active, &.active {
                    border-color: #fff;
                  }
                }
              }  
            }

            li {
              margin-bottom: 8px;
              position: relative;

              &:before {
                content: "";
                display: inline-block;
                position: absolute;
                top: 12px;
                left: 15px;
                width: 22px;
                height: 22px;
                z-index: 9;
                background-size: auto 100%;
                background-repeat: no-repeat;
                background-position: 50% 50%;
              }

              &.date:before {
                  background-image: url(${iconDateSearchRoom});
              }

              &.time:before {
                background-image: url(${iconTimeSearchRoom});
              }

              &.location:before {
                background-image: url(${iconLocationSearchRoom})
              }

              &.time {
                border-radius: ${borderRadius};
                background-color: ${colorSearchInput};
                
                &:after {
                  content: "";
                  display: table;
                  clear: both;
                }
 
                .start-time {
                  float: left;
                  width: 45%;
                  position: relative;
                }
                
                .use-time {
                  float: left;
                  width: 55%;
                }

                .start-time {
                  position: relative;

                  &:after {
                    content: "";
                    display: inline-block;
                    position: absolute;
                    top: 8px;
                    right: 0;
                    width: 1px;
                    height: 32px;
                    background-color: ${colorLightCoral};
                  }
                }

                .use-time {
                  height: 45px;
                  line-height: 45px;

                  &.active {
                    border: 1px solid #fff;
                    border-top-right-radius: ${borderRadius};
                    border-bottom-right-radius: ${borderRadius};
                    background-color: ${colorSearchInput};
                  }
                  
                  dl, dt, dd {
                    display: inline-block;
                    font-weight: bold;
                  }

                  dt {
                    margin-left: 10px;

                    &:after {
                      content: ":";
                      display: inline-block;
                      width: 7px;
                      text-align: center;
                    }
                  }

                  &:before {
                    content: "";
                    position: absolute;
                    top: 50%;
                    right: 10px;
                    width: 22px;
                    height: 22px;
                    margin-top: -11px;
                    z-index: 9;
                    background: transparent url(${iconArrowDropDownWhite}) no-repeat 50% 50%;
                    background-size: auto 100%;
                    transition: transform 0.2s;
                  }

                  &.active { 
                    &:before {
                      transform: rotate(180deg)
                    }
                  }
                }
                
                .use-time-select-pop {
                  display: none;
                  position: absolute;
                  right: 0;
                  top: calc(100% + 4px);
                  width: 300px;
                  height: 180px;
                  background-color: #fff;
                  border-radius: ${borderRadius};
                  border: 1px solid #E6E6E6;
                  box-shadow: ${boxShadow};
                  z-index: 99;
                  
                  > button {
                    position: absolute;
                    top: ${heightCascader};
                    width: ${heightButton};
                    height: ${heightButton};
                    font-size: 20px;
                    text-indent: -10000px;
                    overflow: hidden;
                    border: 1px solid ${colorInputBorder} !important;
                  
                    &.down {
                      left: ${heightCascader};
                      background: transparent url(${iconUseTimeDown}) no-repeat 50% 50%;
                      background-size: 22px 22px;
                    }

                    &.up {
                      right: ${heightCascader};
                      background: transparent url(${iconUseTimeUp}) no-repeat 50% 50%;
                      background-size: 22px 22px;
                    }
                    
                    &:hover, &:focus, &:active {
                      border-color: #8c8c8c !important;
                    }

                    &[disabled] {
                      opacity: .5 !important;
                      background-color: #f1f1f1;
                    }
                  }

                  .use-time-input {
                    width: 100px;
                    position: absolute;
                    top: ${heightCascader};
                    left: 50%;
                    margin-left: -50px;
                    height: ${heightButton};
                    line-height: ${heightButton};                    
                    text-align: center;
                    font-size: 15px;
                    font-weight: bold;
                    color: ${fontColorBlack};
                    border-color: transparent;

                    input {
                      height: ${heightButton};
                      line-height: ${heightButton};
                    }                      
                  }
                  
                  .btn-area {
                    position: absolute;
                    width: 100%;
                    bottom: 0;
                    padding: 4px 8px;
                    border-top: 1px solid #E6E6E6;
                  }

                  &.active { 
                      display: block;
                  }  
                }
              }              
            }

            .ant-calendar-picker, .ant-time-picker, .ant-cascader-picker {
              width: 100%;
              color: #fff;
              background-color: ${colorSearchInput};
              border: none;
              border-radius: ${borderRadius};

              .ant-input, .ant-time-picker-input {
                height: ${heightCascader};
                color: #fff;
                background-color: ${colorSearchInput};
                border: none;
                border-radius: ${borderRadius};
                font-size: 13px !important;
                padding-left: ${heightCascader};
                font-weight: bold;

                &::placeholder {
                  color: rgba(255,255,255, .5) !important;
                  font-weight: normal;
                }
              }

              .anticon {
                top: 50%;
                right: 10px;
                width: 22px;
                height: 22px;
                margin-top: -11px;
                z-index: 1;
                background: ${colorSearchInput} url(${iconArrowDropDownWhite}) no-repeat 50% 50%;
                background-size: auto 100%;

                svg {
                  display: none;
                }

                &.anticon-close-circle {
                  background: ${colorSearchInput} url(${iconCloseCompWhite}) no-repeat 50% 50%;
                  background-size: auto 70%;
                  margin-top: -12px;
                  right: 34px;
                  z-index: 2;
                  opacity: 1;
                }
              }
              
              .ant-time-picker-icon {
                right: 10px;
                width: 22px;
                height: 22px;
                margin-top: 0;
              }
            }

            .ant-cascader-picker-label {
              padding-left: ${heightCascader};
              font-weight: bold;
            }

            .ant-cascader-picker:focus .ant-cascader-input,
            .ant-cascader-picker-focused .ant-cascader-input {
              border: 1px solid #fff !important;
              box-shadow: none;
            }

            .option-group {
              background-color: ${colorPrimaryDark};

              .container {
                padding: 8px 10px;
              }

              .ant-checkbox-wrapper {
                background-color: transparent;
                border: 1px solid #fff !important;
                border-radius: 4px !important;
                color: #fff !important;
                font-size: 13px;
                height: 30px;
                line-height: 30px;
                opacity: .2;
                margin-right: 5px !important;
                overflow: hidden;

                .ant-checkbox {
                  position: absolute;
                  top: -1000px;
                  left: -10000px;
                  width: 0;
                  height: 0;
                  visibility: hidden;
                }

                &-checked {
                  opacity: .5;
                }
              }
              
            }
          }

          .btn-toggle {
            border: none;
            background-color: ${colorPrimary};
            border-radius: 7.5px;
            position: absolute;
            width: 90px;
            height: 15px;
            bottom: -7.5px;
            left: 50%;
            margin-left: -45px;
            text-indent: -10000px; 
            overflow: hidden;
            z-index: 9;

            &:before {
              content: "";
              background-color: rgba(255,255,255, .2);
              border-radius: 7.5px;
              position: absolute;
              width: 74px;
              height: 5px;
              top: 5px;
              left: 8px;              
            }
          }
        }

        .table-info {
          position: sticky;
          top: 40px;
          height: 85px;
          background-color: #F7F9FA;
          transition: 0s;
          z-index: 100;

          .virtual-area {
            background-color: ${colorPrimary};
            width: 100%;
            z-index: 0;
            height: 100px;
            position: absolute;
            top: -100px;
          }
          
          .date-setting {
            > button {
              position: absolute;
              top: ${heightButton24};
              width: ${heightButton24};
              height: ${heightButton24} !important;
              text-indent: -10000px;
              overflow: hidden;
              border: none;                     
              background-size: 24px 24px;
              background-color: transparent;
              background-repeat: no-repeat;
              background-position: 50% 50%;
            
              &.next {
                right: ${heightCascader};
                background-image: url(${iconArrow});
                transform: rotate(-90deg);

              }

              &.prev {
                left: ${heightCascader};
                background-image:  url(${iconArrow});
                transform: rotate(90deg);
              }
              
              &[disabled] {
                background-image: url(${iconArrowDisable});
              }
            }
            .selected-date {
              position: absolute;
              top: ${heightButton24};
              left: 50%;
              width: 150px;
              margin-left: -75px;
              height: ${heightButton24};
              line-height: ${heightButton24};
              font-size: 16px;
              font-weight: bold;
              text-align: center;
              color: ${fontColorBlack};
              border: none;
              background-color: transparent;

              input {

              }
            }
          }

          .info-tool {
            position: absolute;
            right: 10px;
            bottom: 5px;

            button {
              background-color: transparent;
              border-bottom: 1px solid ${fontColorBlack};
              color: ${fontColorBlack};
              font-size: 11px;
            }
          }

          .info-legend {
            position: absolute;
            right: 110px;
            bottom: 5px;
            color: ${fontColorBlack};
            font-size: 11px;

            button {
              display: inline-block;
              width: 16px;
              height: 16px;
              background: url(${iconInfoLegend}) no-repeat;
              background-size: 100% 100%;
              text-indent: -10000px;
              overflow: hidden;
              padding: 0;
              border: none;
              margin-left: 3px;
              vertical-align: middle;
            }
            button.ant-popover-open {
              background: url(${iconInfoLegendOn}) no-repeat;
              background-size: 100% 100%;
            }     
            
          }
        }
      }

      .time-table {
        position: relative;
        z-index: 0;

        .container {
          min-width: 100%;
        }

        .time-line-guide {
          position: absolute;
          right: 10px;
          top: -20px;
          text-align: right;
          font-size: 10px;
        }

        .no-result {
          font-size: 13px;
          text-align: center;
          padding: 25px 0;

          &:before {
            content: "";
            display: inline-block;
            width: 96px;
            height: 90px;
            background: transparent url(${iconNoResult}) no-repeat 0 50%;
            background-size: 100% 100%;
          }

          p {
            margin-top: 10px;
            color: #595959;
          }
        }

        .btn-area {
          text-align: center;

          .view-all {
            width: 160px;
            height: ${heightButton34};
            color: ${fontColorBlack};
            font-size: 12px;
            padding-right: ${heightCascader};
            position: relative;
            border: 1px solid #E6E6E6;
            border-radius: ${heightButton34};

            &:before {
              content: "";
              display: inline-block;
              position: absolute;
              width: 20px;
              height: 20px;
              top: 7px;
              right: 15px;
              left: auto;
              bottom: auto;
              background: transparent url(${iconArrow}) no-repeat 0 0;
              background-size : 100%;
              transition: all ease .3s;
              opacity: 1;
            }

            &.active:before {
              transform: rotate(180deg);
            }
          }
        }

        h2 {
          font-size: 14px;
          color: ${fontColorBlack};
          margin-top: 15px;
        }
        
        // 타임테이블 룸 정보 시작

        .rct-sidebar-row-group {
          font-size: 11px;
          color: #595959;
        }

        .room-info {
          height: 48px;
          line-height: 48px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .room-name {
          width: 82px;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2; /* 라인수 */
          -webkit-box-orient: vertical;
          word-wrap: break-word; 
          line-height: 15px;
          max-height: 30px;
          color: #262626;
          font-size: 12px;
          font-weight: 600;
          white-space: normal;
        }

        .info-legend-room {
          flex: 1;
          width: 18px;
          position: relative;

          li {
            display: none;
            line-height: 28px;
            margin-left: 2px;
            
            &.video {
              display: inline-block;
              margin-left: 7px;
            }

            &:first-child {
              margin-left: 0;
            }

            &.notice {
              position: absolute;
              top: 50%;
              margin-top: -14px;
              left: 0;

              button {
                border: none;
                width: 28px;
                height: 28px;
                background: transparent url(${iconInfoNotice}) no-repeat 50% 50%;
                background-size: 18px 18px;
                text-indent: -10000px;
                overflow: hidden;
              }
            }

            &.view-map {
              position: absolute;
              top: 50%;
              margin-top: -14px;
              left: 28px;

              button {
                border: 1px solid #E6E6E6;
                border-radius: 4px;
                width: 28px;
                height: 28px;
                background: transparent url(${iconInfoMap}) no-repeat 50% 50%;
                background-size: 22px 22px;
                text-indent: -10000px;
                overflow: hidden;
              }
            }

            &.tool {
              
              > span {
                display: inline-block;
                width: 18px
                height: 18px;
                vertical-align: middle;
                text-indent: -10000px;
                overflow: hidden;

                &.person {
                  background: transparent url(${iconInfoPerson}) no-repeat 50% 50%;
                  background-size: 100% 100%;
                }

                &.projector {
                  background: transparent url(${iconInfoProjector}) no-repeat 50% 50%;
                  background-size: 100% 100%;
                  
                  &.no {
                  background: transparent url(${iconInfoProjectorNo}) no-repeat 50% 50%;
                  background-size: 100% 100%;
                  }
                }

                &.pc {
                  background: transparent url(${iconInfoPc}) no-repeat 50% 50%;
                  background-size: 100% 100%;

                  &.no {
                  background: transparent url(${iconInfoPcNo}) no-repeat 50% 50%;
                  background-size: 100% 100%;
                  }
                }

                &.call-conference {
                  background: transparent url(${iconInfoConferenceCall}) no-repeat 50% 50%;
                  background-size: 100% 100%;

                  &.no {
                    background: transparent url(${iconInfoConferenceCallNo}) no-repeat 50% 50%;
                    background-size: 100% 100%;
                  }  
                }

                &.video-conference {
                  background: transparent url(${iconInfoVideoCall}) no-repeat 50% 50%;
                  background-size: 100% 100%;
                  
                  &.no {
                    background: transparent url(${iconInfoVideoCallNo}) no-repeat 50% 50%;
                    background-size: 100% 100%;
                  }
                }
              }
              
              .number {
                display: inline-block;
                min-width: 20px;
                line-height: 18px;
                font-size: 12px;
                color: #595959;
                vertical-align: middle;
                text-indent: 0;
                overflow: visible;
              }               
            }
          }
          
          &.active {
            width: 190px;
            padding-left: 62px;

            li {
              display: inline-block;

              &.video {
                margin-left: 2px;
              }
            }
          }
        }
      }
    }

    .btn-area {
      border: none;
      margin: 30px 0 0 0;
      padding: 0;

      &:after {
        content: "";
        display: block;
        clear: both;
        height: 0;
        visibility: hidden;
      }

      button {
        height: ${heightButton};
        font-weight: 600;
        font-size: 14px;
        border-radius: ${borderRadius};
        width: 145px;

      }
      
      .btn-cancel {
        color: ${fontColorBlack};
        float: left;
        border: 1px solid #E6E6E6;
      }

      .btn-confirm {
        background-color: ${colorPrimary};
        border-color: ${colorPrimary} !important; 
        color: #fff !important;
        float: right;
      }
    }
    
    // ant-button reset

    .ant-btn:hover, .ant-btn:focus, .ant-btn:active, .ant-btn.active {
      color: ${fontColorBlack};
      border: 1px solid #8c8c8c;
      box-shadow: none !important;
    }

    [ant-click-animating-without-extra-node='true']::after, .ant-click-animating-node {
      content: none !important;
    }
  }

`;

export default StyleBookroom;
