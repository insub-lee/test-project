import styled from 'styled-components';

const Styled = styled.div`
  position: relative;
  padding-bottom: 115px;
  & .contentBody-wrap {
    width: 100%;
    display: flex;
    flex-grow: 1;
    height: calc(100vh - 180px);
  }
`;

export default Styled;
