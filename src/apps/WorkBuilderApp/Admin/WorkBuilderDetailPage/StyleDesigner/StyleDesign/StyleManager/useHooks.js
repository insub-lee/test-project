import { useEffect, useRef, useCallback } from 'react';

const createDiv = height => {
  const div = document.createElement('div');
  div.style.top = 0;
  div.style.right = 0;
  div.style.width = '5px';
  div.style.position = 'absolute';
  div.style.cursor = 'col-resize';
  div.style.userSelect = 'none';
  /* table height */
  div.style.height = `${height}px`;
  div.className = 'resizing-column';
  return div;
};
const createWidthDiv = (width, moveWidth) => {
  const div = document.createElement('div');
  div.style.left = `${0 - moveWidth}px`;
  div.style.bottom = 0;
  div.style.height = '5px';
  div.style.position = 'absolute';
  div.style.cursor = 'row-resize';
  div.style.userSelect = 'none';
  /* table height */
  div.style.width = `${width}px`;
  div.className = 'resizing-column-width';
  return div;
};
const useHooks = ({ onChangeWidths, onChangeHeights }) => {
  // For Change Widths
  let pageX;
  let curCol;
  let nxtCol;
  let curColWidth;
  let nxtColWidth;
  // For Change Heights
  let pageY;
  let curColForHeight;
  let curColHeight;
  const TableRef = useRef(null);
  useEffect(() => {
    // Add Controller to Table Head Row
    const tableNode = TableRef.current;
    const mouseMoveEventWithWidth = e => {
      if (curCol) {
        const diffX = e.pageX - pageX;
        const textNode = curCol.childNodes[0];
        const nextTextNode = nxtCol.childNodes[0];
        if (curColWidth + diffX < 100 || (nxtCol && nxtColWidth - diffX < 100)) {
          curCol.style.width = curColWidth + diffX < 100 ? `100px` : `${curColWidth + nxtColWidth - 100}px`;
          if (textNode)
            textNode.innerText =
              curColWidth + diffX < 100
                ? `% ${((100 / tableNode.offsetWidth) * 100).toFixed(2)}`
                : `% ${(((curColWidth + nxtColWidth - 100) / tableNode.offsetWidth) * 100).toFixed(2)}`;
          if (nxtCol) {
            nxtCol.style.width = curColWidth + diffX < 100 ? `${curColWidth + nxtColWidth - 100}px` : `100px`;
            if (nextTextNode)
              nextTextNode.innerText =
                curColWidth + diffX < 100
                  ? `% ${(((curColWidth + nxtColWidth - 100) / tableNode.offsetWidth) * 100).toFixed(2)}`
                  : `% ${((100 / tableNode.offsetWidth) * 100).toFixed(2)}`;
          }
        } else if (nxtCol) {
          nxtCol.style.width = `${nxtColWidth - diffX}px`;
          curCol.style.width = `${curColWidth + diffX}px`;
          if (textNode) textNode.innerText = `% ${((curCol.offsetWidth / tableNode.offsetWidth) * 100).toFixed(2)}`;
          if (nextTextNode) nextTextNode.innerText = `% ${((nxtCol.offsetWidth / tableNode.offsetWidth) * 100).toFixed(2)}`;
        }
      }
    };
    const mouseUpEventWithWidth = e => {
      curCol = undefined;
      nxtCol = undefined;
      pageX = undefined;
      nxtColWidth = undefined;
      curColWidth = undefined;
      const resizingColumns = tableNode.getElementsByClassName('resizing-column-width');
      resizingColumns.forEach(resizingDiv => {
        const nextDiv = resizingDiv;
        nextDiv.style.width = `${tableNode.offsetWidth}px`;
        nextDiv.style.left = `-${nextDiv.parentNode.offsetLeft - 17}px`;
      });
      // Total
      const row = tableNode.getElementsByTagName('tr')[0];
      const cols = row ? Array.from(row.children) : [];
      const widths = cols.map(col => Number(((col.offsetWidth / tableNode.offsetWidth) * 100).toFixed(2)));
      onChangeWidths(widths);
    };
    const mouseMoveEventWithHeight = e => {
      if (curColForHeight) {
        const diffY = e.pageY - pageY;
        curColForHeight.style.height = `${curColHeight + diffY}px`;
      }
    };
    const mouseUpEventWithHeight = e => {
      pageY = undefined;
      curColForHeight = undefined;
      curColHeight = undefined;
      const resizingColumns = tableNode.getElementsByClassName('resizing-column');
      resizingColumns.forEach(resizingDiv => {
        const nextDiv = resizingDiv;
        nextDiv.style.height = `${tableNode.offsetHeight}px`;
      });
      const bodyRows = tableNode.querySelector('tbody').getElementsByTagName('tr');
      const colHeights = Array.from(bodyRows).map((bodyRow, rowIndex) => Array.from(bodyRow ? bodyRow.children : []).map((col, colIndex) => col.offsetHeight));
      onChangeHeights(colHeights);
    };
    const setListeners = div => {
      div.addEventListener('mousedown', e => {
        curCol = e.target.parentElement;
        nxtCol = curCol.nextElementSibling;
        pageX = e.pageX;
        curColWidth = curCol.offsetWidth;
        if (nxtCol) nxtColWidth = nxtCol.offsetWidth;
      });
      document.addEventListener('mousemove', mouseMoveEventWithWidth);
      document.addEventListener('mouseup', mouseUpEventWithWidth);
    };
    const setWidthListeners = div => {
      div.addEventListener('mousedown', e => {
        curColForHeight = e.target.parentElement;
        pageY = e.pageY;
        curColHeight = curColForHeight.offsetHeight;
      });
      document.addEventListener('mousemove', mouseMoveEventWithHeight);
      document.addEventListener('mouseup', mouseUpEventWithHeight);
    };
    const addResizableGrid = () => {
      const row = tableNode.getElementsByTagName('tr')[0];
      const cols = row ? row.children : [];
      cols.forEach((col, index) => {
        if (cols.length > index + 1) {
          const nextCol = col;
          const div = createDiv(tableNode.offsetHeight);
          nextCol.appendChild(div);
          nextCol.style.position = 'relative';
          setListeners(div);
        }
      });
      const bodyRows = tableNode.querySelector('tbody').getElementsByTagName('tr');
      bodyRows.forEach(bodyRow => {
        const tdList = bodyRow.getElementsByTagName('td');
        tdList.forEach(col => {
          const nextCol = col;
          const div = createWidthDiv(tableNode.offsetWidth, col.offsetLeft);
          nextCol.appendChild(div);
          nextCol.style.position = 'relative';
          setWidthListeners(div);
        });
      });
    };
    addResizableGrid();
    return () => {
      document.removeEventListener('mousemove', mouseMoveEventWithWidth);
      document.removeEventListener('mousemove', mouseMoveEventWithHeight);
      document.removeEventListener('mouseup', mouseUpEventWithWidth);
      document.removeEventListener('mouseup', mouseUpEventWithHeight);
    };
  }, []);
  const onChangeCellStyle = useCallback(
    (e, rowIndex, colIndex) => {
      const { name, value } = e.target;
      if (TableRef) {
        const tableNode = TableRef.current;
        const cellNode = tableNode.getElementsByClassName(`cell-${rowIndex}-${colIndex}`)[0];
        if (cellNode) {
          cellNode.style[name] = value;
        }
      }
    },
    [TableRef],
  );
  return { TableRef, onChangeCellStyle };
};
export default useHooks;
