import React from 'react';
import { Button, Popconfirm } from 'antd';
import StyledButtonWrapper from 'components/BizBuilder/styled/Buttons/StyledButtonWrapper';
import StyledAntdButton from 'components/BizBuilder/styled/Buttons/StyledAntdButton';

const StyledButton = StyledAntdButton(Button);

export function InputButtons(props) {
  const { sagaKey, viewPageData, saveBeforeProcess, reloadId } = props;
  const { workSeq, taskSeq } = viewPageData;
  return (
    <StyledButtonWrapper className="btn-wrap-center btn-wrap-mt-20">
      <StyledButton className="btn-primary btn-sm mr5" onClick={() => saveBeforeProcess(sagaKey, reloadId || sagaKey)}>
        저장
      </StyledButton>
    </StyledButtonWrapper>
  );
}

export function ViewButtons(props) {
  const {
    profile,
    deleteTask,
    changeViewPage,
    sagaKey,
    viewPageData,
    builderModalClose,
    changeBuilderModalState,
    formData,
    customModalHandler,
    onCloseModalHandler,
    bookmarkHandler,
  } = props;
  const { workSeq, taskSeq } = viewPageData;
  const bookMarkUserList = (formData.BOOKMARK_USER_LIST && formData.BOOKMARK_USER_LIST.length > 0 && formData.BOOKMARK_USER_LIST) || '';
  return (
    <StyledButtonWrapper className="btn-wrap-center btn-wrap-mt-20">
      <StyledButton className="btn-primary mr5 btn-sm" onClick={() => changeViewPage(sagaKey, workSeq, taskSeq, 'REVISION')}>
        수정
      </StyledButton>
      <StyledButton className="btn-gray mr5 btn-sm" onClick={() => bookmarkHandler(sagaKey, formData)}>
        {bookMarkUserList.split(',').includes(`${profile.USER_ID}`) ? '북마크 해제' : '북마크 설정'}
      </StyledButton>
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
