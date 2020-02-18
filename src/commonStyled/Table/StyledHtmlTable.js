import styled from 'styled-components';

const StyledHtmlTable = styled.div`
  table {
    border-top: 1px solid #999999;
    border-spacing: 0;
    width: 100%;
  }
  table thead th {
    background: #e7e1f0;
    font-size: 14px;
    text-align: center;
    /* font-weight: 600; */
    color: #000;
    padding: 10px;
  }
  table tbody th {
    background: #f7f7f7;
    text-align: center;
    color: rgba(0, 0, 0, 0.65);
    /* font-weight: 600; */
    font-size: 12px;
    padding: 5px 5px;
    border-bottom: 1px solid #e8e8e8;
    width: 130px;
  }
  table tbody td {
    border-bottom: 1px solid #e8e8e8;
    padding: 5px 5px;
    font-size: 12px;
    width: auto;
  }
`;

export default StyledHtmlTable;
