import styled from 'styled-components';

const StyledMobileMenuBtn = styled.button`
  display: none;

  @media screen and (max-width: 736px) {
    display: block;
    position: absolute;
    text-indent: -9999px;
    width: 18px;
    height: 18px;
    left: 20px;
    top: 17px;
    z-index: 99;
    -webkit-transition: all 0.5s;
    -moz-transition: all 0.5s;
    -ms-transition: all 0.5s;
    -o-transition: all 0.5s;
    transition: all 0.5s;

    span {
      position: absolute;
      top: 0;
      right: unset;
      bottom: unset;
      left: 0;
      margin: 0;
      width: 18px;
      height: 1px;
      background: #ffffff;
      -webkit-transition: all 0.3s;
      -moz-transition: all 0.3s;
      -ms-transition: all 0.3s;
      -o-transition: all 0.3s;
      transition: all 0.3s;
    }

    span.top {
      top: 0;
    }

    span.middle {
      top: 6px;
    }

    span.bottom {
      top: 12px;
    }

    &.active {
      span.top {
        top: 8px;
        -webkit-transform: rotateZ(45deg);
        -moz-transform: rotateZ(45deg);
        -ms-transform: rotateZ(45deg);
        -o-transform: rotateZ(45deg);
        transform: rotateZ(45deg);
      }

      span.middle {
        -webkit-transform: rotateY(90deg);
        -moz-transform: rotateY(90deg);
        -ms-transform: rotateY(90deg);
        -o-transform: rotateY(90deg);
        transform: rotateY(90deg);
      }

      span.bottom {
        top: 8px;
        -webkit-transform: rotateZ(-45deg);
        -moz-transform: rotateZ(-45deg);
        -ms-transform: rotateZ(-45deg);
        -o-transform: rotateZ(-45deg);
        transform: rotateZ(-45deg);
      }
    }
  }
`;

export default StyledMobileMenuBtn;
