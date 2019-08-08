import styled from 'styled-components';

import iconMinus from '../../../../../user/images/icon-minus.png';

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
        background-color: #fff;
        background-image: url(${iconMinus});
      }
      .rst__rowWrapper {
        .rst__moveHandle {
          border: 1px solid #ddd;
          border-radius: 2px 0 0 2px;
          background-color: #ddd;
          box-shadow: none;
        }
        .rst__rowContents {
          border: 1px solid #ddd;
          border-radius: 0 2px 2px 0;
          box-shadow: none;
          padding: 0;
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
    }
    .editorIndexTreeTitle {
      button {
        padding: 0px 15px;
        border: 0;
        color: #000;
        font-weight: 600;
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
          right: 15px;
          padding: 0;
          > i {
            width: 12px;
            height: 12px;
            background-size: 12px;
          }
        }
      }
    }
    .editorIndexContents {
      height: calc(100% - 41px);
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
