import styled from 'styled-components';

const StyledTextArea = styled.div`
  & {
    display: block;

    textarea {
      padding: 5px 0 15px 0;
      border: 0;
      width: 100%;
      border-bottom: 1px solid #d9e0e7;
      font-size: 14px;
      color: #111b27;
      /* 최소높이랑를 임의로 지정 */
      min-height: 50px;
    }
  }
`;

export default StyledTextArea;
