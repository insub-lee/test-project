import React from 'react';

import BizBuilderBase from 'components/BizBuilderBase';
import StyledButton from 'commonStyled/Buttons/StyledButton';

const CoverView = ({ onCloseCoverView, coverView }) => (
  <BizBuilderBase
    sagaKey="CoverView"
    viewType="VIEW"
    workSeq={coverView.workSeq}
    taskSeq={coverView.taskSeq}
    viewMetaSeq={coverView.viewMetaSeq}
    onCloseCoverView={onCloseCoverView}
    ViewCustomButtons={({ onCloseCoverView: onClickClose }) => (
      <div style={{ textAlign: 'center', marginTop: '12px' }}>
        <StyledButton className="btn-primary" onClick={onClickClose}>
          닫기
        </StyledButton>
      </div>
    )}
  />
);

export default CoverView;
