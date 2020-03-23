import styled from 'styled-components';

const StyledWorkProcessModal = styled.div`
  width: 100%;

  .basicWrapper {
    width: 100%;
    height: 500px;
    border: 1px solid rgb(217, 224, 231);

    &.deptWrapper {
      .deptTree {
        width: 100%;
        height: 250px;
        border-bottom: 1px solid rgb(217, 224, 231);
        overflow-y: auto;
        padding: 5px;
        .site-tree-search-value {
          color: #f50;
        }
        li .ant-tree-node-content-wrapper {
          font-size: 12px;
        }
      }

      .userList {
        width: 100%;
        height: 350px;
      }
    }

    &.userWrapper {
      border-left: 0px;
    }

    &.selectedWrapper {
      overflow-y: auto;

      > h4 {
        padding: 7px;
        text-align: left;
        background-color: #e6e6e6;
      }

      ul > li {
        margin-top: 5px;
        margin-left: 10px;
        margin-right: 5px;
        margin-bottom: 5px;

        font-size: 12px;
        position: relative;

        button {
          position: absolute;
          right: 10px;
          background: none;
          top: 1px;
          padding-right: 5px;
          padding-left: 5px;
        }
      }

      > div {
        width: 100%;
        /* border-bottom: 1px solid rgb(217, 224, 231); */
        height: 195px;
        margin-bottom: 4px;

        .ant-table {
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
          position: relative;
          clear: both;
        }
      }
    }
  }

  .btnWrapper {
    width: 100%;
    height: 500px;
    text-align: center;
    display: flex;
    align-items: center;

    ul {
      margin: auto;

      li {
        margin-bottom: 10px;
      }
    }
  }
`;

export default StyledWorkProcessModal;
