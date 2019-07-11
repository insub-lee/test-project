import styled from 'styled-components';

const appDetailStyle = styled.div`
  width: 900px;
  margin: 55px auto 0;
  padding: 20px;
  border: 1px solid #d1d2d3;
  background-color: #ffffff;

  @media only screen and (max-width: 1280px) {
    width: calc(100% - 40px);
    padding: 20px;
  }

  @media only screen and (max-width: 1024px) {
    width: 100%;
    margin: 0 auto !important;
    padding: 20px 10px;
    border: none;
  }

  h2.adTitle {
    margin-bottom: 14px;
    color: #000000;
    font-size: 18px;

    @media only screen and (max-width: 1024px) {
      font-size: 16px;
    }
  }
`;

export default appDetailStyle;
