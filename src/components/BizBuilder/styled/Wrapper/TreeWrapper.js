import styled from 'styled-components';

const TreeWrapper = styled.div`
  width: 100%;

  .tree-wrapper-inner {
    border: 1px solid #e8e8e8;

    .ant-select {
      font-size: 12px;
      width: 100%;

      .ant-select-selection {
        border: 0;
        border-bottom: 1px solid #e8e8e8;
        border-radius: 0;
        height: 35px;

        .ant-select-selection__rendered {
          line-height: 35px;
        }
      }
    }

    .depth-tree {
      width: 100%;
      height: 265px;
      overflow-y: auto;

      .site-tree-search-value {
        color: #f50;
      }

      li .ant-tree-node-content-wrapper {
        font-size: 11px;
      }
    }
  }
`;

export default TreeWrapper;
