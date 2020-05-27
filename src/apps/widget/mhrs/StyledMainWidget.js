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
    height: 414px;
    overflow: hidden;

    &.widget-left {
      margin-right: 20px;
      width: calc(34% - 20px);

      .section-body {
        padding: 0;

        .reservation-list-area {
          li {
            height: 80px;
            padding: 20px;
            border-bottom: 1px solid #ededed;

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
            }
          }
        }

        .more-btn-area {
          text-align: cetner;

          button {
            background: transparent;
          }
        }
      }
    }

    &.widget-right {
      width: 66%;
    }

    &.widget-bottom {
      width: 100%;
      margin-top: 20px;
      height: 165px;
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
