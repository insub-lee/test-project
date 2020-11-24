/* eslint-disable camelcase */
import { useState, useCallback, useEffect } from 'react';
import request from '../../../utils/request';

const url = `/api/tpms/v1/common/board`;
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
      url,
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
      url: `${url}/detail`,
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
    let tempFile = [];
    let taskSeq = 0;
    let pwd = '';

    formData.forEach((value, key) => {
      if (key === 'pwd') {
        pwd = value;
      } else if (key === 'uploader-attach_FILE_DETAIL') {
        tempFile = value;
      } else {
        formJson[key] = value;
      }
    });

    return fileProcess(tempFile)
      .then(({ taskSeq: seq, realFile: real }) => {
        taskSeq = seq;

        real.forEach(({ docNo, docNm, extension, down, link, seq, uid, id, name, code, fileType, size, fileSize, position }, idx) => {
          formJson['uploader-attach_DCONO'] = formJson['uploader-attach_DCONO'].replaceAll(docNo, seq);
          formJson['uploader-attach_FILE_PATH'] = formJson['uploader-attach_FILE_PATH'].replaceAll(docNo, seq);
          formJson['uploader-attach_UPLOADED_FILES'] = formJson['uploader-attach_UPLOADED_FILES'].replaceAll(docNo, seq);
        });
        console.debug('### after fileProcess :', formJson);
      })
      .then(async () => {
        if (taskSeq > 0) {
          const { title } = formJson;

          const data = {
            pwd,
            title,
            content: { ...formJson },
          };
          data.parentno = selectedRecord?.parentno;
          data.task_seq = parseInt(selectedRecord?.task_seq || 0, 10);
          const regResponse = await request({
            url: `${url}/detail`,
            headers: {
              'Access-Control-Allow-Origin': '*',
            },
            method: 'PUT',
            data,
          });

          return regResponse;
        }
        return false;
      });
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
      url: `${url}/detail`,
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
    console.debug('tempFile:', tempFile);
    let taskSeq = 0;
    let realFile = [];
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

    // file 업로드가 없는 경우
    if (tempFile.length > 0) {
      const moveFileToReal = await request({
        url: `/upload/moveFileToReal`,
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
        method: 'POST',
        data: { PARAM: { DETAIL: JSON.parse(tempFile) } },
      });
      const { response: response2, error: error2 } = moveFileToReal;
      if (!error2) {
        const { DETAIL } = response2;
        if (DETAIL instanceof Array) {
          realFile = DETAIL;
        }
      }
      return { taskSeq, realFile };
    }
    return { taskSeq, realFile };
  };
  const regPost = async args => {
    const formData = new FormData(args);
    const formJson = {};
    let tempFile = [];
    let pwd = '';

    formData.forEach((value, key) => {
      if (key === 'pwd') {
        pwd = value;
      } else if (key === 'uploader-attach_FILE_DETAIL') {
        tempFile = value;
      } else {
        formJson[key] = value;
      }
    });

    let taskSeq = 0;
    return fileProcess(tempFile)
      .then(({ taskSeq: seq, realFile: real }) => {
        taskSeq = seq;

        real.forEach(({ docNo, seq: fileSeq }) => {
          formJson['uploader-attach_DCONO'] = formJson['uploader-attach_DCONO'].replaceAll(docNo, fileSeq);
          formJson['uploader-attach_FILE_PATH'] = formJson['uploader-attach_FILE_PATH'].replaceAll(docNo, fileSeq);
          formJson['uploader-attach_UPLOADED_FILES'] = formJson['uploader-attach_UPLOADED_FILES'].replaceAll(docNo, fileSeq);
        });
        console.debug('### after fileProcess :', formJson);
      })
      .then(async () => {
        const { title } = formJson;
        const data = {
          pwd,
          title,
          content: { ...formJson },
          boardCode,
          task_seq: taskSeq,
          isReply: false,
        };
        const regResponse = await request({
          url,
          headers: {
            'Access-Control-Allow-Origin': '*',
          },
          method: 'POST',
          data,
        });

        return regResponse;
      });
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
    // const content = {};
    let tempFile = [];

    // formData.forEach((value, key) => {
    //   if (key.indexOf('_UPLOADED_FILES') > -1) {
    //     files = value || [];
    //   } else if (key.indexOf('textarea') > -1) {
    //     content.reply = value;
    //   } else {
    //     formJson[key] = value;
    //   }
    // });

    formData.forEach((value, key) => {
      if (key === 'uploader-attach_FILE_DETAIL') {
        tempFile = value;
      } else {
        formJson[key] = value;
      }
    });

    let taskSeq = 0;
    return fileProcess(tempFile)
      .then(({ taskSeq: seq, realFile: real }) => {
        taskSeq = seq;

        real.forEach(({ docNo, seq: fileSeq }) => {
          formJson['uploader-attach_DCONO'] = formJson['uploader-attach_DCONO'].replaceAll(docNo, fileSeq);
          formJson['uploader-attach_FILE_PATH'] = formJson['uploader-attach_FILE_PATH'].replaceAll(docNo, fileSeq);
          formJson['uploader-attach_UPLOADED_FILES'] = formJson['uploader-attach_UPLOADED_FILES'].replaceAll(docNo, fileSeq);
        });
        console.debug('### after fileProcess :', formJson);
      })
      .then(async () => {
        const { title, pwd } = formJson;
        const data = {
          pwd,
          title,
          content: { ...formJson },
          parentno: selectedRecord?.task_seq,
          task_seq: taskSeq,
          boardCode,
          isReply: true,
        };
        const regResponse = await request({
          url,
          headers: {
            'Access-Control-Allow-Origin': '*',
          },
          method: 'POST',
          data,
        });

        return regResponse;
      });
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
