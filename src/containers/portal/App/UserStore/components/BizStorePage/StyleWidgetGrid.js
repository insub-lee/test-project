import styled from 'styled-components';

const StyleWidgetGrid = styled.div`
  position: relative;
  width: 850px;
  margin: 0 auto;

  .btnsWrapperTop {
    text-align: right;
    padding: 10px 0 20px;
  }

  @media only screen and (max-width: 1490px) {
    width: 690px;
  }

  @media only screen and (max-width: 1460px) {
    width: 530px;
  }

  // @media only screen and (max-width: 1160px) {
  //   width: 510px;
  // }
`;

export default StyleWidgetGrid;
