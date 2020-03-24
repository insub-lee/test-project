import React from 'react';
import PropTypes from 'prop-types';
import StyledButton from 'components/BizBuilder/styled/StyledButton';

export default function ResultInput({
  sagaKey: id,
  modifyMetaSeq,
  onCloseModleHandler,
  viewPageData,
  changeViewPage,
  saveBeforeProcess,
  modifyTask,
  reloadId,
}) {
  const { viewType } = viewPageData;

  switch (viewType) {
    case 'MODIFY': {
      return [
        <StyledButton className="btn-primary" onClick={() => changeViewPage(id, viewPageData.workSeq, viewPageData.taskSeq, 'VIEW')}>
          결과입력
        </StyledButton>,
        <StyledButton className="btn-primary" onClick={() => changeViewPage(id, viewPageData.workSeq, viewPageData.taskSeq, 'VIEW')}>
          저장
        </StyledButton>,
      ];
    }
    case 'VIEW': {
      return [
        // workSeq : 3667
        // taskSeq : 10242
        <StyledButton className="btn-primary" onClick={() => changeViewPage(id, viewPageData.workSeq, viewPageData.taskSeq, 'MODIFY')}>
          결과입력
        </StyledButton>,
      ];
    }

    default:
  }
}

ResultInput.defaultProps = {};

ResultInput.propTypes = {};
