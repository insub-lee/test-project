import styled from 'styled-components';

const SelectedUser = styled.div`
  padding: 0;

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

    .ant-checkbox-wrapper {
      position: absolute;
      top: 5px;
      left: 6px;
      height: 30px;
      line-height: 30px;
    }

    .deleteAll {
      color: #404040;
      font-size: 12px;
      position: absolute;
      right: 0;
      background: transparent;
    }
  }

  // 구성원, 가상그룹, 직위, 직책
  .SUSubTitle {
    height: 18px;
    margin: 5px 0;
    color: #707070;
    font-size: 11px;
    background: #ececec;
    line-height: 16px;
    text-align: center;
  }

  .marginForIE {
    @media screen and (-ms-high-contrast: active), (-ms-high-contrast: none) {
      margin-bottom: 20px;
    }
  }

  // 테이블
  .SUTable {
    // IE에서 table 안에 체크박스가 있을 때, border로 제작된 checked 표시가 눈에 보이지 않는 버그가 있음.
    border-collapse: separate !important;
    border-spacing: 0;

    .SUTableCell {
      height: 33px;
      font-size: 12px;

      .ant-checkbox-wrapper {
        height: 33px;
        padding: 0 0 0 6px;
        color: #707070;

        & > span:not(.ant-checkbox) {
          display: block;
          float: right;
          width: 338px;
          margin-top: 2px;
          padding: 0;
          font-size: 12px;
          color: #404040;
          text-align: left;
          line-height: 1.3em;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }

      &.grpItem {
        .ant-checkbox-wrapper {
          line-height: 33px;

          .ant-checkbox {
            margin-top: -1px;
          }

          & > span:not(.ant-checkbox) {
            margin-top: -1px;
            line-height: 33px;
          }
        }

        > div > div {
          line-height: 30px;
        }
      }
    }

    .ant-checkbox {
      // margin-top: 8px;
      display: inline-block;
      line-height: 35px;
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

      .ant-checkbox-wrapper + span,
      .ant-checkbox + span {
        padding-left: 0 !important;
        padding-right: 0 !important;
      }
    }
  }

  .noUserSelected {
    text-align: center;
    line-height: 390px;
  }
`;

export default SelectedUser;
