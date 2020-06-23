import React, { useCallback } from 'react';

import Sheet from './Sheet';
const App = () => {
  const updateData = useCallback(grid => {
    console.debug('@ callback', grid);
  }, []);
  return <Sheet updateData={updateData} />;
};

export default App;
