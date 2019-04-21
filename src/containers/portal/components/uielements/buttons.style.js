import styled from 'styled-components';
// import { palette } from 'styled-theme';

/* Gray Tone 버튼 */
const BtnBlack = styled.button`
  
`;

// 버튼 (확인, 저장 등)
const BtnDkGray = styled.button`
  min-width:90px;
  height:30px;
  padding: 0 15px;
  background-color:#333333;
  border: 1px solid #333333;
  border-radius: 3px;
  font-size:13px;
  color:#ffffff;
  line-height: 29px;

  &:hover, &:focus {
    background-color:#333333;
    border:1px solid #333333;
    color:#ffffff;
    border-color:#333333;
  }

  &.disabled {
    background-color:#909090;
    border:1px solid #909090;
    color:#dadada;
    cursor: default;
  }
`;

const BtnGray = styled.button`
  
`;

// 버튼 (취소 등)
const BtnLgtGray = styled.button`
  min-width:90px;
  height:30px;
  padding: 0 15px;
  background-color:#dadada;
  border: 1px solid #dadada;
  border-radius: 3px;
  font-size:13px;
  color:#333333;
  line-height: 29px;

  &:hover, &:focus {
    background-color:#dadada;
    border:1px solid #dadada;
    color:#333333;
  }
`;

export { BtnBlack, BtnDkGray, BtnGray, BtnLgtGray };
