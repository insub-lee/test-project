import styled from 'styled-components';

const ContentsWrapper = styled.div`
  @media all {
    .page-break {
      display: none;
    }
  }

  @media print {
    html,
    body {
      height: initial !important;
      overflow: initial !important;
      -webkit-print-color-adjust: exact;
    }
  }

  @media print {
    .page-break {
      display: block;
      page-break-before: auto;
    }
    footer {
      display: block !important;
      position: fixed;
      bottom: 0;
      right: 0;
    }
  }

  @page {
    size: A4;
    margin: 15mm;
  }

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
