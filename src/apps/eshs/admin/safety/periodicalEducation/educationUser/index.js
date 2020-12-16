import React from 'react';
import PropTypes from 'prop-types';
import EducationManagement from 'apps/eshs/admin/safety/periodicalEducation/educationManagement';

const EducationUser = () => <EducationManagement authority={['I']} />;

EducationUser.propTypes = {};

EducationUser.defaultProps = {};

export default EducationUser;
