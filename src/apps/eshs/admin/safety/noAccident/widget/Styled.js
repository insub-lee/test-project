import styled from 'styled-components';

const Styled = styled.div`
  width: 100%;
  height: 100%;
  overflow: auto;

  .info-line {
    padding: 10px;
    margin-bottom: 5px;
    background: #f2f4f7;
    border-radius: 5px;
    border: 2px solid #b5bdcb;
  }

  .weight500 {
    font-weight: 500;
    .total-cnt {
      color: rgb(10, 155, 101);
    }
  }

  .noacc-status {
    padding-left: 20px;
  }

  .foot-contents {
    margin-top: 50px;
    text-align: center;
  }

  .line-p {
    margin-top: 10px;
  }

  .link-type2 {
    text-align: center;
    color: #666666;
    font-size: 16px;
  }

  a:hover {
    color: #1890ff;
  }
`;

export default Styled;
