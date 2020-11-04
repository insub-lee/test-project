import { useState, useCallback, useEffect } from 'react';
import request from '../../../utils/request';

const url = `/apigate/v2/portal/board`;

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
      },
    });
    return { response, error };
  };

  const regPost = async args => {
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
      boardCode,

      //   reg_user_name:NAME_KOR,
      //     reg_dept_id,
      //     reg_dept_name,
    };
    // if (brdid === 'brd00000000000000007') {
    //   const { nextContent, files } = parseFiles(formJson);
    //   data.title = nextContent.title;
    //   data.content = nextContent;
    //   data.year = nextContent.year;
    //   data.files = files;
    // }
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

  return {
    isError,
    isLoading,
    data: list,
    pagination: {
      ...pagination,
      total: currentTotal,
    },
    currentTotal,
    action: { pageHandler, pageSizeHandler, updateViewCount, modifyPost, deletePost, regPost, submitSearchQuery },
  };
};
