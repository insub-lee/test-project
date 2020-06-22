import React from 'react';
import PropTypes from 'prop-types';
import ExcelDownloadComp from 'components/BizBuilder/Field/ExcelDownloadComp';
import { createExcelData } from 'apps/eshs/user/environment/chemicalMaterialManagement/view/excelDownloadFunc';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import moment from 'moment';

import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';

import { Input, Select } from 'antd';
import StyledContentsWrapper from 'components/BizBuilder/styled/Wrapper/StyledContentsWrapper';
import StyledCustomSearchWrapper from 'components/BizBuilder/styled/Wrapper/StyledCustomSearchWrapper';
import StyledInput from 'components/BizBuilder/styled/Form/StyledInput';
import StyledSelect from 'components/BizBuilder/styled/Form/StyledSelect';
import { columnDefs } from './columnDefs';

const AntdInput = StyledInput(Input);
const AntdSelect = StyledSelect(Select);

class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rowData: [],
      CAS_NO: '',
      KEYWORD: '',
      CATEGORY: '',
      categories: [],
    };
  }

  defaultColDef = {
    width: 120,
    resizable: true,
  };

  componentDidMount() {
    this.getCategoryList();
    this.getRowData();
  }

  getCategoryList = () => {
    const { sagaKey: id, getCallDataHandler } = this.props;
    const apiArr = [
      {
        key: 'codeCategory',
        type: 'POST',
        url: `/api/admin/v1/common/categoryMapList`,
        params: { PARAM: { NODE_ID: 1952 } },
      },
    ];

    getCallDataHandler(id, apiArr, this.setCategory);
  };

  setCategory = () => {
    const { result } = this.props;
    const category = result.codeCategory.categoryMapList.filter(item => item.PARENT_NODE_ID === 1952);
    this.setState({
      categories: category,
    });
  };

  getRowData = () => {
    const { CAS_NO, KEYWORD, CATEGORY } = this.state;
    const { sagaKey: id, getCallDataHandler } = this.props;
    const apiArr = [
      {
        key: 'chemicalMaterials',
        type: 'GET',
        url: `/api/eshs/v1/common/eshschemicalmaterialsafemanagedview?CAS_NO=${CAS_NO}&KEYWORD=${KEYWORD}&CATEGORY=${CATEGORY}`,
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
    this.setState({
      [name]: value,
    });
  };

  render() {
    const { defaultColDef } = this;
    const { handleInputChange } = this;
    const { rowData, categories } = this.state;
    return (
      <>
        <StyledContentsWrapper>
          <StyledCustomSearchWrapper>
            <div className="search-input-area">
              <AntdSelect className="select-mid mr5" defaultValue="" onChange={e => handleInputChange(e, 'CATEGORY')} style={{ width: '145px' }}>
                {categories.map(item => (
                  <Select.Option value={item.NODE_ID}>{item.NAME_KOR}</Select.Option>
                ))}
                <Select.Option value="">전체 보기</Select.Option>
              </AntdSelect>
              <div className="text-label">CAS_NO.</div>
              <AntdInput
                className="ant-input-inline ant-input-mid mr5"
                onChange={e => handleInputChange(e.target.value, 'CAS_NO')}
                style={{ width: '150px' }}
                placeholder="CAS_NO."
                onPressEnter={this.getRowData}
              />
              <div className="text-label">화학물질명</div>
              <AntdInput
                className="ant-input-inline ant-input-mid mr5"
                onChange={e => handleInputChange(e.target.value, 'KEYWORD')}
                style={{ width: '300px' }}
                placeholder="화학물질명을 입력하세요."
                onPressEnter={this.getRowData}
              />
              <div className="btn-area">
                <StyledButton className="btn-gray btn-sm mr5" onClick={this.getRowData}>
                  검색
                </StyledButton>
                <ExcelDownloadComp
                  isBuilder={false}
                  fileName={`${moment().format('YYYYMMDD')}_산안법(관리대상유해물질)`}
                  className="testClassName"
                  btnText="엑셀 다운로드"
                  sheetName="관리대상유해물질"
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
