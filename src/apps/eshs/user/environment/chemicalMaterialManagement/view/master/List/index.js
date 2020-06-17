import React from 'react';
import PropTypes from 'prop-types';
import ExcelDownloadComp from 'components/BizBuilder/Field/ExcelDownloadComp';
import { createExcelData } from 'apps/eshs/user/environment/chemicalMaterialManagement/view/excelDownloadFunc';
import { debounce } from 'lodash';
import moment from 'moment';

import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';

import { Input, Select } from 'antd';
import StyledContentsWrapper from 'components/BizBuilder/styled/Wrapper/StyledContentsWrapper';
import StyledCustomSearchWrapper from 'components/BizBuilder/styled/Wrapper/StyledCustomSearchWrapper';
import StyledSelect from 'components/BizBuilder/styled/Form/StyledSelect';
import StyledInput from 'components/BizBuilder/styled/Form/StyledInput';
import { masterColumnDefs, sapUsageColumn } from './columnDefs';

const AntdInput = StyledInput(Input);
const AntdSelect = StyledSelect(Select);

class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rowData: [],
      isMasterColumns: true,
      requestValue: {
        SAP_NO: '',
        CAS_NO: '',
        KEYWORD: '',
      },
    };
    this.getSearchData = debounce(this.getSearchData, 300);
  }

  defaultColDef = {
    width: 120,
    resizable: true,
  };

  componentDidMount() {
    this.getRowData();
  }

  onGridReady = params => {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    // this.gridOptions = params.options;
    this.gridApi.setDomLayout('normal');
  };

  getRowData = () => {
    const { sagaKey: id, getCallDataHandler } = this.props;
    const apiArr = [
      {
        key: 'chemicalMaterials',
        type: 'GET',
        url: '/api/eshs/v1/common/eshschemicalmaterialmastermanagement',
      },
    ];
    getCallDataHandler(id, apiArr, this.setRowData);
  };

  setRowData = () => {
    const { result } = this.props;
    const { isMasterColumns } = this.state;
    return isMasterColumns
      ? this.setState({
          rowData: (result.chemicalMaterials && result.chemicalMaterials.list) || [],
        })
      : this.setState({
          rowData: (result.sapUsage && result.sapUsage.list) || [],
        });
  };

  handleSelectChange = () => {
    const { sagaKey: id, getCallDataHandler } = this.props;
    const apiArr = [
      {
        key: 'sapUsage',
        url: `/api/eshs/v1/common/chemicalmaterial-sap-usage`,
        type: 'GET',
      },
    ];

    getCallDataHandler(id, apiArr, () =>
      this.setState(prevState => ({ isMasterColumns: !prevState.isMasterColumns, requestValue: { CAS_NO: '', SAP_NO: '', KEYWORD: '' } }), this.setRowData),
    );
  };

  handleInputChange = (value, name) => {
    const { getSearchData } = this;
    const valueObj = { [name]: value };
    this.setState(
      prevState => ({
        requestValue: Object.assign(prevState.requestValue, valueObj),
      }),
      getSearchData,
    );
  };

  getSearchData = () => {
    const { requestValue, isMasterColumns } = this.state;
    const { sagaKey: id, getCallDataHandler } = this.props;
    const postApiArr = [
      {
        key: 'chemicalMaterials',
        type: 'POST',
        url: '/api/eshs/v1/common/eshschemicalmaterialmastermanagement',
        params: requestValue,
      },
    ];

    const getApiArr = [
      {
        key: 'sapUsage',
        url: `/api/eshs/v1/common/chemicalmaterial-sap-usage?SAP_NO=${requestValue.SAP_NO}&CAS_NO=${requestValue.CAS_NO}&KEYWORD=${requestValue.KEYWORD}`,
        type: 'GET',
      },
    ];

    return isMasterColumns ? getCallDataHandler(id, postApiArr, this.setRowData) : getCallDataHandler(id, getApiArr, this.setRowData);
  };

  render() {
    const { defaultColDef } = this;
    const { handleSelectChange, handleInputChange, onGridReady } = this;
    const { rowData, isMasterColumns, requestValue } = this.state;
    return (
      <>
        <div style={{ width: '100%', height: '100%' }}>
          <StyledContentsWrapper>
            <StyledCustomSearchWrapper>
              <div className="search-input-area">
                <div className="text-label">분류</div>
                <AntdSelect defaultValue="Y" onChange={handleSelectChange} className="select-mid mr5" style={{ width: '130px' }}>
                  <AntdSelect.Option value="Y">MASTER</AntdSelect.Option>
                  <AntdSelect.Option value="N">SAP(사용량)</AntdSelect.Option>
                </AntdSelect>
                <div className="text-label">SAP_NO.</div>
                <AntdInput
                  className="ant-input-inline ant-input-mid mr5"
                  onChange={e => handleInputChange(e.target.value, 'SAP_NO')}
                  value={requestValue.SAP_NO}
                  style={{ width: '15%' }}
                  placeholder="SAP_NO."
                />
                <div className="text-label">CAS_NO.</div>
                <AntdInput
                  className="ant-input-inline ant-input-mid mr5"
                  onChange={e => handleInputChange(e.target.value, 'CAS_NO')}
                  value={requestValue.CAS_NO}
                  style={{ width: '15%' }}
                  placeholder="CAS_NO."
                />
                <AntdInput
                  className="ant-input-inline ant-input-mid mr5"
                  onChange={e => handleInputChange(e.target.value, 'KEYWORD')}
                  value={requestValue.KEYWORD}
                  style={{ width: '20%' }}
                  placeholder="화학물질명을 입력하세요."
                />
                <ExcelDownloadComp
                  isBuilder={false}
                  fileName={isMasterColumns ? `${moment().format('YYYYMMDD')}_화학물질관리 마스터` : `${moment().format('YYYYMMDD')}_화학물질관리 SAP 사용량`}
                  className="testClassName"
                  btnText="엑셀 다운로드"
                  sheetName={isMasterColumns ? 'MASTER' : 'SAP사용량'}
                  listData={rowData}
                  btnSize="btn-sm"
                  fields={createExcelData(isMasterColumns ? masterColumnDefs : sapUsageColumn, 'FIELD', 'field')}
                  columns={createExcelData(isMasterColumns ? masterColumnDefs : sapUsageColumn, 'COLUMNS', 'headerName')}
                />
              </div>
            </StyledCustomSearchWrapper>
            <div style={{ width: '100%', height: '450px' }}>
              <div className="ag-theme-balham" style={{ width: '100%', height: 'calc(100% - 25px)' }}>
                <AgGridReact
                  defaultColDef={defaultColDef}
                  columnDefs={isMasterColumns ? masterColumnDefs : sapUsageColumn}
                  rowData={rowData}
                  suppressRowTransform
                  onGridReady={onGridReady}
                />
              </div>
            </div>
            <div className="div-comment div-comment-antd">{`총 ${rowData.length}건`}</div>
          </StyledContentsWrapper>
        </div>
      </>
    );
  }
}

List.propTypes = {
  sagaKey: PropTypes.string,
  getCallDataHandler: PropTypes.func,
  result: PropTypes.arrayOf('object'),
};

export default List;
