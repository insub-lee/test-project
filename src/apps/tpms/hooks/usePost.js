import {useState, useRef } from 'react';
import service from '../utils/service';

export const usePost = ({ brdid }) => {
  const formRef = useRef();
  const url = '/apigate/v1/portal/post';

  const formData = new FormData(formRef.current);
  const formJson = {};
  const content = {};
  let files = [];
  let result = false;

  formData.forEach((value, key) => {
    if (key.indexOf('_UPLOADED_FILES') > -1) {
      files = value || [];
    } else if (key.indexOf('textarea-') > -1) {
      content[key] = value;
    } else {
      formJson[key] = value;
    }
  });

  const sendPost = async selectedRecord => {
    const { pwd, title } = formJson;

    const data = {
      brdid,
      pwd,
      title,
      content: { ...content, title },
      files,
    };

    const { response, error } = await service.board.post(url, data);
    if (response && !error) {
      const { insertyn } = response;
      result = insertyn;
    }
    return { result, error };
  };

  const deletePost = async selectedRecord => {
    const { pwd } = formJson;

    const data = {
      pwd,
      brdid,
      postno: selectedRecord?.postno,
    };

    const { response, error } = await service.board.delete(url, data);
    if (response && !error) {
      const { deleteyn } = response;
      result = deleteyn;
    }
    return { result, error };
  };

  return {
    formRef,
    action: {
      sendPost,
      deletePost,
    },
  };
};
