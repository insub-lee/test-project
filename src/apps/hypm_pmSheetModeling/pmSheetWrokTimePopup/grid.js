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
          headerCheckboxSelection: true,
          checkboxSelection: true,
          width: 50,
        },
        { headerName: 'Operation No.',
          field: 'VORNR',
          cellStyle: { textAlign: 'center' }, width: 140,
        },
        { headerName: 'WorkTime',
          field: 'ARBEI',
          cellStyle: { textAlign: 'left' },
          width: 140,
          editable: true,
        },
        {
          headerName: 'Unit',
          field: 'ARBEH',
          align: 'left',
          editable: true,
          sortable: false,
          editable: true,
          width: 95,
          cellEditor: 'agSelectCellEditor',
          cellEditorParams: {
            values: ['MIN'],
          },
        },
        { headerName: 'Capa',
        field: 'ANZZL',
        cellStyle: { textAlign: 'right' },
        width: 95,
        editable: true,
      },
      ],
      defaultColDef: { resizable: true, lockPosition: false },
      editType: "fullRow",
      // frameworkComponents: {
      // TestRenderer,
      // },
    };
  }
  onGridReady = (params) => {
    const { onGridReady } = this.props;
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    // params.api.sizeColumnsToFit();
    onGridReady(params);
  };

  render() {
    const {
      WrokTimeDataList,
    } = this.props;
    return (
      <div
        className="ag-theme-balham"
        style={{
        height: '170px',
        width: '100%',
      }}
      >
        <AgGridReact
          rowSelection="multiple"
          enableSorting={true}
          // enableFilter={true}
          columnDefs={this.state.columnDefs}
          rowData={WrokTimeDataList}
          defaultColDef={this.state.defaultColDef}
          suppressRowClickSelection={true}
          frameworkComponents={this.state.frameworkComponents}
          editType={this.state.editType}
          onGridReady={this.onGridReady}
          stopEditingWhenGridLosesFocus={true}
        />
      </div>
    );
  }
}

Grid.defaultProps = {
  WrokTimeDataList: [],
};

Grid.propTypes = {
  WrokTimeDataList: PropTypes.array,
  onGridReady: PropTypes.func.isRequired,
};
export default Grid;
