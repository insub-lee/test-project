import styled from 'styled-components';

const StyledProjectInfoModal = styled.div`
  .sub_form.small2 {
    margin-bottom: 10px;
    overflow: hidden;
  }
  .sub_form_wrapper {
    overflow: hidden;
    .sub_form_left {
      float: left;
      width: calc(50% - 20px);
    }
    .sub_form_right {
      float: right;
      width: calc(50% - 20px);
    }
    &.mb10 {
      margin-bottom: 10px;
    }
  }
  .sub_form.small2 > li.row_50_custom {
    padding-left: 0;
    .col_50 {
      padding-left: 50px;
      position: relative;
      width: calc(50% - 20px);
      label.title {
        position: absolute;
        left: 0px;
        top: 50%;
        transform: translateY(-50%);
        height: 48px;
        line-height: 48px;
        color: rgb(85, 85, 85);
        font-size: 14px;
        font-weight: 500;
        padding: 0px;
      }
      &.col_left {
        float: left;
      }
      &.col_right {
        float: right;
        label.title {
          left: -10px;
        }
      }
      p > span {
        display: block;
      }
    }
  }

  .desc_p {
    height: 45px;
    background: #e7e7e7;
    padding: 10px;
    &.desc_p_scroll {
      overflow-y: scroll;
      height: 100px;
    }
    &.desc_p_scroll_3 {
      overflow-y: scroll;
      height: 77px;
    }
  }

  .sub_form.small2 > li {
    padding-left: 150px;

    input {
      overflow: visible;
      background: rgb(231, 231, 231);
      padding: 0px 10px;
      font-size: 15px;
      height: 45px;
      line-height: 45px;
      color: rgb(85, 85, 85);
      vertical-align: middle;
      border: 0px;
      width: 100%;
      border-radius: 0px;
    }

    &.equipmentCustom ul {
      padding: 10px;
      background: #e7e7e7;
      min-height: 60px;

      & li {
        background: rgb(255, 255, 255);
        font-weight: 500;
        height: 30px;
        line-height: 30px;
        width: auto !important;
        margin: 3px;
        border-width: 1px;
        border-style: solid;
        border-color: rgb(204, 204, 204);
        border-radius: 30px;

        & span {
          font-size: 14px;
          vertical-align: top;
          margin: 0px 15px 0px 15px;
        }
      }
    }

    &.equipmentCustom2 p {
      background: #e7e7e7;
      padding: 10px;
    }

    & > .titleCustom {
      top: 50%;
      transform: translateY(-50%);
    }

    &.flCustom {
      float: left;
    }

    &.frCustom {
      float: right;
    }

    &.width50 {
      width: calc(50% - 20px);
      clear: none;
      &.mb0 {
        margin-bottom: 0;
      }
    }

    &.mergeSubWrap {
      padding: 15px 10px 15px 150px;
      border-radius: 3px;
      border-bottom: 1px solid #eee;
      margin-bottom: 0;
      &.mergeSubWrap:first-child {
        border-top: 1px solid #eee;
      }
      & .mergeSubForm {
        & li {
          margin-bottom: 10px;
          &:last-child {
            margin-bottom: 0;
          }
          & .mergeSpan {
            display: block;
            color: #666;
            margin-bottom: 5px;
          }
          & .mergeTextarea,
          & .mergeInput {
            display: block;
            margin-top: 0;
          }
        }
      }
    }
  }
  .sub_form.small2 > li.table_wrap {
    padding-left: 0px;
  }
  .table_wrap {
    table {
      width: 100%;
      margin-bottom: 20px;
      thead {
        border-top: 1px solid #aeb4be;
        border-bottom: 1px solid #aeb4be;
        th {
          font-size: 15px;
          padding: 12px 14px 11px 14px;
          text-align: center;
          font-weight: 400;
        }
      }
      tbody {
        td {
          font-size: 15px;
          padding: 11px 14px;
          text-align: center;
          color: #555555;
        }
        .rowColor {
          background: #f6f8fa;
        }
      }
    }
    .top_title {
      height: 48px;
      line-height: 48px;
    }
  }
  .obs_user_wrap {
    min-height: 49px;
    border-bottom: 1px solid #d9e0e7;
    color: #555;
    display: flex;
    align-items: center;
    ul {
      width: 100%;
      li {
        padding: 2px 0;
        span {
          display: inline-block;
        }
        .obs_user_info {
          width: 80%;
        }
        .obs_process_info {
          width: 20%;
          text-align: center;
        }
      }
    }
    button {
      margin: 0 5px;
    }
  }
  .vlr_wrap {
    min-height: 49px;
    /* border-bottom: 1px solid #d9e0e7; */
    /* color: #555; */
    display: flex;
    align-items: center;
    color: red;

    button {
      margin-left: 10px;
    }
  }

  #MADNPCtrl {
    height: 0px;
  }
`;
export default StyledProjectInfoModal;
