import { useState } from 'react';
import getJsonObject from '../utils/getJsonObject';
// import getArrayObject from '../utils/getArrayObject';

export const useModalController = (keys = []) => {
  const [modalStatus, setModalStatus] = useState(() => keys.reduce((acc, cur) => ({ ...acc, [cur]: false }), {}));
  const [processedContent, setContentAndFormJson] = useState({});
  const [selectedRecord, setSelectedRecord] = useState([]);

  const openModal = key => setModalStatus(prevState => ({ ...prevState, [key]: true }));

  const closeModal = key => setModalStatus(prevState => ({ ...prevState, [key]: false }));

  const closeAll = () => setModalStatus(prevState => Object.keys(prevState).reduce((acc, cur) => ({ ...acc, [cur]: false }), {}));

  const processRecord = record => {
    setSelectedRecord(record);
    setContentAndFormJson(getJsonObject(record?.content));
  };

  return {
    modalStatus,
    processedContent,
    selectedRecord,
    actions: {
      openModal,
      closeAll,
      closeModal,
      processRecord,
      setSelectedRecord,
    },
  };
};
