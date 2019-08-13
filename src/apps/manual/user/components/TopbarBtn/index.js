import React from 'react';
import Styled from './Styled';

const TopbarBtn = ({ data }) => (
  <Styled type="button" onClick={() => data.event(data.widgetId)}>
    {data.title}
  </Styled>
);

export default TopbarBtn;
