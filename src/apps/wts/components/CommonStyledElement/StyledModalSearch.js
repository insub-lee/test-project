import styled from 'styled-components';
import iconSelect from 'apps/wts/images/icon_select.png';

const StyledSearch = styled.div`
  form {
    text-align: center;
    font-size: 0;

    & select {
      -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;
      border: 0;
      border-radius: 0;
      color: #555;
      vertical-align: middle;
      border-bottom: 1px solid #d9e0e7;
      font-size: 15px;
      height: 48px;
      line-height: 48px;
      background: white url(${iconSelect}) no-repeat right center;
      width: 150px;
      margin-right: 30px;
    }

    input {
      border: 0;
      border-radius: 0;
      background: 0;
      width: 100%;
      -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;
      width: 100%;
    }

    & .input {
      border-bottom: 1px solid #d9e0e7;
      font-size: 15px;
      height: 48px;
      line-height: 48px;
      color: #555;
      vertical-align: middle;
      width: 390px;
      margin-right: 30px;
    }

    @media screen and (max-width: 1260px) {
      position: relative;
      padding-right: 75px;
      text-align: left;

      select {
        width: 26%;
        margin-right: 3%;
        vertical-align: bottom;
      }

      .input {
        width: 64%;
        margin-right: 0;
        vertical-align: bottom;
      }

      .icon_search_white {
        position: absolute;
        right: 0;
        top: 10px;
      }
    }
  }
`;

export default StyledSearch;
