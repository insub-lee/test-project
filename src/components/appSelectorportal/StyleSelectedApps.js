import styled from 'styled-components';

const SelectedUser = styled.div`
  padding: 0 10px 0 9px;
  border: 2px solid #c1c1c1;

  // 선택목록 
  .SUTitle {
    position: relative;
    height: 33px;
    padding-left: 6px;
    border-bottom: 1px solid #cdcdcd;
    color: #404040;
    font-size: 13px;
    line-height: 33px;
    text-align: center;
    letter-spacing: -0.5px;

    h3 {
      font-size: 13px;
      line-height: 29px;

      .deleteAll {
        color: #404040;
        font-size: 12px;
        position: absolute;
        right: 0;
      }
    }
  }
  
  // 테이블
  .SUTable {
    // IE에서 table 안에 체크박스가 있을 때, border로 제작된 checked 표시가 눈에 보이지 않는 버그가 있음.
    border-collapse: separate !important;
    border-spacing: 0;
    margin-top: 5px;

    // IE에서 scrollbar 높이가 커지면 안의 콘텐츠가 끝까지 보이지 않음
    > div > div {
      @media screen and (-ms-high-contrast: active), (-ms-high-contrast: none) {  
        /* IE10+ specific styles go here */
        height: calc(100% - 15px);
      }
    }

    .listDivImg {
      position:relative;
      display:inline-block;
      vertical-align:middle;
      width: 25px;
      height: 25px;
      margin-right:10px;
      border-radius: 50%;
      overflow:hidden;

      .listImg {
        position:absolute;
        top:0;
        left:0;
        width:100%;
      }
    }

    .SUTBody {
      display: inline-block;
      width: 100%;
    }

    .SUTableCell {
      font-size: 12px;

      .ant-checkbox-wrapper {
        height: 33px;
        padding: 0 0 0 6px;
        color: #707070;
      
        & > span:not(.ant-checkbox) {
          position: relative;
          display: block;
          float: right;
          width: 280px;
          margin-top: 2px;
          padding: 0 0 0 38px;
          font-size: 12px;
          color: #404040;
          text-align: left;
          line-height: 1.3em;

          .appIconWrapper {
            position: absolute;
            top: 2px;
            left: 0;
            display: inline-block;
            width: 25px;
            height: 25px;
            border-radius: 6px;
          }
        }

        .ellipsis {
          display: block;
        }

      }
    }

    // 구성원
    td {
      height: 35px;

      .ant-checkbox-wrapper {
        width: 100%;
        line-height: 35px;
        padding-left: 6px;

        & > span:not(.ant-checkbox) > div {
          display: inline-block;
          width: 338px;
          height: 35px;
          float: right;
          color: #404040;

          > img {
            margin-bottom: 3px;
          }

          > div {
            margin-bottom: 5px;
            line-height: 1.3em;
          }
        }
      }

    }
  }

`;

export default SelectedUser;
