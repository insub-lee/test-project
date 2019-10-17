import styled from 'styled-components';

const Styled = styled.div`
  position: relative;
  background: #eff3f6;
  padding: 30px;
  min-height: 295px;
  & .widgetHeader {
    & p,
    & i {
      color: #000;
    }
  }
  & .widget-body {
    & ul {
      list-style: none;
      margin: 0;
      padding: 0;
      & li {
        & button {
          position: relative;
          overflow: visible;
          border: 0;
          background-color: transparent;
          cursor: pointer;
          outline: none;
          display: block;
          width: 100%;
          color: #000;
          font-size: 16px;
          text-align: left;
          height: 35px;
          line-height: 35px;
          & .widget-body-txt {
            display: block;
            text-overflow: ellipsis;
            white-space: nowrap;
            word-wrap: normal;
            width: calc(100% - 30px);
            overflow: hidden;
            &:hover {
              text-decoration: underline;
            }
          }
          & .widget-body-date {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            right: 0;
            color: #777;
          }
        }
      }
    }
  }
  & .widget-board-view {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.95);
    display: none;

    &.on {
      display: block;
    }

    & dl {
      padding: 33px;
      & dt {
        color: #222;
        padding-bottom: 25px;
        font-size: 16px;
        text-overflow: ellipsis;
        white-space: nowrap;
        word-wrap: normal;
        width: calc(100% - 35px);
        overflow: hidden;
        font-weight: 600;
      }
      & dd {
        color: #555;
        font-size: 13px;
        line-height: 1.7;
        & > div {
          overflow: hidden;
          overflow-y: scroll;
          height: 195px;
        }
      }
    }
    & > button {
      position: absolute;
      right: 30px;
      top: 30px;
      border: 0;
      background-color: transparent;
      cursor: pointer;
      outline: none;
      padding: 0;
      & > i {
        color: #222;
        font-size: 30px;
      }
    }
  }
`;

export default Styled;
