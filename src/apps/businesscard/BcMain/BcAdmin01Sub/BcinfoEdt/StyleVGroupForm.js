import styled from 'styled-components';

const StyleVGroupForm = styled.div`
  width: 100%;
  border-top: 1px solid #222222;

  table {
    width: 100%;

    th {
      width: 140px;
      padding: 9px 0 10px 11px;
      border-bottom: 1px solid #dadbdb;
      color: #404040;
      text-align: left;
      background-color: #f5f5f5;
  
      label {
        font-size: 13px !important;
        font-weight: 400;
      }      
    }

    td {
      padding: 9px 20px 10px 20px;
      border-bottom: 1px solid #dadbdb;
  
      //Input 스타일 (나중에 빼기)
      .ant-input {
        width: 100%;
        border: 1px solid #cccccc;
        border-radius: 0;
        font-size: 13px;
  
        &:focus {
          border-color: #cccccc;
        }
  
        &:read-only {
          padding-left: 0;
          background: #ffffff;
          border-color: #ffffff;
          cursor: default;
        }
      }     
    }
  }  
`;

export default StyleVGroupForm;
