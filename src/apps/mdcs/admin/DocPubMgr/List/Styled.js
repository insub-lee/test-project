import styled from 'styled-components';

const Styled = styled.div`
  padding: 10px;
  margin: 10px;

  & .titleArea {
    padding-top: 14px;
    text-align: center;
    vertical-align: middle;
    & span {
      font-weight: 600;
      color: black;
    }
  }

  & .inputArea {
    padding: 10px;
    & button {
      margin-left: 5px;
    }
  }

  & .tableArea {
    width: 100%;
    height: 100%;
    color: black;
    font-weight: 600;
    font-size: 20px;
  }

  /* Btn CSS */
  .btn-outline-success {
    color: #2196f3;
    background-color: #fff;
    border-color: #2196f3;
    box-shadow: 0 2px 6px 0 rgba(33, 150, 243, 0.5);
    &:hover {
      color: #fff;
      background-color: #0c83e2;
      border-color: #0c7cd5;
    }
  }

  .btn-outline-danger {
    color: #fd3995;
    background-color: #fff;
    border-color: #fd3995;
    box-shadow: 0 2px 6px 0 rgba(253, 57, 149, 0.5);
    &:hover {
      color: #fff;
      background-color: #fd1381;
      border-color: #fc077a;
    }
    &:focus {
      color: #fff;
      background-color: #fd1381;
      border-color: #fc077a;
    }
  }
`;

export default Styled;
