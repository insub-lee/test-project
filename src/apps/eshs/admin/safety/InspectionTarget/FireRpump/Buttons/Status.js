import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import StyledAntdButton from 'components/BizBuilder/styled/Buttons/StyledAntdButton';
const StyledButton = StyledAntdButton(Button);

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
      className="btn-primary btn-first"
      onClick={() => {
        clickStatus();
      }}
    >
      현황
    </StyledButton>
  );
}

Status.defaultProps = {};

Status.propTypes = {};
