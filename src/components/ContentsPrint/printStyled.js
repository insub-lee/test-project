import styled from 'styled-components';

const printStyled = styled.div`
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
`;

export default printStyled;
