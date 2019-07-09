import styled from 'styled-components';
import iconSearch from 'images/common/icon-search2.png';
import iconCalendar from 'images/common/icon-calendar.png';

const StyleAppOpinion = styled.div`
  max-width: 1200px;
  min-width: 900px;
  width: 100%;
  margin: 20px auto 0;

  @media only screen and (max-width: 1440px) {
    width: 1050px;
  }

  @media only screen and (max-width: 1280px) {
    width: 900px;
  }

  .ant-input {
    border: 1px solid #c1c1c1;
    font-size: 13px;
  }

  .searchBox {
    width: 100%;
    padding: 20px 24px;
    border: 4px solid #efefef;

    .searchWrapper {
      position: relative;
      width: 246px;
      height: 30px;
      float: right;
      vertical-align: top;

      > input {
        position: relative;
        height: calc(1.47em + 1rem + 2px);
        padding-right: 30px;
      }

      > .searchBtn {
        position: absolute;
        top: 4px;
        right: 0;
        width: 30px;
        height: 30px;
        border: 0;
        background: url(${iconSearch}) no-repeat 50% 50%;
        background-size: 50% 50%;
        cursor: pointer;
      }
    }

    .ant-select {
      vertical-align: top;
    }

    .ant-calendar-picker {
      vertical-align: top;

      .ant-calendar-picker-input {
        height: calc(1.47em + 1rem + 2px);
      }
     
      .ant-calendar-picker-icon {
        background:url(${iconCalendar}) no-repeat 50% 50%;
        
        &:after {
          content: "";
        }
      }

      &:hover {
        .ant-calendar-picker-input:not(.ant-input-disabled) {
          border-color: #e5e5e5;
        }
      }
    }
  }

  //테이블 높이
  .react-grid-Container {
    width: 100% !important;
    height: calc(100vh - 265px);

    .react-grid-Main {
      height: 100%;

      .react-grid-Grid {
        height: 100%;
      }
    }
  }

  // Data Grid 링크 효과
  .react-grid-Row {
    // cursor: pointer;
    .react-grid-Cell a {
      color: #404040;
      &:hover {
        color: #404040;
      }
    }
  }

  .buttonWrapper {
    width: 100%;
    padding: 20px 0 0;
    text-align: right;
  }
`;

export default StyleAppOpinion;
