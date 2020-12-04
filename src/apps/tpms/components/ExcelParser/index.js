import React from 'react';
import { fromJS } from 'immutable';
import XLSX from 'xlsx';

import { SheetJSFT } from 'utils/helpers';

import '../NadbmReactDatasheet/react-datasheet.css';

const styles = {
  excelViewer: {
    position: 'relative',
    // padding: 15,
    margin: '30px',
    // width: 500,
    // maxWidth: 300,
    // minHeight: 400,
    border: '1px solid #DDD',
    boxShadow: '0 0 6px #ccc',
  },
  excleDropText: {
    position: 'absolute',
    width: 220,
    height: 60,
    textAlign: 'center',
    top: 'calc(50% - 30px)',
    left: 'calc(50% - 110px)',
  },
  sheetOption: {
    // margin: '30px auto 0px auto',
    margin: '30px',
    // width: 500,
    // maxWidth: 300,
    // minHeight: 400,
    overflow: 'auto',
    // backgroundColor: '#e3aa33',
    display: 'block',
    padding: 0,
    // boxShadow: '0 0 6px #ccc',
    // margin: 'auto',
    marginTop: 20,
  },
};

class ExcelViewer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      grid: fromJS([]),
    };
    this.onDrop = this.onDrop.bind(this);
    this.handleAddNewRow = this.handleAddNewRow.bind(this);
    this.handleCellsChanged = this.handleCellsChanged.bind(this);
    this.handleContextMenuValue = this.handleContextMenuValue.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  onDrop(e) {
    e.stopPropagation();
    e.preventDefault();
    const { files } = e.dataTransfer;
    if (files && files[0]) this.handleFile(files[0]);
  }

  handleChange(e) {
    const { files } = e.target;
    if (files && files[0]) {
      this.handleFile(files[0]);
    }
  }

  handleFile(file) {
    const reader = new FileReader();
    const rABS = !!reader.readAsBinaryString;
    reader.onload = e => {
      const bstr = e.target.result;
      const wb = XLSX.read(bstr, { type: rABS ? 'binary' : 'array' });
      /* Get first worksheet */
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      /* Convert array of arrays */
      const data = XLSX.utils.sheet_to_json(ws, { header: 1, defval: '' });
      const convertedData = data.map(
        (row, rowIndex) => row.map((cell, cellIndex) => ({ value: cell || '' })),
        // rowIndex === 0 ? (
        //   row.map((cell, cellIndex) => (
        //     { value: cell || '', readOnly: true }
        //   ))
        // ) : (
        //   row.map((cell, cellIndex) => (
        //     cellIndex === 0 ? (
        //       { value: cell || '', readOnly: true }
        //     ) : (
        //       { value: cell || '' }
        //     )
        //   ))
        // )
      );
      this.setState({ grid: fromJS(convertedData) });
    };
    if (rABS) {
      reader.readAsBinaryString(file);
    } else {
      reader.readAsArrayBuffer(file);
    }
  }

  suppress(e) {
    e.stopPropagation();
    e.preventDefault();
  }

  handleAddNewRow() {
    const last = this.state.grid.last().map(cell => cell.set('value', ''));
    this.setState(prevState => ({ grid: prevState.grid.push(last) }));
  }

  handleCellsChanged(changes) {
    let { grid } = this.state;
    changes.forEach(({ cell, row, col, value }, index) => {
      grid = grid.setIn([row, col, 'value'], value);
    });
    // scroll move event
    // document.activeElement.scrollIntoView();
    this.setState({ grid });
  }

  handleClick(e, data) {
    // console.log(this.state.grid.toJS());
    this.setState(prevState => ({
      grid: prevState.grid.delete(data.rowIndex),
    }));
  }

  handleContextMenuValue(e, cell, i, j) {
    this.setState({ selectedRow: i });
  }

  render() {
    return (
      <div
        style={styles.excelViewer}
        // onDrop={this.onDrop}
        // onDragEnter={this.suppress}
        // onDragOver={this.suppress}
      >
        {this.state.grid.size === 0 && (
          <div
            onDrop={this.onDrop}
            onDragEnter={this.suppress}
            onDragOver={this.suppress}
            style={{
              backgroundColor: 'rgba(217, 226, 249, 0.6)',
              minHeight: 400,
            }}
          >
            <div style={styles.excleDropText}>
              <form autoComplete="off">
                <div>
                  <label htmlFor="excelUpload">Excel Drag and Drop 혹은 선택</label>
                  <input type="file" id="excelUpload" accept={SheetJSFT} onChange={this.handleChange} />
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default ExcelViewer;
