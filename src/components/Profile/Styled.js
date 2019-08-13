import styled from 'styled-components';

const Styled = styled.div`
  position: relative;
  width: 290px;
  height: 107px;
  background-color: #e7e1f0;
  padding: 20px;
  & > div {
    display: table;
    width: 100%;
    height: 100%;
    & > div {
      display: table-cell;
      vertical-align: middle;
      align-items: center;
      &.user-img {
        width: 85px;
        img {
          display: block;
          width: 70px;
        }
      }
      &.user-info {
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
