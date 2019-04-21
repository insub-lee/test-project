import styled from 'styled-components';
// import { palette } from 'styled-theme';
// import { transition, borderRadius } from '../../../config/style-util';
// import WithDirection from '../../../config/withDirection';
import btnPrvBg from 'images/common/widget-arr-prev.png';
import btnNxtBg from 'images/common/widget-arr-next.png';
import ScheduledMark from 'images/common/icon-schedule-mark.png'

const ScheduleWrapper = styled.div`
// 개인 일정과 할일 앱의 디자인은 거의 비슷해서 스타일도 유사함

// 캘린더 header
.rbc-toolbar {
  position: relative;
  margin-bottom: 0;

  .rbc-btn-group {

    button {
      & + button {
        margin-left: 0;
      }
      &:hover {
        // border-color: rgba(0,0,0,0.15);  //위젯색상테마 포함됨
      }
      &:first-child {
        display: none;
      }
      // 이전 주
      &:nth-child(2) {
        position: absolute;
        top: 0;
        left: 0;
        width: 15px;
        height: 43px;
        padding: 0;
        border: none;
        border-radius: 0;
        background-image: url(${btnPrvBg});
        background-repeat: no-repeat;
        background-position: 50% 50%;
        // background-color: rgba(0,0,0,0.15);  //위젯색상테마 포함됨
        text-indent: -9999em;
      }
      // 다음 주
      &:last-child {
        position: absolute;
        top: 0;
        right: 0;
        width: 15px;
        height: 43px;
        padding: 0;
        border: none;
        // border-left: 1px solid rgba(255,255,255,0);
        border-radius: 0;
        background-image: url(${btnNxtBg});
        background-repeat: no-repeat;
        background-position: 50% 50%;
        // background-color: rgba(0,0,0,0.15);  //위젯색상테마 포함됨
        text-indent: -9999em;
  
        @media screen and (-ms-high-contrast: active), (-ms-high-contrast: none) {  
          /* IE10+ specific styles go here */
          // border-left: 1px solid rgba(255,255,255,0);
        }
      }
    }    
  }

  .rbc-toolbar-label {
    display: none;
  }
}

.rbc-time-view {
  border: none;

  .rbc-time-header {
    padding-left: 16px;
    padding-right: 14px;
    @media screen and (-ms-high-contrast: active), (-ms-high-contrast: none) {  
      /* IE10+ specific styles go here */
      padding-right: 15px;
    }

    .rbc-label {
      padding: 0;
    }  

    .rbc-time-header-content {
      border-left: none;

      .rbc-time-header-cell {

        .rbc-header {
          display: block;
          height: 43px;
          padding: 0;
          margin-right: 1px;
          color: #404040;
          font-size: 10px;
          font-weight: light;
          // background-color: rgba(0,0,0,0.15);  //위젯색상테마 포함됨
          border-bottom: none;
          // 2줄로 보이기
          text-overflow: unset; //생략부호 -> 초기화
          overflow: unset;
          white-space: normal;

          // 토, 일 표시
          &:nth-child(6), &:nth-child(7) {
            color: #ea002c;
          }  
          & + .rbc-header {
            border-left: none;
          }      
          &.rbc-today, &.rbc-today.scheduled-day {
            background-color: rgba(0,0,0,0.6);
            color: #ffffff;
          }
          &.scheduled-day {
            box-shadow: inset 0px 0px 0px 2px #f85023;
          }
          &.scheduled-mark {
            background-image: url(${ScheduledMark});
            background-repeat: no-repeat;
            background-position: 50% 4px;
          }

          > a {
            display: inline-block;
            width: 100%;
            padding-top:9px;

            span {
              display: inline-block;
              width: 27px;
              word-wrap: break-word;
              line-height: 1.2em;
            }
          }
        }
      }

      .rbc-allday-cell {
        display: none;
      }
    }
  }

  .rbc-time-content {
    display: none;
  }
}

// react-data-grid table style
.react-grid-Container {
  width: calc(100% - 17px) !important; // customscroll 너비 100%로 인해 실제 너비가 더 커짐
  padding: 0 10px;
  margin-top: 11px;

  .react-grid-Main {
    outline: none;
    background-color: transparent !important; //위젯 스킨 배경색 반영

    .react-grid-Grid {
      border: none;
      background-color: transparent !important; //위젯 스킨 배경색 반영

      .react-grid-Viewport {
        width: 100% !important;

        .react-grid-Canvas {
          // width: 100% !important;
          overflow: hidden !important;
          background-color: transparent !important; //위젯 스킨 배경색 반영

          .react-grid-Row {
            .react-grid-Cell {
              width: 100% !important;
              @media screen and (-ms-high-contrast: active), (-ms-high-contrast: none) {  
                /* IE10+ specific styles go here */
                width: 95% !important;
              }
              
              padding: 0;
              border-right: none;
              border-bottom: none;
              background-color: transparent !important; //위젯 스킨 배경색 반영

              &:first-child {
                padding-left: 0;
                padding-right: 5px;

                .react-grid-Cell__value {
                  padding: 0 0 0 10px;
                  // background: url($/*{empSpot}) no-repeat 0 50%;
                }
              }

              &:last-child {
                .react-grid-Cell__value {
                  span {width: calc(100% - 17px);}
                }
              }

              .react-grid-Cell__value {
                // color: #404040; //위젯 스킨 배경색 반영
                // font-size: 13px; //위젯 스킨 배경색 반영
                letter-spacing: -0.3px;
                // blur로 보이는 현상 해결
                top: auto;
                transform: none;

                .titleText {
                  // 생략부호 적용 
                  display: inline-block;
                  max-width: 100%;
                  text-overflow: ellipsis;
                  overflow: hidden;
                  white-space: nowrap;
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

export default ScheduleWrapper;
