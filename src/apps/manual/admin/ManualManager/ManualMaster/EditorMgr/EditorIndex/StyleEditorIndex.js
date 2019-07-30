import styled from 'styled-components';

const StyleEditorIndex = styled.div`
  display: inline-block;
  width: 100%;
  height: 100%;
  .editorIndexTreeWrapper {
    display: inline-block;
    width: 100%;
    height: 100vh;
    > .editorIndexTitle {
      text-align: center;
      padding: 10px;
      background-color: #e2e2cc;
    }
    .editorIndexTreeTitle {
      button {
        padding: 0px;
        .ant-anchor-link {
          padding: 0px;
          .ant-anchor-link-title {
            padding: 0px;
            line-height: 1.9;
          }
        }
      }
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
