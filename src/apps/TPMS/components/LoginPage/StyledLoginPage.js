import styled from 'styled-components';
import loginBg from '../../images/loginBgImg.png';

const StyledLoginPage = styled.div`
  & {
    // background: #f2f4f5;
    background: url(${loginBg}) no-repeat center;
    background-size: cover;
    position: relative;
    height: 100vh;

    .login {
      position: absolute;
      width: 450px;
      height: 470px;
      margin: 0 auto;
      //padding: 150px 0;
      top: calc(50% - 235px);
      left: calc(50% - 225px);

      & h1 {
        display: block;
        width: 100%;
        text-align: center;
        font-size: 2em;
        margin: 0.67em 0 2em;

        & span {
          display: block;
          text-align: center;
          font-size: 22px;
          color: #878787;
        }
      }

      & > input {
        height: 50px;
        line-height: 50px;
        border-radius: 50px;
        font-size: 15px;
        background: none;
        border: 1px solid #8e8e8e;
        //width: calc(100% - 32px);
        width: 100%;
        padding: 0 40px;
        margin-bottom: 15px;
        color: white;
      }

      & > button {
        height: 50px;
        line-height: 50px;
        border-radius: 50px;
        font-size: 20px;
        background: #4491e1;
        color: white;
        display: block;
        width: 100%;
        margin: 20px 0 20px 0;
        font-weight: 400;
      }

      & > .checkbox input[type='checkbox'] + label {
        font-size: 14px;
      }

      & ul {
        border-top: 1px solid #dadada;
        margin-top: 15px;
        padding-top: 15px;
        text-align: center;
        font-size: 0px;

        li {
          display: inline-block;

          button {
            font-size: 14px;
            color: #777;
            vertical-align: middle;
            padding: 0;
            margin: 0;
          }

          span {
            display: inline-block;
            width: 1px;
            height: 12px;
            background: #dadada;
            vertical-align: middle;
            margin: 0 12px;
          }
        }
      }
    }
  }

  @media screen and (max-width: 736px) {
    .login {
      position: absolute;
      width: 80%;
      height: 400px;
      margin: 0 auto;
      //padding: 50px 0;
      left: 10%;
      top: calc(50% - 200px);

      & h1 img {
        width: 80%;
        max-width: 383px;
      }

      & h1 span {
        font-size: 20px;
      }

      & > input {
        height: 35px;
        line-height: 35px;
        font-size: 12px;
        margin-bottom: 5px;
      }

      & > button {
        height: 35px;
        line-height: 35px;
        font-size: 12px;
        margin: 5px 0 10px 0;
      }

      & .checkbox input[type='checkbox'] + label {
        font-size: 12px;
      }

      & ul {
        padding-top: 15px;
        margin-top: 15px;

        & li {
          font-size: 0;

          & button {
            font-size: 10px;
          }

          & span {
            height: 8px;
            margin: 0 5px;
          }
        }
      }
    }
  }
`;

export default StyledLoginPage;
