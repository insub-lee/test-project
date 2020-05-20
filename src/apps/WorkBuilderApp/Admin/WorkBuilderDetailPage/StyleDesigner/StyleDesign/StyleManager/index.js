import React from 'react';
import PropTypes from 'prop-types';
import { AutoSizer } from 'react-virtualized';
import { Modal } from 'antd';
import styled from 'styled-components';
import useHooks from './useHooks';
import StyledDiv from './Styled';
import ColorPickerWithState from './ColorPickerWithState';

const StyledBodyOption = styled.div`
  padding: 0 1rem;
  .label {
    width: 100px;
    margin-right: 10px;
    &:after {
      content: ':';
      margin-right: 5px;
    }
  }
  .selector {
    width: 100px;
    border: 1px solid #e3e3e3;
    color: #000000;
    margin: 0 5px;
  }
  .option {
    margin: 10px 0;
  }
`;
const StyleInputNumber = styled.input`
  border: 1px solid #e3e3e3;
  color: #000000;
  margin: 0 5px;
`;

const StyleOption = styled.div`
  &.style-options {
    pointer-events: auto !important;
    &:hover {
      visibility: visible !important;
      opacity: 1 !important;
    }
    ul {
      margin: 0;
      padding: 0;
      list-style: none;
      > li {
        padding: 5px 0;
        label {
          display: inline-block;
          width: 150px;
          vertical-align: top;
        }
        input,
        select {
          width: 100px;
          color: black;
        }
      }
    }
  }
`;

const StyleManager = ({
  groupKey,
  id,
  defaultWidthType,
  defaultWidth,
  updateBodyWidthType,
  updateBodyWidth,
  onChangeWidths,
  onChangeHeights,
  headers,
  rows,
  updateCellStyle,
  baseComponent: Component,
}) => {
  const {
    TableRef,
    showModal,
    bodyWidthType,
    bodyWidth,
    maxBodyWidth,
    minBodyWidth,
    dataTip,
    action: { openModal, closeModal, onChangeBodyWidthType, onChangeBodyWidth, onBlurBodyWidth, onChangeCellStyle },
  } = useHooks({ defaultWidthType, defaultWidth, updateBodyWidthType, updateBodyWidth, onChangeWidths, onChangeHeights });

  const [rowIndex, colIndex] = dataTip ? dataTip.split('-') : [-1, -1];
  const { style = {} } = dataTip ? rows[rowIndex].cols[colIndex] : { style: {} };
  return (
    <div>
      <StyledBodyOption>
        <div className="option">
          <strong className="label">Width 타입</strong>
          <select name="type" id="width-type" className="selector" onChange={onChangeBodyWidthType} value={bodyWidthType}>
            <option value="%">%</option>
            <option value="px">px</option>
          </select>
        </div>
        <div className="option">
          <strong className="label">전체 Width</strong>
          <StyleInputNumber
            type="number"
            id="style-body-width-input"
            defaultValue={bodyWidth}
            // placeholder={getBodyWidthPlaceholder(bodyWidthType)}
            min={minBodyWidth}
            max={maxBodyWidth}
            onChange={onChangeBodyWidth}
            onBlur={onBlurBodyWidth}
          />
          <strong>{bodyWidthType}</strong>
          {bodyWidthType === '%' && <span>(100%이상 200%이하 조절 가능합니다.)</span>}
          {bodyWidthType === 'px' && <span>(1000이상 2000이하 조절 가능합니다.)</span>}
        </div>
      </StyledBodyOption>
      <StyledDiv defaultWidth={`${bodyWidth}px`}>
        <AutoSizer disableHeight style={{ width: '1000px', height: 'auto' }}>
          {({ width }) => (
            <table ref={TableRef}>
              <thead>
                <tr>
                  {headers.map((percent, index) => (
                    <th key={index} style={{ width: width * (percent / 100) > 100 ? width * (percent / 100) : 100 }}>
                      <div className="col-contents">{`% ${percent.toFixed(2)}`}</div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map(({ key: rowKey, cols }, rowIndex) => (
                  <tr key={rowKey}>
                    {(cols || []).map((col, colIndex) =>
                      col ? (
                        <td
                          key={col.key}
                          className={`cell-${rowIndex}-${colIndex}`}
                          rowSpan={col.rowSpan || 1}
                          colSpan={col.span || 1}
                          style={{ ...col.style, height: undefined }}
                        >
                          <div
                            className="col-contents"
                            data-tip={`${rowIndex}-${colIndex}`}
                            data-event="click focus"
                            onClick={() => openModal(`${rowIndex}-${colIndex}`)}
                          >
                            <div>{`cell-${rowIndex}-${colIndex}`}</div>
                            {/* {Component} */}
                          </div>
                        </td>
                      ) : null,
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </AutoSizer>
        <Modal title={null} centered visible={showModal} onOk={null} onCancel={closeModal} footer={null}>
          {dataTip && (
            <StyleOption className="style-options">
              <ul className="">
                <li>
                  <label htmlFor="style-font-size">Font-Size</label>
                  <select
                    name="fontSize"
                    id="style-font-weight"
                    defaultValue={style.fontSize || 12}
                    onChange={e => {
                      updateCellStyle(e, rowIndex, colIndex);
                      onChangeCellStyle(e, rowIndex, colIndex);
                    }}
                  >
                    <option value="10px">10px</option>
                    <option value="12px">12px</option>
                    <option value="14px">14px</option>
                    <option value="16px">16px</option>
                    <option value="18px">18px</option>
                    <option value="20px">20px</option>
                  </select>
                </li>
                <li>
                  <label htmlFor="style-font-weight">Font-Weight</label>
                  <select
                    name="fontWeight"
                    id="style-font-weight"
                    defaultValue={style.fontWeight || 600}
                    onChange={e => {
                      updateCellStyle(e, rowIndex, colIndex);
                      onChangeCellStyle(e, rowIndex, colIndex);
                    }}
                  >
                    <option value="500">500</option>
                    <option value="600">600</option>
                    <option value="800">800</option>
                  </select>
                </li>
                <li>
                  <label htmlFor="style-text-align">Text-Align</label>
                  <select
                    name="textAlign"
                    id="style-text-align"
                    defaultValue={style.textAlign || 'left'}
                    onChange={e => {
                      updateCellStyle(e, rowIndex, colIndex);
                      onChangeCellStyle(e, rowIndex, colIndex);
                    }}
                  >
                    <option value="left">left</option>
                    <option value="center">center</option>
                    <option value="right">right</option>
                  </select>
                </li>
                <li>
                  <label htmlFor="style-color">Color</label>
                  <ColorPickerWithState
                    defaultColor={style.color || '#000'}
                    name="color"
                    onChangeComplete={e => {
                      updateCellStyle(e, rowIndex, colIndex);
                      onChangeCellStyle(e, rowIndex, colIndex);
                    }}
                  />
                </li>
                <li>
                  <label htmlFor="style-background-color">Background-Color</label>
                  <ColorPickerWithState
                    defaultColor={style.color || '#fff'}
                    name="backgroundColor"
                    onChangeComplete={e => {
                      updateCellStyle(e, rowIndex, colIndex);
                      onChangeCellStyle(e, rowIndex, colIndex);
                    }}
                  />
                </li>
              </ul>
            </StyleOption>
          )}
        </Modal>
      </StyledDiv>
    </div>
  );
};
StyleManager.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  defaultWidthType: PropTypes.string,
  defaultWidth: PropTypes.number,
  updateBodyWidthType: PropTypes.func,
  updateBodyWidth: PropTypes.func,
  onChangeWidths: PropTypes.func,
  onChangeHeights: PropTypes.func,
  updateCellStyle: PropTypes.func,
  headers: PropTypes.arrayOf(PropTypes.object),
  rows: PropTypes.arrayOf(PropTypes.object),
  baseComponent: PropTypes.object,
};
StyleManager.defaultProps = {
  defaultWidthType: 'px',
  defaultWidth: 1000,
  updateBodyWidthType: () => {},
  updateBodyWidth: () => {},
  onChangeWidths: () => {},
  onChangeHeights: () => {},
  updateCellStyle: () => {},
  headers: [],
  rows: [],
  baseComponent: null,
};
export default StyleManager;
