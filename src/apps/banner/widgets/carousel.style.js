import styled from 'styled-components';
import WithDirection from '../../../config/withDirection';
import iconPrev from '../../../images/bizstore/icon-prev.png';
import iconNext from '../../../images/bizstore/icon-next.png';

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
        .slick-slide {
          overflow: hidden;
        }
      }

      .slick-dots {
        position: absolute;
        left: 0;
        bottom: 17px;
        list-style: none;
        display: block;
        text-align: center;
        margin: 0;
        padding: 0;
        width: 100%;
        height: 10px;
      }
      .slick-dots li {
        position: relative;
        display: inline-block;
        vertical-align: top;
        text-align: center;
        margin: 0 4px;
        padding: 0;
      }
      .slick-dots li button {
        display: block;
        width: 10px;
        height: 10px;
        padding: 0;
        border: 1px solid #ffffff;
        border-radius: 50%;
        background: transparent;
        font-size: 0;
        color: transparent;
        outline: none;
        opacity: 1;
        cursor: pointer;
      }

      .slick-dots li.slick-active button {
        background: #ffffff;
        opacity: 1;
        width: 10px;
      }
      .slick-dots li.slick-active button:hover,
      .slick-dots li.slick-active button:focus {
        opacity: 1;
      }
    }
  }
`;

export default WithDirection(CarouselStyleWrapper);
