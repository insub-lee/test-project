import styled from 'styled-components';

const StyledSignLine = styled.div`
  width: 100%;
  margin-bottom: 30px;

  .signLineWrapper {
    width: 100%;
    margin-bottom: 20px;
    .table-head {
      .ant-col {
        background: #f7f7f7;
        border-bottom: 0;
        border-top: 1px solid #bdbdbd;
      }
    }
    .ant-col {
      border: 1px solid rgb(217, 224, 231);
      text-align: center;
      width: 110px;
      border-right: 0;
      &:last-child {
        border-right: 1px solid rgb(217, 224, 231);
      }
      span {
        font-size: 12px;
      }
      .wp_bodyCol {
        height: 87px;
        position: relative;
        > ul > li {
          font-size: 12px;
        }
        .sign_img {
          > img {
            width: 80px;
            height: 78px;
            opacity: 1;
          }
        }
      }
    }
  }

  .dataWrapper {
    .ant-row-flex {
      /* display: flex; */
      border: 1px solid #ddd;
      border-bottom: 0px;
      &:last-child {
        border-bottom: 1px solid #ddd;
      }
      .ant-col.dataLabel {
        position: relative;
        border-right: 1px solid #ddd;
        background-color: #f7f7f7;
        span {
          font-size: 12px;
          color: #000;
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          left: 10px;
        }
      }
      .ant-col.dataContents {
        padding: 10px;
        input {
          border: 0;
          height: auto;
          padding: 0;
          font-size: 12px;
          color: #000;
        }
      }
    }
  }

  .btnWrapper {
    width: 100%;
    margin-top: 10px;
    text-align: right;
  }
`;

export default StyledSignLine;
