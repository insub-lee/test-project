import styled from 'styled-components';
import iconReply from '../../images/icon_reply.png';
import iconCheckbox from '../../images/icon_checkbox.png';

const StyledWrapper = styled.div`
  //padding: 30px;

  .view_top {
    position: relative;
    margin-bottom: 15px;

    .btn_wrap {
      font-size: 0;
      text-align: center;
      overflow: hidden;
      position: absolute;
      right: 0;
      top: 3px;
    }
  }

  .tooltip {
    position: relative;
    display: inline-block;
    border-bottom: 1px dotted black; /* If you want dots under the hoverable text */

    /* Tooltip text */
    .tooltiptext {
      visibility: hidden;
      width: 150px;
      background-color: black;
      color: #fff;
      text-align: center;
      padding: 10px ;
      border-radius: 6px;
      /* Position the tooltip text - see examples below! */
      position: absolute;
      z-index: 1;
    }
    /* Show the tooltip text when you mouse over the tooltip container */
    &:hover .tooltiptext {
      visibility: visible;
    }
  }

  .rc-table-placeholder {
    text-align: center;
  }

  //.rc-table-thead {
  //  th {
  //    font-size: 15px;
  //    padding: 12px 14px 11px 14px;
  //    text-align: center;
  //    font-weight: 400;
  //  }
  //}
  //
  //.rc-table-tbody {
  //  td {
  //    font-size: 15px;
  //    padding: 11px 14px;
  //    text-align: center;
  //    color: #555555;
  //
  //    > button {
  //      color: #555555;
  //    }
  //  }
  //
  //  .rc-table-expanded-row > td {
  //    padding: 0;
  //  }
  }

  .icon.icon_reply {
    text-indent: -9999px;
    display: inline-block;
    vertical-align: middle;
    width: 16px;
    height: 16px;
    background: #697f95 url(${iconReply}) no-repeat center;
    border-radius: 100%;
  }

  .checkbox {
    display: inline-block;
  }
  .checkbox input[type='checkbox'] {
    display: none;
  }
  .checkbox input[type='checkbox'] + label {
    cursor: pointer;
    color: #555;
    font-size: 17px;
  }
  .checkbox input[type='checkbox'] + label span {
    display: inline-block;
    background: white;
    margin-right: 6px;
    border: 1px solid #c5cdd6;
    width: 16px;
    height: 16px;
    margin-top: -3px;
    vertical-align: middle;
  }
  .checkbox input[type='checkbox']:checked + label span {
    background: white url(${iconCheckbox}) no-repeat center;
  }

  @media screen and (max-width: 1260px) {
    .view_top {
      text-align: right;

      .btn_wrap {
        display: inline-block;
        position: relative;
        right: 0;
        top: 0;
        margin-top: 15px;
      }
    }
  }

  @media screen and (max-width: 1260px) {
    .rc-table-body {
      overflow-x: scroll;

      table {
        min-width: 1024px;
      }
    }

    .rc-table-thead {
      th {
        -ms-word-break: break-all;
        word-break: break-all;
      }
    }

    .rc-table-tbody {
      td {
        -ms-word-break: break-all;
        word-break: break-all;
      }
    }
  }
`;

export default StyledWrapper;
