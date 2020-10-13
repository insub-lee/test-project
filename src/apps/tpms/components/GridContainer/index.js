import styled from 'styled-components';

const SortableGridExWrapper = styled.div`
  &.grid {
    min-height: calc(100vh - 93px);
    padding: 18px 20px;
    overflow: hidden;

    & > div {
      float: left;
      //margin: 0 0.5% 14px 0.5%;
      margin: 0 8px 14px 8px;
      //background: white;

      & > section {
        border-radius: 5px;
        position: relative;
        background: white;
      }
    }

    &.sortable > div {
      cursor: move;
      &:hover {
        //opacity: 0.5;
      }
    }

    & > div > .bd {
      border-radius: 5px;
    }

    .grid6 {
      //width: 99%;
      width: calc(100% - 16px);
    }
    .grid3 {
      //width: 49%;
      width: calc(50% - 16px);
    }
    .grid2 {
      //width: 32.33%;
      width: calc(33.3% - 16px);
    }
    .grid1 {
      //width: 15.66%;
      width: calc(16.6% - 16px);
    }

    .grid_item {
      position: relative;
    }

    .grid_setting {
      display: block;
      position: absolute;
      width: 100%;
      height: 100%;
      text-align: right;
      //background-color: yellow;
      top: 0;
      right: 0;

      .setting {
        display: none;
        margin: 0;
        //padding: 15px;
        width: 50px;
        height: 38px;
        line-height: 38px;
        text-align: center;
        //color: #646464 !important;
        color: #ffffff !important;
        background-color: #152434;
        opacity: 0.6;
        //border: 1px solid #646464;
        &:first-child {
          //background-color: yellow;
          border-bottom-left-radius: 10px;
        }
        &:last-child {
          border-left: 1px solid #ffffff;
          //background-color: red;
        }
        &:hover {
          opacity: 1;
          //color: #000000 !important;
        }
      }

      &:hover {
        .setting {
          display: inline-block;
        }
      }

      .setting_view {
        display: none;
        position: absolute;
        top: 50px;
        right: 0;
        width: 500px;
        height: 400px;
        background-color: #ffffff;
        border: 1px solid #d9e0e7;
        -webkit-border-radius: 5px;
        -moz-border-radius: 5px;
        border-radius: 5px;

        &.active {
          display: block;
        }
      }
    }

    @media screen and (max-width: 1260px) {
      & > div {
        margin-bottom: 12px;
      }

      .grid6,
      .grid3,
      .grid2 {
        width: 100%;
        margin-left: 0 !important;
        margin-right: 0 !important;
      }
      .grid1 {
        width: calc(33.33% - 1%);
        margin-left: 0.5% !important;
        margin-right: 0.5% !important;
      }
    }

    @media screen and (max-width: 860px) {
      & > div {
        margin-bottom: 8px;
      }
      .grid1 {
        width: calc(50% - 1%);
      }
    }

    @media screen and (max-width: 736px) {
    }
  }
`;

export default SortableGridExWrapper;
