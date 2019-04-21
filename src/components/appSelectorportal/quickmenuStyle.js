import styled from 'styled-components';
import addContent from '../../../images/common/icon-add.png';

const QuickMenuStyle = styled.div`
  .carouselWrapper {
    display: block;
    padding: 0;
    // padding: 5px 25px 15px 25px;

    &.noCentent {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      color: #909090;
      font-size: 14px;
      // background: url(${addContent}) no-repeat 50% 73px;
    }

    table {
      td {
        width: 90px;
        height: 90px;
        padding: 0;
        letter-spacing: -0.3px;

        .quickmenu {
          height: 90px;
          padding-top: 10px;
          text-align: center;
          line-height: 1.1;
          word-break: break-word;
          word-wrap: break-word;

          > a  {
            display: block;
            width: 50px;
            margin: 0 auto 3px;

            .appWrapper {
              display: inline-block;
              border-radius: 10px;
            }
          }
        }

       
      }
    }
  }
`;

export {
  QuickMenuStyle,
};
