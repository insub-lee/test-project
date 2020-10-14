import React from 'react';
import PropTypes from 'prop-types';
import { Wrapper } from './Wrapper';

export const ModalHugger = ({ node }) => (
  <Wrapper>
    <div className="content">{node}</div>
  </Wrapper>
);

ModalHugger.propTypes = {
  node: PropTypes.node,
};

ModalHugger.defaultProps = { node: null };
