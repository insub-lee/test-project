import React from 'react';
import PropTypes from 'prop-types';

import FormView from '../../components/FormPreview/FormView';

export const RegisterBody = ({ formJson = [] }) => {
  return <FormView datas={formJson} noBoarder smallView />;
};

RegisterBody.propTypes = { formJson: PropTypes.object };

RegisterBody.defaultProps = { formJson: [{}] };
