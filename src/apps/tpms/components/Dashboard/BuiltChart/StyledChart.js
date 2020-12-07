import styled from 'styled-components';
import icon3dot from '../../../images/icon_3dot.png';

const StyledChart = styled.div`
  &.chart {
    .title {
      height: 49px;
      line-height: 49px;
      padding: 0 25px;
      position: relative;
      border-bottom: 1px solid #d9e0e7;
      font-size: 19px;
      font-weight: 500;

      .actions {
        position: absolute;
        right: 15px;
        top: 9px;
        font-size: 0;
        text-align: center;
        overflow: hidden;
        display: none;

        button,
        a {
          min-width: 20px;
          text-align: center;
          margin: 3px !important;
          font-size: initial;

          &.icon_3dot {
            width: 15px;
            height: 26px;
            background: url(${icon3dot}) no-repeat center;
            -webkit-border-radius: 100%;
            -moz-border-radius: 100%;
            border-radius: 100%;
          }
          i {
            color: #646464 !important;
            vertical-align: middle;
            display: inline-block;
            margin-top: 4px;
          }
        }
      }
    }
    .content {
      overflow: hidden;
      font-size: 0;
      //display: table;
      width: 100%;
      text-align: center;
      & > div {
        position: relative;
        padding: 25px;
      }
    }
  }
`;

export default StyledChart;
