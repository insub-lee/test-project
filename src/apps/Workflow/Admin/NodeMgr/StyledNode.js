import styled from 'styled-components';

const StyleNode = styled.div`
  max-width: 1200px;
  min-width: 900px;
  width: 100%;
  margin: 20px auto 0;

  @media only screen and (max-width: 1440px) {
    width: 1050px;
  }

  @media only screen and (max-width: 1280px) {
    width: 900px;

    .pageContent {
      height: 100vh !important;
    }
  }

  .buttonWrapper {
    float: right;
    width: calc(100% - 332px);
    text-align: right;
    padding: 20px 0 0;

    > button {
      margin-left: 10px;
    }
  }

  .regFrom {
    width: 100%;
    border-top: 1px solid #222222;

    td {
      padding: 9px 20px 10px !important;
    }
  }
`;

export default StyleNode;
