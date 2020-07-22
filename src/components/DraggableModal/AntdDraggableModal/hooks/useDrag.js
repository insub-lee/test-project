import { useState, useEffect, useCallback } from 'react';

export const useDrag = (x, y, onDrag, id) => {
  const [dragging, setDragging] = useState(false);
  const [initialDragState, setInitialDragState] = useState({
    initX: 0,
    initY: 0,
    mouseDownX: 0,
    mouseDownY: 0,
  });

  const onMouseDown = useCallback(
    e => {
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
      const node = document.getElementById(`ant-design-draggable-modal-target-${id}`);
      if (node && node.className.includes('can-drag')) {
        const { initX, mouseDownX, initY, mouseDownY } = initialDragState;
        const dx = e.clientX - mouseDownX;
        const dy = e.clientY - mouseDownY;
        onDrag({ x: initX + dx, y: initY + dy });
      }
    },
    [onDrag, initialDragState, id],
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

  return { onMouseDown, onMouseMove, dragging };
};
