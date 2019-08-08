import styled from 'styled-components';

import btnPrevOff from '../../images/btn-prev-off.png';
import btnPrevOn from '../../images/btn-prev-on.png';
import btnNextOff from '../../images/btn-next-off.png';
import btnNextOn from '../../images/btn-next-on.png';

const Styled = styled.div`
  width: 100%;
  border-top: 1px solid #e5e5e5;
  padding: 10px 190px;
  position: absolute;
  bottom: 0;
  left: 0;
  background: #fff;
  & > div {
    position: relative;
    & > div {
      &.btn-wrap {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        &.btn-prev {
          left: 0;
        }
        &.btn-next {
          right: 0;
        }
        & button {
          vertical-align: middle;
          -webkit-appearance: none;
          -moz-appearance: none;
          appearance: none;
          background: none;
          border: 0;
          margin: 0;
          font-size: 14px;
          cursor: pointer;
          color: #666666;
          &.prev-btn {
            &:before {
              content: '';
              background: url(${btnPrevOff}) no-repeat center;
              display: inline-block;
              width: 20px;
              height: 30px;
              vertical-align: middle;
              background-size: 100%;
              margin-right: 15px;
            }
          }
          &.next-btn {
            &:after {
              content: '';
              background: url(${btnNextOff}) no-repeat center;
              display: inline-block;
              width: 20px;
              height: 30px;
              vertical-align: middle;
              background-size: 100%;
              margin-left: 15px;
            }
          }
          &:hover {
            color: #7b57b3;
            &:before {
              background: url(${btnPrevOn}) no-repeat center;
              width: 20px;
              height: 30px;
              background-size: 100%;
            }
            &.next-btn:after {
              background: url(${btnNextOn}) no-repeat center;
              width: 20px;
              height: 30px;
              background-size: 100%;
            }
          }
        }
      }

      &.present-tit {
        text-align: center;
        & span {
          display: inline-block;
          border: 1px solid #7b57b3;
          border-radius: 15px;
          font-size: 14px;
          color: #7b57b3;
          padding: 5px 20px;
        }
      }
    }
  }
`;

export default Styled;
