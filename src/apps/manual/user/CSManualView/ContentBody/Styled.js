import styled from 'styled-components';

const Styled = styled.div`
  position: relative;
  padding: 6px 10px 53px;
  & .contentBody-wrap {
    width: 100%;
    display: flex;
    flex-grow: 1;
    height: calc(100vh - 172px);
  }
`;

export default Styled;
