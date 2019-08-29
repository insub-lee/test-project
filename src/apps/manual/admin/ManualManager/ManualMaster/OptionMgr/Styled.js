import styled from 'styled-components';

const Styled = styled.div`
  .title-tr td {
    width: 100%;
    height: 40px;
    line-height: 40px;
    background-color: #eef8fe;
    border-top: 1px solid #076dac;
    border-bottom: 1px solid #dcdcdc;
    padding: 0 15px;
    & p {
      position: relative;
      display: inline-block;
      color: #076dac;
      font-size: 15px;
      font-weight: 600;
      padding-left: 15px;
      &:before {
        content: '';
        display: inline-block;
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background: #fff;
        border: 3px solid #076dac;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        left: 0px;
      }
    }
  }
  .ant-table-thead > tr > th {
    padding: 10px;
    background: #886ab5;
    color: #fff;
  }
  .ant-table-tbody > tr > td {
    padding: 10px;
    font-size: 12px;
  }
  .ant-table-pagination.ant-pagination {
    float: none;
    margin: 20px auto;
    text-align: center;
  }
`;

export default Styled;
