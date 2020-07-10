import * as React from 'react';
import { Action, ModalsState } from './draggableModalReducer';

const DraggableModalContextValue = {
  dispatch: Action => {},
  state: ModalsState,
};

export const DraggableModalContext = React.createContext(DraggableModalContextValue);

if (process.env.NODE_ENV !== 'production') {
  DraggableModalContext.displayName = 'DraggableModalContext';
}
