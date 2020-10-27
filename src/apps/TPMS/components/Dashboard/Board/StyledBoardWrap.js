import styled from 'styled-components';
import noticeBg from '../../../images/bg_notice.png';
import iconPlus from '../../../images/icon_plus.png';
import iconClose from '../../../images/icon_close.png';
import iconCloseWhite from '../../../images/icon_close_w.png';

const StyledBoardWrap = styled.div`
  height: 299px;

  & .grid_tit {
    height: 49px;
    line-height: 49px;
    padding: 0 25px;
    position: relative;
    border-bottom: 1px solid #d9e0e7;
    font-size: 19px;
    font-weight: 500;

    & .btn_wrap {
      position: absolute;
      right: 15px;
      top: 8px;
      font-size: 0;
      text-align: center;
      overflow: hidden;
      .more_button {
        display: inline-block;
        width: 26px;
        height: 26px;
        background: #546d86 url(${iconPlus}) no-repeat center;
        border-radius: 100%;
      }

      & i {
        color: #646464 !important;
        vertical-align: middle;
        display: inline-block;
        margin-top: 4px;
      }
    }
  }

  & .main_board {
    padding: 12px 20px;

    & .no_list {
      text-align: center;

      > span {
        display: inline-block;
        margin-top: 30px;
      }
    }

    & li button {
      display: block;
      width: 100%;
      overflow: hidden;
      padding-right: 95px;
      position: relative;
      text-align: left;
      height: 45px;
      line-height: 45px;
      border-bottom: 1px solid #eff1f4;

      & .txt {
        display: block;
        text-overflow: ellipsis;
        white-space: nowrap;
        word-wrap: normal;
        width: 100%;
        overflow: hidden;
      }
      & .date {
        position: absolute;
        right: 5px;
        top: 0;
        color: #777777;
      }
    }

    & li:last-child button {
      border-bottom: none;
    }
  }

  & .main_board_con {
    position: absolute;
    left: 0;
    top: 0;
    background: rgba(255, 255, 255, 0.95);
    width: 100%;
    height: 100%;
    border-radius: 5px;
    display: none;

    &.active {
      display: block;
    }

    .button_close {
      position: absolute;
      width: 26px;
      height: 26px;
      background: url(${iconClose}) no-repeat center;
      -webkit-border-radius: 100%;
      -moz-border-radius: 100%;
      border-radius: 100%;
      right: 20px;
      top: 15px;

      & > i {
        color: rgb(109, 109, 109);
      }
    }

    dl {
      padding: 30px;

      & > dt {
        padding-bottom: 25px;
        font-size: 17px;
        text-overflow: ellipsis;
        white-space: nowrap;
        word-wrap: normal;
        width: calc(100% - 20px);
        overflow: hidden;
      }

      & > dd {
        font-size: 13px;
        line-height: 24px;
        color: #555;
        height: 195px;
        //overflow: hidden;
      }
    }
  }

  &.notice_board {
    background: url(${noticeBg});
    -webkit-background-size: cover;
    background-size: cover;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    border-radius: 5px;

    .no_list > span {
      color: white;
    }

    .grid_tit {
      border-bottom: 1px solid #8c9bcd;
      color: white;

      & .btn_wrap {
        .more_button {
          width: 26px;
          height: 26px;
          background: transparent url(${iconPlus}) no-repeat center;
          // border-radius: 100%;
        }
        & i {
          color: white !important;
        }
      }
    }

    & .main_board {
      & li button {
        color: white;
        border-bottom: 1px solid #8c9bcd;

        & .txt {
          color: white;
        }
        & .date {
          color: white;
        }
      }
      & li:last-child button {
        border-bottom: none;
      }
    }

    & .main_board_con {
      background: rgba(31, 60, 93, 0.9);

      .button_close {
        position: absolute;
        width: 26px;
        height: 26px;
        background: url(${iconCloseWhite}) no-repeat center;
        -webkit-border-radius: 100%;
        -moz-border-radius: 100%;
        border-radius: 100%;
        right: 20px;
        top: 15px;
        border: 1px solid white;
      }

      dl {
        padding: 30px;

        & > dt,
        & > dd {
          color: white;
        }
      }
    }
  }
`;

export default StyledBoardWrap;
