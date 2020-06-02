import styled from 'styled-components';
import StyledViewDesigner from 'components/BizBuilder/styled/StyledViewDesigner';

const StyledDefaultMdcs = styled(StyledViewDesigner)`
  .view-designer-table {
    .view-designer-row {
      .view-designer-col {
        &.mdcsTitleCol {
          width: 180px;
          text-align: center;
          position: relative;
          background-color: #f7f7f7;
          background-clip: padding-box;
          padding: 6px 8px;
          border-right: 1px solid #ddd;
          color: rgb(0, 0, 0);
          > div {
            height: auto;
          }
        }

        &.mdcsContentsCol {
          padding: 6px 8px;
          color: #666;
          .btnTypeUploader {
            text-align: right;
          }
          > div {
            height: auto;
          }
          .ant-upload.ant-upload-drag {
            .ant-upload-drag-container {
              padding: 2px;
              .fileZone {
                display: grid;
                text-align: left;
                margin: 10px;
                font-size: 12px;
              }
            }
            p.ant-upload-drag-icon {
              margin-bottom: 10px;
            }
            p.ant-upload-text {
              font-size: 12px;
            }
          }

          .ant-upload-list {
            -webkit-box-sizing: border-box;
            box-sizing: border-box;
            margin: 0;
            padding-top: 2px;
            padding-left: 22px;
            padding-bottom: 2px;
            padding-right: 50px;
            color: rgba(0, 0, 0, 0.65);
            font-size: 12px;
            font-variant: tabular-nums;
            line-height: 1.5;
            list-style: none;
            -webkit-font-feature-settings: 'tnum';
            font-feature-settings: 'tnum';
            zoom: 1;
            position: absolute;
            top: 0px;

            .ant-upload-list-item {
              position: relative;
              height: 22px;
              margin: 0;
              font-size: 12px;
            }
          }
        }

        &.mdcsContentsSelectCol {
          position: relative;
          padding: 6px 8px;
          .ant-select {
            font-size: 12px;
            .ant-select-selection {
              border: 1px solid rgb(217, 224, 231);
            }
          }
          .wrapper {
            button {
              position: absolute;
              top: 50%;
              transform: translateY(-50%);
              left: 0;
            }
            &.active {
              button {
                right: 5px;
                left: inherit;
              }
            }
          }
        }

        &.mdcsAttachedFileCol {
          ul li {
            margin-bottom: 5px;
            cursor: pointer;
            &:hover {
              text-decoration: underline;
            }
            &:last-child {
              margin-bottom: 0;
            }
            i {
              vertical-align: -3px;
              color: #444;
              font-size: 16px !important;
            }
          }
        }

        &.mdcsAttachedFileCol {
          cursor: pointer;
        }
        input:read-only,
        textarea:read-only,
        .ant-input:read-only {
          background-color: #ffffff;
        }
      }
    }
  }
`;

export default StyledDefaultMdcs;
