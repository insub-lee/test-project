import React from 'react';
import PropTypes from 'prop-types';

import MainBody from './MainBody';

const BaseComp = ({ profile }) => <MainBody empno={profile.EMP_NO} />;

BaseComp.propTypes = {
  profile: PropTypes.object,
};

BaseComp.defaultProps = {
  profile: null,
};

export default BaseComp;
