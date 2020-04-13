import styled from 'styled-components';

const StyledDiv = styled.div`
  width: 1000px;
  padding: 1rem;
  > * {
    box-sizing: border-box;
  }
  table {
    width: 100%;
    border-collapse: collapse;
    table-layout: fixed;
    //border: 1px solid #e3e3e3;
    td,
    th {
      min-width: 100px;
      font-size: 12px;
      font-weight: 600;
      text-align: left;
      border: 1px solid #e3e3e3;
      color: #000000;
    }
  }
  tbody {
    > tr > td {
      transition: box-shadow 0.15s cubic-bezier(0.215, 0.61, 0.355, 1);
      &:hover {
        box-shadow: inset 0 0 1px #000000;
      }
    }
  }
  .col-contents {
    padding: 5px 15px;
    cursor: pointer;
  }
  .col-contents {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
  .resizing-column {
    z-index: 1;
    transition: box-shadow 0.15s cubic-bezier(0.215, 0.61, 0.355, 1);
    &:hover {
      border-right: 2px solid #a3a3a3;
    }
  }
  .resizing-column-width {
    transition: box-shadow 0.15s cubic-bezier(0.215, 0.61, 0.355, 1);
    &:hover {
      border-bottom: 2px solid #a3a3a3;
    }
  }
  .style-options {
    pointer-events: auto !important;
    &:hover {
      visibility: visible !important;
      opacity: 1 !important;
    }
    ul {
      margin: 0;
      padding: 0;
      list-style: none;
      > li {
        padding: 5px 0;
        label {
          display: inline-block;
          width: 150px;
          vertical-align: top;
        }
        input,
        select {
          width: 100px;
          color: black;
        }
      }
    }
  }
`;
export default StyledDiv;
