import React, { memo, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { AutoSizer } from 'react-virtualized';
const StyledDiv = styled.div`
  * {
    box-sizing: border-box;
  }
  table {
    width: 100%;
    border-collapse: collapse;
  }
  td,
  th {
    padding: 5px 15px;
    text-align: left;
  }
  table,
  th,
  td {
    border: 1px solid #e3e3e3;
  }

  th {
    background-color: #fafafa;
  }

  .resizing-column:hover {
    border-right: 2px solid #a3a3a3;
  }
`;
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
const setListeners = (div, options) => {
  let pageX;
  let curCol;
  let nxtCol;
  let curColWidth;
  let nxtColWidth;
  div.addEventListener('mousedown', e => {
    curCol = e.target.parentElement;
    nxtCol = curCol.nextElementSibling;
    pageX = e.pageX;
    curColWidth = curCol.offsetWidth;
    if (nxtCol) nxtColWidth = nxtCol.offsetWidth;
  });
  document.addEventListener('mousemove', function(e) {
    if (curCol) {
      const diffX = e.pageX - pageX;
      if (curColWidth + diffX < 100 || (nxtCol && nxtColWidth - diffX < 100)) {
        return;
      }
      if (nxtCol) {
        nxtCol.style.width = `${nxtColWidth - diffX}px`;
        curCol.style.width = `${curColWidth + diffX}px`;
        const textNode = curCol.childNodes[0];
        const nextTextNode = nxtCol.childNodes[0];
        if (textNode) textNode.innerText = curCol.style.width;
        if (nextTextNode) nextTextNode.innerText = nxtCol.style.width;
        const row = Array.from(curCol.parentNode.children);
        const widths = row.map(col => col.style.width);
        options.onChangeWidths(widths);
      }
    }
  });
  document.addEventListener('mouseup', e => {
    curCol = undefined;
    nxtCol = undefined;
    pageX = undefined;
    nxtColWidth = undefined;
    curColWidth = undefined;
  });
};
const addResizableGrid = (tableNode, options) => {
  const row = tableNode.getElementsByTagName('tr')[0];
  const cols = row ? row.children : [];
  cols.forEach((col, index) => {
    if (index < cols.length - 1) {
      const nextCol = col;
      const div = createDiv(tableNode.offsetHeight);
      nextCol.appendChild(div);
      nextCol.style.position = 'relative';
      setListeners(div, options);
    }
  });
};
const StyleManager = memo(
  ({ onChangeWidths, headers, rows, baseComponent: Component }) => {
    const TableRef = useRef(null);
    useEffect(() => {
      // Add Controller to Table Head Row
      const tableNode = TableRef.current;
      addResizableGrid(tableNode, { onChangeWidths });
    }, []);
    return (
      <StyledDiv style={{ minWidth: 1200 }}>
        <AutoSizer disableHeight style={{ width: '100%' }}>
          {({ width }) => (
            <table ref={TableRef}>
              <thead>
                <tr>
                  {headers.map((percent, index) => (
                    <th key={index} style={{ width: width * (percent / 100) > 100 ? width * (percent / 100) : 100 }}>
                      <span>{`${width * (percent / 100) > 100 ? width * (percent / 100) : 100}px`}</span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map(({ key, cols }) => (
                  <tr key={key}>
                    {cols &&
                      cols.map((col, colIndex) =>
                        col ? (
                          <td key={col.key} rowSpan={col.rowSpan} colSpan={col.span}>
                            <Component {...col.comp} toto={colIndex} />
                          </td>
                        ) : null,
                      )}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </AutoSizer>
      </StyledDiv>
    );
  },
  () => false,
);
StyleManager.propTypes = {
  onChangeWidths: PropTypes.func,
  headers: PropTypes.arrayOf(PropTypes.object),
  rows: PropTypes.arrayOf(PropTypes.object),
  baseComponent: PropTypes.object,
};
StyleManager.propTypes = {
  onChangeWidths: () => {},
  headers: [],
  rows: [],
  baseComponent: null,
};
export default StyleManager;
