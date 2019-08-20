import React from 'react';
import PropTypes from 'prop-types';

import Header from './Header';
import Container from './Container';
import Styled from './Styled';

const Panel = ({ children, mualMaster, navList }) => (
  <Styled>
    <Header mualMaster={mualMaster} navList={navList} />
    <Container>{children}</Container>
  </Styled>
);

Panel.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};

export default Panel;
