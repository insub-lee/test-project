import styled from 'styled-components';

const Styled = styled.div`
  position: relative;
  width: 290px;
  background-color: #e7e1f0;
  padding: 20px;
  & > div {
    display: table;
    width: 100%;
    height: 100%;
    & > div {
      /* display: table-cell;
      vertical-align: middle;
      align-items: center; */
      float: left;
      &.user-img {
        position: relative;
        overflow: hidden;
        width: 70px;
        height: 70px;
        text-align: center;
        border-radius: 100%;
        margin-right: 15px;
        img {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          max-width: 100%;
          height: auto;
        }
      }
      &.user-info {
        padding-top: 10px;
        span {
          display: block;
          &.user-info-name {
            font-size: 18px;
            color: #000;
          }
          &.user-info-belong {
            font-size: 12px;
            color: #666;
          }
        }
      }
    }

    & button {
      position: absolute;
      top: 5px;
      right: 5px;
      border: 0;
      background-color: transparent;
      cursor: pointer;
    }
  }
`;

export default Styled;
