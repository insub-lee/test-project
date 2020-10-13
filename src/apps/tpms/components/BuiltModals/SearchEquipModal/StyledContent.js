import styled from 'styled-components';
import closeImg from '../../../images/icon_pclose.png';
import iconCheckBox from '../../../images/icon_checkbox.png';

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
    padding: 10px 30px;
    position: relative;
    background-color: #ffffff;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;

    form {
      margin-bottom: 20px;
      // input[type='text'] {
      //   border-bottom: 1px solid #d9e0e7;
      //   font-size: 15px;
      //   height: 45px;
      //   line-height: 45px;
      //   color: #555;
      //   vertical-align: middle;
      //   // margin-bottom: 20px !important;

      //   .btn_wrap {
      //     font-size: 0;
      //     text-align: center;
      //     overflow: hidden;
      //   }
      // }
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
      height: 665px;

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
      padding-bottom: 30px;
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

export default StyledContent;
