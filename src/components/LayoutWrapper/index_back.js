import React from 'react';
import Wrapper from './Wrapper';

const LayoutWrapper = props => (
  <Wrapper
    className={
      props.className != null ? `${props.className} bizmicro-contentWrapper` : 'bizmicro-contentWrapper'
    }
    {...props}
  >
    {...props.children}
  </Wrapper>
);

export default LayoutWrapper;
