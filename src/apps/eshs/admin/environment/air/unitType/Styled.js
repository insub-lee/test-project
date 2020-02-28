import styled from 'styled-components';

const Styled = styled.div`
  padding: 15px;
  .table {
    width: 100%;
    height: 100%;
    border: 1px solid #444444;
    border-collapse: collapse;
    .td {
      border: 1px solid #444444;
      padding: 10px;
      text-align: center;
      cursor: pointer;
      background-color: #ebf7e4;
    }
    .nonData {
      border: 1px solid #444444;
      padding: 10px;
      text-align: center;
      background-color: #d6ebff;
    }
  }
`;
export default Styled;
