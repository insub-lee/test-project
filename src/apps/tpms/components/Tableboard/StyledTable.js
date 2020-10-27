import styled from 'styled-components';

const StyledTable = styled.table`
  width: 100%;
  margin-bottom: 20px;

  @media screen and (max-width: 860px) {
    & {
      min-width: 1024px;
    }
  }
`;

export default StyledTable;
