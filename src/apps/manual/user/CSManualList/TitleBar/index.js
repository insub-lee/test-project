import React from 'react';

import Styled from './Styled';

const TitleBar = ({ categoryName }) => (
  <Styled>
    <p>{categoryName}</p>
  </Styled>
);

export default TitleBar;
