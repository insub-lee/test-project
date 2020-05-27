import styled from 'styled-components';

const UserSelectWrapper = styled.div`
  width: 100%;
  .ant-col {
    padding: 10px;
  }
  .basicWrapper {
    width: 100%;
    height: 260px;
    border: 1px solid #e8e8e8;
    border-top: 1px solid #4491e0;
    &.treeWrapper {
      .basicTitle {
        font-size: 13px;
        color: #000;
        padding: 8px 16px;
        border-bottom: 1px solid #e8e8e8;
      }
      .depthTree {
        width: 100%;
        max-height: 222px;
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
    }
    &.userListWrapper,
    &.selectedUserWrapper {
      .userList {
        width: 100%;
      }
      .ant-list-bordered {
        border: 0;
        border-radius: 0;
        .ant-list-header {
          font-size: 13px;
          color: #000;
        }
        .ant-spin-nested-loading {
          overflow-y: scroll;
          height: 222px;
          .ant-list-items {
            max-height: 222px;
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
  }

  .userAddWrapper {
    width: 100%;
    height: 251px;
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
