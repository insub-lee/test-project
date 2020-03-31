import styled from 'styled-components';

const ContentsWrapper = styled.div`
  .pageTitle {
    position: relative;
    background: #f4f4f4;
    border-bottom: 1px solid #ddd;
    padding: 10px 20px;
    > p {
      font-size: 18px;
      color: #000;
      font-weight: 500;
    }
    .btnPositonMid {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      right: 20px;
    }
  }
  .tableWrapper {
    padding: 20px;
  }

  .selSaveWrapper {
    padding: 20px 20px 0px 20px;
    text-align: right;
  }

  .selSaveWrapperL {
    padding: 20px 20px 0px 20px;
    text-align: left;
  }
`;

export default ContentsWrapper;
