import { useState } from 'react';

export const useModalController = (keys = []) => {
  const [modalStatus, setModalStatus] = useState(() => keys.reduce((acc, cur) => ({ ...acc, [cur]: false }), {}));

  const openModal = key => setModalStatus(prevState => ({ ...prevState, [key]: true }));

  const closeModal = key => setModalStatus(prevState => ({ ...prevState, [key]: false }));

  return {
    modalStatus,
    actions: {
      openModal,
      closeModal,
    },
  };
};
