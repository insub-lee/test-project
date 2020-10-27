import { useState, useCallback, useEffect } from 'react';
import request from 'utils/request';

// Custom View용
const useBuilderData = ({ type, workSeq }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [info, setInfo] = useState({});
  const [list, setList] = useState([]);
  const [pageInfo, setPageInfo] = useState({});

  // Get Info
  const getInfo = useCallback(async () => {
    const options = {
      url: '',
      method: '',
      baseUrl: '',
      params: {},
      data: {},
    };
    const { response, error } = await request(options);
    return { response, error };
  }, [workSeq]);

  // Get List
  const getList = useCallback(async () => {
    const options = {
      url: '',
      method: '',
      baseUrl: '',
      params: {},
      data: {},
    };
    const { response, error } = await request(options);
    return { response, error };
  }, [workSeq]);

  // POST DATA
  const postData = useCallback(async () => {
    const options = {
      url: '',
      method: '',
      baseUrl: '',
      params: {},
      data: {},
    };
    const { response, error } = await request(options);
    return { response, error };
  }, [workSeq]);

  // UPDATE DATA
  const updateData = useCallback(async () => {
    const options = {
      url: '',
      method: '',
      baseUrl: '',
      params: {},
      data: {},
    };
    const { response, error } = await request(options);
    return { response, error };
  }, [workSeq]);

  // DELETE DATA
  const deleteData = useCallback(async () => {
    const options = {
      url: '',
      method: '',
      baseUrl: '',
      params: {},
      data: {},
    };
    const { response, error } = await request(options);
    return { response, error };
  }, [workSeq]);

  // Get List Or Get Info
  useEffect(() => {
    console.debug('@ load data');
  }, []);

  return {
    info,
    list,
    pageInfo,
  };
};

export default useBuilderData;
