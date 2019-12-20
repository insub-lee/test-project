import styled from 'styled-components';

import ImgMainBg from '../../../images/main_bg2.png';

const Styled = styled.div`
  position: relative;
  background: #1f3c62;
  padding: 30px;
  min-height: 444px;
  background: url(${ImgMainBg}) no-repeat center;
  background-size: cover;
  .widget-body {
    .widget-body-count {
      color: #fff;
      font-weight: 600;
      font-size: 40px;
      margin: 20px 0 45px;
      text-align: center;
      strong {
        position: relative;
        color: #ffffdf;
        margin-right: 5px;
        font-size: 60px;
        span {
          position: absolute;
          left: 0;
          bottom: 3px;
          height: 2px;
          width: 100%;
          display: block;
          background: #ffffdf;
        }
      }
    }
    ul {
      list-style: none;
      margin: 0;
      padding: 0;
      li {
        button {
          position: relative;
          overflow: visible;
          border: 0;
          background-color: transparent;
          cursor: pointer;
          outline: none;
          display: block;
          width: 100%;
          color: #fff;
          font-size: 16px;
          text-align: left;
          height: 35px;
          line-height: 35px;
          .widget-body-txt {
            display: block;
            text-overflow: ellipsis;
            white-space: nowrap;
            word-wrap: normal;
            width: calc(100% - 30px);
            overflow: hidden;
            &:hover {
              text-decoration: underline;
            }
          }
          .widget-body-view {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            right: 0;
          }
        }
      }
    }
  }
`;

export default Styled;
