import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { AgGridReact } from 'ag-grid-react';
import moment from 'moment';
import { Button } from 'antd';
import { warning } from '../../../components/Feedback/functions';
import './grid.css';


class Grid extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      columnDefs: [
        {
          headerName: 'NO', field: 'NO', cellClass: 'cell-wrap-text', width: 40,
        },
        {
          headerName: 'NOTICE DATE', field: 'NOTICE_DT', cellClass: 'cell-wrap-text', width: 70, cellRenderer: 'DateCellRenderer',
        },
        {
          headerName: 'SHIFT', field: 'SHIFT_TEXT', cellClass: 'cell-wrap-text', width: 70,
        },
        {
          headerName: 'NOTICE', field: 'NOTICE', cellClass: 'cell-wrap-text', width: 330, cellRenderer: 'NoticeCellRenderer', autoHeight: true,
        },
        {
          headerName: '첨부파일', field: 'EDMS_YN', cellClass: 'cell-wrap-text', width: 70,
        },
      ],
      components: { NoticeCellRenderer: this.getNoticeCellRenderer() },
      frameworkComponents: {
        DateCellRenderer: this.getDateCellRenderer,
      },
    };
    this.externalWindow = null;
    this.containerEl = null;
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.isExcelDownload !== nextProps.isExcelDownload) {
      if (nextProps.informNoticeList.length === 0) {
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
        this.gridApi.exportDataAsCsv(params);
      }
    }
  }

  onGridReady = (params) => {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.gridApi.sizeColumnsToFit();
  };

  // noticeCellRenderer = params => <textarea style={{ overflow: 'visible', width: '100%', height: '100px' }} readOnly > {params.value} </textarea>;

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

  getDateCellRenderer = (params) => {
    console.log(params);
    return <Button onClick={() => window.open(`/sm/informNote/pop/InformNoticeDetailPopup/${params.data.U_ID}`, 'InformNoticeDetailPopup', 'width=900,height=400')} >{params.value}</Button>;
  }


  render() {
    const {
      informNoticeList,
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
          defaultColDef={this.state.defaultColDef}
          columnDefs={this.state.columnDefs}
          rowData={informNoticeList}
          onGridReady={this.onGridReady}
          components={this.state.components}
          frameworkComponents={this.state.frameworkComponents}
        />
      </div>
    );
  }
}

Grid.defaultProps = {
  informNoticeList: [],
};

Grid.propTypes = {
  informNoticeList: PropTypes.array,
  isExcelDownload: PropTypes.number.isRequired,
};
export default Grid;
