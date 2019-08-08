import React from 'react';
import Styled from './Styled';

const TopbarBtn = ({ data }) => (
  <Styled>
    <button type="button" onClick={() => data.event()}>
      {data.title}
    </button>
  </Styled>
);

export default TopbarBtn;
