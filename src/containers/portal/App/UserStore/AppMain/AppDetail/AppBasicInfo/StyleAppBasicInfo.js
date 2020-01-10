import styled from 'styled-components';
// import { palette } from 'styled-theme';
// import WithDirection from '../../../../../config/withDirection';

const StyleAppBasicInfo = styled.div`
  .basicInfoWrapper {
    position: relative;
    display: block;
    padding-left: 185px;
    padding-bottom: 18px;

    @media only screen and (max-width: 1024px) {
      padding-left: 0;
      padding-bottom: 16px;
    }

    .appImgWrapper {
      position: absolute;
      top: 0;
      left: 0;
      width: 160px;
      height: 160px;
      border-radius: 30px;
      overflow: hidden;

      @media only screen and (max-width: 1024px) {
        width: 65px;
        height: 65px;
        border-radius: 16px;
      }

      > img {
        width: 100%;
        height: 100%;
      }
    }

    .appDetailInfo {
      display: inline-block;
      width: 100%;
      padding: 0;

      > li {
        position: relative;

        &:first-child {
          position: relative;
          display: block;
          height: 47px;
          border-bottom: 2px solid #eeeeee;
          line-height: 47px;

          @media only screen and (max-width: 1024px) {
            display: inline-block;
            width: 100%;
            min-height: 65px;
            padding-left: 75px;
            line-height: 1;
            border-bottom: none;
          }
        }
      }

      .appTitle {
        display: inline-block;
        float: left;
        height: 100%;

        @media only screen and (max-width: 1024px) {
          float: right;
          width: 100%;
          height: 25px;
        }

        > h2 {
          max-width: 400px;
          height: 100%;
          color: #000000;
          font-size: 18px;
          font-weight: 600;

          @media only screen and (max-width: 1024px) {
            float: right;
            width: 100%;
            max-width: 100%;
            padding-top: 3px;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
          }
        }
      }

      .btnsWrapperTop {
        display: inline-block;
        float: right;

        @media only screen and (max-width: 1024px) {
          width: 100%;
          padding: 7px 0;
          border-bottom: 1px solid #eeeeee;
        }

        button + button {
          margin: 0 0 0 5px;
        }
      }

      .appDetails {
        display: inline-block;
        width: 100%;
        padding: 0;
        margin-top: 14px;

        @media only screen and (max-width: 1024px) {
          // margin-top: 7px;
        }

        > li {
          height: 22px;
          line-height: 14px;
          padding: 4px 5px 4px 20px;
          color: #555555;
          font-size: 14px;

          @media only screen and (max-width: 1024px) {
            height: 20px;
            line-height: 1;
          }

          &:nth-child(3),
          &:nth-child(4) {
            float: left;
            position: relative;
          }

          &:nth-child(4) {
            margin-left: 15px;
          }

          &:before {
            content: '◾';
            color: #bcbcbc;
            font-size: 14px;
            position: absolute;
            left: -3px;

            @media only screen and (max-width: 1024px) {
              margin-top: 0;
            }
          }
        }
      }

      .btnsWrapperBottom {
        display: block;
        float: right;
        width: 100%;
        height: 32px;
        margin-top: 19px;
        text-align: right;

        @media only screen and (max-width: 1024px) {
          height: 25px;
          margin-top: 13px;
        }

        .regstBtns {
          position: relative;
          display: inline-block;
          // max-width: 250px;
          height: 32px;
          float: right;
          margin-left: 6px;
          vertical-align: middle;

          .regstBtnsGroup {
            > button {
              &.category {
                float: left;
              }

              &.menu {
                float: right;
                margin-left: 6px;
              }

              img {
                margin-right: 4px;
              }
            }
          }

          &.registered {
            // width: 102px;
            float: right;
          }
        }
      }
    }
  }
`;

export default StyleAppBasicInfo;
