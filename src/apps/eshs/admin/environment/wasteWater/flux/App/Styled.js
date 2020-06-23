import styled from 'styled-components';
import 'react-datasheet/lib/react-datasheet.css';

export default styled.div`
  .excel-drop-text {
    position: absolute;
    width: 1200px;
    height: 60px;
    text-align: center;
    top: calc(50% - 30px);
    left: calc(50% - 110px);
  }

  .sheet-container {
    display: block;
    padding: 5px;
    box-shadow: 0 0 6px #ccc;
    width: 1200px;
    margin: 20px auto auto;

    .data-grid-container > table {
      width: 100%;

      td {
        &.cell {
          vertical-align: middle;
          &.selected {
            border: none;
            box-shadow: inset 0 0 0 1px rgb(33, 133, 208);
          }
        }

        &.hide {
          display: none;
        }
      }
    }
  }
`;
