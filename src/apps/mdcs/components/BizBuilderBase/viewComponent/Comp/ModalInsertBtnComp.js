import React from 'react';

import StyledButton from 'apps/mdcs/styled/StyledButton';

const ModalInsertBtnComp = ({ id, saveTask, compProps, changeFormData, formData }) => (
  <StyledButton
    className="btn-primary"
    onClick={() => {
      formData.NODE_ID === 0 && changeFormData(id, 'NODE_ID', compProps.NODE_ID);
      saveTask(id, id, compProps.onCloseModalHandler);
    }}
  >
    Save
  </StyledButton>
);

export default ModalInsertBtnComp;
