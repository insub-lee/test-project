import { useState, useEffect, useCallback } from 'react';
import request from 'utils/request';

export default ({ brdid }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });
  const [currentTotal, setCurrentTotal] = useState(0);
  const [search, setSearch] = useState({
    category: 'all',
    text: undefined,
  });
  const [currentYear, setCurrentYear] = useState(undefined);

  useEffect(() => {
    const fetchList = async params => {
      const url = '/apigate/v1/portal/post';
      const { response, error } = await request({
        url,
        params,
      });

      return { response, error };
    };

    const { category, text } = search;

    const requestQuery = {
      brdid,
      type: 'list',
      currentPage: pagination.current || 1,
      pageSize: pagination.pageSize || 10,
      year: currentYear,
      title: ['all', 'title'].includes(category) ? text : undefined,
      content: ['all', 'content'].includes(category) ? text : undefined,
      regnm: ['all', 'regnm'].includes(category) ? text : undefined,
    };

    setIsLoading(true);

    fetchList(requestQuery)
      .then(({ response, error }) => {
        if (response && !error) {
          const {
            list,
            pagination: { total = 0 },
          } = response;
          setData(list);
          setCurrentTotal(total);
        } else {
          setData([]);
          setCurrentTotal(0);
          setIsError(true);
        }
        setIsLoading(false);
      })
      .catch(error => {
        console.debug('@ Load Fail : ', error);
        setIsError(true);
        setIsLoading(false);
      });
  }, [brdid, pagination, currentYear, search]);

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

  const pageHandler = useCallback(page => setPagination(prevState => ({ ...prevState, current: page })), []);

  const pageSizeHandler = useCallback(e => {
    const { value = 10 } = e.target;
    const pageSize = parseInt(value, 10);
    setPagination(prevState => ({ ...prevState, pageSize, current: 1 }));
  }, []);

  return {
    isLoading,
    isError,
    data,
    pagination: {
      ...pagination,
      total: currentTotal,
    },
    currentTotal,
    action: {
      submitSearchQuery,
      pageHandler,
      pageSizeHandler,
    },
  };
};
