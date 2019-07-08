import styled from 'styled-components';

const MyStoreTreeStyledTabList = styled.div`
  &.treeWrapper {
    position: fixed;
    top: 50px;
    left: 10px;
    width: 399px;
    height: calc(100vh - 99px);
    padding: 10px;
    background-color: #ffffff;
    z-index: 100;

    .react-tabs {
      display: inline-block;
      width: 100%;
      height: 46px;
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
          border-bottom: 3px solid #222222;
        }
      }
    }

    .tabPanel {
      height: calc(100vh - 70px);
      // border: 1px solid #222222;
    }

    .treeWrapper2 {
      min-height: calc(100vh - 115px);

      .treeBox {
        min-height: calc(100vh - 115px);
        padding: 11px 0px 0px 10px !important;

        > div {
          min-height: calc(100vh - 115px);
        }
      }
    }
  }
`;

export default MyStoreTreeStyledTabList;
