import styled from 'styled-components';
import iconCheckbox from 'apps/wts/images/icon_checkbox.png';

const StyledCheckbox = styled.div`
  & {
    display: inline-block;
    /* padding: 10px; */
    /* height:48px 을 맞추기 위해 12px로 변경 */
    padding: ${({ noPadding }) => (noPadding ? '0' : '12px 0')};
    margin-right: 12px;
    /* 최소 넓이를 줘서 일정하게 보이도록 설정 */
    // min-width: 112px;

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

export default StyledCheckbox;
