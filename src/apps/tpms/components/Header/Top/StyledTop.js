import styled from 'styled-components';
import iconArrGnb2 from '../../../images/icon_arr_gnb2.png';

const StyledTop = styled.div`
  height: 66px;
  z-index: 9;
  background: white;
  border-bottom: 1px solid #d9dee4;

  form.header_search {
    position: relative;
    height: 66px;
    padding: 0 235px 0 66px;

    legend {
      display: none;
    }

    button[type='submit'],
    a.submit {
      display: inline-block;
      position: absolute;
      left: 22px;
      top: 24px;
      color: #878a8c;
    }

    input {
      padding: 1px 0;
      -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;
      border-radius: 0;
      background: 0;
      height: 40px;
      margin: 11px 0;
      line-height: 40px;
      border: 0;
      width: 100%;
    }
  }

  ul.header_menu {
    position: absolute;
    right: 32px;
    top: 26px;

    li {
      float: left;
      margin-left: 30px;
      position: relative;

      i {
        display: block;
        color: #696969 !important;
      }

      button {
        display: block;
      }

      .num {
        font-size: 11px;
        color: white;
        width: 19px;
        height: 19px;
        line-height: 19px;
        text-align: center;
        border-radius: 100%;
        background: #ff7f29;
        display: block;
        position: absolute;
        right: -10px;
        top: -10px;
        text-indent: 0;
      }
    }
  }

  div.gnb_menu_sub,
  div.gnb_menu_sub_options {
    font-size: 0;
    position: absolute;
    top: 50px;
    right: 3px;
    z-index: 6;
    display: none;

    &.active {
      display: block;
    }

    .icon_arr_gnb2 {
      width: 23px;
      height: 11px;
      background: url(${iconArrGnb2}) no-repeat center;
      display: block;
      margin: 0 auto;
      margin-bottom: -1px;
      position: relative;
      z-index: 2;
      margin-right: 71px;
    }

    ul {
      list-style: none;
      padding: 0;
      margin: 0;
      li {
        border: 0;
        vertical-align: top;
        outline: none;
        padding: 0;
        margin: 0;
        button {
          display: block;
          width: 100%;
          text-align: left;
          padding: 7px 25px;
          color: #555;
          text-overflow: ellipsis;
          white-space: nowrap;
          word-wrap: normal;
          overflow: hidden;
          font-size: 14px;
          padding: 10px 15px;
        }
      }
    }

    .logoutBox {
      border: 1px solid #a0a2a9;
      background: white;
      padding: 0;
      box-shadow: 3px 3px 3px 0 rgba(0, 0, 0, 0.12);
      position: relative;
      z-index: 1;
    }
  }

  div.gnb_menu_sub_options {
    .icon_arr_gnb2 {
      width: 23px;
      height: 11px;
      background: url(${iconArrGnb2}) no-repeat center;
      display: block;
      margin-right: 25px;
      position: relative;
      z-index: 2;
    }
  }

  @media screen and (max-width: 736px) {
    height: 50px;

    form.header_search {
      height: 50px;
      padding: 0 180px 0 60px;
      z-index: 1;

      legend {
        display: none;
      }

      button[type='submit'] {
        position: absolute;
        left: 22px;
        top: 17px;
        color: #878a8c;
      }

      input {
        height: 40px;
        margin: 4px 0;
        line-height: 40px;
        border: 0;
        width: 100%;
      }
    }

    ul.header_menu {
      right: 20px;
      top: 5px;
      z-index: 3;
      overflow: hidden;

      li {
        float: left;
        margin-left: 17px;
        position: relative;

        i {
          display: block;
          color: #696969 !important;
        }

        button {
          display: block;
          height: 40px;
        }

        .num {
          right: -7px;
          top: 2px;
        }
      }
    }

    div.gnb_menu_sub {
      z-index: 2;
      top: 45px;

      .icon_arr_gnb2 {
        margin-left: 100px;
      }
    }
  }
`;

export default StyledTop;
