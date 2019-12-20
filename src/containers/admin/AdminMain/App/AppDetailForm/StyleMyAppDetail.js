import styled from 'styled-components';

const StyleMyAppDetail = styled.div`
  width: 920px;
  margin: 20px auto;
  padding: 0 30px;
  border: 1px solid #d1d2d3;
  background: #ffffff;

  .pageTitle {
    width: 100%;
    height: 60px;
    color: #222222;
    font-size: 17px;
    line-height: 59px;
  }

  .buttonsWrapper {
    &.top {
      padding: 15px 0;
    }
    &.bottom {
      padding: 15px 0 20px;
      border-top: 1px solid #d3d3d3;
    }
    .alignRight {
      float: right;
    }

    button {
      margin-left: 5px;
    }
  }

  // 향후 삭제
  .temp {
    display: block;
    padding: 0 10px;
    margin-bottom: 10px;
    color: pink;
    line-height: 34px;
    border: 1px dashed #efefef;
  }
`;

export default StyleMyAppDetail;
