import styled from 'styled-components';

const StyledReport = styled.div`
  .main_banner {
    -webkit-box-sizing: content-box;
    -moz-box-sizing: content-box;
    box-sizing: content-box;
    position: relative;
    height: 115px;
    color: white;
    border-radius: 5px;
    padding: 20px;
    background: ${({ bgColor }) => (bgColor?.trim() !== '' ? `${bgColor} !important` : '#59b0e3')};
    &.bg01 {
      background: #59b0e3;

      .main_banner_con {
        background: rgba(89, 176, 227, 0.9);
      }
    }
    &.bg02 {
      background: #4491e0;

      .main_banner_con {
        background: rgba(68, 145, 224, 0.9);
      }
    }
    &.bg03 {
      background: #26a6d0;

      .main_banner_con {
        background: rgba(38, 166, 208, 0.9);
      }
    }
    &.bg04 {
      background: #1fb5ad;

      .main_banner_con {
        background: rgba(31, 181, 173, 0.9);
      }
    }
    &.bg05 {
      background: #38c58e;

      .main_banner_con {
        background: rgba(56, 197, 142, 0.9);
      }
    }
    &.bg06 {
      background: #38c56a;

      .main_banner_con {
        background: rgba(56, 197, 106, 0.9);
      }
    }
    & > button,
    a {
      display: block;
      color: white;
      text-align: left;
      width: 100%;

      span.report_icon {
        display: block;
        margin-bottom: 10px;
        width: 35px;
        height: 37px;
      }
      span.report_tit {
        display: block;
        font-size: 17px;
        //margin-bottom: 5px;
        //height: 25px;
      }
      span.report_en {
        display: block;
        font-size: 10px;
        opacity: 0.7;
        //margin-bottom: 10px;
      }
      span.report_num {
        display: block;
        float: right;
        font-size: 26px;
        opacity: 1;
        font-weight: 700;

        span.report_num_com {
          opacity: 0.6;
          font-weight: 400;
          margin-left: 5px;
        }
      }
    }
    .main_banner_con {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      border-radius: 5px;
      color: white;
      z-index: 1;
      display: none;

      & > dl {
        padding: 20px;
        & > dt {
          height: 28px;
          font-size: 17px;
          position: relative;
          font-weight: 500;
          width: 100%;
          & > button {
            color: white;
            position: absolute;
            right: 0;
            top: 0;
          }
        }
        & > dd li button {
          display: block;
          position: relative;
          font-size: 15px;
          line-height: 24px;
          color: white;
          text-overflow: ellipsis;
          white-space: nowrap;
          word-wrap: normal;
          width: 100%;
          overflow: hidden;
          padding-right: 95px;

          & > span.date {
            position: absolute;
            right: 0;
            top: 0;
          }
        }
      }
    }

    &:hover .main_banner_con {
      display: block;
    }
  }
`;

export default StyledReport;
