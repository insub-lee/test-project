import styled from 'styled-components';

import iconCard1 from 'images/mhrs/main/icon-card1.png';
import iconCard2 from 'images/mhrs/main/icon-card2.png';
import iconCard3 from 'images/mhrs/main/icon-card3.png';

const StyledMainWidget = styled.div`
  padding: 25px;
  overflow: hidden;
  background: #ebf0f6;

  .main-widget-section-card {
    margin-bottom: 20px;
    overflow: hidden;

    .widget-card {
      position: relative;
      width: calc(34% - 20px);
      margin-right: 20px;
      display: inline-block;
      padding: 20px 15px;
      border-radius: 4px;
      cursor: pointer;

      .card-txt {
        font-size: 15px;
        color: #fff;
        opacity: 0.7;
        margin-bottom: 20px;
      }

      .card-num {
        font-size: 20px;
        color: #f7f7f7;

        > b {
          font-size: 36px;
          color: #fff;
        }
      }

      .card-deco {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        right: 20px;
        width: 60px;
        height: 60px;
        display: inline-block;
      }

      &.card1 {
        background: #4491e0;

        .card-deco {
          background: url(${iconCard1}) no-repeat center;
          background-size: 100%;
        }

        &:hover {
          background: #2b80d6;
        }
      }

      &.card2 {
        background: #1fb5ad;

        .card-deco {
          background: url(${iconCard2}) no-repeat center;
          background-size: 100%;
        }

        &:hover {
          background: #18ada5;
        }
      }

      &.card3 {
        background: #6e7b95;

        .card-deco {
          background: url(${iconCard3}) no-repeat center;
          background-size: 100%;
        }

        &:hover {
          background: #5e6a82;
        }
      }

      &:last-child {
        margin-right: 0;
        width: 32%;
      }
    }
  }

  .main-widget-section {
    background: #fff;
    border: 1px solid #dbe1e8;
    border-radius: 4px;
    display: inline-block;
    height: 543px;
    overflow: hidden;

    &.widget-left {
      margin-right: 20px;
      width: calc(34% - 20px);

      .section-body {
        padding: 0;

        .reservation-list-area {
          li {
            padding: 20px;
            border-bottom: 1px solid #ededed;
            cursor: pointer;

            &:hover {
              position: relative;
              background: #ebf4ff;

              &:before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                width: 5px;
                height: 100%;
                background: #4491e0;
              }

              div > p.txt1 {
                color: #4491e0;
              }
            }

            div {
              > p.txt1 {
                color: #333;
                font-size: 15px;
                margin-bottom: 6px;
              }

              > span {
                font-size: 14px;
                color: #999999;

                &.txt2 {
                  margin-right: 20px;
                }
              }
            }
          }
        }

        .more-btn-area {
          text-align: center;
          padding: 12px 0;

          button {
            background: transparent;
            font-size: 14px;
            color: #999999;

            &:hover {
              color: #333;
            }
          }
        }
      }
    }

    &.widget-right {
      width: 66%;

      .ant-fullcalendar-fullscreen {
        .ant-fullcalendar-header {
          padding: 0 0 10px;

          .ant-select {
            font-size: 12px;

            .ant-select-selection {
              padding: 0.2rem 0.5rem;
              font-size: 0.75rem;
              line-height: 1.5;
              height: auto;

              .ant-select-selection__rendered {
                line-height: 1.5;
              }

              &:hover,
              &:focus {
                color: #495057;
                background-color: #fff;
                border-color: #636a78;
                outline: 0;
                box-shadow: 0 0 0 0.2rem transparent;
              }
            }
          }

          .ant-radio-group {
            display: none;
          }
        }

        .ant-fullcalendar {
          font-size: 12px;

          .ant-fullcalendar-calendar-body {
            padding: 0;

            tr {
              th.ant-fullcalendar-column-header {
                background: #f8f8f8;
                padding: 5px 12px 5px 0;
                border-top: 1px solid #e8e8e8;
                border-bottom: 0;
                border-spacing: 0;
              }

              td {
                padding: 0;
                border-spacing: 0;

                .ant-calendar-date-item {
                  height: 65px;
                  margin: 0;
                  text-align: right;
                  padding: 4px 8px;
                  border-top: 1px solid #e8e8e8;
                  border-bottom: 0;
                  color: #333;

                  .gray {
                    color: #ccc;
                  }
                  .red {
                    color: #ff6262;
                  }
                  .blue {
                    color: #3b8be4;
                  }

                  .reserve-number {
                    font-size: 11px;
                    text-align: right;
                    margin-top: 10px;
                    color: #666;

                    > span {
                      color: #4491e0;
                      font-weight: bold;
                      font-size: 12px;
                    }
                  }
                }

                &:hover .ant-calendar-date-item,
                &.ant-fullcalendar-selected-day .ant-calendar-date-item {
                  background: #e6f7ff;
                  cursor: pointer;
                }

                &.ant-fullcalendar-today {
                  .ant-calendar-date-item {
                    background: #e6f7ff;
                    border-top: 1px solid #4491e0;
                    color: #4491e0;
                  }
                }
              }
            }
          }
        }
      }
    }

    &.widget-bottom {
      width: 100%;
      margin-top: 20px;
      height: auto;
    }

    .section-header {
      border-bottom: 1px solid #ededed;
      padding: 10px 20px;

      .section-title {
        font-size: 17px;
        color: #333333;
        font-weight: 600;

        > span {
          font-size: 13px;
          color: #999999;
          margin-left: 5px;
          font-weight: 500;
        }
      }
    }

    .section-body {
      padding: 20px;

      .section-contents {
        margin-bottom: 20px;
      }
    }
    /* section-body */
  }
`;

export default StyledMainWidget;
