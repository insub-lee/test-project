import styled from 'styled-components';

const Styled = styled.div`
  .input-label {
    margin: 0px 100px;
  }

  .search-item input {
    cursor: pointer;
  }

  .data-grid {
    text-align: center;
    margin: 20px 10px;
    /* border: 1px solid #aaaaaa; */
  }

  .data-grid-row {
    margin-bottom: 5px;
  }

  .data-grid-row:last-child {
    margin-bottom: 0px;
  }

  .data-grid .col-label {
    background-color: #bdd7ee;
    height: 32px;
    border: 1px solid #aaaaaa;
  }

  .data-grid .col-input-number {
    width: 90%;
  }

  .col-input input {
    width: 90%;
  }

  .data-grid-row .col-input:last-child {
    margin-right: 0px;
  }

  .col-input .col-select {
    width: 90%;
  }

  .col-set {
    border: 1px solid #aaaaaa;
  }

  div .company-comp {
    margin-left: 11px; /* 1px 어긋남 */
  }

  .alignRight {
    margin: 20px 10px;
  }

  .data-modal {
    width: 700px;
  }
`;

export default Styled;
