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
        { headerName: 'Material', field: 'MATNR', align: 'center' },
        { headerName: 'Val. Type', field: 'RPAIR', align: 'center' },
        { headerName: '요청 Qty', field: 'REQ_MENGE', align: 'center' },
        { headerName: '출고 Qty', field: 'ENMNG', align: 'center' },
        { headerName: '요청자', field: 'WEMPF', align: 'center' },
        { headerName: '인수자', field: 'RECEIVER_NAME', align: 'center' },
        { headerName: 'Vendor', field: 'LIFNR', align: 'center' },
      ],
    };
  }

  render() {
    const {
      contractorGrid,
    } = this.props;
    return (
      <div
        className="ag-theme-balham"
        style={{
        height: '300px',
        width: '630px',
      }}
      >
        <AgGridReact
          rowSelection="multiple"
          enableSorting={true}
          enableFilter={true}
          columnDefs={this.state.columnDefs}
          rowData={contractorGrid}
          defaultColDef={this.state.defaultColDef}
          suppressRowClickSelection={true}
          frameworkComponents={this.state.frameworkComponents}
          editType={this.state.editType}
        />
      </div>
    );
  }
}

Grid.defaultProps = {
  contractorGrid: [],
};

Grid.propTypes = {
  contractorGrid: PropTypes.array,
};
export default Grid;
