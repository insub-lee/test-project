import styled from 'styled-components';
import seeMoreBtnDown from 'images/bizstore/arrow-down2.png';
import seeMoreBtnUp from 'images/bizstore/arrow-up2.png';

const StyleBizDetail = styled.div`
  display: inline-block;
  // width: ${({ pWidth }) => `${pWidth}px`};
  width: 100%;
  // margin: 20px auto 0;
  padding: 0;
  border: 1px solid #d1d2d3;
  background-color: #ffffff;
  // overflow: hidden;
  
  .title-wrapper {
    position: relative;
    h2.adTitle {
      margin-bottom: 14px;
      color: #000000;
      font-size: 18px;
    }
    > button {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      right: 0;
    }
  }

  .seeMore {
    width: 100%;
    height: 40px;
    padding: 0;
    border: 0;

    &.up {
      background: #ffffff url(${seeMoreBtnUp}) no-repeat 50% 50%;
    }

    &.down {
      background: #ffffff url(${seeMoreBtnDown}) no-repeat 50% 50%;
    }
  }

  @media only screen and (max-width: 1280px) {
    //width: calc(100vw - 345px); // Tree너비 + 양옆 12px 씩 + 스크롤바 너비
    margin: 20px auto 0;
  }

  @media only screen and (max-width: 1024px) {
    // width: calc(100vw - 24px);
    // max-width: 933px;
    // margin-top: 100px;
  }
`;

export default StyleBizDetail;
