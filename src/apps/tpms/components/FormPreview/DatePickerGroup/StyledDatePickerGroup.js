import styled from 'styled-components';

const StyledDatePickerGroup = styled.div`
  ul.sub_form {
    padding-top: 10px;
    font-size: 0;
    text-align: left;
    // margin-top: -10px;
    border-top: 1px solid #d4d7df; // 이정현 - TPMS FormPage 구분라인 추가
    & > li {
      position: relative;
      min-height: 49px;
      padding-left: 150px;
      margin-bottom: 15px;
      font-size: 15px;
      clear: both;
    }
  }
`;

export default StyledDatePickerGroup;
