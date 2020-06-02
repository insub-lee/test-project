import styled from 'styled-components';

const StyledHeaderWrapper = styled.div`
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
`;

export default StyledHeaderWrapper;
