import styled from 'styled-components';
import closeImg from 'apps/wts/images/icon_pclose.png';
import iconCheckBox from 'apps/wts/images/icon_checkbox.png';

const StyledModalContent = styled.div`
  .search_div {
    margin-bottom: 10px;

    li {
      float: left;
      list-style-type: none;
      vertical-align: bottom;
      margin: 0 30px 10px 0;
    }

    input {
      text-align: center;
    }
    
  }
  .pop_tit {
    height: 50px;
    line-height: 50px;
    padding: 0 22px;
    background: #4491e0;
    font-size: 19px;
    font-weight: 500;
    color: white;
    position: relative;

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
    }
  }

  .pop_con {
    padding: 30px 30px;
    position: relative;
    background-color: #ffffff;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;

    form {
      margin-bottom: 20px;
    }

    .select_search {
      position: relative;
      padding-right: 100px;
      margin-bottom: 20px;

      .searchCon {
        display: inline-block;
      }

      .searchWord {
        display: inline-block;
      }

      ul {
        font-size: 0;
        li {
          display: inline-block;
          position: relative;
          width: calc(25% - 120px);
          padding-left: 120px;

          label {
            line-height: 48px;
            position: absolute;
            left: 30px;
            top: 0;
            font-size: 15px;
          }

          select {
            width: 100%;
          }

          input {
            width: 100%;
            height: 48px;
            border-bottom: 1px solid #d9e0e7;
          }
        }
      }

      .icon_search_white {
        position: absolute;
        right: 20px;
        top: 50%;
        margin-top: -20px;
      }
    }

    .tb_wrap {
      clear: both;

      .tb01 {
        width: 100%;
        //margin-bottom: 20px;

        th,
        td {
          font-size: 15px;
          padding: 14px;
          text-align: center;
        }

        th {
          border-top: 1px solid #aeb4be;
          border-bottom: 1px solid #aeb4be;
          font-weight: 400;
        }

        tr.bg td {
          background: #f6f8fa;
        }
      }

      .tb02 {
        width: 100%;

        th {
          color: white;
          background: #6e7b95;
          font-weight: 400;
          font-size: 15px;
          padding: 12px 10px;
          text-align: center;
        }

        td {
          font-size: 15px;
          padding: 12px 10px;
          text-align: center;
          color: #555;
          border: 1px solid #eaecee;
        }
        
        .bd th {
          border: 1px solid #5a6885;
        }

      .checkbox {
        display: inline-block;

        input[type='checkbox'] {
          display: none;
        }

        input[type='checkbox'] + label {
          cursor: pointer;
          color: #777;
          font-size: 16px;

          span {
            display: inline-block;
            margin-right: 0;
            background: white;
            border: 1px solid #c5cdd6;
            width: 16px;
            height: 16px;
            margin-top: -3px;
            vertical-align: middle;
          }
        }

        input[type='checkbox']:checked + label {
          span {
            background: #fff url(${iconCheckBox}) no-repeat center;
          }
        }
      }
    }

    .btn_wrap {
      font-size: 0;
      text-align: center;
      overflow: hidden;
      //padding-bottom: 30px;
      margin-top: 10px;

      &.search_btn_wrap {
        padding: 0px;
        margin: 0px;
      }
    }

    .tree {
      border: 1px solid #d4d7df;

      & > .tree_title {
        padding: 10px;
        font-size: 15px;
        font-weight: 600;
        border-bottom: 1px solid #d4d7df;
      }

      & > .tree_contents {
        min-height: 300px;
        max-height: 500px;
        padding: 10px;
        overflow: auto;

        .node.clicked {
          color: #4491e0;
          font-weight: bold;
        }

        .node_no_children {
          //margin-left: 19.5px;
        }

        .tree-view-no_children_icon {
          // cursor: pointer;
          margin-right: 6px;
          display: inline-block;
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;
          width: 13.5px;
          text-align: center;

          &:after {
            font-weight: 900;
            content: '·';
          }
        }

        .tree-view_arrow:after {
          font-family: 'Font Awesome 5 Free';
          font-weight: 900;
          content: '\\F056';
        }

        .tree-view_arrow-collapsed {
          -webkit-transform: none;
          -moz-transform: none;
          -ms-transform: none;
          -o-transform: none;
          transform: none !important;
        }

        .tree-view_arrow-collapsed.tree-view_arrow:after {
          -webkit-transform: none;
          -moz-transform: none;
          -ms-transform: none;
          -o-transform: none;
          transform: none !important;
          content: '\\F055';
        }
      }
    }

    ul.multi_selector {
      & > li {
        margin-bottom: 5px;

        & > .title {
          margin: 0 !important;
          color: white;
          background: #6e7b95;
          font-weight: 400;
          text-align: center;
          word-break: break-all;
          font-size: 15px;
          height: 39px;
          line-height: 39px;

          button.btn_clear {
            margin-left: 10px;
            height: 20px;
            width: 30px;
            text-align: center;
            line-height: 20px;
            vertical-align: middle;
            font-size: 13px;
            background: white;
            border: 1px solid white;
            -webkit-border-radius: 5px;
            -moz-border-radius: 5px;
            border-radius: 5px;
          }
        }
        .row_list {
          margin: 0;
        }
      }
    }

    .tl {
      text-align: left !important;
    }

    textarea {
      padding: 5px 0 15px 0;
      border: 0;
      width: 100%;
      border-bottom: 1px solid #d9e0e7;
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
      border: 1px solid #ccc;
      font-size: 14px;
      font-weight: 500;
      text-align: left;

      //padding: 0 60px;
      min-height: 0;
      height: 30px;
      line-height: 30px;
      -webkit-border-radius: 30px;
      -moz-border-radius: 30px;
      border-radius: 30px;
      width: auto;

      & > span {
        margin: 0 30px 0 15px;
        font-size: 14px;
        vertical-align: top;
      }

      & > button {
        position: absolute;
        top: 8px;
        right: 10px;

        & > .fa-times:before {
          color: #ccc;
        }

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

  @media screen and (max-width: 1260px) {
    .pop_con {
      .select_search {
        ul {
          li {
            width: calc(50% - 120px);
          }
        }
      }
    }
  }
`;

export default StyledModalContent;
