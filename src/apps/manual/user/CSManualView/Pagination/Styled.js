import styled from 'styled-components';

import btnPrevOff from '../../images/btn-prev-off.png';
import btnPrevOn from '../../images/btn-prev-on.png';
import btnNextOff from '../../images/btn-next-off.png';
import btnNextOn from '../../images/btn-next-on.png';

const Styled = styled.div`
  width: 100%;
  border-top: 1px solid #e5e5e5;
  padding: 10px 10px;
  position: absolute;
  bottom: 0;
  left: 0;
  background: #fff;
  & > div {
    position: relative;
    display: inline-block;
    vertical-align: middle;
    &.mualView-btn-wrapper {
      width: 940px;
    }
    &.mualView-select-wrapper {
      margin-left: 10px;
    }
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
          position: relative;
          vertical-align: middle;
          appearance: none;
          background: none;
          border: 0;
          margin: 0;
          font-size: 14px;
          cursor: pointer;
          color: #666666;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          width: 250px;
          &.prev-btn {
            text-align: left;
            padding-left: 25px;

            &:before {
              content: '';
              position: absolute;
              top: 50%;
              transform: translateY(-50%);
              left: 0;

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
            text-align: right;
            padding-right: 25px;

            &:after {
              content: '';
              position: absolute;
              top: 50%;
              transform: translateY(-50%);
              right: 0;

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
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          width: 300px;
          padding: 5px 20px;
          vertical-align: middle;
        }
      }
    }
  }
`;

export default Styled;
