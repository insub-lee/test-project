import React from 'react';
import PropTypes from 'prop-types';
import FormView from '../../components/FormPreview/FormView';

export const RegisterBody = ({ formJson = [], formRef }) => {
  return (
    <form ref={formRef} autoComplete="off" onSubmit={e => e.preventDefault()}>
      <FormView datas={formJson} noBoarder smallView />
    </form>
  );
};

RegisterBody.propTypes = { formJson: PropTypes.object };

RegisterBody.defaultProps = { formJson: [{}] };
