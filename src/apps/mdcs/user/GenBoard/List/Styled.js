import styled from 'styled-components';

const Styled = styled.div`
  .list-btn {
    text-align: right;
    padding: 10px 0;
    & > button {
      margin-right: 10px;
      &:last-child {
        margin-right: 0;
      }
      & > i {
        margin-right: 5px;
        width: 16px;
        height: 16px;
      }
      & > span {
        display: inline-block;
        vertical-align: middle;
      }
    }
  }
  .list-option {
    position: relative;
    background-color: #f3f1f5;
    border: 1px solid #d6d3da;
    border-radius: 3px;
    padding: 25px;
    & > .item {
      position: relative;
      display: inline-block;
      width: 20%;
      &.item-subject {
        width: 25%;
      }
      &:last-child {
        margin-right: 0;
      }
      & > p {
        display: inline-block;
        font-size: 14px;
        color: #000;
        margin-bottom: 0;
        text-align: center;
        width: 100px;
      }
      & > input {
        width: calc(100% - 100px);
      }
    }
    & > .search-btn {
      position: absolute;
      right: 25px;
      top: 50%;
      transform: translateY(-50%);
    }
  }
`;

export default Styled;
