import styled from 'styled-components';

const Index = styled.div`
  width: ${({ width }) => width || '100%'};
  height: ${({ height }) => height || '100%'};
  overflow: auto;
  padding: 20px;
`;

export default Index;
