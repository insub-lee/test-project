import styled from 'styled-components';
import closeImg from '../../images/icon_pclose.png';

const StyledContent = styled.div`
  .pop_tit {
    height: 50px;
    line-height: 50px;
    padding: 0 22px;
    background: #4491e0;
    font-size: 19px;
    font-weight: 500;
    color: white;
    position: relative;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;

    .icon.icon_pclose {
      text-indent: -9999px;
      display: inline-block;
      vertical-align: middle;
      width: 30px;
      height: 30px;
      background: url(${closeImg}) no-repeat center;
      border-radius: 100%;
      border: 1px solid white;
      position: absolute;
      right: 20px;
      top: 50%;
      margin-top: -15px;
      display: none;
    }
  }

  .pop_con {
    padding: 20px 30px;
    position: relative;
    background-color: #ffffff;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;

    .sub_form {
      .sub_title {
        font-weight: bold;
        font-size: 14px;
        padding: 5px 0 8px;
      }
      .tableBody {
        border: 1px solid #ddd;
        border-top: 2px solid #999;
        padding: 5px;
        margin-bottom: 10px;
        .tableHead {
          > div {
            position: relative;
            padding: 5px 10px;
            button {
              position: absolute;
              right: 0;
              top: 50%;
              transform: translateY(-50%);
            }
          }
        }
      }
      .ant-row {
        /* display: table;
        width: 100%;
        height: 50px;
        table-layout: fixed; */
        > div {
          display: table;
          width: 50%;
          table-layout: fixed;
          float: left;
          &.w100Table {
            width: 100%;
            &.notpad {
              > .ant-col {
                padding: 0;
                vertical-align: top;
              }
            }
          }
          &.btn-wrap {
            width: 100%;
            text-align: center;
            margin-top: 20px;
            margin-bottom: 20px;
          }
          &.btn-right {
            text-align: right;
          }
        }
        .ant-col {
          display: table-cell;
          vertical-align: middle;
          float: none;
          padding: 5px 10px;
          font-size: 12px;
          color: #000;
          .ant-input {
            border: 0;
            border-bottom: 1px solid #d9e0e7;
            height: 30px;
            line-height: 30px;
            color: #333;
            vertical-align: middle;
            border-radius: 0;
            padding: 0 10px;
            font-size: 12px;
          }
          .ant-input-group-addon {
            border: 1px solid #d9d9d9;
            border-radius: 4px;
            .ant-input-group-addon:last-child {
              border-top-left-radius: 4px;
              border-bottom-left-radius: 4px;
              border-left: 1px solid #d9d9d9;
            }
          }
          span.ant-radio + * {
            font-size: 12px;
          }
          .ant-radio {
            .ant-radio-inner {
              width: 1rem;
              height: 1rem;
              /* border: #c5cdd6 solid 1px; */
              background: #d3dbe5;
            }
            &.ant-radio-checked {
              &:after {
                border: 1px solid #1fb5ad;
              }
              .ant-radio-inner {
                background-color: #1fb5ad;
                border-color: #1fb5ad;
                &:after {
                  width: 8px;
                  height: 8px;
                  top: 3px;
                  left: 3px;
                  background-color: #1fb5ad;
                  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='-4 -4 8 8'%3e%3ccircle r='3' fill='%23fff'/%3e%3c/svg%3e");
                  position: absolute;
                  display: block;
                  content: '';
                  background-repeat: no-repeat;
                  border: none;
                  -webkit-transform: none;
                  -ms-transform: none;
                  -webkit-transform: none;
                  -ms-transform: none;
                  transform: none;
                }
              }
              ~ span {
                font-weight: 600;
              }
            }
          }
          .ant-select .ant-select-selection {
            border: 0;
            border-bottom: 1px solid #d9e0e7;
            border-radius: 0;
            border-color: #d9e0e7 !important;
            .ant-select-arrow {
              border: 1px solid #d9e0e7;
              padding: 3px;
              background: #fff;
              transform: translateY(-50%);
              right: 0;
              margin-top: -2px;
            }
            .ant-select-selection__rendered {
              .ant-select-search__field__placeholder,
              .ant-select-selection__placeholder {
                font-size: 12px;
              }
            }
            .ant-select-selection-selected-value {
              font-size: 12px;
              color: #333;
            }
          }
          .ant-checkbox-wrapper span {
            font-size: 12px;
          }
          .tableCustom {
            .ant-table-thead > tr > th {
              text-align: left;
              background-color: #f7f7f7;
              color: #000;
              border-top: 1px solid #999;
            }
            .ant-table-pagination .ant-pagination-item-active {
              background: #1890ff;
            }
          }
        }
      }
    }
    .ant-table-tbody > tr.ant-table-row-hover:not(.ant-table-expanded-row):not(.ant-table-row-selected) > td,
    .ant-table-tbody > tr:hover:not(.ant-table-expanded-row):not(.ant-table-row-selected) > td,
    .ant-table-thead > tr.ant-table-row-hover:not(.ant-table-expanded-row):not(.ant-table-row-selected) > td,
    .ant-table-thead > tr:hover:not(.ant-table-expanded-row):not(.ant-table-row-selected) > td {
      cursor: pointer;
    }

    form {
      textarea {
        padding: 5px 0 15px 0;
        border: 0;
        width: 100%;
        border-bottom: 1px solid #d9e0e7;
        font-size: 14px;
        color: #111b27;
        min-height: 50px;
      }
    }
  }

  ul.users {
    display: flex;

    flex-wrap: wrap;
    min-width: 35%;
    border: 0;
    border-radius: 0;
    background: 0;
    border-bottom: 1px solid #d9e0e7;
    font-size: 15px;
    min-height: 45px;
    //line-height: 45px;
    color: #555;
    vertical-align: middle;
    text-align: left;
    align-items: center;

    & > .user_tag {
      width: 150px;
      position: relative;
      padding: 0;
      //color: #fff;
      margin: 3px;
      //background: #636a78;
      border: 1px solid #636a78;
      font-size: 14px;
      font-weight: 500;
      text-align: left;

      //padding: 0 60px;
      min-height: 0;
      height: 20px;
      line-height: 20px;
      -webkit-border-radius: 30px;
      -moz-border-radius: 30px;
      border-radius: 30px;
      width: auto;

      & > span {
        margin: 0 20px 0 10px;
        font-size: 12px;
        vertical-align: top;
      }

      & > button {
        position: absolute;
        top: 0;
        right: 7px;

        &.close {
          //color: #ffffff;
          &:hover {
          }
        }
      }
    }
  }

  .btn {
    display: inline-block;
    font-weight: 500;
    vertical-align: middle;

    &.gray {
      background: white;
      border: 1px solid #636a78;
      color: black !important;
    }

    &.small {
      padding: 0 16px;
      height: 30px;
      line-height: 30px;
      font-size: 14px;
      border-radius: 30px;
    }

    &.big {
      padding: 0 20px;
      height: 38px;
      line-height: 38px;
      font-size: 16px;
      border-radius: 38px;
    }

    &.border {
      background: white;
      border: 1px solid #636a78;
      color: #333 !important;
    }
  }

  .findDiv {
    position: relative;

    .findbtn {
      position: absolute;
      top: 8px;
      right: 15px;
      cursor: pointer;
    }
  }

  .ant-select {
    width: 100%;
  }
  .noShow {
    display: none;
  }
  .line {
    min-height: 1px;
    height: 1px;
    background: #eceff3;
    padding: 0;
    margin: 25px 0px 20px;
  }
`;

export default StyledContent;
