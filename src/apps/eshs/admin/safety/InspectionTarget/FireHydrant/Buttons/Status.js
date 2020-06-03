import React from 'react';
import PropTypes from 'prop-types';
import StyledButton from 'components/BizBuilder/styled/StyledButton';

// VIEW_STATUS
export default function Status({
  clickStatus,
  viewType,
  moveTo,
  sagaKey,
  detail,
  viewMetaSeqHandler,
  onCloseModalHandler,
  modalHandler,
  taskSeq,
  workSeq,
  viewPageData,
}) {
  return (
    <StyledButton
      className="btn-primary"
      onClick={() => {
        clickStatus();
        // if (moveTo) {
        // viewMetaSeqHandler(moveTo, viewType);
        // modalHandler(true);
        // }
      }}
    >
      현황
    </StyledButton>
  );
}

Status.defaultProps = {};

Status.propTypes = {};
