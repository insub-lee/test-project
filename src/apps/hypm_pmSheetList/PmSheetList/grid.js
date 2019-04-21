import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import RejectCommont from '../rejectCommont/index';

class Grid extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      columnDefs: [
        { headerName: 'Model', field: 'EQART_NM' },
        { headerName: 'EQ ID', field: 'EQ_ID' },
        { headerName: 'PM Sheet No', field: 'PRUEFLOS' },
        { headerName: 'Down Time', field: 'DOWN_TIME' },
        { headerName: 'Down Type', field: 'DOWN_TYPE' },
        { headerName: 'Sheet 상태', field: 'INSP_LOT_STATUS', cellStyle: this.setCellColor },        
        { headerName: 'Inform No', field: 'INFORM_NO' },
        { headerName: 'W/O No', field: 'AUFNR' },
        { headerName: 'APP_COMMENT', field: 'APP_COMMENT', hide: true },
        { headerName: 'Sheet 상신자', field: 'REQ_NAME', hide: true },
        { headerName: 'Sheet 승인자', field: 'APPROVE_NAME', hide: true },
        // { headerName: 'No', field: 'NO' },
        // { headerName: 'SDPT', field: 'ARBPL_KTEXT' },
        // { headerName: 'F/L', field: 'TPLNR_NM' },
        // { headerName: 'Model', field: 'EQART_NM' },
        // { headerName: 'EQ ID', field: 'EQ_ID' },
        // { headerName: 'Inform No', field: 'INFORM_NO' },
        // { headerName: 'W/O No', field: 'AUFNR' },
        // { headerName: 'W/O 유형', field: 'AUART_NM' },
        // { headerName: 'Down Type', field: 'DOWN_TYPE' },
        // { headerName: 'Auto/Manual', field: 'CREATE_GB' },
        // { headerName: 'W/O Status', field: 'WO_STATUS' },
        // { headerName: 'PM Sheet No', field: 'PRUEFLOS' },
        // { headerName: 'Sheet 상태', field: 'INSP_LOT_STATUS', cellStyle: this.setCellColor },
        // { headerName: 'PM Sheet 명', field: 'KTEXT' },
        // { headerName: 'Down Time', field: 'DOWN_TIME' },
        // { headerName: 'Up Time', field: 'UP_TIME' },
        // { headerName: 'Total Time', field: 'TATDTM' },
        // { headerName: 'Sheet 확정일', field: 'SHEET_CONFIRM_DT' },
        // { headerName: 'Sheet 확정자', field: 'EMP_NAM' },
        // { headerName: 'Sheet 최종수정자', field: 'ERSTELLER' },
        // { headerName: '도급사 Sheet 상태', field: 'SUBMIT' },
        // { headerName: 'Sheet 상신자', field: 'REQ_NAME' },
        // { headerName: 'Sheet 상신일', field: 'REQ_DT' },
        // { headerName: 'Sheet 승인자', field: 'APPROVE_NAME' },
        // { headerName: 'Sheet 승인일', field: 'APPROVE_DT' },
        // { headerName: 'APP_COMMENT', field: 'APP_COMMENT', hide: true },
      ],
      defaultColDef: {
        editable: false,
        width: 140,
      },
      // editType: "fullRow",
      frameworkComponents: {
        // TestRenderer,
      },
      isOpen: true,
      renderType: '',
      getSelectedRows: {},
    };
    this.handleOnCellClicked = this.handleOnCellClicked.bind(this);
  }

  setCellColor = (params) => {
    switch (params.column.colId) {
      case 'INSP_LOT_STATUS': {
        let setAttribute = false;
        if (
          params.data.INSP_LOT_STATUS === '작성전' ||
          params.data.INSP_LOT_STATUS === '부결'
        ) {
          setAttribute = true;
        }
        return {
          color: setAttribute ? 'red' : '',
        };
      }
      default:
        return '';
    }
  }

  /*
    #grid cell click

    case 'INFORM_NO':         inform No
    case 'AUFNR':             W/O No
    case 'PRUEFLOS':          PM Sheet No
    case 'INSP_LOT_STATUS':   Sheet 상태
  */
  handleOnCellClicked = (event) => {
    const rowData = event.api.getSelectedRows();
    const param = rowData[0];
    const { colId } = event.column;
    let sParam = '';
    let sUrl = '';
    const popOption = 'width=1080, height=820, toolbar=yes, resizable=yes, menubar=yes, status=yes, location=yes';

    switch (colId) {
      // 혁명선임님
      case 'INFORM_NO': {
        if (event.value !== '') {
          sUrl = '/sm/pmSheetList/InformNoteDetailPopup/';
          sParam += param.INFORM_NO;
          sUrl += sParam;
          window.open(
            sUrl,
            '',
            popOption,
          );
        }
        break;
      }
      // 이책임님
      case 'PRUEFLOS': {
        if (event.value !== '') {
          sUrl = '/sm/pmSheetList/InformNoteListCBMSelectListPopup/';
          sParam += param.PRUEFLOS;
          sParam += '|CBM';
          sParam += '|N';
          sParam += '|';
          sParam += param.AUFNR;
          sUrl += sParam;
          window.open(
            sUrl,
            '',
            popOption,
          );
        }
        break;
      }
      case 'INSP_LOT_STATUS': {
        if (event.value === '부결') {
          this.setState({ renderType: 'RejectCommont', getSelectedRows: param, isOpen: true });
        }
        break;
      }
      default:
        break;
    }
  }

  // 팝업에서 선택한 결과 화면으로 넘김
  fncCallBack = (popupType, callBackObject) => {
    if (popupType === 'CBM') {
      const strVornr = callBackObject.VORNR;
      const pmSheetNo = '';
      const ownCode = 'O';
      const compSheetStatus = '';// 도급사 Sheet 상태
      const workOrderNo = '';
      let operatorCodes = '';

      // PARAM_AUFNR W/O no
      if (callBackObject !== undefined) {
        operatorCodes = strVornr;
      }

      let sUrl = '/sm/pmSheetList/PmSheetDetailPMCardPopup/';
      let sParam = '';
      sParam += pmSheetNo;
      sParam += '|';
      sParam += ownCode;
      sParam += '|';
      sParam += compSheetStatus;
      sParam += '|';
      sParam += workOrderNo;
      sParam += '|';
      sParam += operatorCodes;
      sUrl += sParam;
      const popOption = 'width=1080, height=820, toolbar=yes, resizable=yes, menubar=yes, status=yes, location=yes';
      window.open(
        sUrl,
        '',
        popOption,
      );
    }
  }

  handleToggleOpen = () => {
    this.setState({ isOpen: !this.state.isOpen });
  }

  
  render() {
    const {
      pmSheetDataList,
      handleOnGridReady,
    } = this.props;

    const RenderView = (type) => {
      const param = this.state.getSelectedRows;
      switch (type) {
        case 'RejectCommont': {
          return (
            <RejectCommont
              eqId={param.EQ_ID}
              pmSheetNo={param.PRUEFLOS}
              reqName={param.REQ_NAME}
              appName={param.APPROVE_NAME}
              appComment={param.APP_COMMENT}
              visible={this.state.isOpen}
              handleToggleOpen={this.handleToggleOpen}
            />
          )
        }
        default:
          return '';
      }
    };

    return (
      <div>
        <div>
          {RenderView(this.state.renderType)}
        </div>
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
            rowData={pmSheetDataList}
            defaultColDef={this.state.defaultColDef}
            // suppressRowClickSelection={true}
            frameworkComponents={this.state.frameworkComponents}
            // editType={this.state.editType}
            onCellClicked={this.handleOnCellClicked}
            onGridReady={handleOnGridReady}
          />
        </div>
      </div>
    );
  }
}

Grid.defaultProps = {
  pmSheetDataList: [],
};

Grid.propTypes = {
  pmSheetDataList: PropTypes.array,
  handleOnGridReady: PropTypes.func.isRequired,
};

export default Grid;

