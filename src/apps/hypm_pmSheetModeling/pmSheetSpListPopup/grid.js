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
          cellStyle: { textAlign: 'center' },
          width: 250,
          cellClass: 'vornr',
        },
        { headerName: 'Material',
          field: 'IDNRK',
          align: 'left',
          width: 250,
          cellClass: 'idnrk',
        },
        { headerName: 'Part Name',
          field: 'MAKTX',
          align: 'left' ,
          width: 650,
          cellClass: 'maktx',
        },
        {
          headerName: 'Q\'ty',
          field: 'IMENG',
          cellStyle: { textAlign: 'right' },
          editable: true,
          width: 120,
          cellClass: 'imeng',
        },
      ],
      defaultColDef: { 
        resizable: true,
        lockPosition: true,
        // suppressKeyboardEvent: function(event){
        //   const params = {
        //     editing: false,
        //   };
        //   console.log('event: ', event);
        //   return params;
        // }
      },
      excelStyles: [
        {
          id: 'header',
          interior: {
            color: '#CCCCCC',
            pattern: 'Solid'
        },
        alignment:{
          horizontal: 'Center',
          shrinkToFit: 'true',
        },
          borders: {
            borderBottom: {
                color: "#000000",
                lineStyle: 'Continuous',
                weight: 1,
            },
            borderLeft: {
                color: "#000000",
                lineStyle: 'Continuous',
                weight: 1,
            },
            borderRight: {
                color: "#000000",
                lineStyle: 'Continuous',
                weight: 1,
            },
            borderTop: {
                color: "#000000",
                lineStyle: 'Continuous',
                weight: 1,
            },
          },
          font: {
            fontName: 'Calibri',
            size: 9,
          },
        },
        {
          id: 'vornr',
          borders: {
            alignment:{
              horizontal: 'Left',
            },
            borderBottom: {
                color: "#000000",
                lineStyle: 'Continuous',
                weight: 1,
            },
            borderLeft: {
                color: "#000000",
                lineStyle: 'Continuous',
                weight: 1,
            },
            borderRight: {
                color: "#000000",
                lineStyle: 'Continuous',
                weight: 1,
            },
            borderTop: {
                color: "#000000",
                lineStyle: 'Continuous',
                weight: 1,
            }
          },
          font: {
            fontName: 'Calibri',
            size: 9,
          },
          dataType: 'string',
        },
        /* */
        {
          id: 'idnrk',
          borders: {
            alignment:{
              horizontal: 'Left',
            },
            borderBottom: {
                color: "#000000",
                lineStyle: 'Continuous',
                weight: 1,
            },
            borderLeft: {
                color: "#000000",
                lineStyle: 'Continuous',
                weight: 1,
            },
            borderRight: {
                color: "#000000",
                lineStyle: 'Continuous',
                weight: 1,
            },
            borderTop: {
                color: "#000000",
                lineStyle: 'Continuous',
                weight: 1,
            }
          },
          font: {
            fontName: 'Calibri',
            size: 9,
          },
          dataType: 'string',
        },
        /* */
        {
          id: 'maktx',
          borders: {
            alignment:{
              horizontal: 'Left',
            },
            borderBottom: {
                color: "#000000",
                lineStyle: 'Continuous',
                weight: 1,
            },
            borderLeft: {
                color: "#000000",
                lineStyle: 'Continuous',
                weight: 1,
            },
            borderRight: {
                color: "#000000",
                lineStyle: 'Continuous',
                weight: 1,
            },
            borderTop: {
                color: "#000000",
                lineStyle: 'Continuous',
                weight: 1,
            }
          },
          font: {
            fontName: 'Calibri',
            size: 9,
          },
          dataType: 'string',
        },
        /* */
        {
          id: 'imeng',
          borders: {
            alignment:{
              horizontal: 'Left',
            },
            borderBottom: {
                color: "#000000",
                lineStyle: 'Continuous',
                weight: 1,
            },
            borderLeft: {
                color: "#000000",
                lineStyle: 'Continuous',
                weight: 1,
            },
            borderRight: {
                color: "#000000",
                lineStyle: 'Continuous',
                weight: 1,
            },
            borderTop: {
                color: "#000000",
                lineStyle: 'Continuous',
                weight: 1,
            }
          },
          font: {
            fontName: 'Calibri',
            size: 9,
          },
          dataType: 'string',
        },
        /* */
      ],
      // editType: "fullRow",
      // frameworkComponents: {
      // TestRenderer,
      // },    defaultColDef: editable: true,
    };
  }
  onGridReady = (params) => {
    const { onGridReady } = this.props;
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    // params.api.sizeColumnsToFit();
    onGridReady(params);
  };
  /*
  handleCellClicked = (e) => {
    const { cellClickedReturn } = this.props;
    const param = {
      PARAM_PLNAL: e.data.PLNAL,
      PARAM_PLNNR: e.data.PLNNR,
      PARAM_REVISION: e.data.REVISION,
      field: e.colDef.field,
    };

    cellClickedReturn(param);
  };
  */

  
  render() {
    const {
      MaterialDataList,
    } = this.props;
    return (
      <div
        className="ag-theme-balham"
        style={{
        height: '145%',
        width: '100%',
      }}
      >
        <AgGridReact // 그리드 속성
          rowSelection="multiple"
         // enableSorting={true}
          enableFilter={true}
          columnDefs={this.state.columnDefs}
          rowData={MaterialDataList}
          defaultColDef={this.state.defaultColDef}
          // suppressRowClickSelection={true}
          suppressClickEdit={true}
          frameworkComponents={this.state.frameworkComponents}
          editType={this.state.editType}
          // eslint-disable-next-line react/jsx-no-bind
          onGridReady={this.onGridReady}
          // onCellClicked={this.handleCellClicked}
          editable={this.state.editable}
          stopEditingWhenGridLosesFocus={true}
          excelStyles={this.state.excelStyles}
          
        />
      </div>
    );
  }
}

Grid.defaultProps = {
  MaterialDataList: [],
};

Grid.propTypes = {
  MaterialDataList: PropTypes.array,
  onGridReady: PropTypes.func.isRequired,
};
export default Grid;
