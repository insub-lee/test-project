import styled from 'styled-components';

import iconSelect from 'images/icon/icon_select.png';

const StyledStandard = styled.div`
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }

  input,
  select,
  textarea {
    border-radius: 0;
  }

  select {
    appearance: none;
    border: 0;
    border-radius: 0;
    width: 100%;
    color: #555;
    vertical-align: middle;
    border-bottom: 0px solid #d9e0e7;
    font-size: 15px;
    height: 48px;
    line-height: 48px;
    background: #e7e7e7 url(${iconSelect}) no-repeat right 10px center;
    padding-left: 10px;
  }

  select::-ms-expand {
    display: none;
  }

  input {
    appearance: none;
    border: 0;
    border-radius: 0;
    background: 0;
    width: 100%;
    background: #e7e7e7;
    padding: 0 10px;
    font-size: 15px;
    height: 45px;
    line-height: 45px;
    color: #555;
    vertical-align: middle;
  }

  .mb20 {
    margin-bottom: 20px;
  }

  .icon {
    text-indent: -9999px;
    display: inline-block;
    vertical-align: middle;
  }

  .btn_wrap {
    font-size: 0;
    text-align: center;
    overflow: hidden;
  }

  .cr {
    clear: both;
  }

  .fl {
    float: left;
  }

  .fr {
    float: right;
  }
`;

export default StyledStandard;
