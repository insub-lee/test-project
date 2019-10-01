import styled from 'styled-components';

const StyleQnA = styled.div`
  /* QNA - CSS */
  .manual-qna-wrap {
    border: 1px solid #e5e5e5;
    border-top: 2px solid #886ab5;
    padding: 10px 20px 10px;
    .qna-data-wrap {
      padding: 10px;
      /* border: 2px solid black; */
    }
    .qna-dl {
      min-height: 206px;
      &.qna-dl-edit {
        padding: 30px 0px;
        margin-bottom: 20px;
        border-bottom: 1px solid #e5e5e5;
      }
      .btn-wrap {
        text-align: center;
        margin: 0 auto;
        text-align: center;
        padding: 0;
        margin-top: 20px;
      }
      > div {
        position: relative;
        padding-left: 60px;
        margin-bottom: 15px;
        > span {
          position: absolute;
          left: 0;
          display: block;
          width: 40px;
          height: 40px;
          line-height: 35px;
          border-radius: 100%;
          text-align: center;
          font-size: 20px;
          font-weight: 600;
        }
      }
      .qna-dt {
        > span {
          top: 50%;
          transform: translateY(-50%);
          color: #886ab5;
          background-color: #fff;
          border: 1px solid #e5e5e5;
        }
        > p {
          color: #000;
          font-size: 18px;
          font-weight: 600;
          border-bottom: 1px solid #e5e5e5;
          width: 100%;
          height: 58px;
          padding: 15px 0;
          margin: 0;
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
          padding-right: 0px;
          > input {
            display: block;
            width: 100%;
            background-color: #fff;
            border: 0;
            color: #000;
            font-size: 18px;
            font-weight: 600;
          }
        }
        > .edit-btn-wrap {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          right: 0;
          > button {
            margin-right: 10px;
            &:last-child {
              margin-right: 0;
            }
          }
        }
      }
      .qna-dd {
        > .fr-box {
          cursor: auto;
        }
        > span {
          top: 0;
          background-color: #886ab5;
          color: #fff;
          border: 1px solid #886ab5;
        }
        > .text-box {
          background-color: #f6f6f6;
          padding: 15px;
          line-height: 2;
          p {
            font-size: 14px;
            color: #666666;
            margin-bottom: 10px;
            &:last-child {
              margin-bottom: 0;
            }
          }
        }
      }
    }
  }
`;

export default StyleQnA;
