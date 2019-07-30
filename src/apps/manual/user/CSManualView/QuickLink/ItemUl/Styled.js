import styled from 'styled-components';

const Styled = styled.div`
  padding: 15px;
  background: #ececec;
  border-bottom: 1px solid #d9d9d9;
  & ul {
    margin: 0;
    padding: 0;
    list-style: none;
    & li {
      margin-bottom: 10px;
      &:last-child {
        margin-bottom: 0;
      }
    }
  }
`;

export default Styled;
