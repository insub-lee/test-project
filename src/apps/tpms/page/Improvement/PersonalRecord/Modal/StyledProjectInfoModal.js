import styled from 'styled-components';

const StyledProjectInfoModal = styled.div`
  .sub_form.small2 {
    margin-bottom: 10px;
  }
  .sub_form.small2 > li {
    padding-left: 150px;
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
    min-height: 48px;
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
    min-height: 48px;
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
