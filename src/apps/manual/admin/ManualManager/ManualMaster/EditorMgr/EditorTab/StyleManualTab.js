import styled from 'styled-components';

const StyleManualTab = styled.div`
  position: relative;
  width: 100%;
  display: inline-block;
  > div.manualtabbuttonwrap {
    position: absolute;
    right: 10px;
    line-height: normal;
    top: 4px;
  }
  .manualtabwrap {
    position: relative;
    height: 43px;
    padding: 5px 3px 4px 3px;
    width: 100%;
    background: #dee1e6;
    & .chrome-tabs-bottom-bar {
      position: absolute;
      bottom: 0;
      height: 4px;
      left: 0;
      width: 100%;
      background: #fff;
      z-index: 10;
    }
    ul {
      position: relative;
      width: 100%;
      height: 100%;
      list-style: none;
      margin-bottom: 0;
      display: flex;
      flex-wrap: wrap;
      padding-left: 0;
      background-color: #dee1e6;

      & > li {
      position: absolute;
      left: 0;
      height: 34px;
      width: 200px;
      border: 0;
      margin: 0;
      z-index: 1;
      pointer-events: none;
      &.icon-tab-wrap {
        width: 40px;
      }
      &.last-new-tab {
        width: 50px;
        pointer-events: all;
        transform: translate3d(840px,0,0);
      }
      &:nth-child(2) {
        transform: translate3d(40px, 0, 0);
      }
      &:nth-child(3) {
        transform: translate3d(240px, 0, 0);
      }
      &:nth-child(4) {
        transform: translate3d(440px, 0, 0);
      }
      &:nth-child(5) {
        transform: translate3d(640px, 0, 0);
      }
      &.active{
        color: #000000;
        z-index: 2;
        &:not(:hover) {
          color: #000;
        }
        & .tab-background {
          left: -10px;
          width: calc(100% + 20px);
        }
      }

      &.active .tab-background > svg .tab-geometry {
        fill: #fff;
      }

      &:last-child .tab-dividers::after {
        opacity: 0;
      }

      .tab-dividers {
        position: absolute;
        top: 7px;
        bottom: 7px;
        width: 100%;
        &::before,
        &::after {
          content: '';
          display: block;
          position: absolute;
          top: 0;
          bottom: 0;
          width: 0.5px;
          background: #a9adb0;
          opacity: 1;
          transition: opacity 0.2s ease;
        }
        &::before {
          left: 0;
        }
        &::after {
          right: 0;
        }
      }
      .tab-background {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        overflow: hidden;
        pointer-events: none;
        > svg {
          width: 100%;
          height: 100%;

          .tab-geometry {
            fill: #dee1e6;
          }
        }
      }
      .tab-content {
        position: absolute;
        display: flex;
        top: 0;
        bottom: 0;
        left: var(--tab-content-margin);
        right: var(--tab-content-margin);
        padding: 8px;
        border-top-left-radius: 8px;
        border-top-right-radius: 8px;
        overflow: hidden;
        pointer-events: all;
        width: 100%;
        cursor: pointer;
        & .tab-title {
          width: 100%;
          text-align: center;
          font-size: 12px;
          > input {
            font-size: 12px;
            border-radius: 3px 3px 0 0;
            border: 0;
            height: inherit;
            line-height: normal;
            text-align: center;
            padding: 0;
            width: calc(100% - 30px);
          }
        }
      }
      > button {
        position: absolute;
        right: 0;
        border: 0;
        background-color: transparent;
        padding-left: 0;
        padding-right: 10px;
        --antd-wave-shadow-color: none;
        pointer-events: all;
        :focus,
        :hover {
          color: transparent;
          border: none;
        }
        > i {
          width: 10px;
          height: 10px;
          background-size: 10px;
        }
      }
    }
  }
  .manualtabbuttonwrap {
    button {
      background: none;
      border: 0;
      width: 40px;
      height: 30px;
      > i {
        width: 11px;
        height: 11px;
        background-size: 11px;
      }
    }
  }
`;

export default StyleManualTab;
