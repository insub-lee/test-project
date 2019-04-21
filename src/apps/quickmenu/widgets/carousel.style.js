import styled from 'styled-components';
import WithDirection from '../../../config/withDirection';
import iconPrev from '../../../images/common/widget-icon-prev.png';
import iconNext from '../../../images/common/widget-icon-next.png';


const CarouselStyleWrapper = styled.div`
  .ant-carousel {
    margin: 15px 25px 0 25px;

    .slick-slider {
      .slick-arrow {
        width: 30px;
        height: 30px;
        z-index: 10;

        &.slick-prev {
          left: -25px;
          margin-top: -33px;
          background: url(${iconPrev}) no-repeat 50% 50%;
          background-size: 14px 24px;
        }
        &.slick-next {
           right: -25px;
           margin-top: -33px;
          background: url(${iconNext}) no-repeat 50% 50%;
          background-size: 14px 24px;
        }
      }

      .slick-track {
        .slick-slide {
          overflow: hidden;
        }
      }
    }

    .slick-dots {
      bottom: 0;
      width: 100%;
      height: 7px;
      
      li {
        button {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          // background-color: #bcbcbc; //위젯색상 옵션에 포함됨
        }

        &.slick-active {
          button {
            width: 6px;
            height: 6px;
            border-radius: 50%;
            // background-color: #414141; //위젯색상 옵션에 포함됨
          }
        }
      }
      
    }
  }
`;

export default WithDirection(CarouselStyleWrapper);
