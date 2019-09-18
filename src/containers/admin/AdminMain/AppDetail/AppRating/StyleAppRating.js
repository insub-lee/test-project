import styled from 'styled-components';
// import { transition, borderRadius, boxShadow } from 'config/style-util';

const StyleAppRating = styled.div`
  position: relative;
  padding-top: 25px;
  border-top: 1px solid #e0e0e0;

  @media only screen and (max-width: 1024px) {
    padding-top: 10px;
  }

  .ant-rate {
    color: #ffb000;
    font-size: 15px;
  }

  .ant-rate-star {
    margin-right: 0;
  }

  .newRatingWrite {
    position: absolute;
    top: 25px;
    right: 0;
    & i {
      margin-right: 4px;
      font-size: 15px;
    }

    @media only screen and (max-width: 1024px) {
      top: 10px;
    }
  }

  .ratingAvgChart {
    margin: 30px 0 0 0 !important;
    width: 100%;
    height: 126px;

    @media only screen and (max-width: 1024px) {
      margin: 20px 0 0 0 !important;
    }

    .ratingAvgInfo {
      display: inline-block;
      width: 162px;
      float: right;
      text-align: center;

      @media only screen and (max-width: 1024px) {
        width: 100%;
      }

      :after {
        content: '';
        display: table;
        clear: both;
      }

      h3 {
        margin-top: 15px;
        color: #555555;
        font-size: 64px;
        line-height: 1;
      }

      .avgStars {
        margin-top: 5px;
      }
    }
  }

  .ratingChart {
    @media only screen and (max-width: 1280px) {
      width: 55%;
    }

    @media only screen and (max-width: 1024px) {
      display: inline-block;
      width: 66%;
      padding-right: 0 !important;

      > div.ant-row:first-child {
        margin-right: 0 !important;
      }
    }

    .ratingSubTitle {
      color: #555555;
      font-size: 14px;
      text-align: center;

      @media only screen and (max-width: 1024px) {
        font-size: 12px;
      }
    }

    .anticon-star {
      margin-right: 10px;

      @media only screen and (max-width: 1024px) {
        margin-right: 5px;
        float: left;
        line-height: 1.5;
      }

      &:before {
        color: #c4c3c4;
        font-size: 15px;
        letter-spacing: -3px;
      }
    }

    > .ant-row > div {
      padding-left: 0 !important;
      padding-right: 5px !important;
      margin-bottom: 0 !important;
      color: #555555;
      font-size: 12px;
      text-align: right;
      line-height: 21px;

      &:first-child {
        @media only screen and (max-width: 1024px) {
          width: 30px;
          font-size: 12px;
        }
      }

      &.ant-col-21 {
        @media only screen and (max-width: 1024px) {
          width: 84%;
        }
      }
    }

    .ant-progress-line .ant-progress-inner {
      height: 8px;
      border-radius: 0;
      background-color: #e9e9e9;

      .ant-progress-bg {
        height: 8px !important;
        border-radius: 0 !important;
        background-color: #a0a0a0;
      }
    }
  }

  .ratingReview {
    > div {
      margin-bottom: 1px;

      &:last-child {
        margin-bottom: 0;
      }
    }

    .ratingReviewBox {
      position: relative;
      width: 100%;
      padding: 25px 25px 20px 91px;
      color: #404040;
      font-size: 14px;
      background-color: #f4f6f7;

      @media only screen and (max-width: 1024px) {
        padding: 10px 10px 10px 51px;
        font-size: 12px;
      }

      > div {
        position: absolute;
        top: 28px;
        left: 22px;
        width: 55px;
        height: 55px;
        border-radius: 50%;
        overflow: hidden;

        @media only screen and (max-width: 1024px) {
          top: 13px;
          left: 14px;
          width: 29px;
          height: 29px;
        }

        .profilePic {
          width: 100%;
        }
      }

      .rateInfo {
        display: block;
        margin: 2px 0 5px;

        .reviewDate,
        .reviewVersion {
          display: inline-block;
          margin-left: 10px;
          color: #404040;
          font-size: 12px;
        }
      }

      .userReviewText {
        margin-top: 5px;
        color: #404040;
        font-size: 13px;
        letter-spacing: -0.5px;
        white-space: pre-wrap;
      }
    }
  }
`;

export default StyleAppRating;
