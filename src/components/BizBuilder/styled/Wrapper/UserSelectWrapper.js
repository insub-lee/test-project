import styled from 'styled-components';

const UserSelectWrapper = styled.div`
  width: 100%;
  .basicWrapper {
    width: 100%;
    height: 510px;
    border: 1px solid #e8e8e8;
    &.treeWrapper {
      .depthTree {
        width: 100%;
        height: 250px;
        overflow-y: auto;
        .site-tree-search-value {
          color: #f50;
        }
        li .ant-tree-node-content-wrapper {
          font-size: 11px;
        }
        .ant-tree-child-tree {
          li {
            padding: 0;
            &:first-child {
              padding: 0;
            }
          }
        }
      }
      .userList {
        width: 100%;
        .ant-list-bordered {
          border: 0;
          border-top: 1px solid #4491e0;
          border-radius: 0;
          .ant-list-header {
            font-size: 13px;
            color: #000;
          }
          .ant-list-items {
            overflow-y: scroll;
            max-height: 221px;
            li {
              .ant-checkbox-wrapper + span,
              .ant-checkbox + span {
                font-size: 12px;
              }
            }
          }
        }
      }
    }
    &.selectedUserWrapper {
      overflow-y: scroll;
      .ant-list-bordered {
        border-radius: 0;
        border: 0;
        .ant-list-header {
          font-size: 13px;
          background: #e8e8e8;
          color: #000;
        }
        .ant-list-items {
          li {
            .ant-checkbox-wrapper + span,
            .ant-checkbox + span {
              font-size: 12px;
            }
          }
        }
      }
    }
  }

  .userAddWrapper {
    width: 100%;
    height: 510px;
    text-align: center;
    display: flex;
    align-items: center;
    button {
      width: 150px;
      margin: 0 auto;
    }
  }

  .applyButtonWrapper {
    text-align: right;
    margin-top: 20px;
  }
`;

export default UserSelectWrapper;
