import React from 'react';
import PropTypes from 'prop-types';

import FormView from '../../components/FormPreview/FormView';
import makeContent from '../../utils/makeContents';

export const ModifyBody = ({ formJson = [], content = {} ,formRef}) => {
  const data = makeContent(formJson, content, false);

  return (
    <form ref={formRef} autoComplete="off" onSubmit={e => e.preventDefault()}>
      <FormView datas={data} noBoarder smallView />
    </form>
  );
};

ModifyBody.propTypes = { formJson: PropTypes.array, content: PropTypes.object };

ModifyBody.defaultProps = { formJson: [{}], content: {} };
