import styled from 'styled-components';

const Wrapper = styled.div`
  background: #fff;
  border: 1px solid #eaeaea;
  padding: 40px;
  border-radius: 3px;
  .categorie {
    padding-right: 15px;
  }
  .builderBaseData {
    border-left: 1px solid #e5e5e5;
    padding-left: 15px;
    .ant-table-thead {
      th {
        background: #6a60b9;
        color: #fff;
        text-align: center;
      }
    }
    .ant-table-row {
      td {
        text-align: center;
      }
      td:nth-child(2) {
        text-align: left !important;
      }
    }
  }
`;

export default Wrapper;
