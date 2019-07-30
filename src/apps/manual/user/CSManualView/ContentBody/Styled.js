import styled from 'styled-components';

const Styled = styled.div`
  position: relative;
  padding-bottom: 74px;
  & .contentBody-wrap {
    width: 100%;
    display: flex;
    flex-grow: 1;
    height: calc(100vh - 182px);
    margin-top: 2px;
  }
`;

export default Styled;
