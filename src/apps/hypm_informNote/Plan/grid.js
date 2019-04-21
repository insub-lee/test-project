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
          headerName: '일자', field: 'GSTRP', width: 100, cellStyle: { 'text-align': 'center' },
        },
        { headerName: '주기', field: 'PACKS', width: 160 },
      ],
      editType: 'fullRow',
    };
  }

  render() {
    const {
      planDataList,
    } = this.props;
    return (
      <div
        className="ag-theme-balham"
        style={{
        height: '200px',
        width: '100%',
      }}
      >
        <AgGridReact
          rowSelection="multiple"
          enableSorting={true}
          enableFilter={true}
          columnDefs={this.state.columnDefs}
          rowData={planDataList}
          defaultColDef={this.state.defaultColDef}
          suppressRowClickSelection={true}
          editType={this.state.editType}
        />
      </div>
    );
  }
}

Grid.defaultProps = {
  planDataList: [],
};

Grid.propTypes = {
  planDataList: PropTypes.array,
};
export default Grid;
