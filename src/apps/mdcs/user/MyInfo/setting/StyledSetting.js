import styled from 'styled-components';

const StyledSetting = styled.div`
  .settingTd {
    padding: 10px;
  }

  .clearfix {
    zoom: 1;
    width: 191px;
    height: 191px;
    & > .ant-upload-picture-card-wrapper {
      zoom: 1;
      display: block;
      width: 100%;
      height: 100%;
      & > .ant-upload {
        display: table;
        float: left;
        width: 100%;
        height: 100%;
        margin: 8px;
        text-align: center;
        vertical-align: top;
        background-color: #fafafa;
        cursor: pointer;
        -webkit-transition: border-color 0.3s ease;
        transition: border-color 0.3s ease;
        & > .ant-upload {
          display: table-cell;
          width: 100%;
          height: 100%;
          padding: 2px;
          text-align: center;
          vertical-align: middle;
        }
      }
    }
  }

  .btnRow {
    text-align: right;
  }

  .editable {
    &:hover {
      border-color: #2196f3;
      box-shadow: 1px 2px 6px 1px rgba(33, 150, 243, 0.5);
      border-radius: 4px;
    }
  }

  input {
    width: 100%;
    padding-left: 6px;
    background-color: #fff;
    border: 0;
    color: #000;
    font-size: 13px;
    font-weight: 600;
    border-color: #2196f3;
    box-shadow: 1px 2px 6px 1px rgba(33, 150, 243, 0.5);
    border-radius: 4px;
    &:focus {
      color: #fff;
      background-color: #0c83e2;
      border-color: #0c7cd5;
    }
  }
`;

export default StyledSetting;
