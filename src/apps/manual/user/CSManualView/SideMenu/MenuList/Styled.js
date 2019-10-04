import styled from 'styled-components';

import iconPlus from '../../../../images/icon-plus.png';
import iconMinus from '../../../../images/icon-minus.png';
import iconUp from '../../../../images/icon-arr-up.png';
import iconDown from '../../../../images/icon-arr-down.png';

const Styled = styled.div`
  width: 220px;
  border-right: 1px solid #e5e5e5;
  border-left: 1px solid #e5e5e5;
  ul,
  li {
    list-style: none;
    margin: 0;
    padding: 0;
  }
  & > ul {
    & > li {
      overflow: hidden;
      & > a {
        position: relative;
        display: block;
        line-height: 1.5;
        color: #000 !important;
        font-size: 13px;
        padding: 14px 15px 14px 15px;
        background: #fff;
        border-bottom: 1px solid #e5e5e5;
        & > i {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          right: 5px;
          display: inline-block;
          background: url(${iconPlus}) no-repeat center;
          width: 30px;
          height: 30px;
          display: none;
        }
      }

      & > ul {
        overflow: hidden;
        max-height: 0;
        transition: all 0.5s;
        background: #f4f4f4;
        & > li {
          &:first-child > a {
            padding-top: 10px;
          }
          & > a {
            position: relative;
            width: 100%;
            padding: 0 15px 10px 15px;
            font-size: 13px;
            color: #333 !important;
            &:before {
              content: '·';
              font-size: 16px;
              margin-right: 5px;
            }
            &:after {
              content: '';
              position: absolute;
              top: 50%;
              transform: translateY(-50%);
              right: 5px;
              display: inline-block;
              background: url(${iconDown}) no-repeat center;
              width: 30px;
              height: 30px;
              display: none;
            }
          }
          & > ul {
            background: #f4f4f4;
            overflow: hidden;
            max-height: 0;
            transition: all 0.5s;
            & > li {
              & > a {
                color: #666666 !important;
                font-size: 12px;
                display: block;
                padding: 0px 25px 10px;
                &:before {
                  content: '·';
                  font-size: 16px;
                  margin-right: 5px;
                }
              }
            }
          }

          &.active {
            & > ul {
              max-height: 1000px;
            }
          }

          & > a {
            color: #666666 !important;
            display: inline-block;
            vertical-align: middle;
          }
        }
      }

      &.active {
        & > ul {
          max-height: 1000px;
          & > li.active > a {
            &:after {
              background: url(${iconUp}) no-repeat center;
            }
          }
        }
        & > a {
          color: #076dac !important;
          font-weight: bold;
          /* background-color: #076dac; */
          & > i {
            background: url(${iconMinus}) no-repeat center;
          }
        }
      }

      &:last-child {
        margin-bottom: 0;
      }
    }
  }
`;

export default Styled;
