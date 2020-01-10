import styled from 'styled-components';

const Styled = styled.div`
  padding: 30px 100px;
  .wb_rowWrap {
    border: 1px solid #dfdfdf;
    border-top: 2px solid #999;
    & > .ant-row {
      margin-top: 20px;
      & > .subRowWrap {
        & > .ant-col-4 {
          padding-left: 20px;
        }
        .subTitle {
          .ant-row {
            margin-top: 10px;
          }
        }
      }
      & > .ant-col-4 {
        padding-left: 20px;
      }
    }
    & .buttonWrapper {
      button {
        margin-left: 50%;
        margin-bottom: 30px;
      }
    }
  }
`;
export default Styled;
