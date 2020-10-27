import styled from 'styled-components';
import iconArrGnb from '../../../images/icon_arr_gnb.png';
import iconArrGnb2 from '../../../images/icon_arr_gnb2.png';

const StyledGNB = styled.div`
  &.gnb_wrap {
    float: left;
    & .bg {
    }
    & .gnb_slide {
      .gnb {
        font-size: 0;

        & > li {
          display: inline-block;
          position: relative;
        }

        & > li > button span,
        > li > a > button span {
          display: block;
          height: 2px;
          background: #9fceff;
          margin-top: -20px;
          position: absolute;
          bottom: 18px;
          left: 50%;
          transform: translateX(-50%);
          width: 0;
          -webkit-transition: all 0.3s;
          -moz-transition: all 0.3s;
          -ms-transition: all 0.3s;
          -o-transition: all 0.3s;
          transition: all 0.3s;
        }

        & > li > button,
        & > li > a > button {
          display: block;
          height: 70px;
          line-height: 70px;
          color: white;
          padding: 0 25px;
          font-size: 20px;
          font-weight: 500;
          position: relative;
        }
        & > li.on > button,
        & > li.on > a > button {
          color: #9fceff;
        }
        & > li.on > button span,
        & > li.on > a > button span,
        & > li:hover > button span & > li.on > a > button span,
        & > li:hover > a > button span & > li.on > a > button span,
        & > li:hover > a > button span {
          display: block;
          width: calc(100% - 56px);
        }
        & > li.on .gnb_sub,
        & > li:hover .gnb_sub {
          //display: block;
          //overflow-y: hidden;
          max-height: 100%; /* approximate max height */
          -webkit-transform-origin: top;
          -moz-transform-origin: top;
          -ms-transform-origin: top;
          -o-transform-origin: top;
          transform-origin: top;
          -webkit-transform: scaleY(1);
          -moz-transform: scaleY(1);
          -ms-transform: scaleY(1);
          -o-transform: scaleY(1);
          transform: scaleY(1);
          transition-property: all;
          transition-duration: 0.5s;
          transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
        }
      }

      .gnb_menu {
        position: absolute;
        right: 0;
        top: 25px;
        font-size: 0;
      }
    }

    .gnb_menu_sub {
      position: absolute;
      top: 78px;
      right: 10px;
      width: 170px;
      z-index: 6;
      display: none;
      font-size: 14px;

      &.on {
        display: block;
      }

      .icon.icon_arr_gnb {
        width: 23px;
        height: 11px;
        background: url(${iconArrGnb2}) no-repeat center;
        text-indent: -9999px;
        vertical-align: middle;
        display: block;
        margin: 0 auto -1px;
        position: relative;
        z-index: 2;
      }
      &.gnb_menu_sub1 {
        .icon.icon_arr_gnb {
          position: absolute;
          right: 30px;
          top: -10px;
        }
      }

      &.gnb_menu_sub2 {
        .icon.icon_arr_gnb {
          position: absolute;
          top: -10px;
          left: 65px;
        }
      }

      ul {
        border: 1px solid #a0a2a9;
        background: white;
        padding: 10px 0;
        box-shadow: 3px 3px 3px 0 rgba(0, 0, 0, 0.12);
        position: relative;
        z-index: 1;
        li button {
          display: block;
          width: 100%;
          text-align: left;
          padding: 7px 25px;
          color: #555;
          font-size: 14px;

          &.button_drm {
            height: 38px;
            line-height: 38px;
            font-size: 16px;
            border-radius: 38px;
            background: #1fb5ad;
            border: 1px solid #1fb5ad;
            color: white !important;
            padding: 0;
            text-align: center;
            width: calc(100% - 40px);
            margin: 0 20px 5px;
          }
        }
        li.last {
          margin: 10px 0;
        }
      }
    }

    .gnb_sub {
      font-size: 0;
      position: absolute;
      //top: 78px;
      left: 50%;
      width: 170px;
      margin-left: -85px;
      //display: none;
      max-height: 0;
      //overflow: hidden;
      -webkit-transform-origin: top;
      -moz-transform-origin: top;
      -ms-transform-origin: top;
      -o-transform-origin: top;
      transform-origin: top;
      -webkit-transform: scaleY(0);
      -moz-transform: scaleY(0);
      -ms-transform: scaleY(0);
      -o-transform: scaleY(0);
      transform: scaleY(0);
      transition-property: all;
      transition-duration: 0.5s;
      transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
      z-index: 6;
      & > span.icon.icon_arr_gnb {
        margin-top: 10px;
      }

      .icon_arr_gnb {
        width: 23px;
        height: 11px;
        background: url(${iconArrGnb}) no-repeat center;
      }
      .icon_arr_gnb {
        display: block;
        margin: 0 auto;
        margin-bottom: -1px;
        position: relative;
        z-index: 2;
      }
      ul {
        border: 1px solid #a0a2a9;
        background: white;
        padding: 10px 0;
        box-shadow: 3px 3px 3px 0 rgba(0, 0, 0, 0.12);
        position: relative;
        z-index: 1;

        li button {
          display: block;
          width: 100%;
          text-align: left;
          padding: 7px 25px;
          color: #555;
        }
      }
    }

    .gnb_menu_sub2 .icon_arr_gnb {
      margin-left: 20px;
    }

    .gnb_menu_sub2 li button {
      text-overflow: ellipsis;
      white-space: nowrap;
      word-wrap: normal;
      overflow: hidden;
      width: 100%;
    }
  }

  @media only screen and (min-width: 1024px) {
    .gnb_sub li:hover button {
      color: #9fceff !important;
    }
  }
`;

export default StyledGNB;
