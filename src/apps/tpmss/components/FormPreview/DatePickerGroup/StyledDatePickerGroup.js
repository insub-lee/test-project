import styled from 'styled-components';

const StyledDatePickerGroup = styled.div`
  ul.sub_form {
    padding-top: 10px;
    font-size: 0;
    text-align: left;
    // margin-top: -10px;

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
