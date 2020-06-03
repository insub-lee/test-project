import React from 'react';
import PropTypes from 'prop-types';
import StyledButton from 'components/BizBuilder/styled/StyledButton';

export default function History({ viewType, moveTo, sagaKey, detail, viewMetaSeqHandler, onCloseModalHandler, modalHandler, taskSeq, workSeq, viewPageData }) {
  // console.debug('£££ History : ', viewMetaSeqHandler, modalHandler);

  return (
    <StyledButton
      className="btn-primary"
      onClick={() => {
        if (moveTo) {
          viewMetaSeqHandler(moveTo, viewType);
          modalHandler(true);
        }
      }}
    >
      {detail}
    </StyledButton>
  );
}

History.defaultProps = {};

History.propTypes = {};
