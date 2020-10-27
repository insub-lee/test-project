import styled from 'styled-components';

const BlankBG = styled.div`
  display: none;

  @media screen and (max-width: 736px) {
    position: fixed;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    left: 0;
    top: 0;
    z-index: 1;
    cursor: pointer;

    &.active {
      display: block;
    }
  }
`;

export default BlankBG;
