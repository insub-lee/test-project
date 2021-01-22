import styled from 'styled-components';

const StyledTextArea = styled.div`
  & {
    display: block;
    padding: 10px 0;
    border-top: 1px solid #d4d7df;

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

export default StyledTextArea;
