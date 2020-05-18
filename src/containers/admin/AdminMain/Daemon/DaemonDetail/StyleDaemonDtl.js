import styled from 'styled-components';

const StyleDaemonDtl = styled.div`
  max-width: 1200px;
  min-width: 900px;
  width: 100%;
  margin: 20px auto;

  @media only screen and (max-width: 1660px) {
    padding: 0 20px;
  }
  @media only screen and (max-width: 1280px) {
    width: 900px;
    padding: 0;
  }

  .buttonWrapper {
    padding-top: 16px;
    text-align: right;

    button {
      margin-left: 10px;
    }
  }
`;

export default StyleDaemonDtl;
