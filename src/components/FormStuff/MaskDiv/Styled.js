import styled from 'styled-components';

const Styled = styled.div`
  position: relative;

  .mask {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: transparent;
    top: 0;
    left: 0;
    z-index: 2;
  }
`;

export default Styled;
