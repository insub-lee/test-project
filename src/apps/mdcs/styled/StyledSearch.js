import styled from 'styled-components';

const StyledSearch = styled.div`
  .searchTabs {
    .ant-tabs-bar {
      border-bottom: 0;
      margin: 0;
      background: #4491e0;
      padding: 0 30px;
      height: 55px;
      line-height: 55px;
      .ant-tabs-nav-wrap {
        margin-bottom: 0;
        .ant-tabs-ink-bar {
          background-color: #fff;
        }
        .ant-tabs-tab {
          height: 55px;
          line-height: 55px;
          padding: 0 25px;
          color: #fff;
          opacity: 0.7;
          font-size: 16px;
          &.ant-tabs-tab-active {
            opacity: 1;
            &:after {
              content: '';
              position: absolute;
              width: 0;
              height: 0;
              border-style: solid;
              border-width: 15px 10px;
              left: 50%;
              margin-left: 0;
              border-color: #4491e0 transparent transparent transparent;
              bottom: -25px;
            }
          }
          &:hover {
            color: #fff !important;
          }
        }
      }
    }
  }
  /* tab 끝 */
  .searchPage {
    background-color: #ebf0f6;
    padding: 20px;
    .searchWrapper {
      background-color: #fff;
      padding: 0 0 25px 0;
      border-radius: 4px;
      .searchTitle {
        width: 100%;
        font-size: 15px;
        font-weight: 600;
        color: #000;
        border-bottom: 1px solid #ebf0f6;
        padding: 13px 20px 13px;
      }
      .ant-form {
        padding: 10px 20px 0;
        .ant-row {
          position: relative;
          min-height: 40px;
          line-height: 40px;
          padding-left: 140px;
          clear: both;
          &.ant-form-item {
            display: block;
          }
          &.formCustom {
            clear: both;
            .ant-radio-group {
              float: left;
            }
            input {
              width: calc(100% - 174.77px);
              float: left;
            }
          }
          .ant-form-item-label {
            position: absolute;
            left: 0;
            top: 0;
            height: 40px;
            line-height: 40px;
            label {
              color: #333;
              font-size: 13px;
              &:after {
                display: none;
              }
            }
          }
          .ant-form-item-control-wrapper {
            width: 100%;
            .ant-form-item-control {
            }
          }
          .btn-wrap {
            width: 100%;
            text-align: center;
            margin-top: 20px;
          }
        }
        label {
          font-size: 12px;
        }
      }
    }
    /* search form 끝 */
    .ant-table-wrapper {
      margin-top: 20px;
      background-color: #fff;
      border-radius: 4px;
      padding: 20px;
      &.tableCustom {
        .ant-table-tbody > tr > td,
        .ant-table-thead > tr > th {
          padding: 10px 16px;
          border-radius: 0;
        }
        .ant-table-thead > tr > th {
          background-color: #f7f7f7;
          color: #000;
          border-top: 1px solid #999;
          font-size: 13px;
        }
      }
    }
    /* table 끝 */
    &.searchDetail {
      .searchWrapper {
        overflow: hidden;
        padding: 0;
        .tfWrapper {
          min-height: 450px;
          &.treeWrapper {
            width: 15%;
            float: left;
            padding: 10px 15px;
            height: 100%;
            border-right: 1px solid #ebf0f6;
          }
          &.formWrapper {
            float: right;
            width: 85%;
          }
        }
      }
    }
  }
  .line {
    min-height: 1px;
    height: 1px;
    background: #eceff3;
    padding: 0;
    margin: 30px 0 15px 0;
  }
`;

export default StyledSearch;
