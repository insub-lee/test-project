import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { AgGridReact } from 'ag-grid-react';
import moment from 'moment';
import * as feed from 'components/Feedback/functions';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';

class Grid extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      columnDefs: [
        // {
        //   headerName: 'No',
        //   field: 'RNUM',
        //   width: 60,
        //   pinned: 'left',
        // },
        // {
        //   headerName: 'SDPT',
        //   field: 'SDPT',
        //   width: 120,
        //   pinned: 'left',
        // },
        // {
        //   headerName: 'F/L',
        //   field: 'PLTXT',
        //   width: 120,
        //   pinned: 'left',
        // },
        // {
        //   headerName: 'EQ ID',
        //   field: 'EQ_ID',
        //   width: 120,
        //   pinned: 'left',
        // },
        // {
        //   headerName: 'Model',
        //   field: 'MODEL',
        //   width: 105,
        //   pinned: 'left',
        // },
        // {
        //   headerName: 'SVID Value',
        //   field: 'CURR_VAL',
        //   width: 105,
        //   pinned: 'left',
        // },
        // {
        //   headerName: 'Down',
        //   field: 'NOTI_TYPE_NAME',
        //   width: 105,
        //   pinned: 'left',
        // },
        // {
        //   headerName: 'Down Type',
        //   field: 'CODING_NAME',
        //   width: 105,
        //   pinned: 'left',
        // },
        // {
        //   headerName: 'Auto/Manual',
        //   field: 'IS_MANUAL',
        //   width: 120,
        //   pinned: 'left',
        // },
        // { headerName: 'Down Time', width: 140, field: 'DOWN_TIME' },
        // { headerName: 'Up Time', width: 140, field: 'UP_TIME' },
        // { headerName: 'Total Time', width: 140, field: 'INTERVAL_A' },
        // { headerName: 'Work Time', width: 140, field: 'INTERVAL_B' },
        // { headerName: 'Down Comment', width: 250, field: 'NOTE_COMMENT' },
        // { headerName: 'Problem', width: 250, field: 'ZZPROBLEM' },
        // { headerName: '조치상세내용', width: 500, field: 'HLTEXT' },
        // { headerName: 'Unit', width: 150, field: 'OTEIL_NM' },
        // { headerName: '유형/현상', width: 150, field: 'FECOD_NM' },
        // { headerName: '원인', width: 200, field: 'URCOD_NM' },
        // { headerName: '원인부품(군)', width: 150, field: 'MNCOD_NM' },
        // { headerName: '조치 및 결과', width: 200, field: 'RESULT' },
        // { headerName: '조치자', width: 90, field: 'ACTION_BY' },
        // { headerName: 'Last Recipe ID', width: 170, field: 'LAST_RECIPE_ID' },
        // { headerName: 'Lot ID', width: 100, field: 'LOT_ID' },
        // { headerName: 'Wafer ID', width: 200, field: 'WAFERID' },
        // { headerName: 'Remark', width: 200, field: 'REMARK' },
      ],
      defaultColDef: { lockPosition: true, editable: false, resizable: true },
      // editType: 'fullRow',
    };
    this.columnDefs = [];
  }

  componentDidMount() {
    const { selectColumn } = this.props;
    this.selectColView(selectColumn);
    // if()
    // this.gridApi.sizeColumnsToFit();
    // if (selectColumn) {
    //   this.columnDefs =[];
    //   let col = {
    //     headerName: 'No', 
    //     field: 'RNUM',
    //     width: 60,
    //     pinned: 'left',
    //   };
    //   this.columnDefs.push(col);
    //   for(let i = 1; i < selectColumn.length; i +=1) {
    //     if (i < 9) {
    //       col = {
    //         headerName: selectColumn[i].COL_TEXT, 
    //         width: 250,
    //         pinned: 'left',
    //         field: selectColumn[i].COL_ID
    //       }
    //     } else {
    //       col = {
    //         headerName: selectColumn[i].COL_TEXT, 
    //         width: 250,
    //         field: selectColumn[i].COL_ID
    //       }
    //     }
    //     this.columnDefs.push(col);
    //   }
    // }
    // this.setState({
    //   columnDefs: this.columnDefs,
    // })
  }
  componentWillReceiveProps(nextProps) {
    // if (this.props.isExcelDownload !== nextProps.isExcelDownload) {
    //   if (nextProps.informNoteList.length === 0) {
    //     feed.warning('데이터 없음', '다운로드 할 데이터가 없습니다.');
    //     return;
    //   }
    //   if (nextProps.isExcelDownload > 0) {
    //     const dateString = moment().format('YYYYMMDDHHmmss');
    //     const params = {
    //       columnGroups: true,
    //       allColumns: true,
    //       fileName: 'fabInformNoteList'.concat(dateString),
    //     };
    //     this.gridApi.exportDataAsCsv(params);
    //   }
    // }
    if (this.props.selectColumn !== nextProps.selectColumn) {
      this.selectColView(nextProps.selectColumn);
      // this.scrambleAndRefreshAll();

    }
  }
  // scrambleAndRefreshAll = () => {
  //   this.scramble();
  //   var params = { force: isForceRefreshSelected() };
  //   this.gridApi.refreshCells(params);
  // }
  
  // scramble = () => {
  //   data.forEach(scrambleItem);
  //   topRowData.forEach(scrambleItem);
  //   bottomRowData.forEach(scrambleItem);
  // }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.columnDefs !== prevState.columnDefs) {
      if (this.gridApi) {
        if (this.state.columnDefs.length < 11) this.gridApi.sizeColumnsToFit();
        else this.autoSizeAll();
      }
    }
  }

  selectColView = (selectColumn) => {
    if (selectColumn) {
      this.columnDefs =[];
      let col = {
        headerName: 'No', 
        field: 'RNUM',
        width: 60,
        pinned: 'left',
      };
      this.columnDefs.push(col);
      for(let i = 0; i < selectColumn.length; i +=1) {
        if (i < 8) {
          col = {
            headerName: selectColumn[i].COL_TEXT, 
            width: 150,
            pinned: 'left',
            field: selectColumn[i].COL_ID
          }
        } else {
          col = {
            headerName: selectColumn[i].COL_TEXT, 
            width: 150,
            field: selectColumn[i].COL_ID
          }
        }
        this.columnDefs.push(col);
      }
      this.setState({
        columnDefs: this.columnDefs || [],
      })
      // this.onGridReady();
    }
  }
  
  autoSizeAll() {
    var allColumnIds = [];
    this.gridColumnApi.getAllColumns().forEach(function(column) {
      allColumnIds.push(column.colId);
    });
    this.gridColumnApi.autoSizeColumns(allColumnIds);
  }

  onRowSelect = (event) => {
    const selectedRows = event.api.getSelectedRows();
    // console.log(selectedRows.EQ_ID);
    this.props.handleSelected(selectedRows[0].EQ_ID);
  }
  onGridReady = (params) => {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    if (this.state.columnDefs.length < 11) this.gridApi.sizeColumnsToFit();
    else this.autoSizeAll();
  };
  render() {
    const {
      informNoteList,
    } = this.props;
    return (
      <div
        className="ag-theme-balham"
        style={{
        height: '500px',
        width: '100%',
        padding: '5px',
      }}
      >
        <AgGridReact
          rowSelection="single"
          enableSorting={true}
          enableFilter={true}
          columnDefs={this.state.columnDefs}
          rowData={informNoteList}
          onGridReady={this.onGridReady}
          defaultColDef={this.state.defaultColDef}
          onRowSelected={this.onRowSelect}
          editType={this.state.editType}
        />
      </div>
    );
  }
}

Grid.defaultProps = {
  informNoteList: [],
};

Grid.propTypes = {
  informNoteList: PropTypes.array,
  handleSelected: PropTypes.func.isRequired,
  isExcelDownload: PropTypes.bool.isRequired,
};
export default Grid;
