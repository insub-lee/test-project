import React from 'react';
import PropTypes from 'prop-types';

import Styled from './Styled';

const PanelHeader = ({ title }) => (
  <Styled>
    <h2>{title}</h2>
  </Styled>
);

PanelHeader.propTypes = {
  title: PropTypes.string,
};

PanelHeader.defaultProps = {
  title: '',
};

export default PanelHeader;
