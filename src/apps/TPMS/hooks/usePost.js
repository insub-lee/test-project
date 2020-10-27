import { useRef } from 'react';
import request from 'utils/request';
import parseFiles from '../utils/parseFiles';

const url = '/apigate/v1/portal/post';

export const usePost = ({ brdid }) => {
  const readPost = async selectedRecord => {
    const data = {
      brdid,
      type: 'view',
      postno: selectedRecord?.postno,
    };

    const { response, error } = await request({
      url,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      method: 'GET',
      params: data,
    });

    return { response, error };
  };
  const modifyPost = async (args, selectedRecord) => {
    const formData = new FormData(args);
    const formJson = {};
    let pwd = '';

    formData.forEach((value, key) => {
      if (key === 'pwd') {
        pwd = value;
      } else {
        formJson[key] = value;
      }
    });

    const { title } = formJson;

    const data = {
      brdid,
      pwd,
      title,
      content: { ...formJson },
    };
    data.hpostno = selectedRecord?.hpostno;
    data.postno = parseInt(selectedRecord?.postno || 0, 10);

    const { response, error } = await request({
      url,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      method: 'PUT',
      data,
    });

    return { response, error };
  };

  const RegPost = async args => {
    const formData = new FormData(args);
    const formJson = {};
    let pwd = '';

    formData.forEach((value, key) => {
      if (key === 'pwd') {
        pwd = value;
      } else {
        formJson[key] = value;
      }
    });

    const { title } = formJson;

    const data = {
      brdid,
      pwd,
      title,
      content: { ...formJson },
    };
    if (brdid === 'brd00000000000000007') {
      const { nextContent, files } = parseFiles(formJson);
      data.title = nextContent.title;
      data.content = nextContent;
      data.year = nextContent.year;
      data.files = files;
    }
    const { response, error } = await request({
      url,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      method: 'POST',
      data,
    });

    return { response, error };
  };

  const ReplyPost = async (args, selectedRecord) => {
    const formData = new FormData(args);
    const formJson = {};
    const content = {};
    let files = [];

    formData.forEach((value, key) => {
      if (key.indexOf('_UPLOADED_FILES') > -1) {
        files = value || [];
      } else if (key.indexOf('textarea-') > -1) {
        content.reply = value;
      } else {
        formJson[key] = value;
      }
    });

    const { pwd, title } = formJson;

    const data = {
      brdid,
      pwd,
      title,
      content: { ...content, title },
      files,
    };

    data.hpostno = selectedRecord?.postno;
    data.postgrp = selectedRecord?.postgrp;

    const { response, error } = await request({
      url,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      method: 'POST',
      data,
    });

    return { response, error };
  };

  const deletePost = async (args, selectedRecord) => {
    const formData = new FormData(args);
    const data = { brdid };

    data.postno = selectedRecord?.postno;

    formData.forEach((val, key) => {
      if (key === 'pwd') {
        data.pwd = val;
      }
    });

    const { response, error } = await request({
      url,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      method: 'DELETE',
      data,
    });

    return { response, error };
  };

  return {
    action: {
      RegPost,
      deletePost,
      ReplyPost,
      modifyPost,
      readPost,
    },
  };
};
