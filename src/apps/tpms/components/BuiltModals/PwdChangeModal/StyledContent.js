import styled from 'styled-components';
import closeImg from '../../../images/icon_pclose.png';

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
      input[type='text'],
      input[type='password'] {
        border-bottom: 1px solid #d9e0e7;
        font-size: 15px;
        height: 45px;
        line-height: 45px;
        color: #555;
        vertical-align: middle;
        margin-bottom: 20px !important;

        .btn_wrap {
          font-size: 0;
          text-align: center;
          overflow: hidden;
        }
      }
    }

    h1 {
      margin-bottom: 40px;
      img {
        width: 40px;
        margin-right: 20px;
      }
      span {
        display: inline-block;
        text-align: left;
        font-size: 20px;
        vertical-align: middle;
      }
    }

    .mb30 {
      margin-bottom: 30px !important;
      ul {
        text-align: left;
        padding: 30px 20px;
        border-bottom: 1px solid #dadada;
        border-top: 1px solid #dadada;
        li {
          font-size: 14px;
          text-align: left;
          display: block;
        }
      }
    }
    .input_wrap {
      label {
        display: inline-block;
        width: 13%;
      }
      input {
        width: 80%;
        margin-left: 20px;
        height: 50px;
        line-height: 50px;
        border-radius: 5px;
        font-size: 14px;
        background: white;
        border: 1px solid #dadada;
        // width: calc(100% - 32px);
        padding: 0 15px;
        margin-bottom: 10px;
      }
    }
  }
`;

export default StyledContent;
