import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import StyledButton from 'components/BizBuilder/styled/StyledButton';

export default function InfoModify(props) {
  console.debug('### props: ', props);
  const { sagaKey: id, onCloseModalHandler, viewPageData, changeViewPage, saveBeforeProcess, saveTask, reloadId } = props;

  // useEffect(() => {
  //   viewPageData.viewType = 'MODIFY';
  // }, []);

  const { viewType } = viewPageData;
  switch (viewType) {
    case 'MODIFY': {
      return [
        <StyledButton className="btn-primary" onClick={() => saveBeforeProcess(id, reloadId || id, saveTask)}>
          저장
        </StyledButton>,
        <StyledButton className="btn-primary" onClick={() => changeViewPage(id, viewPageData.workSeq, viewPageData.taskSeq, 'VIEW')}>
          취소
        </StyledButton>,
      ];
    }
    case 'VIEW': {
      return (
        <StyledButton className="btn-primary" onClick={() => changeViewPage(id, viewPageData.workSeq, viewPageData.taskSeq, 'MODIFY')}>
          정보수정
        </StyledButton>
      );
    }

    default:
  }
}

InfoModify.defaultProps = {};

InfoModify.propTypes = {};
