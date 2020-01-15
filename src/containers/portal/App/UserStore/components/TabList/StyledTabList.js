import styled from 'styled-components';

const StyledTabList = styled.div`
  &.treeWrapper {
    //position: absolute;
    //top: 0;
    //left: 0;
    width: 300px;
    //height: calc(100vh - 99px);
    height: 100%;
    padding: 10px 20px;
    border-right: 1px solid #e5e5e5;
    background-color: #ffffff;
    //z-index: 100;

    .react-tabs {
      display: inline-block;
      width: 100%;
      padding: 0;

      .react-tabs__tab-list {
        padding: 0;
      }

      .react-tabs__tab {
        float: left;
        display: inline-block;
        width: 50%;
        height: inherit;
        text-align: center;

        > a {
          display: block;
          height: 46px;
          border-bottom: 1px solid #d1d2d3;
          color: #808080;
          line-height: 46px;
        }

        &.react-tabs__tab--selected a {
          color: #222222;
          border-bottom: 1px solid #e5e5e5;
          font-size: 16px;
          padding: 5px 0 15px;
          height: auto;
          line-height: normal;
          font-weight: 600;
        }
      }
    }

    .tabPanel {
      height: 100%;
      // height: calc(100vh - 70px);
      // border: 1px solid #222222;
    }

    .treeWrapper2 {
      //min-height: calc(100vh - 160px);
      min-height: 100%;

      .treeBox {
        min-height: 100%;
        // min-height: calc(100vh - 160px);
        padding: 11px 0 0 10px !important;

        > div {
          min-height: 100%;
          // min-height: calc(100vh - 160px);
        }
      }
    }
  }
`;

export default StyledTabList;
