import React from 'react';
import PropTypes from 'prop-types';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';


class Grid extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      columnDefs: [
        {
          headerName: '서비스명',
          field: 'SRV_NM',
          width: 250,
          lockPosition: true,
          cellStyle: { fontWeight: 'bold', fontSize: '13px' },
        },
        {
          headerName: 'STATUS',
          field: 'STATUS',
          width: 150,
          lockPosition: true,
          cellStyle: { fontWeight: 'bold', fontSize: '13px' },
        },
        {
          headerName: 'CPU',
          field: 'CPUS',
          width: 150,
          lockPosition: true,
          cellStyle: { fontWeight: 'bold', fontSize: '13px' },
        },
        {
          headerName: 'MEMORY',
          field: 'MEM',
          width: 150,
          lockPosition: true,
          cellStyle: { fontWeight: 'bold', fontSize: '13px' },
        },
        {
          headerName: 'DISK',
          field: 'DISK',
          width: 150,
          lockPosition: true,
          cellStyle: { fontWeight: 'bold', fontSize: '13px' },
        },
      ],
      defaultColDef: { resizable: true },
      domLayout: 'autoHeight',
      rowSelection: 'single',
    };
    this.onSelectionChanged = this.onSelectionChanged.bind(this);
  }

  onSelectionChanged = (params) => {
    // const selectedRows = this.gridApi.getSelectedRows();
    // console.log('$$$ row selection', selectedRows);
    // if (selectedRows.length !== 0) {
    //   // this.props.getAttendMemberList(selectedRows[0].GRP_ID);
    //   console.log('##########################');
    // }
    const selectedRows = params.api.getSelectedRows();
    console.log(selectedRows);
    this.props.history.push({
      pathname: '/apps/cicdService/serviceReg',
      search: 'D',
      state: selectedRows,
    });
  }

  render() {
    return (
      <div
        className="ag-theme-balham"
        style={{
        height: '500px',
        width: '100%',
        padding: '20px',
      }}
      >
        <AgGridReact
          // enableSorting={true}
          // enableFilter={true}
          columnDefs={this.state.columnDefs}
          rowData={this.props.dataList}
          defaultColDef={this.state.defaultColDef}
          // suppressRowClickSelection={true}
          // editType={this.state.editType}
          domLayout={this.state.domLayout}
          rowSelection={this.state.rowSelection}
          onSelectionChanged={this.onSelectionChanged}
        />
      </div>
    );
  }
}

Grid.propTypes = {
  history: PropTypes.object,//eslint-disable-line
};

Grid.defaultProps = {
  dataList: [],
};

Grid.propTypes = {
  dataList: PropTypes.array,
};
export default Grid;
