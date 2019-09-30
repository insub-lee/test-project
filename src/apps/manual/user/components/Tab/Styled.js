import styled from 'styled-components';

const Styled = styled.div`
  .affix-container {
    /* // background-color: #ffffff; */
  }

  .title {
    background-color: #ffffff;
    padding-top: 0.5em;
  }

  .tabList-wrap {
    position: relative;
    height: 43px;
    padding: 5px 3px 4px 3px;
    background: #dee1e6;
    .chrome-tabs-bottom-bar {
      position: absolute;
      bottom: 0;
      height: 4px;
      left: 0;
      width: 100%;
      background: #fff;
      z-index: 10;
    }
    > ul.react-tabs__tab-list {
      position: relative;
      width: 100%;
      height: 100%;
      list-style: none;
      margin-bottom: 0;
      display: flex;
      flex-wrap: wrap;
      padding-left: 0;
      // nav-tabs Option
      // Clean Option
      background-color: #dee1e6;
      li.react-tabs__tab {
        position: absolute;
        left: 0;
        height: 34px;
        width: 200px;
        border: 0;
        margin: 0;
        z-index: 1;
        pointer-events: none;
        /* position: relative;
        margin-bottom: -1px;
        display: block;
        padding: 0.5rem 3.87rem;
        height: 40px;
        display: flex;
        align-items: center;
        font-weight: 500;
        font-size: 14px;
        cursor: pointer;
        color: #666666; */
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
        &.react-tabs__tab--selected {
          color: #000000;
          z-index: 2;
          &:not(:hover) {
            color: #000;
          }
          .tab-background {
            left: -10px;
            width: calc(100% + 20px);
          }
        }

        &.react-tabs__tab--selected .tab-background > svg .tab-geometry {
          fill: #fff;
        }

        &:last-child .tab-dividers::after {
          opacity: 0;
        }
      }
    }
  }

  div.react-tabs__tab-panel.react-tabs__tab-panel--selected {
    /* // padding: 1rem !important; */
  }
`;

export default Styled;
