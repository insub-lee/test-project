import styled from 'styled-components';

const Wrapper = styled.div`
  width: 100%;

  .taskTransferTitle {
    font-size: 14px;
    margin-bottom: 10px;

    .count {
      margin-left: 5px;
      color: #000;
      font-weight: bold;
    }
  }

  .userAddWrapper {
    width: 100%;
    height: 251px;
    text-align: center;
    display: flex;
    align-items: center;
    button {
      width: 38px;
      margin: 0 auto;
    }
    > div {
      margin: auto;
    }
  }

  .applyButtonWrapper {
    text-align: right;
    margin-top: 20px;
  }
`;

export default Wrapper;
