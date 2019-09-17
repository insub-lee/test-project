import styled from 'styled-components';

const Styled = styled.div`
  &.write-board-wrap {
    .title {
      & > input {
        border: 0;
        padding: 0;
        border-radius: 0;
        font-size: 14px;
        height: calc(1.47em + 1.5rem + 2px);
      }
    }
    .write-body {
      background: #f7f9fa;
      border-top: 1px solid #e5e5e5;
      border-bottom: 1px solid #e5e5e5;
      padding: 50px;
    }
    .write-option {
      padding: 20px 10px 0 10px;
      & > .item {
        position: relative;
        margin-bottom: 5px;
        overflow: hidden;
        padding-left: 120px;
        height: calc(1.47em + 1rem + 2px);
        line-height: calc(1.47em + 1rem + 2px);
        &:last-child {
          margin-bottom: 0;
        }
        & > p {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          left: 0;
          color: #000;
          font-size: 15px;
          margin-bottom: 0;
        }
        & > input {
          width: 300px;
        }
        & > .custom-control {
          display: inline-block;
          width: 150px;
        }
      }
    }
  }
`;

export default Styled;
