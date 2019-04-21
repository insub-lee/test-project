import styled from 'styled-components';

const MemberStyle = styled.div`  
  .carouselWrapper {
    display: block;
    background: transparent;

    // 위젯 2x1 크기일 때 중앙 위치
    .tableDivTwoByOne {
      table {
        width: 540px;
        margin: 0 auto;

        @media only screen and (max-width: 650px) {width: 100% !important;}
      }
    }

    .tableWrapper {
      text-align: center;
      font-size: 10px;
      width: 100%;
      color: black;
      height: 200px;
    }

    table {
      min-width: 270px;
      height: 100% !important;
      max-height: 200px;

      @media only screen and (max-width: 650px) {min-width: 250px;}
      
      td {
        width: 90px;
        height: 95px !important;
        float: left;
        padding: 0;
        letter-spacing: -0.2px;

        // 화면 너비가 100%될 때
        @media only screen and (max-width: 650px) {
          width: 33.33% !important;
        }

        .member {
          position: relative;
          text-align: center;
          font-size: 12px;
      
          .photoWrapper {
            display: block;
            width: 50px;
            height: 50px;
            margin: auto;
            overflow: hidden;
            border-radius: 50%;
      
            > img {
              width: calc(100% + 2px) !important;
              height: auto !important;
              margin-top: -1px;
              margin-left: -1px;
              cursor: pointer;
            }
          }

          .titleText {
            padding: 6px 3px 0;
            // color: #404040;
            // font-size: 12px;
          }
        }

      }
    }

  }
`;

export {
  MemberStyle,
};
