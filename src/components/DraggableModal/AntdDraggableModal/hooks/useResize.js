import { useState, useEffect, useCallback } from 'react';

export const useResize = (x, y, width, height, onResize) => {
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
      if (dragging) {
        const { initX, initY, initWidth, mouseDownX, initHeight, mouseDownY } = initialDragState;
        const dx = e.clientX - mouseDownX;
        const dy = e.clientY - mouseDownY;
        const width = initWidth + dx;
        const height = initHeight + dy;
        return onResize({ x: initX, y: initY, width, height });
      }
    },
    [onResize, initialDragState, dragging],
  );

  useEffect(() => {
    const onMouseUp = () => {
      setDragging(false);
    };
    window.addEventListener('mouseup', onMouseUp);
    return () => window.removeEventListener('mouseup', onMouseUp);
  }, []);

  return { onMouseDown, onMouseMove };
};
