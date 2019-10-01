import styled from 'styled-components';

import iconPlus from '../../../../../images/icon-plus.png';
import iconMinus from '../../../../../images/icon-minus.png';

const StyleEditorIndex = styled.div`
  display: inline-block;
  width: 100%;
  height: 100%;
  .rst__node {
    .rst__lineBlock {
      &:before {
        background-color: #666;
      }
    }
    .rst__nodeContent {
      .rst__collapseButton {
        border-radius: 0;
        border: 1px solid #666;
        background: #fff url(${iconMinus}) no-repeat center;
        background-size: 7px;
        width: 14px;
        height: 14px;
        box-shadow: none;
      }
      .rst__expandButton {
        border-radius: 0;
        border: 1px solid #666;
        background: #fff url(${iconPlus}) no-repeat center;
        background-size: 7px;
        width: 14px;
        height: 14px;
        box-shadow: none;
      }
      .rst__rowWrapper {
        .rst__moveHandle {
          border: 1px solid #ddd;
          border-radius: 2px 0 0 2px;
          background-color: #ddd;
          box-shadow: none;
          width: 35px;
        }
        .rst__rowContents {
          border: 1px solid #ddd;
          border-radius: 0 2px 2px 0;
          box-shadow: none;
          padding: 0;
          width: auto;
          min-width: inherit;
          max-width: 220px;
        }
      }
    }
  }
  .editorIndexTreeWrapper {
    display: inline-block;
    width: 100%;
    height: 100%;
    /* height: 100vh; */
    > .editorIndexTitle {
      text-align: center;
      padding: 10px;
      background-color: #e2e2cc;
      display: none;
    }
    .editorIndexTreeTitle {
      button {
        padding: 0px 15px;
        border: 0;
        color: #000;
        font-weight: 600;
        font-size: 12px;
        white-space: normal;
        text-align: left;
        height: auto;
        .ant-anchor-link {
          padding: 0px;
          .ant-anchor-link-title {
            padding: 0px;
            line-height: 1.9;
          }
        }
        &.btn-close {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          right: 10px;
          padding: 0;
          > i {
            width: 10px;
            height: 10px;
            background-size: 10px;
          }
        }
      }
    }
    .editorIndexContents {
      height: 100%;
    }
  }
  .ant-anchor-wrapper {
    margin-left: 0px;
    padding: 0px;
    .ant-anchor {
      padding: 0px;
      .ant-anchor-ink {
        display: none;
      }
    }
  }
`;

export default StyleEditorIndex;
