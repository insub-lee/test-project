import React from 'react';
import message from 'components/Feedback/message';
import MessageContent from 'components/Feedback/message.style2';

export const callBackAfterPost = (id, response, afterFunc) => {
  const isInsert = Object.values(response)[0];
  if (isInsert) {
    message.success(<MessageContent>저장되었습니다.</MessageContent>);
    return typeof afterFunc === 'function' ? afterFunc() : null;
  }
  message.error(<MessageContent>저장에 실패했습니다.</MessageContent>);
  return typeof afterFunc === 'function' ? afterFunc() : null;
};

export const callBackAfterPut = (id, response, afterFunc) => {
  const isUpdate = Object.values(response)[0];
  if (isUpdate) {
    message.success(<MessageContent>수정되었습니다.</MessageContent>);
    return typeof afterFunc === 'function' ? afterFunc() : null;
  }
  message.error(<MessageContent>수정에 실패했습니다.</MessageContent>);
  return typeof afterFunc === 'function' ? afterFunc() : null;
};

export const callBackAfterDelete = (id, response, afterFunc) => {
  const isDelete = Object.values(response)[0];
  if (isDelete) {
    message.success(<MessageContent>삭제되었습니다.</MessageContent>);
    return typeof afterFunc === 'function' ? afterFunc() : null;
  }
  message.error(<MessageContent>삭제에 실패했습니다.</MessageContent>);
  return typeof afterFunc === 'function' ? afterFunc() : null;
};
