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
import { columnDefs } from './columnDefs';

const AntdSelect = StyledSelect(Select);
const AntdInput = StyledInput(Input);
class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rowData: [],
      categories: [],
      CAS_NO: '',
      KEYWORD: '',
      CATEGORY_ID: '',
    };
    this.getSearchData = debounce(this.getSearchData, 300);
  }

  defaultColDef = {
    width: 170,
    resizable: true,
  };

  componentDidMount() {
    this.getRowData();
    this.getCategoryList();
  }

  getRowData = () => {
    const { CAS_NO, KEYWORD, CATEGORY_ID } = this.state;
    const { sagaKey: id, getCallDataHandler } = this.props;
    const apiArr = [
      {
        key: 'chemicalMaterials',
        type: 'GET',
        url: `/api/eshs/v1/common/eshschemicalmaterialmanageactview?CAS_NO=${CAS_NO}&KEYWORD=${KEYWORD}&CATEGORY=${CATEGORY_ID}`,
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

  getCategoryList = () => {
    const { sagaKey: id, getCallDataHandler } = this.props;
    const apiArr = [
      {
        key: 'codeCategory',
        type: 'POST',
        url: `/api/admin/v1/common/categoryMapList`,
        params: { PARAM: { NODE_ID: 1976 } },
      },
    ];

    getCallDataHandler(id, apiArr, this.setCategory);
  };

  setCategory = () => {
    const { result } = this.props;
    const category = result.codeCategory.categoryMapList.filter(item => item.PARENT_NODE_ID === 1976);
    this.setState({
      categories: category,
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
    const { CAS_NO, KEYWORD, CATEGORY_ID } = this.state;
    const { sagaKey: id, getCallDataHandler } = this.props;
    const apiArr = [
      {
        key: 'chemicalMaterials',
        type: 'GET',
        url: `/api/eshs/v1/common/eshschemicalmaterialmanageactview?CAS_NO=${CAS_NO}&KEYWORD=${KEYWORD}&CATEGORY=${CATEGORY_ID}`,
      },
    ];
    getCallDataHandler(id, apiArr, this.setRowData);
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
              <div className="text-label">CAS_NO.</div>
              <AntdInput
                className="ant-input-inline ant-input-mid mr5"
                onChange={e => handleInputChange(e.target.value, 'CAS_NO')}
                style={{ width: '150px' }}
                placeholder="CAS_NO."
              />
              <AntdSelect className="select-mid mr5" defaultValue="" onChange={e => handleInputChange(e, 'CATEGORY_ID')} style={{ width: '240px' }}>
                {categories.map(item => (
                  <Select.Option value={item.NODE_ID}>{item.NAME_KOR}</Select.Option>
                ))}
                <Select.Option value="">전체 보기</Select.Option>
              </AntdSelect>
              <AntdInput
                className="ant-input-inline ant-input-mid mr5"
                onChange={e => handleInputChange(e.target.value, 'KEYWORD')}
                style={{ width: '300px' }}
                placeholder="화학물질명을 입력하세요."
              />
              <ExcelDownloadComp
                isBuilder={false}
                fileName={`${moment().format('YYYYMMDD')}_화관법(유해)`}
                className="testClassName"
                btnText="엑셀 다운로드"
                sheetName="화관법(유해)"
                listData={rowData}
                btnSize="btn-sm"
                fields={createExcelData(columnDefs, 'FIELD', 'field')}
                columns={createExcelData(columnDefs, 'COLUMNS', 'headerName')}
              />
            </div>
          </StyledCustomSearchWrapper>
          <div style={{ width: '100%', height: '100%' }}>
            <div className="ag-theme-balham" style={{ height: '450px' }}>
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
