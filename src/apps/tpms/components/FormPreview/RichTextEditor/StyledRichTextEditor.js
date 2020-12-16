import styled from 'styled-components';

const StyledRichTextEditor = styled.div`
  .rdw-editor-main {
    height: 300px;
    overflow: auto;

    &.view-wrapper {
      height: auto;

      .public-DraftEditor-content span {
        -ms-word-break: break-all;
        word-break: break-all;
      }
    }
  }
`;

export default StyledRichTextEditor;
