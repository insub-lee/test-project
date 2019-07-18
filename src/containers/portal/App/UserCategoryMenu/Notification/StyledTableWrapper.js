import styled from 'styled-components';

const StyledTableWrapper = styled.div`
  width: 230px;
  padding-bottom: 20px;

  @media only screen and (max-width: 320px) {padding-bottom: 0;}

  tr {
    cursor: pointer;

    td {
      height: 29px;
      color: #404040;
      font-size: 12px;

      &:first-child {
        width: 175px;
        padding-left: 16px;
      }

      &:last-child {
        width: calc(100% - 175px);

        .ant-badge {
          display: inline-block;
          float: right;

          .ant-badge-count {
            right: 0;
            min-width: 15px;
            height: 16px;
            font-size: 10px;
            line-height: 16px;
            background: #f85023;
            box-shadow: none;
          }
        }

      }
    }

  }

`;

export default StyledTableWrapper;
