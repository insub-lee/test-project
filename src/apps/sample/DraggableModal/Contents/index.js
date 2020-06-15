import React from 'react';
import styled from 'styled-components';

const StyledDiv = styled.div`
  width: 500px;
  height: 300px;
  padding: 20px;
  border: 1px solid #000;
  background-color: pink;
  
  h2.handle {
    border: 1px solid black ;
    background-color: yellow;
  }
  
`

const Contents = () => (
  <StyledDiv>
    <h2 className="handle">Handle Bar</h2>
    <p>
      I Can Move Move Move~~~~
    </p>
  </StyledDiv>
);

export default Contents;
