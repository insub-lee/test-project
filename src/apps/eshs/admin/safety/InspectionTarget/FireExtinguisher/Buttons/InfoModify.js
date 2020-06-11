import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import StyledAntdButton from 'components/BizBuilder/styled/Buttons/StyledAntdButton';
const StyledButton = StyledAntdButton(Button);

export default function InfoModify(props) {
  const { sagaKey: id, onCloseModalHandler, viewPageData, changeViewPage, saveBeforeProcess, saveTask, modifyTask, reloadId } = props;

  const { viewType } = viewPageData;
  switch (viewType) {
    case 'MODIFY': {
      return [
        <StyledButton className="btn-primary btn-first" onClick={() => saveBeforeProcess(id, reloadId || id, modifyTask)}>
          저장
        </StyledButton>,
        <StyledButton className="btn-primary btn-first" onClick={() => changeViewPage(id, viewPageData.workSeq, viewPageData.taskSeq, 'VIEW')}>
          취소
        </StyledButton>,
      ];
    }
    case 'VIEW': {
      return (
        <StyledButton className="btn-primary btn-first" onClick={() => changeViewPage(id, viewPageData.workSeq, viewPageData.taskSeq, 'MODIFY')}>
          정보수정
        </StyledButton>
      );
    }

    default:
  }
}

InfoModify.defaultProps = {};

InfoModify.propTypes = {};
