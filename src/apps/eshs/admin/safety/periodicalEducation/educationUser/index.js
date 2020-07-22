import React from 'react';
import PropTypes from 'prop-types';
import EducationManagement from 'apps/eshs/admin/safety/periodicalEducation/educationManagement';

const EducationUser = ({ authority }) => <EducationManagement authority={authority} />;

EducationUser.propTypes = {
  authority: PropTypes.arrayOf('string'),
};

EducationUser.defaultProps = {
  authority: null,
};

export default EducationUser;
