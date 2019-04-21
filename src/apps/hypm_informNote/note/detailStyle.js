import styled from 'styled-components';

const NoteDetailWrapper = styled.table`
  border-collapse:collapse;
  font-size:12px;
  border-left:1px solid #C9C9C9;
  margin-bottom: 15px;
  border-top: solid 1px #999999;

  th {
    height:21px;
    padding:2px 7px 2px 12px;
    border-right:1px solid #C9C9C9;
    text-align:left;
    white-space:nowrap;
    background-color:#f5f5f5;
  }

  td {
    padding: 2px 4px;
    border-right: 1px solid rgb(201, 201, 201);
  }

  tr {
    border-bottom: solid 1px #C9C9C9;
  }
`;

export default NoteDetailWrapper;
