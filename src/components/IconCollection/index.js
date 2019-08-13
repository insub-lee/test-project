import React from 'react';
import PropTypes from 'prop-types';

import Styled from './Styled';

const IconCollection = ({ className }) => <Styled className={className} />;

IconCollection.propTypes = {
  className: PropTypes.string,
};

IconCollection.defaultProps = {
  className: '',
};

export default IconCollection;
