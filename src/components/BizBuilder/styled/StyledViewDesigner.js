import styled from 'styled-components';

const StyledViewDesigner = styled.div`
  position: relative;
  display: flex;
  align-items: stretch;
  flex: 1 1 auto;
  width: 100%;
  //min-height: 100vh;
  height: calc(100% - 50px);

  .view-designer {
    display: flex;
    align-items: stretch;
    flex: 1 1 auto;
    padding: 0;
    flex-basis: 100%;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    flex-direction: column;
    width: 0;
    min-width: 0;
    max-width: 100%;
    min-height: 1px;
    height: 100%;

    .view-wrapper {
      flex: 1 1 auto;
      -webkit-box-ordinal-group: 4;
      order: 3;
      display: flex;
      -webkit-box-orient: vertical;
      -webkit-box-direction: normal;
      flex-direction: column;
      position: relative;
      height: 100%;

      .view-inner {
        display: flex;
        flex-grow: 1;
        box-shadow: 0 2px 3px rgba(0, 0, 0, 0.02), 0 1px 2px rgba(0, 0, 0, 0.1);
        /* height: 100vh; */
        height: 100%;

        .view-sidebar {
          flex-wrap: wrap;
          flex-shrink: 0;
          position: relative;
          width: 13rem;
          background-image: -webkit-gradient(linear, right top, left top, from(rgba(51, 148, 225, 0.18)), to(transparent));
          background-image: linear-gradient(270deg, rgba(51, 148, 225, 0.18), transparent);
          background-color: #584475;
          overflow: auto;

          .categoryWrapper {
            .categoryTitle {
              color: #fff;
              /* padding: 7px 10px; */
              border-top: 1px solid #343462;
              border-bottom: 1px solid #343462;
              background-color: rgba(68, 69, 123, 0.6);
              cursor: pointer;
              padding-top: 14px;
              padding-left: 10px;
              padding-right: 10px;
              font-size: 14px;
              cursor: pointer !important;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              height: 45px;
              .fa-chevron-down,
              .fa-chevron-left {
                float: right;
                position: relative;
                font-size: 10px;
                padding-top: 3px;
              }
            }
            .categoryBody.hide {
              display: none;
            }
            .categoryBody > button {
              color: rgba(255, 255, 255, 0.65);
              border: 0px solid #3f2b5c;
              background-color: transparent;
              font-size: 12px;
              height: 35px;
              width: 100%;
              text-align: left;
              box-shadow: none;
              &:hover {
                background-image: -webkit-gradient(linear, right top, left top, from(rgba(51, 148, 225, 0.18)), to(transparent));
                background-image: linear-gradient(270deg, rgba(51, 148, 225, 0.18), transparent);
                background-color: #584475;
              }
              span {
                vertical-align: middle;
              }
              > span.iconWrapper {
                display: inline-block;
                margin-right: 5px;
                img {
                  display: block;
                  width: auto;
                }
              }
            }

            .categoryBody {
              padding: 10px;
              button.btnCompTool {
                color: rgba(255, 255, 255, 0.7);
                border: 1px solid #8f8bb4;
                background-color: transparent;
                font-size: 12px;
                height: 32px;
                width: calc(100% - 30px);
                margin-bottom: 5px;
                text-align: left;
                &:hover {
                  background-image: -webkit-gradient(linear, right top, left top, from(rgba(51, 148, 225, 0.18)), to(transparent));
                  background-image: linear-gradient(270deg, rgba(51, 148, 225, 0.18), transparent);
                  background-color: #584475;
                }
              }
              .toolbar-item {
                cursor: pointer;
                display: inline-block;
                text-align: center;
                vertical-align: middle;
                margin-left: 10px;
                &:before {
                  color: #cccae0;
                }
              }
            }

            .Side-menu > .item.item-level-1 > .item-title {
              color: #fff;
              border-top: 1px solid #343462;
              border-bottom: 1px solid #343462;
              background-color: rgba(68, 69, 123, 0.6);
            }
          }
        }
        .view-content-wrapper {
          display: flex;
          -webkit-box-orient: vertical;
          -webkit-box-direction: normal;
          flex-direction: column;
          flex-grow: 1;
          padding: 1rem;
          position: relative;
          width: 100%;
          overflow: auto;

          &.single-wrapper {
            border: 1px solid #584475;
          }

          .top-button-wrapper {
            /* position: absolute;
            top: 10px;
            right: 10px; */
            .viewNameInput {
              width: 200px;
            }
          }

          .view-designer-col .ant-textarea {
            height: inherit;
          }
        }
      }
    }
  }
  .view-designer-table {
    width: 100%;
    .view-designer-row {
      border: 1px solid #ddd;
      .view-designer-col {
        border: 0;
        font-size: 12px;
        color: rgb(0, 0, 0);
        /* padding: 5px 10px; */
        &.mdcsTitleCol {
          position: relative;
          background-color: #f1f1f1;
          background-clip: padding-box;
          padding: 4px;
          > div {
            /* position: absolute;
            top: 50%;
            transform: translateY(-50%); */
            height: auto;
            min-height: auto;
            /* left: 10px; */
          }
        }
        &.mdcsContentsCol {
          padding: 6px;
          .btnTypeUploader {
            text-align: right;
          }
          .ant-upload.ant-upload-drag {
            .ant-upload-drag-container {
              padding-top: 10px;
            }
            p.ant-upload-drag-icon {
              margin-bottom: 10px;
            }
            p.ant-upload-text {
              font-size: 12px;
            }
          }
        }
        > div > span {
          display: block;
          font-size: 12px;
        }
        .ant-radio-group {
          -webkit-box-sizing: border-box;
          box-sizing: border-box;
          margin: 0;
          padding: 0;
          color: rgba(0, 0, 0, 0.65);
          font-size: 12px;
          font-variant: tabular-nums;
          line-height: 1.5;
          list-style: none;
          -webkit-font-feature-settings: 'tnum';
          font-feature-settings: 'tnum';
          display: inline-block;
        }

        .ant-radio,
        .ant-radio-wrapper {
          -webkit-box-sizing: border-box;
          box-sizing: border-box;
          padding: 0;
          color: rgba(0, 0, 0, 0.65);
          font-size: 12px;
          font-variant: tabular-nums;
          line-height: 1.5;
          list-style: none;
          -webkit-font-feature-settings: 'tnum';
          font-feature-settings: 'tnum';
          position: relative;
          display: inline-block;
          white-space: nowrap;
          cursor: pointer;
        }

        .ant-input {
          border-top-style: initial;
          border-right-style: initial;
          border-left-style: initial;
          border-top-color: initial;
          border-right-color: initial;
          border-left-color: initial;
          height: 30px;
          line-height: 30px;
          color: rgb(51, 51, 51);
          vertical-align: middle;
          font-size: 12px;
          border-width: 0px 0px 1px;
          border-image: initial;
          border: 1px solid rgb(217, 224, 231);
          border-radius: 0px;
          padding: 0px 10px;
        }
        .ant-textarea {
          height: inherit;
        }
      }
    }
  }

  .alignRight {
    text-align: right;
  }

  .alignLeft {
    text-align: left;
  }

  .alignCenter {
    text-align: center;
  }

  .view-designer-group-search-wrap {
    width: calc(100% - 80px);
    display: inline-block;
  }

  .view-designer-group-search-btn-wrap {
    display: inline-block;
    vertical-align: top;
  }

  .attachDownCompIconBtn {
    background-color: rgba(0, 0, 0, 0);
    border-color: rgba(0, 0, 0, 0);
    .attachDownCompIcon {
      font-size: 20px;
    }
  }

  .group-search-options {
    position: absolute;
    display: inline-block;
    right: 30px;
  }

  /* SideBar Custom */
  .Side-menu {
    width: auto;
    max-width: 400px;
    width: 100%;
  }
  .Side-menu .children {
    transition: max-height 0.7s ease-in;
    overflow: hidden;
  }
  .Side-menu .children.active {
    transition-timing-function: cubic-bezier(0.5, 0, 1, 0);
    max-height: 9999px;
  }
  .Side-menu .children.inactive {
    transition: max-height 0.6s cubic-bezier(0, 1, 0, 1) -0.15s;
    max-height: 0;
  }
  .Side-menu * {
    box-sizing: border-box;
  }
  .Side-menu .divider {
    height: 42px;
    padding-top: 14px;
    padding-left: 10px;
    padding-right: 10px;
    font-size: 12px;
  }
  .Side-menu.rtl .divider {
    text-align: right;
  }
  .Side-menu.rtl .item .item-title .item-label {
    float: right;
  }
  .Side-menu.rtl .item .item-title .item-icon {
    margin-right: 0px;
    margin-left: 10px;
    margin-top: 3px;
    float: right;
  }
  .Side-menu.rtl .item .item-title .fa-chevron-down,
  .Side-menu.rtl .item .item-title .fa-chevron-left,
  .Side-menu.rtl .item .item-title .fa-chevron-right {
    float: left;
  }
  .Side-menu.rtl .item .children {
    padding-left: 0;
    padding-right: 25px;
  }
  .Side-menu .item .item-title {
    height: 40px;
    padding-top: 14px;
    padding-left: 10px;
    padding-right: 10px;
    font-size: 14px;
    cursor: pointer !important;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .Side-menu .item .item-title .item-icon {
    margin-right: 10px;
  }
  .Side-menu .item .item-title .fa-chevron-down,
  .Side-menu .item .item-title .fa-chevron-left,
  .Side-menu .item .item-title .fa-chevron-right {
    float: right;
    position: relative;
    font-size: 10px;
    padding-top: 3px;
  }
  .Side-menu .item:hover > .item-title {
    cursor: pointer;
  }
  .Side-menu .item.item-level-1 > .item-title {
    height: 45px;
  }
  .Side-menu .item .children {
    padding-left: 10px;
  }
  .Side-menu-default {
    background-color: transparent;
    color: #b8c7ce;
  }
  .Side-menu-default *:not(i) {
    font-family: 'HelveticaNeue-Light', 'Helvetica Neue Light', 'Helvetica Neue', Helvetica, Arial, 'Lucida Grande', sans-serif;
    font-weight: 300;
  }
  .Side-menu-default .divider {
    background-color: #584475;
    color: #4a636e;
    text-transform: uppercase;
  }
  .Side-menu-default .item a {
    text-decoration: none;
    color: #b8c7ce;
  }
  .Side-menu-default .item.active {
    color: white;
  }
  .Side-menu-default .item.active .children {
    color: #b8c7ce;
  }
  .Side-menu-default .item.active > .item-title {
    color: #b8c7ce;
  }
  .Side-menu-default .item.active > .item-title > a {
    color: white;
  }
  .Side-menu-default .item:hover > .item-title {
    color: white;
  }
  .Side-menu-default .item:hover > .item-title a {
    color: white;
  }
  .Side-menu-default .item.item-level-1:hover > .item-title {
    background-color: transparent;
  }
  .Side-menu-default .item.item-level-1:hover,
  .Side-menu-default .item.item-level-1.active {
    //border-left: 4px solid #584475;
  }
`;

export default StyledViewDesigner;
