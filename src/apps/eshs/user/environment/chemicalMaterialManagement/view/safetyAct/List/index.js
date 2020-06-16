import React from 'react';
import PropTypes from 'prop-types';
import ExcelDownloadComp from 'components/BizBuilder/Field/ExcelDownloadComp';
import { createExcelData } from 'apps/eshs/user/environment/chemicalMaterialManagement/view/excelDownloadFunc';
import moment from 'moment';

import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';

import { Input } from 'antd';
import ContentsWrapper from 'commonStyled/EshsStyled/Wrapper/ContentsWrapper';
import StyledInput from 'commonStyled/Form/StyledInput';
import { debounce } from 'lodash';
import { columnDefs } from './columnDefs';

const AntdInput = StyledInput(Input);

class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rowData: [],
      CAS_NO: '',
      KEYWORD: '',
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

  getRowData = () => {
    const { CAS_NO, KEYWORD } = this.state;
    const { sagaKey: id, getCallDataHandler } = this.props;
    const apiArr = [
      {
        key: 'chemicalMaterials',
        type: 'GET',
        url: `/api/eshs/v1/common/eshschemicalmaterialsafetyactmanagement?CAS_NO=${CAS_NO}&KEYWORD=${KEYWORD}`,
      },
    ];
    getCallDataHandler(id, apiArr, this.setRowData);
  };

  setRowData = () => {
    const { result } = this.props;
    this.setState({
      rowData: (result.chemicalMaterials && result.chemicalMaterials.list) || [],
    });
  };

  handleInputChange = (value, name) => {
    const { getSearchData } = this;
    this.setState(
      {
        [name]: value,
      },
      getSearchData(),
    );
  };

  getSearchData = () => {
    const { CAS_NO, KEYWORD } = this.state;
    const { sagaKey: id, getCallDataHandler } = this.props;
    const apiArr = [
      {
        key: 'chemicalMaterials',
        type: 'GET',
        url: `/api/eshs/v1/common/eshschemicalmaterialsafetyactmanagement?CAS_NO=${CAS_NO}&KEYWORD=${KEYWORD}`,
      },
    ];
    getCallDataHandler(id, apiArr, this.setRowData);
  };

  render() {
    const { defaultColDef } = this;
    const { handleInputChange } = this;
    const { rowData } = this.state;
    return (
      <>
        <ContentsWrapper>
          <div className="selSaveWrapper alignLeft" style={{ paddingBottom: '10px' }}>
            <div className="textLabel">CAS_NO.</div>
            <AntdInput
              className="ant-input-inline ant-input-mid mr5"
              onChange={e => handleInputChange(e.target.value, 'CAS_NO')}
              style={{ width: '150px' }}
              placeholder="CAS_NO."
            />
            <AntdInput
              className="ant-input-inline ant-input-mid mr5"
              onChange={e => handleInputChange(e.target.value, 'KEYWORD')}
              style={{ width: '300px' }}
              placeholder="화학물질명을 입력하세요."
            />
            <ExcelDownloadComp
              isBuilder={false}
              fileName={`${moment().format('YYYYMMDD')}_산안법(DB)`}
              className="testClassName"
              btnText="엑셀 다운로드"
              sheetName="DB"
              listData={rowData}
              btnSize="btn-sm"
              fields={createExcelData(columnDefs, 'FIELD', 'field')}
              columns={createExcelData(columnDefs, 'COLUMNS', 'headerName')}
            />
          </div>
          <div style={{ width: '100%', height: '100%' }}>
            <div className="ag-theme-balham tableWrapper" style={{ padding: '0px 20px', height: '500px' }}>
              <AgGridReact defaultColDef={defaultColDef} columnDefs={columnDefs} rowData={rowData} suppressRowTransform />
            </div>
          </div>
        </ContentsWrapper>
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
