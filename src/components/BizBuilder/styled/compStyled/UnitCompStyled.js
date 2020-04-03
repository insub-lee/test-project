import styled from 'styled-components';

const UnitCompStyled = styled.div`
  .ant-row {
    width: 100%;
    background-color: rgb(245, 255, 250);
    border-left: 1px solid #cccccc;
    border-right: 1px solid #cccccc;
    border-top: 1px solid #cccccc;
    text-align: center;
    :nth-child(1),
    :nth-child(3) {
      border-right: none;
    }
    :nth-child(14) {
      border-bottom: 1px solid #cccccc;
    }
    .unit-title {
      background-color: #d6ebff;
      border-right: 1px solid #cccccc;
      width: 11%;
    }
    .unit-cols {
      border-right: 1px solid #cccccc;
      width: 8.9%;
      cursor: pointer;
      :hover {
        background-color: rgb(218, 241, 245);
      }
    }
  }
  .cancelBtn {
    width: 100%;
    margin-top: 20px;
    text-align: center;
  }
`;

export default UnitCompStyled;
