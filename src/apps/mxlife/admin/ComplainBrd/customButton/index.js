import React from 'react';
import { Button, Popconfirm } from 'antd';
import StyledButtonWrapper from 'components/BizBuilder/styled/Buttons/StyledButtonWrapper';
import StyledAntdButton from 'components/BizBuilder/styled/Buttons/StyledAntdButton';

const StyledButton = StyledAntdButton(Button);

export function ViewButtons(props) {
  const {
    deleteTask,
    changeViewPage,
    sagaKey,
    viewPageData,
    builderModalClose,
    changeBuilderModalState,
    formData,
    customModalHandler,
    onCloseModalHandler,
  } = props;
  const { workSeq, taskSeq } = viewPageData;
  return (
    <StyledButtonWrapper className="btn-wrap-center btn-wrap-mt-20">
      {formData.LVL === 1 ? (
        <>
          <StyledButton className="btn-primary mr5 btn-sm" onClick={() => customModalHandler('answer', 'INPUT', formData)}>
            답변
          </StyledButton>
          <StyledButton className="btn-primary mr5 btn-sm" onClick={() => changeViewPage(sagaKey, workSeq, taskSeq, 'REVISION')}>
            수정
          </StyledButton>
        </>
      ) : (
        <StyledButton className="btn-primary mr5 btn-sm" onClick={() => changeViewPage(sagaKey, workSeq, taskSeq, 'MODIFY')}>
          수정
        </StyledButton>
      )}
      <Popconfirm
        title="Are you sure delete this task?"
        onConfirm={() => deleteTask(sagaKey, sagaKey, workSeq, taskSeq, onCloseModalHandler)}
        okText="Yes"
        cancelText="No"
      >
        <StyledButton className="btn-light mr5 btn-sm">삭제</StyledButton>
      </Popconfirm>
    </StyledButtonWrapper>
  );
}

export default 'specify what you want';
