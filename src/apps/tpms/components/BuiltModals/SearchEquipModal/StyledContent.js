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

    select {
      appearance: none;
      border-width: 0px;
      border-top-style: initial;
      border-right-style: initial;
      border-left-style: initial;
      border-top-color: initial;
      border-right-color: initial;
      border-left-color: initial;
      border-image: initial;
      border-radius: 0px;
      width: 100%;
      color: rgb(85, 85, 85);
      vertical-align: middle;
      border-bottom-style: solid;
      border-bottom-color: rgb(217, 224, 231);
      font-size: 13px;
      height: 48px;
      line-height: 48px;
      background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAYCAYAAAAPtVbGAAAAu0lEQVRIie2WsQ3CMBBFn1EqhqDPBlRAi2+IjIIY6lxDxwa0iIKKmjY0FxRFTmQLufNvrC+f79lXfNk9Xu+ewmpsdQUZ/apg858qpELKqZnbCKob4G7We5FrpGYPBLOtF3nGes2+xA60Qz9rmA1YhIxAMgLtIoDjEgDAWXYtxkpQPQBq9gSch3vExjhRnwSZgNbAJxEAOdnlRS5AZ7ZLBACJ4xorqG69yC21npxx/aEa9RVSUEMKF/0WfQG+mErmooDh3gAAAABJRU5ErkJggg==)
        right 10px center no-repeat rgb(231, 231, 231);
      padding-left: 10px;
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
