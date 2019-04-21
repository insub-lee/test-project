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
        // { headerName: '프로젝트명', field: 'AUTH_KEY', cellStyle: { textAlign: 'left' } },
        { headerName: '프로젝트명', field: 'PRJ_NM' },
        { headerName: 'STATUS', field: 'STATUS' },
        { headerName: 'CPU', field: 'CPUS' },
        { headerName: 'MEMORY', field: 'MEM' },
        { headerName: 'DISK', field: 'DISK' },
      ],
      defaultColDef: { editable: false },
      // editType: 'fullRow',
      frameworkComponents: {
        // TestRenderer,
      },
    };
  }

  // handleCellClicked = (e) => {
  //   const { cellClickedReturn } = this.props;

  //   const param = {
  //     PARAM_PLNAL: e.data.PLNAL,
  //     PARAM_PLNNR: e.data.PLNNR,
  //     PARAM_REVISION: e.data.REVISION,
  //     field: e.colDef.field,
  //     planCheckCnt: e.data.planCheckCnt,
  //   };

  //   cellClickedReturn(param);
  // };

  render() {
    const {
      projectListSearch,
    } = this.props;

    return (
      <div
        className="ag-theme-balham"
        style={{
          height: '700px',
          width: '100%',
        }}
      >

        <AgGridReact
          rowSelection="multiple"
          enableSorting={true}
          enableFilter={true}
          columnDefs={this.state.columnDefs}
          rowData={projectListSearch}
          defaultColDef={this.state.defaultColDef}
          // suppressRowClickSelection={true}
          frameworkComponents={this.state.frameworkComponents}
          // editType={this.state.editType}
          // onCellClicked={this.handleCellClicked}
        />
      </div>
    );
  }
}

Grid.defaultProps = {
  projectListSearch: [],
};

Grid.propTypes = {
  projectListSearch: PropTypes.array,
  // cellClickedReturn: PropTypes.func.isRequired,
};
export default Grid;
