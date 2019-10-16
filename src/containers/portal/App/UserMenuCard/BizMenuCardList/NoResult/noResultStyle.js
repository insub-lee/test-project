import styled from 'styled-components';

const noResultStyle = styled.div`
  width: 100%;
  height: 100%;
  margin: 15px auto 0;
  padding: 100px 0;
  border: 0;
  text-align: center;

  @media only screen and (max-width: 1024px) {
    width: 100%;
    padding: 20px;
    border: none;
  }

  .noResultTitle {
    margin-top: 25px;
    color: #000000;
    font-size: 18px;

    strong {
      color: #333;
      font-weight: 600;
    }
  }

  .searchGuideList {
    display: inline-block;
    max-width: 442px;
    margin-top: 40px;
    margin-left: 20px;
    padding: 0;

    @media only screen and (max-width: 1024px) {
      margin-left: 0;
    }

    > li {
      display: inline-block;
      width: 100%;
      min-height: 15px;
      padding: 4px 0 5px 16px;
      color: #404040;
      font-size: 14px;
      text-align: left;
      text-indent: -16px;

      :before {
        content: '◾';
        padding-right: 4px;
        color: #d8d8d8;
        font-size: 14px;
      }
    }
  }
`;

export default noResultStyle;
