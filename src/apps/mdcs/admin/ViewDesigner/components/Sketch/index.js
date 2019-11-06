import styled from 'styled-components';

const Index = styled.div`
  width: ${({ width }) => width || '100%'};
  height: ${({ height }) => height || 'auto'};
  overflow: auto;
  padding: 50px;
`;

export default Index;
