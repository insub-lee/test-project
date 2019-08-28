import styled from 'styled-components';

const Styled = styled.div`
  width: 100%;
  overflow: hidden;
  & .app-card-body {
    display: table;
    table-layout: fixed;
    background-color: #fff;
    border: 1px solid #d8dfdf;
    padding: 20px 15px;
    border-left: 3px solid #886ab5;
    border-radius: 3px;
    width: 100%;
    &:hover {
      border-color: #886ab5;
    }
    .appd-card-icon {
      display: table-cell;
      vertical-align: middle;
      align-items: center;
      width: 70px;
      display: none;
      img {
        display: block;
      }
    }
    & > a {
      display: table-cell;
      vertical-align: middle;
      align-items: center;
      p {
        font-size: 14px;
        color: #000;
        font-weight: 600;
        margin: 0;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        word-break: break-all;
      }
      span {
        font-size: 12px;
        color: #666;
        display: block;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        word-break: break-all;
      }
    }
  }
`;

export default Styled;
