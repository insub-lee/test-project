import { useState, useEffect, useCallback } from 'react';

export const useDrag = (x, y, onDrag) => {
  const [dragging, setDragging] = useState(false);
  const [initialDragState, setInitialDragState] = useState({
    initX: 0,
    initY: 0,
    mouseDownX: 0,
    mouseDownY: 0,
  });

  const onMouseDown = useCallback(
    e => {
      e.preventDefault();
      setInitialDragState({
        initX: x,
        initY: y,
        mouseDownX: e.clientX,
        mouseDownY: e.clientY,
      });
      setDragging(true);
    },
    [x, y, setDragging, setInitialDragState],
  );

  const onMouseMove = useCallback(
    e => {
      if (dragging) {
        const { initX, mouseDownX, initY, mouseDownY } = initialDragState;
        const dx = e.clientX - mouseDownX;
        const dy = e.clientY - mouseDownY;
        const x = initX + dx;
        const y = initY + dy;
        onDrag({ x, y });
      }
    },
    [onDrag, initialDragState, dragging],
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
