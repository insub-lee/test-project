import styled from 'styled-components';

const primaryColor = '#886ab5';

const StyledTable = styled.div`
  position: relative;

  table {
    width: 100%;
  }
  /* tbody */
  tbody > tr > td {
    background: #ffffff;
    border: 1px solid #ddd;
    padding: 10px;
    color: #666;
    font-size: 12px;
  }

  tbody > tr > th {
    background-color: ${primaryColor};
    border: 1px solid #ddd;
    color: #ffffff;
    text-align: center;
    font-size: 12px;
    padding: 10px;
    font-weight: 500;
  }

  .btn-group {
    text-align: center;
    padding: 5px 16px 0px;
  }

  .sub_title {
    font-size: 15px;
    font-weight: bold;
  }
`;
export default StyledTable;
