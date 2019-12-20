import styled from 'styled-components';

const StyleAuthSettingContent = styled.div`
  padding-bottom: 20px;

  .BizAuthTable {
    border-top: 1px solid #e0e0e0;
    color: #404040;
    font-size: 13px;
    border-collapse: separate;
    border-spacing: 0;
    overflow: hidden;

    tr {
      &:hover {
        background-color: #f7f7f7;
      }

      th,
      td {
        position: relative;
      }

      th {
        min-width: 80px;
        width: 80px;
        max-width: 80px;
        min-height: 80px;
        height: 80px;
        max-height: 80px;
        padding: 0 5px;
        background: #f7f7f7;
        border-bottom: 1px solid #e0e0e0;
        text-align: center;

        &:hover::after {
          content: '';
          position: absolute;
          background-color: #f7f7f7;
          left: 0;
          top: -5000px;
          height: 10000px;
          width: 100%;
          z-index: -1;
        }
        // 텍스트 영역
        > div {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          min-height: 58px;
          height: 58px;
          max-height: 58px;

          > p {
            max-height: 35px;
            overflow: hidden;
          }
        }

        &:first-child {
          width: 200px;
        }

        &:nth-child(2) {
          width: 50px;
        }
      }

      td {
        height: 50px;
        padding: 0 10px;
        border-bottom: 1px solid #e0e0e0;
        text-align: center;
        // background: #ffffff;

        &:hover::after {
          content: '';
          position: absolute;
          background-color: #f7f7f7;
          left: 0;
          top: -5000px;
          height: 10000px;
          width: 100%;
          z-index: -1;
        }

        &:first-child {
          width: 200px;
          text-align: left;
        }

        &:nth-child(2) {
          width: 50px;
        }
      }
    }
  }
`;

export default StyleAuthSettingContent;
