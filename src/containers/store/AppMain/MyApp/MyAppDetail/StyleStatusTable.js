import styled from 'styled-components';

const StyleStatusTable = styled.div`
  width: 100%;
  border-top: 1px solid #22222;

  table {
    width: 100%;
    border-top: 1px solid #222222;
  }

  th,
  td {
    height: 120px;
    padding-top: 27px;
    font-size: 14px;
    border-bottom: 1px solid #dadbdb;
    vertical-align: top;
    letter-spacing: -0.5px;
  }

  th {
    width: 152px;
    padding-left: 15px;
    color: #707070;
    font-weight: 400;
  }

  td {
    color: #404040;
    line-height: 1.7;

    .comments {
      color: #f85023;
    }
  }

  .userReviewText {
    margin-top: 5px;
    color: #404040;
    font-size: 13px;
    letter-spacing: -0.5px;
    white-space: pre-wrap;
  }
`;

export default StyleStatusTable;
