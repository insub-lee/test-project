import styled from 'styled-components';
import { palette } from 'styled-theme';
import { transition, borderRadius } from '../../../config/style-util';
import WithDirection from '../../../config/withDirection';

const BannerWrapper = styled.div`
  .carouselWrapper {
    display: block;
  }

  .slideContent {
    position: relative;
    height: 225px;
    text-align: center;

    img {
      position: relative;
      min-width: 100% !important;
      max-height: 225px;
      z-index: -1;
    }

    .slideContentText {
      position: absolute;
      bottom: 0;
      right: 0;
      width: 100%;
      height: 80px;
      padding: 10px 10px 40px 10px;
      background: rgba(0, 0, 0, 0.5);
      text-align: center;
      z-index: 1;

      > p.title {
        color: #ffffff;
        font-size: 17px;
        text-shadow: 0 0 2px #000000;
        line-height: 1.1;
      }
    }
  }
`;

export { BannerWrapper };
