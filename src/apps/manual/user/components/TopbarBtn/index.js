import React from 'react';
import Styled from './Styled';

const TopbarBtn = ({ data }) => <Styled onClick={() => data.event()}>{data.title}</Styled>;

export default TopbarBtn;
