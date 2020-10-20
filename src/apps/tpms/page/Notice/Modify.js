import React from 'react';
import PropTypes from 'prop-types';

import FormView from '../../components/FormPreview/FormView';
import makeContent from '../../utils/makeContents';

export const ModifyBody = ({ formJson = [], content = {} }) => {
  const data = makeContent(formJson, content, false);

  return <FormView datas={data} noBoarder smallView />;
};

ModifyBody.propTypes = { formJson: PropTypes.array, content: PropTypes.object };

ModifyBody.defaultProps = { formJson: [{}], content: {} };
