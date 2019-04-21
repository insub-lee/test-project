import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { AgGridReact } from 'ag-grid-react';
import moment from 'moment';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import { warning } from '../../../components/Feedback/functions';

class Grid extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      columnDefs: [
        {
          headerName: '',
          field: 'chk',
          headerCheckboxSelection: true,
          checkboxSelection: true,
          width: 50,
        },
        {
          headerName: 'SDPT', field: 'ARBPL_T', width: 140, cellStyle: { textAlign: 'center' },
        },
        {
          headerName: 'F/L', field: 'PLTXT', width: 160, cellStyle: { textAlign: 'center' },
        },
        {
          headerName: 'EQ ID', field: 'EQ_ID', width: 140, cellStyle: { textAlign: 'center' },
        },
        {
          headerName: 'MODEL', field: 'EARTX', width: 140, cellStyle: { textAlign: 'center' },
        },
        {
          headerName: 'DOWN TYPE', field: 'CODING_T', width: 150, cellStyle: { textAlign: 'center' },
        },
        {
          headerName: 'IS ACTIVE', field: 'ISACTIVE', width: 130, cellStyle: { textAlign: 'center' },
        },
        { headerName: 'PROC', field: 'PROC_ITEM', width: 320 },
        { headerName: 'COMP', field: 'COMP_ITEM', width: 320 },
        {
          headerName: 'Alarm Date', field: 'ALARM_DT', width: 220, cellStyle: { textAlign: 'center' },
        },
        {
          headerName: '등록자', field: 'REQ_NM', width: 100, cellStyle: { textAlign: 'center' },
        },
        {
          headerName: '등록일', field: 'REQ_DT', width: 200, cellStyle: { textAlign: 'center' },
        },
      ],
      defaultColDef: { editable: false },
      components: { NoticeCellRenderer: this.getNoticeCellRenderer() },
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.isExcelDownload !== nextProps.isExcelDownload) {
      if (nextProps.alarmDataList.length === 0) {
        warning('데이터 없음', '다운로드 할 데이터가 없습니다.');
        return;
      }
      if (nextProps.isExcelDownload > 0) {
        const dateString = moment().format('YYYYMMDDHHmmss');
        const params = {
          columnGroups: true,
          allColumns: true,
          fileName: 'fabInformNoticeList'.concat(dateString),
        };
        this.props.gridApi.exportDataAsCsv(params);
      }
    }
  }

  getNoticeCellRenderer = () => {
    function NoticeCellRenderer() {}
    NoticeCellRenderer.prototype.init = (params) => {
      const tempDiv = document.createElement('div');
      const notice = params.value === null ? '' : params.value;
      tempDiv.innerHTML =
      '<textarea style="overflow:visible; width: 100%; height:100px;" readonly >'.concat(notice).concat('</textarea>');
      this.eGui = tempDiv.firstChild;
    };
    NoticeCellRenderer.prototype.getGui = () => this.eGui;
    return NoticeCellRenderer;
  }

  render() {
    const {
      alarmDataList,
    } = this.props;

    return (
      <div
        className="ag-theme-balham"
        style={{
        height: '500px',
        width: '100%',
      }}
      >
        <AgGridReact
          rowSelection="multiple"
          enableSorting={true}
          enableFilter={true}
          columnDefs={this.state.columnDefs}
          rowData={alarmDataList}
          onGridReady={this.props.onGridReady}
          defaultColDef={this.state.defaultColDef}
          suppressRowClickSelection={true}
          onSelectionChanged={this.props.handleGridSelectionChanged}
          components={this.state.components}
        />
      </div>
    );
  }
}

Grid.defaultProps = {
  alarmDataList: [],
  gridApi: undefined,
};

Grid.propTypes = {
  onGridReady: PropTypes.func.isRequired,
  handleGridSelectionChanged: PropTypes.func.isRequired,
  alarmDataList: PropTypes.array,
  gridApi: PropTypes.object,
  isExcelDownload: PropTypes.number.isRequired,
};
export default Grid;
