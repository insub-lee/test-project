import { useState, useEffect, useCallback } from 'react';
import request from 'utils/request';

export default ({ sysid, mnuid }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [isError, setIsError] = useState(false);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });
  const [currentTotal, setCurrentTotal] = useState(0);

  useEffect(() => {
    // const originalFetchList = async params => {
    //   const url = '/apigate/v1/portal/sign/task';
    //   const { response, error } = await request({
    //     url,
    //     params,
    //   });

    //   return { response, error };
    // };
    const fetchList = async params => {
      const url = `/api/tpms/v1/common/approval`;
      const { response, error } = await request({
        url,
        params,
      });

      return { response, error };
    };

    // originalFetchList({
    //   sysid,
    //   mnuid,
    //   type: 'list',
    //   currentPage: pagination.current || 1,
    //   pageSize: pagination.pageSize || 10,
    // });
    setIsLoading(true);

    const requestQuery = { is_temp: 1, currentPage: pagination.current - 1 || 0, pageSize: pagination.pageSize || 10 };

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
  }, [sysid, mnuid, pagination]);

  const pageHandler = useCallback(page => {
    setPagination(prevState => ({ ...prevState, current: page }));
  }, []);

  const pageSizeHandler = useCallback(e => {
    const { value = 10 } = e.target;
    const pageSize = parseInt(value, 10);
    setPagination(prevState => ({ ...prevState, pageSize, current: 1 }));
  }, []);

  return {
    data,
    isLoading,
    isError,
    pagination: {
      ...pagination,
      total: currentTotal,
    },
    currentTotal,
    action: {
      pageHandler,
      pageSizeHandler,
    },
  };
};
