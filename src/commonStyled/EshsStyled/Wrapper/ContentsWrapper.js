import styled from 'styled-components';

const ContentsWrapper = styled.div`
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
  .tableWrapper {
    padding: 20px;
  }

  .selSaveWrapper {
    padding: 20px 20px 0px 20px;
    text-align: right;
    .textLabel {
      display: inline-block;
      vertical-align: middle;
      padding: 0 12px;
      font-size: 12px;
    }
    &.alignLeft {
      text-align: left;
    }
    .ant-select {
      vertical-align: middle;
    }
  }

  .div-comment {
    text-align: right;
    margin-top: 8px;
    font-size: 12px;
    color: #ff5f5f;
    &.div-comment-antd {
      margin-top: 0;
      padding-right: 10px;
    }
  }
`;

export default ContentsWrapper;
