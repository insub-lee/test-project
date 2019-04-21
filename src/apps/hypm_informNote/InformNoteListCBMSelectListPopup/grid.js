import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';

class Grid extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      columnDefs: [
        {
          headerName: '',
          field: '',
          width: 50,
          headerCheckboxSelection: true,
          checkboxSelection: true,
        },
        {
          headerName: 'Operation',
          field: 'INSPOPER',
          cellStyle: { 'text-align': 'center' },
          width: 110,
          align: 'center',
        },
        {
          headerName: 'Description',
          field: 'TXT_OPER',
          width: 350,
          align: 'center',
        },
        {
          headerName: '구분',
          field: 'ANLZU',
          cellStyle: { 'text-align': 'center' },
          width: 100,
          align: 'center',
          cellEditor: 'agSelectCellEditor',
          cellEditorParams: { values: ['자사용', '도급사용'] },

        },
      ],

    };
  }

  render() {
    const {
      informNoteListCBMSelectList,
      onSelectionChanged,
    } = this.props;
    return (
      <div
        className="ag-theme-balham"
        style={{
        height: '400px',
        width: '300',
      }}
      >
        <AgGridReact
          rowSelection="multiple"
          enableSorting={true}
          enableFilter={true}
          columnDefs={this.state.columnDefs}
          rowData={informNoteListCBMSelectList}
          defaultColDef={this.state.defaultColDef}
          onSelectionChanged={onSelectionChanged}
          suppressRowClickSelection={true}
          frameworkComponents={this.state.frameworkComponents}
          editType={this.state.editType}
        />
      </div>
    );
  }
}

Grid.defaultProps = {
  informNoteListCBMSelectList: [],
  onSelectionChanged: [],
};

Grid.propTypes = {
  informNoteListCBMSelectList: PropTypes.array,
  onSelectionChanged: PropTypes.array,
};
export default Grid;
