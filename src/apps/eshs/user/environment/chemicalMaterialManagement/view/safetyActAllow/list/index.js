import React from 'react';
import PropTypes from 'prop-types';
import ExcelDownloadComp from 'components/BizBuilder/Field/ExcelDownloadComp';
import { createExcelData } from 'apps/eshs/user/environment/chemicalMaterialManagement/view/excelDownloadFunc';
import { debounce } from 'lodash';
import moment from 'moment';

import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';

import { Input } from 'antd';
import StyledContentsWrapper from 'components/BizBuilder/styled/Wrapper/StyledContentsWrapper';
import StyledCustomSearchWrapper from 'components/BizBuilder/styled/Wrapper/StyledCustomSearchWrapper';
import StyledInput from 'components/BizBuilder/styled/Form/StyledInput';
import { columnDefs } from './columnDefs';

const AntdInput = StyledInput(Input);

class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rowData: [],
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
    const { KEYWORD } = this.state;
    const { sagaKey: id, getCallDataHandler } = this.props;
    const apiArr = [
      {
        key: 'chemicalMaterials',
        type: 'GET',
        url: `/api/eshs/v1/common/eshschemicalsafetyallow?KEYWORD=${KEYWORD}`,
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
    const { KEYWORD } = this.state;
    const { sagaKey: id, getCallDataHandler } = this.props;
    const apiArr = [
      {
        key: 'chemicalMaterials',
        type: 'GET',
        url: `/api/eshs/v1/common/eshschemicalsafetyallow?KEYWORD=${KEYWORD}`,
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
        <StyledContentsWrapper>
          <StyledCustomSearchWrapper>
            <div className="search-input-area">
              <div className="text-label">검색</div>
              <AntdInput
                className="ant-input-inline ant-input-mid mr5"
                onChange={e => handleInputChange(e.target.value, 'KEYWORD')}
                style={{ width: '300px' }}
                placeholder="검색어를 입력하세요."
              />
              <div className="btn-area">
                <ExcelDownloadComp
                  isBuilder={false}
                  fileName={`${moment().format('YYYYMMDD')}_산안법(허가대상물질)`}
                  className="testClassName"
                  btnText="엑셀 다운로드"
                  sheetName="허가대상물질"
                  listData={rowData}
                  btnSize="btn-sm"
                  fields={createExcelData(columnDefs, 'FIELD', 'field')}
                  columns={createExcelData(columnDefs, 'COLUMNS', 'headerName')}
                />
              </div>
            </div>
          </StyledCustomSearchWrapper>
          <div style={{ width: '100%', height: '100%' }}>
            <div className="ag-theme-balham" style={{ height: '390px' }}>
              <AgGridReact defaultColDef={defaultColDef} columnDefs={columnDefs} rowData={rowData} suppressRowTransform />
            </div>
          </div>
          <div className="div-comment div-comment-antd">{`총 ${rowData.length}건`}</div>
        </StyledContentsWrapper>
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
