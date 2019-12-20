import React from 'react';

import StyledButton from 'components/CommonStyled/StyledButton';

const ModalInsertBtnComp = ({ id, saveTask, compProps, changeFormData, formData, visible }) =>
  visible ? (
    <StyledButton
      className="btn-primary"
      onClick={() => {
        formData.NODE_ID === 0 && changeFormData(id, 'NODE_ID', compProps.NODE_ID);
        saveTask(id, id, compProps.onCloseModleHandler);
      }}
    >
      Save
    </StyledButton>
  ) : (
    ''
  );

export default ModalInsertBtnComp;
