import React from 'react';

export const DraggableModalContext = React.createContext(null);

if (process.env.NODE_ENV !== 'production') {
  DraggableModalContext.displayName = 'DraggableModalContext';
}
