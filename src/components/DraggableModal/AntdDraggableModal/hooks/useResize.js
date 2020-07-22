import { useState, useEffect, useCallback } from 'react';

export const useResize = (x, y, width, height, onResize, id) => {
  const [dragging, setDragging] = useState(false);
  const [initialDragState, setInitialDragState] = useState({
    initX: 0,
    initY: 0,
    initWidth: 0,
    initHeight: 0,
    mouseDownX: 0,
    mouseDownY: 0,
  });

  const onMouseDown = useCallback(
    e => {
      e.preventDefault();
      setInitialDragState({
        initX: x,
        initY: y,
        initWidth: width,
        initHeight: height,
        mouseDownX: e.clientX,
        mouseDownY: e.clientY,
      });
      setDragging(true);
    },
    [width, height, setDragging, setInitialDragState, x, y],
  );

  const onMouseMove = useCallback(
    e => {
      const node = document.getElementById(`ant-design-draggable-modal-target-${id}`);
      if (node && node.className.includes('can-resize')) {
        const { initX, initY, initWidth, mouseDownX, initHeight, mouseDownY } = initialDragState;
        const dx = e.clientX - mouseDownX;
        const dy = e.clientY - mouseDownY;
        return onResize({ x: initX, y: initY, width: initWidth + dx, height: initHeight + dy });
      }
    },
    [onResize, initialDragState, id],
  );

  useEffect(() => {
    window.addEventListener('mousemove', onMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, [onMouseMove]);

  useEffect(() => {
    const onMouseUp = () => {
      setDragging(false);
    };
    window.addEventListener('mouseup', onMouseUp);
    return () => window.removeEventListener('mouseup', onMouseUp);
  }, []);

  return { onMouseDown, dragging };
};
