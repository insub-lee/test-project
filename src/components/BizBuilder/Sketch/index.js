import styled from 'styled-components';

const Index = styled.div`
  width: ${({ width }) => width || '100%'};
  height: ${({ height }) => height || '100%'};
  overflow: auto;
  padding: 20px;

  .react-contextmenu-wrapper {
    height: 100%;
  }
`;

export default Index;
