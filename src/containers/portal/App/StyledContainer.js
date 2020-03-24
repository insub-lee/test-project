import styled from 'styled-components';

const StyledContainer = styled.div`
  /* overflow: hidden; */
  height: 100%;

  > .scrollable-container {
    width: auto;
    //min-height: 100vh;
    //height: auto;
    overflow-x: hidden !important;
  }
`;

export default StyledContainer;
