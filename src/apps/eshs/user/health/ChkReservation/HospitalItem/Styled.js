import styled from 'styled-components';

const Styled = styled.div`
  overflow: hidden;

  .examination-area {

    .examinaion-title {
      font-size: 18px;
      padding: 6px 8px;
      text-align: center;
    }

    .question-item {
      position: relative;
      margin-top: 15px;

      .question-txt {
        position: relative;
        color: #555555;
        font-size: 15px;
        margin-bottom: 5px;
        padding-left: 20px;
      }
    }
  }
`;

export default Styled;