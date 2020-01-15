import styled from 'styled-components';
import iconSearch from 'images/common/icon-search2.png';

const Styled = styled.div`
  max-width: 1200px;
  min-width: 900px;
  width: 100%;
  margin: 20px auto 0;
  padding: 20px;
  background-color: white;
  border: 1px solid #e6e9ed;

  @media only screen and (max-width: 1440px) {
    width: 1050px;
  }

  @media only screen and (max-width: 1280px) {
    width: 900px;
  }

  .pageTitle {
    color: #404040;
    font-size: 17px;
    margin-bottom: 8px;
  }

  .searchBox {
    width: 100%;
    margin-bottom: 20px;
    overflow: hidden;

    .searchWrapper {
      position: relative;
      width: 246px;
      float: right;

      > input {
        position: relative;
        border: 1px solid #e5e5e5;
        padding: 0.5rem 0.875rem;
        padding-right: 30px;
        font-size: 0.8125rem;
        height: calc(1.47em + 1rem + 2px);
      }

      > .searchBtn {
        position: absolute;
        top: 4px;
        right: 0;
        width: 30px;
        height: 30px;
        border: 0;
        background: url(${iconSearch}) no-repeat 50% 50%;
        background-size: 50% 50%;
        cursor: pointer;
      }
    }
  }

  .buttonWrapper {
    width: 100%;
    padding: 20px 0 0;
    text-align: right;

    & > button {
      margin-left: 8px;
    }
  }
`;

export default Styled;
