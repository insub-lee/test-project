import { useState, useCallback } from 'react';

const useBizBuilderBase = ({ workSeq }) => {
  const [info, setInfo] = useState({});

  return {
    info,
  };
};

export default useBizBuilderBase;
