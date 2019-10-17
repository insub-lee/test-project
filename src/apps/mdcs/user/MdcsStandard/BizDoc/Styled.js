import styled from 'styled-components';
import closeImg from 'apps/mdcs/images/icon_pclose.png';
const Wrapper = styled.div`
  .RowBorder {
    margin-bottom: 20px;
  }

  .title {
    line-height: 30px;
  }
  input {
    width: 90%;
  }
  textarea {
    width: 90%;
  }
  .ButtonWrap {
    text-align: center;
    display: block;
    button {
      margin-right: 10px;
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
    padding: 10px 30px;
    position: relative;
    background-color: #ffffff;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;

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
`;

export default Wrapper;
