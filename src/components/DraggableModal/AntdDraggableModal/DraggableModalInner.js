import React, { useEffect, useMemo, useCallback, memo } from 'react';
import PropTypes from 'prop-types';
import browser from 'browser-detect';

import { Modal } from 'antd';
import { ResizeHandle } from './ResizeHandle';
import { useDrag } from './hooks/useDrag';
import { usePrevious } from './hooks/usePrevious';
import { useResize } from './hooks/useResize';

const modalStyle = { margin: 0, paddingBottom: 0, pointerEvents: 'auto', maxHeight: 'calc(100vh - 100px)' };

const DraggableModalInnerNonMemo = ({ id, modalState, dispatch, visible, children, title, initialWidth, initialHeight, ...otherProps }) => {
  // Call on mount and unmount.
  useEffect(() => {
    dispatch({ type: 'mount', id, intialState: { initialWidth, initialHeight } });
    return () => dispatch({ type: 'unmount', id });
  }, [dispatch, id]);

  // Bring this to the front if it's been opened with props.
  const visiblePrevious = usePrevious(visible);
  useEffect(() => {
    if (visible !== visiblePrevious) {
      if (visible) {
        dispatch({ type: 'show', id });
      } else {
        dispatch({ type: 'hide', id });
      }
    }
  }, [visible, visiblePrevious, id, dispatch]);

  const { zIndex, x, y, width, height } = modalState;

  const style = useMemo(() => ({ ...modalStyle, top: y, left: x }), [y, x]);

  const onFocus = useCallback(() => dispatch({ type: 'focus', id }), [id, dispatch]);

  const onDragWithID = useCallback(args => dispatch({ type: 'drag', id, ...args }), [dispatch, id]);

  const onResizeWithID = useCallback(args => dispatch({ type: 'resize', id, ...args }), [dispatch, id]);

  const { onMouseDown, dragging } = useDrag(x, y, onDragWithID, id);
  const { onMouseDown: onResizeMouseDown, dragging: resizing } = useResize(x, y, width, height, onResizeWithID, id);

  const titleElement = useMemo(
    () => (
      // eslint-disable-next-line jsx-a11y/no-static-element-interactions,jsx-a11y/click-events-have-key-events
      <div
        id={`ant-design-draggable-modal-target-${id}`}
        className={`ant-design-draggable-modal-title ${dragging ? 'can-drag' : ''} ${resizing ? 'can-resize' : ''}`}
        onMouseDown={onMouseDown}
        onClick={onFocus}
        style={{ cursor: 'move' }}
      >
        {title}
      </div>
    ),
    [onMouseDown, onFocus, title, id, dragging, resizing],
  );

  return (
    <Modal
      wrapClassName={`ant-design-draggable-modal ant-design-modal-${id}`}
      style={style}
      width={width}
      destroyOnClose
      mask={false}
      maskClosable={false}
      zIndex={zIndex}
      title={titleElement}
      visible={visible}
      footer={[]}
      centered={false}
      {...otherProps}
    >
      {children}
      <ResizeHandle onMouseDown={onResizeMouseDown} />
    </Modal>
  );
};

DraggableModalInnerNonMemo.propTypes = {
  id: PropTypes.string,
  modalState: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number,
    width: PropTypes.number,
    height: PropTypes.number,
    zIndex: PropTypes.number,
    visible: PropTypes.bool,
  }),
  dispatch: PropTypes.func,
  visible: PropTypes.bool,
  children: PropTypes.node,
  title: PropTypes.node,
  initialWidth: PropTypes.number,
  initialHeight: PropTypes.number,
};

DraggableModalInnerNonMemo.defaultProps = {
  modalState: {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    zIndex: 0,
    visible: false,
  },
  dispatch: () => {},
  visible: false,
  children: null,
  title: null,
  initialWidth: 0,
  initialHeight: 0,
};

export const DraggableModalInner = memo(DraggableModalInnerNonMemo);

if (process.env.NODE_ENV !== 'production') {
  DraggableModalInner.displayName = 'DraggableModalInner';
}
