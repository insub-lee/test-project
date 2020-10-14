import { useState, useEffect, useCallback } from 'react';
import request from 'utils/request';

export default ({ sysid, mnuid }) => {
  const [data, setData] = useState([]);
  const [isError, setIsError] = useState(false);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });

  useEffect(() => {
    const fetchList = async query => {
      const url = '';
      const { response, error } = await request({
        url,
      });

      return { response, error };
    };

    const requestQuery = {
      sysid,
      mnuid,
      type: 'list',
      currentPage: pagination.current || 1,
      pageSize: pagination.pageSize || 10,
    };

    fetchList(requestQuery)
      .then((response, error) => {
        if (response && !error) {
          const {
            list,
            pagination: { total = 0 },
          } = response;
          setData(list);
          setPagination(prevState => ({ ...prevState, total }));
        } else {
          setData([]);
          setIsError(true);
        }
      })
      .catch(error => {
        console.debug('@ Fail', error);
        setIsError(true);
      });
  }, [sysid, mnuid, pagination]);

  const pageHandler = useCallback(page => setPagination(prevState => ({ ...prevState, current: page })), []);

  const pageSizeHandler = useCallback(e => {
    const { value = 10 } = e.target;
    const pageSize = parseInt(value, 10);
    setPagination(prevState => ({ ...prevState, pageSize, current: 1 }));
  }, []);

  return {
    data,
    isError,
    pagination,
    action: {
      pageHandler,
      pageSizeHandler,
    },
  };
};
