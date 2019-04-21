import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';

class GridDetail extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      columnDefs: [
        { headerName: 'No', field: 'no' },
        { headerName: 'Tab', field: 'tab' },
        { headerName: 'Item', field: 'item' },
        { headerName: 'key', field: 'key' },
        { headerName: 'Value', field: 'value', hide: true},
      ],
      defaultColDef: { editable: true },
      editType: 'fullRow',
    };
  }

  render() {
    const {
      hotPopDataDetailList,
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
          rowData={hotPopDataDetailList}
          defaultColDef={this.state.defaultColDef}
          suppressRowClickSelection={true}
          editType={this.state.editType}
        />
      </div>
    );
  }
}

GridDetail.defaultProps = {
  hotPopDataDetailList: [],
};

GridDetail.propTypes = {
  hotPopDataDetailList: PropTypes.array,
};
export default GridDetail;
