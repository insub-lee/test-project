import styled from 'styled-components';
import iconSelect from '../../images/icon_select.png';
import iconRadio from '../../images/icon_radio.png';
import iconCheckbox from '../../images/icon_checkbox.png';

export const StyledTextField = styled.div`
  & {
    // padding: 10px;

    input {
      -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;
      border: 0;
      border-radius: 0;
      background: 0;
      width: 100%;
      border-bottom: 1px solid #d9e0e7;
      font-size: 15px;
      height: 45px;
      line-height: 45px;
      color: #555;
      vertical-align: middle;
    }
  }
`;

export const StyledTextArea = styled.div`
  & {
    display: block;
    padding: 10px 0;

    textarea,
    p {
      padding: 10px;
      border: 0;
      width: 100%;
      border-bottom: 0px solid #d9e0e7;
      font-size: 14px;
      color: #111b27;
      /* 최소높이랑를 임의로 지정 */
      min-height: 50px;
      background: #e7e7e7;
    }
  }
`;

export const StyledSelect = styled.div`
  & select {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    border: 0;
    border-radius: 0;
    width: 100%;
    //width: calc(100% - 30px);
    color: #555;
    vertical-align: middle;
    border-bottom: 0px solid #d9e0e7;
    font-size: 15px;
    height: 48px;
    line-height: 48px;
    background: #e7e7e7 url(${iconSelect}) no-repeat right 10px center;
    padding: 0 10px;
    /* TextField와 맞추기 위해 주석처리 */
    /* text-indent: 10px; */
  }
`;

export const StyledRadio = styled.div`
  & {
    display: ${({ other }) => (other ? 'inline-block' : 'block')};
    /* checkbox와 맞추기 위해 12px로 변경 */
    /* padding: 5px; */
    //padding: 12px;
    padding: ${({ noPadding }) => (noPadding ? '0 12px 0 0' : '12px 12px 12px 0')};
    /* 최소 넓이를 줘서 일정하게 보이도록 설정 */
    //min-width: 112px;

    label {
      cursor: pointer;
      color: #777;
      font-size: 16px;

      input[type='radio'] {
        display: none;
      }
      & input:checked + span {
        background: url(${iconRadio}) no-repeat center;
      }
      span {
        display: inline-block;
        margin-right: 6px;
        background: #d3dbe5;
        /* checkbox와 맞추기 위해 width & height 18px로 변경 */
        /* width: 16px; */
        /* height: 16px; */
        width: 18px;
        height: 18px;
        border-radius: 100%;
        margin-top: -3px;
        vertical-align: middle;
      }
    }
    input[type='text'] {
      appearance: none;
      border: 0;
      border-radius: 0;
      background: 0;
      border-bottom: 1px solid #d9e0e7;
      font-size: 15px;
      color: #555;
      vertical-align: middle;
      margin-left: 15px;
    }
    .text {
      padding: 5px 0 15px 0;
      border: 0;
      width: 100%;
      font-size: 14px;
      color: #111b27;
      /* 최소높이랑를 임의로 지정 */
      min-height: 50px;
    }
  }
`;

export const StyledCheckbox = styled.div`
  &.checkbox {
    display: ${({ other }) => (other ? 'inline-block' : 'block')};
    /* padding: 10px; */
    /* height:48px 을 맞추기 위해 12px로 변경 */
    //padding: 12px;
    padding: ${({ noPadding }) => (noPadding ? '0' : '12px 12px 12px 0')};
    /* 최소 넓이를 줘서 일정하게 보이도록 설정 */
    //min-width: 112px;

    label {
      cursor: pointer;
      color: #777;
      font-size: 16px;

      input[type='checkbox'] {
        display: none;
      }
      & input:checked + span {
        background: url(${iconCheckbox}) no-repeat center;
      }
      span {
        display: inline-block;
        margin-right: 6px;
        background: white;
        border: 1px solid #c5cdd6;
        width: 16px;
        height: 16px;
        margin-top: -3px;
        vertical-align: middle;
      }
    }
    input[type='text'] {
      appearance: none;
      border: 0;
      border-radius: 0;
      background: 0;
      border-bottom: 1px solid #d9e0e7;
      font-size: 15px;
      color: #555;
      vertical-align: middle;
      margin-left: 15px;
    }
  }
`;
