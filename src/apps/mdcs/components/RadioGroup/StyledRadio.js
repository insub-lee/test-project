import styled from 'styled-components';
import iconRadio from '../../images/icon_radio.png';

const StyledRadio = styled.div`
  & {
    display: inline-block;
    /* checkbox와 맞추기 위해 12px로 변경 */
    /* padding: 5px; */
    padding: ${({ noPadding }) => (noPadding ? '0' : '12px 0')};
    margin-right: 12px;
    /* 최소 넓이를 줘서 일정하게 보이도록 설정 */
    // min-width: 112px;

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
      -webkit-appearance: none;
      -moz-appearance: none;
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

export default StyledRadio;
