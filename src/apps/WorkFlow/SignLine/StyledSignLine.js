import styled from 'styled-components';

const StyledSignLine = styled.div`
  width: 100%;
  margin-bottom: 30px;

  .signLineWrapper {
    width: 100%;
    height: 150px;

    .ant-col {
      border: 1px solid rgb(217, 224, 231);
      text-align: center;

      span {
        font-size: 14px;
      }
    }

    .wp_bodyCol {
      height: 100px;
      position: relative;

      .sign_img {
        > img {
          width: 80px;
          height: 78px;
          opacity: 1;
        }
      }
    }
  }
`;

export default StyledSignLine;
