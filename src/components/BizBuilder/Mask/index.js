import styled from 'styled-components';

const Mask = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: ${({ active }) => (active ? 'rgb(140, 200, 249)' : 'transparent')};
  opacity: ${({ active }) => (active ? '0.3' : '1')};
  z-index: 4;
`;

export default Mask;
