import styled from 'styled-components';
import CheckedAfter from '../../../../images/portal/icon-check-after.png';
import DeleteHistory from '../../../../images/portal/icon-trashcan.png';

const StyleUserNotice = styled.div`

/* 알림 Popover -- 상위 class > global.css 정의됨 */
.alarmCtlBtnWrapper {
  height: 40px;
  padding: 8px 15px 0;
  border-bottom: 1px solid #e5e5e5;
  text-align: right;

  > a {
    display: inline-block;
    color: #3c3c3c;
    font-size: 13px;
  }

  .changeAllAlarmsRead {
    min-width: 170px;
    padding-left: 18px;
    margin-right: 10px;
    text-align: left;
    background: url(${CheckedAfter}) no-repeat 0 50%;
  }

  .deleteAllAlarms {
    min-width: 65px;
    padding-left: 18px;
    background: url(${DeleteHistory}) no-repeat 0 50%;
  }
}

.alarmListTable {
  max-height: 250px;
  padding: 10px 3px 10px 10px;

  td {
    height: 22px;
    padding: 0;
    color: #404040;
    font-size: 12px;
    line-height: 22px;
    letter-spacing: -0.2px;

    //내용
    .details {
      position: relative;
      padding: 0 20px 0 5px;
      margin-bottom: 6px;
      color: #404040;
      font-size: 12px;
      line-height: 20px;

      // 2줄 (기본)
      &.two {
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2; /* 라인수 */
        -webkit-box-orient: vertical;
        word-wrap:break-word; 
        line-height: 20px;
        max-height: 43px;

        > p {
          @media only screen and (max-width: 414px) {
            width: calc(100% - 35px) !important;
          }
        }
      }

      //더보기, 닫기 버튼
      .more, .less {
        display: inline-block;
        padding-left: 5px;
        background: #ffffff;
        color: #404040;
        font-size: 10px;
        position: absolute;
        right: 14px;
        bottom: 0;

        > span {
          display: inline-block;
          height: 16px;
          border-bottom: 1px solid #404040;
        }
      }
      
    }
  }

  tr td:first-child {
    width: 9px;
    padding-top: 3px;
    color: #3c3c3c;
    font-size: 9px;
    vertical-align: top;
  }

  // 텍스트 길이가 긴 경우 생략부호 처리
  tr td:nth-child(2) {
    width: 260px;
    padding-left: 5px;
    .ellipsis {
      display: inline-block;
      width: 100%;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      line-height: 1;
    }

    @media only screen and (max-width: 650px) {
      max-width: calc(100vw - 215px) !important;
    }

  }

  tr td:nth-child(3) {
    width: 83px;
  }
  
  // checkbox
  tr td:nth-child(4) {
    width: 30px;
    @media only screen and (max-width: 414px) {
      text-align: right;
    }
  }

  // 삭제 버튼
  tr td:nth-child(5) {
    min-width: 30px;

    button {
      width: 30px;
      height: 28px;
      padding: 0;
      border: 0;
      line-height: 0.8;
      text-align: left;

      @media only screen and (max-width: 414px) {
        text-align: center;
      }
    }
  }

  // .unread tr td:nth-child(2),
  // .unread tr td:nth-child(3) {
  //   font-weight: 600;
  // }

  /* IE10+ specific styles go here */
  @media screen and (-ms-high-contrast: active), (-ms-high-contrast: none) {
    .scrlbAlarm > div:first-child { margin-bottom: 0 !important; overflow-x: hidden !important; }
  }

  .scrlbAlarm {
    @media only screen and (max-width: 414px) {
      min-width: calc(100% - 20px) !important;
    }

    table {width: 100%;}

    & > div:last-child > div {
      border-radius: 0 !important;
      background-color: #cacaca;
    }
  }
}
`;

export default StyleUserNotice;
