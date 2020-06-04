import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import StyledAntdButton from 'components/BizBuilder/styled/Buttons/StyledAntdButton';
import { VIEW_TYPE, META_SEQ } from '../internal_constants';
const StyledButton = StyledAntdButton(Button);

export default function History({ viewType, moveTo, sagaKey, detail, viewMetaSeqHandler, onCloseModalHandler, modalHandler, taskSeq, workSeq, viewPageData }) {
  // console.debug('£££ History : ', viewMetaSeqHandler, modalHandler);

  return (
    <StyledButton
      className="btn-primary btn-first"
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
