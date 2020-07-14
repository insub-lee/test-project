import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useUID } from 'react-uid';
import { ModalProps } from 'antd/lib/modal';
import { DraggableModalContext } from './DraggableModalContext';
import { DraggableModalInner } from './DraggableModalInner';
import { getModalState } from './draggableModalReducer';

const DraggableModal = props => {
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
    initialHeight: props.initialHeight,
    initialWidth: props.initialWidth,
  });

  // We do this so that we don't re-render all modals for every state change.
  // DraggableModalInner uses React.memo, so it only re-renders if
  // if props change (e.g. modalState).
  return <DraggableModalInner id={id} dispatch={dispatch} modalState={modalState} {...props} />;
};

DraggableModal.propTypes = {
  // ...ModalProps,
  initialHeight: PropTypes.number,
  initialWidth: PropTypes.number,
};

DraggableModal.defaultProps = {
  initialHeight: 0,
  initialWidth: 0,
};

export default DraggableModal;
