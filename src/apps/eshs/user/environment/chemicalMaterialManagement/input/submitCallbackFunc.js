import { message } from 'antd';

export const callBackAfterPost = (id, response, afterFunc) => {
  const isInsert = Object.values(response)[0];
  if (isInsert) {
    message.success('저장되었습니다.');
    return typeof afterFunc === 'function' ? afterFunc() : null;
  }
  message.error('저장에 실패했습니다.');
  return typeof afterFunc === 'function' ? afterFunc() : null;
};

export const callBackAfterPut = (id, response, afterFunc) => {
  const isUpdate = Object.values(response)[0];
  if (isUpdate) {
    message.success('수정되었습니다.');
    return typeof afterFunc === 'function' ? afterFunc() : null;
  }
  message.error('수정에 실패했습니다.');
  return typeof afterFunc === 'function' ? afterFunc() : null;
};

export const callBackAfterDelete = (id, response, afterFunc) => {
  const isDelete = Object.values(response)[0];
  if (isDelete) {
    message.success('삭제되었습니다.');
    return typeof afterFunc === 'function' ? afterFunc() : null;
  }
  message.error('삭제에 실패했습니다.');
  return typeof afterFunc === 'function' ? afterFunc() : null;
};
