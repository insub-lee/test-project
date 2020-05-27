import React from 'react';
import PropTypes from 'prop-types';
import StyledButton from 'components/BizBuilder/styled/StyledButton';
import { VIEW_TYPE, META_SEQ } from '../../internal_constants';

export default function Add({ sagaKey, detail, title, viewMetaSeqHandler, onCloseModalHandler, modalHandler, taskSeq, workSeq, viewPageData }) {
  return (
    <StyledButton
      className="btn-primary"
      onClick={() => {
        viewMetaSeqHandler(META_SEQ.INPUT_ISSUE_NOTE, VIEW_TYPE.INPUT);
        modalHandler(true);
      }}
    >
      {title}
    </StyledButton>
  );
}

Add.defaultProps = {};

Add.propTypes = {};
