import styled from 'styled-components';

const StyledViewDesigner = styled.div`
  position: relative;
  display: flex;
  align-items: stretch;
  flex: 1 1 auto;
  width: 100%;
  min-height: 100vh;
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
    .view-wrapper {
      flex: 1 1 auto;
      -webkit-box-ordinal-group: 4;
      order: 3;
      display: flex;
      -webkit-box-orient: vertical;
      -webkit-box-direction: normal;
      flex-direction: column;
      position: relative;
      .view-inner {
        display: flex;
        flex-grow: 1;
        box-shadow: 0 2px 3px rgba(0, 0, 0, 0.02), 0 1px 2px rgba(0, 0, 0, 0.1);
        /* height: 100vh; */
        .view-sidebar {
          flex-wrap: wrap;
          flex-shrink: 0;
          position: relative;
          width: 13rem;
          background-image: -webkit-gradient(linear, right top, left top, from(rgba(51, 148, 225, 0.18)), to(transparent));
          background-image: linear-gradient(270deg, rgba(51, 148, 225, 0.18), transparent);
          background-color: #584475;
          .categoryWrapper {
            .categoryTitle {
              color: #fff;
              padding: 7px 10px;
              border-top: 1px solid #343462;
              border-bottom: 1px solid #343462;
              background-color: rgba(68, 69, 123, 0.6);
              cursor: pointer;
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
        border: 0;
        font-size: 12px;
        color: rgb(0, 0, 0);
        /* padding: 5px 10px; */
        &.mdcsTitleCol {
          position: relative;
          background-color: #f1f1f1;
          padding: 6px;
          > div {
            //position: absolute;
            //top: 50%;
            //transform: translateY(-50%);
            height: auto;
            min-height: auto;
            //left: 10px;
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
          font-size: 13px;
        }
        .ant-input {
          border-top-style: initial;
          border-right-style: initial;
          border-left-style: initial;
          border-top-color: initial;
          border-right-color: initial;
          border-left-color: initial;
          height: 35px;
          line-height: 35px;
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
`;

export default StyledViewDesigner;
