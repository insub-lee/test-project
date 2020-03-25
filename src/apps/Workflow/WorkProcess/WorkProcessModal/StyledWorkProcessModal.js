import styled from 'styled-components';

const StyledWorkProcessModal = styled.div`
  width: 100%;

  .basicWrapper {
    width: 100%;
    height: 510px;
    border: 1px solid #e8e8e8;
    padding: 10px;

    &.deptWrapper {
      .tabButtonWrapper {
        button {
          width: 32.5%;
          background: #e8e8e8;
          border: 0;
          border-radius: 3px;
          font-size: 13px;
          height: auto;
          padding: 5px;
          border: 1px solid #e8e8e8;
          margin-right: 1%;
          &:hover,
          &:active,
          &:focus {
            background: #767c89;
            color: #fff;
          }
          &:last-child {
            margin-right: 0;
          }
        }
      }
      .deptTree {
        width: 100%;
        height: 250px;
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
        .ant-table {
          border-radius: 3px;
          .ant-table-header {
            background: #e8e8e8;
          }
          .ant-table-thead {
            font-size: 14px;
            tr th {
              padding: 7px;
            }
          }
          .ant-table-tbody {
            font-size: 12px;
          }
        }
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
        background-color: #e8e8e8;
        border: 1px solid #e8e8e8;
      }

      ul {
        border: 1px solid #e8e8e8;
        margin-bottom: 10px;
        border-top: 0;
        > li {
          font-size: 12px;
          position: relative;
          background: #fff;
          padding: 8px;

          button {
            position: absolute;
            right: 10px;
            background: none;
            top: 1px;
            padding-right: 5px;
            padding-left: 5px;
          }
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
    height: 510px;
    text-align: center;
    display: flex;
    align-items: center;

    ul {
      margin: auto;

      li {
        margin-bottom: 15px;
        button {
          position: relative;
          font-size: 13px;
          box-shadow: none;
          > i {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            right: 10px;
            vertical-align: middle;
            float: none !important;
            height: 12px;
          }
        }
      }
    }
  }
  .applyButtonWrapper {
    text-align: center;
    margin-top: 30px;
  }
`;

export default StyledWorkProcessModal;
