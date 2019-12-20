import styled from 'styled-components';
import iconLocationGray from 'images/bizstore/icon-location-gray.png';
import iconLocationWhite from 'images/bizstore/icon-location-white.png';

const StyleWidgetGrid = styled.div`
  position: relative;
  width: 850px;
  margin: 0 auto;

  .stickyTop {
    // position: sticky;
    // top: 42px;
    // z-index: 9999; //최상위
    // background-color: rgba(247,248,249,0.5);

    //위젯위치확정 버튼 (기본상태: disabled)
    .btnLocationOk {
      min-width: 100px; //임시
      height: 35px;
      padding: 0 15px 0 43px;
      margin: 10px 0 0 10px;
      border-radius: 3px;
      color: #707070;
      font-size: 15px;
      cursor: default;
      background-color: transparent;
      background-repeat: no-repeat;
      background-position: 17px 50%;
      background-image: url(${iconLocationGray});

      &.on {
        color: #ffffff;
        background-color: #f85023;
        background-image: url(${iconLocationWhite});
        cursor: pointer;
      }
    }
  }

  @media on @media only screen and (max-width: 1490px) {
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
