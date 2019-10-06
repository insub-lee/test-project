import styled from 'styled-components';

import icon01 from './images/icon01.png';
import icon02 from './images/icon02.png';
import icon03 from './images/icon03.png';
import icon04 from './images/icon04.png';

const Styled = styled.div`
  .body-wrapper {
    .header {
      background-color: #2f313e;
      color: #fff;
      font-size: 18px;
      padding: 25px 15px;
      > span {
        display: inline-block;
        color: #00cd65;
        font-size: 12px;
        margin-left: 10px;
        font-weight: 600;
      }
    }
    .content {
      background: #000;
      padding: 10px;
      .cont-head {
        margin-bottom: 3px;
        img {
          width: 100%;
        }
      }
    }
    .foot-fix {
      > img {
        width: 100%;
      }
    }
  }

  .listWrap {
    overflow-y: scroll;
    max-height: 445px;
    -ms-overflow-style: none;

    &::-webkit-scrollbar {
      display: none !important;
    }

    .listForm {
      .item {
        margin-bottom: 3px;

        &:last-child {
          margin-bottom: 0;
        }

        button {
          display: table;
          overflow: hidden;
          background: #fff;
          width: 100%;

          > span {
            display: table-cell;
            vertical-align: middle;
            align-items: center;

            &.item-deco {
              background-color: #508ee5;
              width: 130px;
              padding: 25px;
              text-align: center;

              .icon {
                display: block;
                margin: 0 auto 5px;
              }

              .txt {
                display: block;
                font-size: 16px;
                color: #fff;
                font-weight: 600;
              }
            }

            &.item-tit {
              position: relative;
              background: #fff;
              padding: 35px 35px 35px 20px;

              .txt {
                color: #333333;
                font-size: 18px;
              }

              .num {
                position: absolute;
                top: 50%;
                transform: translateY(-54%);
                right: 20px;
                color: #e7e7e7;
                font-size: 70px;
              }
            }
          }

          &:hover {
            > span.item-deco {
              background-color: #2b5da4;
            }

            > span.item-tit > .num {
              color: #2b5da4;
            }
          }
        }

        &.item01 .item-deco .icon {
          background: url(${icon01}) no-repeat center;
          width: 45px;
          height: 30px;
          background-size: 100%;
        }

        &.item02 .item-deco .icon {
          background: url(${icon02}) no-repeat center;
          width: 40px;
          height: 30px;
          background-size: 100%;
        }

        &.item03 .item-deco .icon {
          background: url(${icon03}) no-repeat center;
          width: 30px;
          height: 30px;
          background-size: 100%;
        }

        &.item04 .item-deco .icon {
          background: url(${icon04}) no-repeat center;
          width: 30px;
          height: 30px;
          background-size: 100%;
        }
      }
    }
  }
`;

export default Styled;
