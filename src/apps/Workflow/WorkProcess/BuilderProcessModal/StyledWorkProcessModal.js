import styled from 'styled-components';

const StyledWorkProcessModal = styled.div`
  width: 100%;

  .basicWrapper {
    width: 100%;
    height: 510px;

    &.deptWrapper {
      .tabButtonWrapper {
        border: 1px solid #e8e8e8;
        border-bottom: 0;
        border-top: 0;
        border-radius: 3px 3px 0 0;
        button {
          width: 33.33%;
          background: #fff;
          color: #999;
          border: 0;
          border-radius: 0;
          font-size: 13px;
          height: auto;
          padding: 5px;
          box-shadow: none;
          border: 1px solid #e8e8e8;
          border-right: 0;
          &.on {
            color: #333;
            border-bottom: 1px solid #fff;
            border-top: 2px solid #4491e0;
            border-radius: 3px 3px 0 0;
          }
          &:hover {
            color: #333;
            border-top: 2px solid #4491e0;
          }
          &:first-child {
            border-left: 0;
          }
        }
      }
      .tabContentsWrapper {
        border: 1px solid #e8e8e8;
        height: 480px;
        border-top: 0;
        .deptTree {
          width: 100%;
          height: 220px;
          overflow-y: auto;
          .site-tree-search-value {
            color: #f50;
          }
          li .ant-tree-node-content-wrapper {
            font-size: 12px;
          }
        }

        .userList {
          width: 100%;
        }
      }
    }

    &.userWrapper {
      border-left: 0px;
    }

    &.selectedWrapper {
      overflow-y: auto;
      border: 1px solid #e8e8e8;
      padding: 10px;

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
        &:last-child {
          margin-bottom: 0;
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
    text-align: right;
    margin-top: 15px;
  }
`;

export default StyledWorkProcessModal;
