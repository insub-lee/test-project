/* eslint-disable camelcase */
import { useState, useCallback, useEffect } from 'react';
import request from '../../../utils/request';

const url = `/apigate/v2/portal/board`;
const workSeq = '15961';
export const useBoard = ({ boardCode }) => {
  const [isError, setIsError] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [list, setList] = useState([]);
  const [currentTotal, setCurrentTotal] = useState(0);
  const [currentYear, setCurrentYear] = useState(undefined);
  const [search, setSearch] = useState({
    category: 'all',
    text: undefined,
  });
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });

  useEffect(() => {
    getBoardList().then(e => {
      if (e === true) {
        setIsError(false);
        setIsLoading(false);
      }
    });
    // dataFetcher();
  }, [pagination, search, currentYear]);

  const getBoardList = async () => {
    setIsLoading(true);
    const { current, pageSize } = pagination;

    const { category, text } = search;

    const result = await request({
      url: `${url}/list`,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      params: {
        boardCode,
        current: current - 1,
        pageSize,
        year: currentYear,
        title: ['all', 'title'].includes(category) ? text : undefined,
        content: ['all', 'content'].includes(category) ? text : undefined,
        regnm: ['all', 'regname'].includes(category) ? text : undefined,
        category,
      },
      method: 'GET',
    });

    const { response, error } = result;
    if (response && !error) {
      const { data } = response;
      setList(data?.list);
      setCurrentTotal(data?.totalCount);
      return true;
    }
    return false;
  };

  const updateViewCount = async seq => {
    console.log(seq);
    const result = await request({
      url: `${url}/viewCount`,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      params: { task_seq: seq },
      method: 'GET',
    });
    return result;
  };

  const pageHandler = useCallback(page => {
    setPagination(prevState => ({ ...prevState, current: page }));
  }, []);

  const pageSizeHandler = useCallback(e => {
    const { value = 10 } = e.target;
    const pageSize = parseInt(value, 10);
    setPagination(prevState => ({ ...prevState, pageSize, current: 1 }));
  }, []);

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
      pwd,
      title,
      content: { ...formJson },
    };
    data.parentno = selectedRecord?.parentno;
    data.task_seq = parseInt(selectedRecord?.task_seq || 0, 10);

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

  const deletePost = async (args, selectedRecord) => {
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

    const { response, error } = await request({
      url,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      method: 'DELETE',
      data: {
        pwd,
        task_seq: selectedRecord?.task_seq,
        parentno: selectedRecord?.parentno,
      },
    });
    return { response, error };
  };

  const fileProcess = async tempFile => {
    let taskSeq = '0';
    let realFile = '';
    const temp = await request({
      url: `/api/builder/v1/work/taskCreate/${workSeq}`,
      data: {},
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      method: 'POST',
    });
    const { response: response1, error: error1 } = temp;
    if (response1 && !error1) {
      taskSeq = response1?.PARAM?.TASK_SEQ;
    }

    const moveFileToReal = await request({
      url: `/upload/moveFileToReal`,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      method: 'POST',
      data: { PARAM: { DETAIL: JSON.parse(tempFile) } },
    });
    const { response: fileResponse, error: fileError } = moveFileToReal;
    if (!fileError) {
      const { DETAIL } = fileResponse;
      realFile = DETAIL;
    }
    console.debug('###  taskSeq, realFile : ', taskSeq, realFile);
    return { taskSeq, realFile };
  };
  const regPost = async args => {
    const formData = new FormData(args);
    const formJson = {};
    let tempFile = '';
    let taskSeq = '0';
    let pwd = '';
    let realFile = '';

    formData.forEach((value, key) => {
      if (key === 'pwd') {
        pwd = value;
      } else if (key === 'uploader-attach_FILE_DETAIL') {
        tempFile = value;
      } else {
        formJson[key] = value;
      }
    });

    // uploader-attach_DCONO: "4403:::4404"
    // uploader-attach_FILE: "jesus.PNG:::capture4.png"
    // uploader-attach_FILE_PATH: "/down/file/4403:::/down/file/4404"
    // uploader-attach_UPLOADED_FILES: "[{"docNo":"4403","seq":"4403"},{"docNo":"4404","seq":"4404"}]"
    console.debug('### doubleData :', formJson);

    fileProcess(tempFile).then(({ taskSeq: seq, realFile: real }) => {
      console.debug('real: ', real);
      taskSeq = seq;
      let DCONO = formJson['uploader-attach_DCONO'].split(':::');
      let attach_file = formJson['uploader-attach_FILE'].split(':::');
      let attach_file_path = formJson['uploader-attach_FILE_PATH'].split(':::');
      let attach_uploaded_files = formJson['uploader-attach_UPLOADED_FILES'].split(':::');
      console.debug('#### data : ', DCONO, attach_file, attach_file_path, attach_uploaded_files);

      real.forEach(({ docNo, docNm, extension, down, link, seq, uid, id, name, code, fileType, size, fileSize, position }, idx) => {
        DCONO[idx] = DCONO[idx].replaceAll(docNo, seq);
        attach_file_path[idx] = attach_file_path[idx].replaceAll(docNo, seq);
        attach_uploaded_files[idx] = attach_uploaded_files[idx].replaceAll(docNo, seq);
      });
      console.debug('#### data : ', DCONO, attach_file, attach_file_path, attach_uploaded_files);
    });

    const { title } = formJson;
    const data = {
      pwd,
      title,
      content: { ...formJson },
      boardCode,
      task_seq: taskSeq,
    };

    const regResponse = await request({
      url: `${url}/register`,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      method: 'POST',
      data,
    });

    return regResponse;
  };

  const submitSearchQuery = useCallback(e => {
    e.stopPropagation();
    e.preventDefault();
    const category = document.querySelector('.tpms-view select[name=category]')?.value || undefined;
    const yearCategory = document.querySelector('.tpms-view select[name=yearCategory]')?.value || undefined;
    const text = document.querySelector('.tpms-view input[name=text]')?.value || undefined;

    setSearch({
      category,
      text,
    });
    setCurrentYear(yearCategory);
  }, []);

  const replyPost = async (args, selectedRecord) => {
    const formData = new FormData(args);
    const formJson = {};
    const content = {};
    let files = [];

    formData.forEach((value, key) => {
      if (key.indexOf('_UPLOADED_FILES') > -1) {
        files = value || [];
      } else if (key.indexOf('textarea') > -1) {
        content.reply = value;
      } else {
        formJson[key] = value;
      }
    });

    const { title, pwd } = formJson;

    const data = {
      pwd,
      title,
      files,
      content: { ...content, title },
      parentno: selectedRecord?.task_seq,
      boardCode,
    };

    const { response, error } = await request({
      url: `${url}/reply`,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      method: 'POST',
      data,
    });

    return { response, error };
  };

  return {
    isError,
    isLoading,
    data: list,
    pagination: {
      ...pagination,
      total: currentTotal,
    },
    action: { replyPost, pageHandler, pageSizeHandler, updateViewCount, modifyPost, deletePost, regPost, submitSearchQuery },
  };
};
