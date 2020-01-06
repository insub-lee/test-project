import styled from 'styled-components';

const WorkflowSketch = styled.div`
  width: ${({ width }) => width || '100%'};
  height: ${({ height }) => height || 'auto'};
  background-color: white;
  overflow: auto;
`;

export default WorkflowSketch;
