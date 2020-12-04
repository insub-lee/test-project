import styled from 'styled-components';

const StyledTextField = styled.div`
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

export default StyledTextField;
