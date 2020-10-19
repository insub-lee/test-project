import React from 'react';
import PropTypes from 'prop-types';

import FormView from '../../components/FormPreview/FormView';

export const DeleteBody = ({ formJson = [] }) => {
  const data = formJson.filter(e => e.type === 'password');

  return <FormView datas={data} noBoarder smallView />;
};

DeleteBody.propTypes = { formJson: PropTypes.object };

DeleteBody.defaultProps = { formJson: [{}] };
