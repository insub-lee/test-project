import React from 'react';
import PropTypes from 'prop-types';

import Wrapper from './Wrapper';
import AllWorkScheduler from '../../AllWorkScheduler';

const MainBody = ({ manInfo }) => (
  <Wrapper>
    <AllWorkScheduler manInfo={manInfo} site={manInfo.site} />
  </Wrapper>
);

MainBody.propTypes = {
  manInfo: PropTypes.object,
};

MainBody.defaultProps = {
  manInfo: {},
};

export default MainBody;
