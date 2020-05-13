import styled from 'styled-components';
import iconSearch from 'images/common/icon-search2.png';
import iconCalendar from 'images/common/icon-calendar.png';

const StyleDaemonList = styled.div`
  max-width: 1200px;
  min-width: 900px;
  width: 100%;
  margin: 20px auto;

  @media only screen and (max-width: 1660px) {
    padding: 0 20px;
  }

  @media only screen and (max-width: 1280px) {
    width: 900px;
  }

  .pageTitle {
    color: #404040;
    font-size: 17px;
    margin-bottom: 8px;
  }

  .searchBox {
    width: 100%;
    padding: 10px 24px;
    border: 1px solid #d6d3da;
    text-align: right;
    background: #f7f7f7;
    border-radius: 3px;
    margin-bottom: 10px;

    .init-search {
      padding: 0 0.644rem;
      height: 30px;
    }

    .totalResultNum {
      float: left;
      display: inline-block;
      color: #f85023;
      font-size: 12px;
      line-height: 30px;
    }

    .searchWrapper {
      position: relative;
      width: 246px;
      height: 30px;
      float: right;

      > .DatePicker,
      > .RangePicker,
      > input {
        border: 1px solid #c1c1c1;
        border-radius: 4px;
      }

      > .DatePicker,
      > .RangePicker {
        //커스텀 캘린더 아이콘으로 교체
        &:before {
          content: '';
          display: block;
          width: 30px;
          height: 30px;
          position: absolute;
          top: 0;
          left: 0;
          background: url(${iconCalendar}) no-repeat 50% 50%;
        }

        //기존 캘린더 아이콘 숨기기
        .anticon.anticon-calendar.ant-calendar-picker-icon {
          display: none;
        }
        //캘린더 초기화 아이콘 숨기기
        .anticon.anticon-close-circle.ant-calendar-picker-clear {
          display: none;
        }
      }

      > .DatePicker {
        padding-right: 30px;

        .ant-calendar-picker-input {
          padding: 0 0 0 35px;
          border-color: transparent !important;
          background: transparent !important;
        } //날짜표시의 왼쪽 정렬이 게시기간과 같도록
      }

      > .RangePicker {
        padding-right: 30px;

        .ant-calendar-picker-input.ant-input {
          height: 32px;
          line-height: 32px;
          margin-top: -2px;
          border-color: transparent !important;
          background: transparent !important;

          .ant-calendar-range-picker-input {
            background: #ffffff;
            border-color: #ffffff !important;
          }
        }

        .ant-calendar-range-picker-separator {
          line-height: 30px;
        }
      }

      > input {
        position: relative;
        padding-right: 30px;
        font-size: 13px;
      }

      // 상위 div에서 border 적용
      .ant-calendar-picker-input,
      .ant-calendar-picker:hover .ant-calendar-picker-input:not(.ant-input-disabled) {
        border-color: transparent;
      }

      .ant-calendar-picker-input {
        height: 30px;
        padding: 0 0 0 30px;
        line-height: 30px;
        text-align: left;
        background-color: transparent;
      }

      > .searchBtn {
        position: absolute;
        top: 0;
        right: 0;
        width: 30px;
        height: 30px;
        border: 0;
        background: url(${iconSearch}) no-repeat 50% 50%;
        background-size: 50% 50%;
        cursor: pointer;
      }
    }
  }

  //테이블 헤더 체크박스
  .react-grid-HeaderCell.react-grid-HeaderCell--locked {
    padding-left: 0 !important;
  }

  .react-grid-Container {
    width: 100% !important;
    height: calc(100vh - 317px);

    .react-grid-Main {
      height: 100%;

      .react-grid-Grid {
        height: 100%;

        .react-grid-Row {
          /* cursor: pointer; */
        }
      }
    }
  }

  // cell에서 생략부호 보여주기
  .react-grid-Cell__value div span hltext,
  .react-grid-Cell__value div span div {
    display: block;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    text-align: center;
  }

  // 링크 표시
  .react-grid-Cell__value div span hltext {
    cursor: pointer;
  }

  .buttonWrapper {
    width: 100%;
    padding: 20px 0 0 0;
    height: 60px;
  }
`;

export default StyleDaemonList;
