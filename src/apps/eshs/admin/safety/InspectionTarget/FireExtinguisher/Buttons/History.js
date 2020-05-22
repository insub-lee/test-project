import React from 'react';
import PropTypes from 'prop-types';
import StyledButton from 'components/BizBuilder/styled/StyledButton';
import { VIEW_TYPE, META_SEQ } from '../../internal_constants';

export default function History({ sagaKey, detail, viewMetaSeqHandler, onCloseModalHandler, modalHandler, taskSeq, workSeq, viewPageData }) {
  let moveTo = null;
  switch (detail) {
    case '관리':
      moveTo = META_SEQ.VIEW_INSPECTION_BY_POSITON_NO;
      break;
    case 'Chip':
      moveTo = META_SEQ.VIEW_INSPECTION_BY_CHIP;
      break;

    default:
      break;
  }

  // console.debug('£££ History : ', viewMetaSeqHandler, modalHandler);

  return (
    <StyledButton
      className="btn-primary"
      onClick={() => {
        if (moveTo) {
          viewMetaSeqHandler(moveTo, VIEW_TYPE.VIEW);
          modalHandler(true);
        }
      }}
    >
      History({detail})
    </StyledButton>
  );
}

History.defaultProps = {};

History.propTypes = {};
