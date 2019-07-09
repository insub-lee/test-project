import styled from 'styled-components';
import WithDirection from 'config/withDirection';
import iconPrev from 'images/bizstore/icon-prev.png';
import iconNext from 'images/bizstore/icon-next.png';

const CarouselStyleWrapper = styled.div`
  .ant-carousel {
    .slick-slider {
      direction: ${props => (props['data-rtl'] === 'rtl' ? 'ltr' : 'inherit')};

      .slick-arrow {
        width: 25px;
        height: 35px;
        z-index: 10;

        &.slick-prev {
          left: 10px;
          margin-top: -15px;
          background: url(${iconPrev}) no-repeat 50% 50%;
        }

        &.slick-next {
          right: 10px;
          margin-top: -15px;
          background: url(${iconNext}) no-repeat 50% 50%;
        }
      }

      .slick-track {
        @media only screen and (max-width: 1024px) {
          // width: 100% !important;
          width: 100%;
        }

        .slick-slide {
          // width: 189px !important;
          height: 140px;
          // border: 1px solid #d8d8d8;
          overflow: hidden;
          margin-left: 5px;
          margin-right: 5px;
          background-color: #ececec;

          @media only screen and (max-width: 1024px) {
            width: 135px !important;
            height: 90px;

            img {
              width: 100%;
              max-height: 90px;
            }
          }
        }
      }
    }
  }
`;

export default WithDirection(CarouselStyleWrapper);
