import React from 'react';

import BizBuilderBase from 'components/BizBuilderBase';
import StyledButton from 'commonStyled/Buttons/StyledButton';

const ModalView = ({ viewType, workSeq, taskSeq, closeBtnFunc, clickCoverView }) => (
  <BizBuilderBase
    sagaKey="SearchView"
    viewType={viewType}
    workSeq={workSeq}
    taskSeq={taskSeq}
    clickCoverView={clickCoverView}
    closeBtnFunc={closeBtnFunc}
    ViewCustomButtons={({ closeBtnFunc: onClickClose, isTaskFavorite, sagaKey, formData, setTaskFavorite }) => (
      <div style={{ textAlign: 'center', marginTop: '12px' }}>
        {isTaskFavorite && (
          <StyledButton
            className="btn-light btn-first"
            onClick={() => setTaskFavorite(sagaKey, formData.WORK_SEQ, formData.TASK_ORIGIN_SEQ, formData.BUILDER_TASK_FAVORITE || 'N')}
          >
            {formData.BUILDER_TASK_FAVORITE === 'Y' ? '즐겨찾기 해제' : '즐겨찾기 추가'}
          </StyledButton>
        )}
        <StyledButton className="btn-primary" onClick={onClickClose}>
          닫기
        </StyledButton>
      </div>
    )}
  />
);

export default ModalView;
