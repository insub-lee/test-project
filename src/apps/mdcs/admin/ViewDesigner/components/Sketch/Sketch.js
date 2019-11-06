import styled from 'styled-components';

const Sketch = styled.div`
  width: ${({ width }) => width || '100%'};
  height: ${({ height }) => height || 'auto'};
  background-color: rgba(220, 204, 245, 0.1);
  overflow: auto;
  padding: 50px;
`;

export default Sketch;
