import React from 'react';
import Styled from './Styled';

const TopbarBtn = ({ data }) => (
  <Styled type="button" onClick={() => data.event(data.key)}>
    {data.title}
  </Styled>
);

export default TopbarBtn;
