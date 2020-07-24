import * as React from 'react';
import { useContext } from 'react';
import { useUID } from 'react-uid';
import { DraggableModalContext } from './DraggableModalContext';
import { DraggableModalInner } from './DraggableModalInner';
import { getModalState } from './draggableModalReducer';

// export interface DraggableModalProps extends ModalProps {
//   initialWidth?: number;
//   initialHeight?: number;
// }

export const DragModal = props => {
  // Get the unique ID of this modal.
  const id = useUID();

  // Get modal provider.
  const modalProvider = useContext(DraggableModalContext);
  if (!modalProvider) {
    throw new Error('No Provider');
  }

  const { dispatch, state } = modalProvider;
  const modalState = getModalState({
    state,
    id,
    initialHeight: props.initialHeight || 800,
    initialWidth: props.initialWidth || 1000,
  });

  // We do this so that we don't re-render all modals for every state change.
  // DraggableModalInner uses React.memo, so it only re-renders if
  // if props change (e.g. modalState).
  return <DraggableModalInner id={id} dispatch={dispatch} modalState={modalState} {...props} />;
};

export default DragModal;
