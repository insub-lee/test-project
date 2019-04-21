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
        { headerName: 'No', field: 'ROWNUM' },
        { headerName: 'SeqNum', field: 'SEQ_NUM', hide: true },
        { headerName: 'Description', field: 'DEFINE_NAME' },
      ],
      defaultColDef: { editable: true },
      editType: 'fullRow',
    };
  }

  handleOnGridReady = (event) => {
    console.log(event);
  }

  render() {
    const {
      hotPopDataList,
      handleOnCellClicked,
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
          rowData={hotPopDataList}
          defaultColDef={this.state.defaultColDef}
          suppressRowClickSelection={true}
          editType={this.state.editType}
          onCellClicked={handleOnCellClicked}
        />
      </div>
    );
  }
}

Grid.defaultProps = {
  hotPopDataList: [],
  // param: [],
};

Grid.propTypes = {
  hotPopDataList: PropTypes.array,
  handleOnCellClicked: PropTypes.func.isRequired,
  // param: PropTypes.array,
};
export default Grid;
