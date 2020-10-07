import React from 'react';
import request from 'utils/request';
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
  const customDeleteTask = () => {
    request({
      method: 'PUT',
      url: `/api/mxlife/v1/common/womancomplain`,
      data: {
        PARAM: {
          ...formData,
        },
      },
    }).then(({ response }) => {
      if (response?.result === 1) {
        deleteTask(sagaKey, sagaKey, workSeq, taskSeq, onCloseModalHandler);
      }
    });
  };
  return (
    <StyledButtonWrapper className="btn-wrap-center btn-wrap-mt-20">
      {formData.LVL === 1 ? (
        <>
          {formData.REPLY_CNT === 0 && (
            <StyledButton className="btn-primary mr5 btn-sm" onClick={() => customModalHandler('answer', 'INPUT', formData)}>
              답변
            </StyledButton>
          )}
          <StyledButton className="btn-primary mr5 btn-sm" onClick={() => changeViewPage(sagaKey, workSeq, taskSeq, 'REVISION')}>
            수정
          </StyledButton>
        </>
      ) : (
        <StyledButton className="btn-primary mr5 btn-sm" onClick={() => changeViewPage(sagaKey, workSeq, taskSeq, 'MODIFY')}>
          수정
        </StyledButton>
      )}
      <StyledButton className="btn-gray mr5 btn-sm" onClick={() => bookmarkHandler(sagaKey, formData)}>
        {bookMarkUserList.split(',').includes(`${profile.USER_ID}`) ? '북마크 해제' : '북마크 설정'}
      </StyledButton>
      <Popconfirm title="Are you sure delete this task?" onConfirm={() => customDeleteTask()} okText="Yes" cancelText="No">
        <StyledButton className="btn-light mr5 btn-sm">삭제</StyledButton>
      </Popconfirm>
    </StyledButtonWrapper>
  );
}

export default 'specify what you want';
