import styled from 'styled-components';
import iconReply from '../../images/icon_reply.png';

export default styled.div`
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

  .rc-table-placeholder {
    text-align: center;
  }

  .rc-table-thead {
    th {
      font-size: 15px;
      padding: 12px 14px 11px 14px;
      text-align: center;
      font-weight: 400;
    }
  }

  .rc-table-tbody {
    td {
      font-size: 15px;
      padding: 11px 14px;
      text-align: center;
      color: #555555;

      > button {
        color: #555555;
      }
    }

    .rc-table-expanded-row > td {
      padding: 0;
    }
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
