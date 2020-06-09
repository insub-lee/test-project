import styled from 'styled-components';
import closeImg from 'apps/wts/images/icon_pclose.png';
import iconCheckBox from 'apps/wts/images/icon_checkbox.png';

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
    padding: 20px 30px;
    position: relative;
    background-color: #ffffff;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;

    form {
      // margin-bottom: 20px;
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
        .tree-view_arrow:after {
          font-family: 'Font Awesome 5 Free';
          font-weight: 900;
          content: '\\F056';
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
  }

  .event-item {
    text-align: center;
  }

  .transfer_box {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-content: flex-start;
    margin: auto;
    height: auto;

    & > div {
      margin: 5px;
      height: 400px;
      background-color: #ffffff;
      border: 1px solid #dadada;
    }

    .transfer-from {
      width: calc(45% - 10px);
    }

    .transfer-action {
      position: relative;
      width: 10%;
      flex: none;
      margin: 5px 0;
      border: none;

      .transfer-action_list {
        position: absolute;
        height: 60px;
        margin: auto;
        width: 30px;
        top: calc(50% - 30px);
        left: calc(50% - 15px);

        li {
          opacity: 0.4;
          transition: all 0.3s;

          button {
            cursor: default;
          }

          &.active {
            opacity: 0.8;
            button {
              cursor: pointer;
            }
            transition: all 0.3s;

            &:hover {
              opacity: 1;
              color: black;
            }
          }
        }
      }
    }

    .transfer-to {
      width: calc(45% - 10px);
    }

    .transfer-target_selector {
      display: block;
      height: 30px;
      line-height: 30px;
      width: 95%;
      margin: auto;
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

  .img_slider .image-gallery-left-nav::before,
  .img_slider .image-gallery-right-nav::before,
  .img_slider .image-gallery-play-button::before {
    color: #1890ff;
  }

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
`;

export default StyledContent;
