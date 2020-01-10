import styled from 'styled-components';
import wState1sm from 'images/common/icon-weather-status1-sm.png';
import wState2sm from 'images/common/icon-weather-status2-sm.png';
import wState3sm from 'images/common/icon-weather-status3-sm.png';
import wState4sm from 'images/common/icon-weather-status4-sm.png';
import wState5sm from 'images/common/icon-weather-status5-sm.png';
import wState5lg from 'images/common/icon-weather-status5-lg.png';

const WeatherStyle = styled.div`
  padding-left: 30px;
  padding-right: 30px;
  padding-top: 0;
  color: #404040;

  // Table (top)
  .todayWeather {
    width: 100%;
    border: none;
    border-spacing: 0;

    .weatherIcon {
      width: 110px;
      padding: 0;
      vertical-align: top;

      .wIcon {
        width: 70px;
        height: 70px;
        margin-top: 7px;
        background-repeat: no-repeat;
        background-position: 50% 50%;
        background-size: 70px 70px;

        &.wStatus4lg {
          background-image: url(${wState5lg});
        }
      }
    }

    .weatherInfo {
      height: 27px;
      padding: 0 0 10px;
      line-height: 13px;

      .ant-select {
        width: 90px;
        // color: #404040;  //위젯 테마 적용
        font-size: 12px;
        line-height: 16px;
        border: none !important; //날씨 위젯에만 해당
        border-radius: 0; //날씨 위젯에만 해당

        .ant-select-selection {
          background: transparent;
          border: none !important; //날씨 위젯에만 해당

          &.ant-select-selection--single {
            height: 16px;
          }

          .ant-select-selection__rendered {
            margin-left: 0;
            margin-right: 0;
            padding-left: 15px;
            text-align: left;
            line-height: 15px;
            background-repeat: no-repeat;
            background-position: 0 50%;

            .ant-select-selection-selected-value {
              display: inline-block;
              width: 100%;
              padding-right: 0;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
          }
          .ant-select-arrow {
            display: none;
          }
        }
      }
      .date {
        display: inline-block;
        height: 16px;
        font-size: 13px;
        line-height: 16px;
        vertical-align: middle;
      }
    }

    .temperatureInfo {
      position: relative;
      line-height: 35px;
      vertical-align: top;

      .fontBig {
        position: relative;
        display: inline-block;
        width: 90px;
        font-size: 42px;
        font-weight: 400;

        &:after {
          content: '℃';
          font-size: 14px;
          position: absolute;
          top: -2px;
          display: inline-block;
          width: 19px;
          line-height: 1;
          text-align: right;
        }
      }

      .fontSmall {
        position: relative;
        display: inline-block;
        font-size: 16px;
        font-weight: 400;
        line-height: 16px;

        .div {
          display: inline-block;
          padding: 0 5px;
        }

        .minTemp:after,
        .maxTemp:after {
          content: '°';
          font-size: 14px;
          position: absolute;
          top: 0;
          display: inline-block;
          line-height: 1;
        }
      }
    }
  }

  // Table (bottom)
  .otherDaysWeather {
    width: 100%;
    margin-top: 15px;

    td {
      height: 26px;
      font-size: 13px;
      text-align: center;

      &:first-child {
        width: 86px;
        letter-spacing: 0.8px;
      }

      &:last-child {
        width: 95px;
      }

      &.wStateIconSm {
        > div {
          display: inline-block;
          width: 20px;
          height: 20px;
          background-repeat: no-repeat;
          background-position: 50% 50%;
          vertical-align: middle;

          //날씨 아이콘 목록
          // 1. 맑음
          &.wState1sm {
            background-image: url(${wState1sm});
          }
          // 2. 흐림
          &.wState3sm {
            background-image: url(${wState3sm});
          }
        }
      }

      .div {
        display: inline-block;
        padding: 0 6px 0 11px;
      }

      .minTemp,
      .maxTemp {
        position: relative;
      }

      .minTemp:after,
      .maxTemp:after {
        content: '°';
        font-size: 14px;
        position: absolute;
        top: 0;
        display: inline-block;
        line-height: 1;
      }
    }
  }
`;

export default WeatherStyle;
