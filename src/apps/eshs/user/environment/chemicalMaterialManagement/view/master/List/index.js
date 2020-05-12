import React from 'react';
import PropTypes from 'prop-types';

import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';

import { Input, Select } from 'antd';
import ContentsWrapper from 'commonStyled/EshsStyled/Wrapper/ContentsWrapper';
import StyledSelect from 'commonStyled/Form/StyledSelect';
import StyledInput from 'commonStyled/Form/StyledInput';
import StyledButton from 'commonStyled/Buttons/StyledButton';
import { debounce } from 'lodash';
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
    this.setState({
      rowData: (result.chemicalMaterials && result.chemicalMaterials.list) || [],
    });
  };

  handleSelectChange = () => {
    this.setState(prevState => ({
      isMasterColumns: !prevState.isMasterColumns,
    }));
  };

  handleInputChange = (value, name) => {
    const { getSearchData } = this;
    const valueObj = { [name]: value };
    this.setState(
      prevState => ({
        requestValue: Object.assign(prevState.requestValue, valueObj),
      }),
      getSearchData(),
    );
  };

  getSearchData = () => {
    const { requestValue } = this.state;
    const { sagaKey: id, getCallDataHandler } = this.props;
    const apiArr = [
      {
        key: 'chemicalMaterials',
        type: 'POST',
        url: '/api/eshs/v1/common/eshschemicalmaterialmastermanagement',
        params: requestValue,
      },
    ];
    getCallDataHandler(id, apiArr);
  };

  render() {
    const { defaultColDef } = this;
    const { handleSelectChange, handleInputChange } = this;
    const { rowData, isMasterColumns } = this.state;
    return (
      <>
        <ContentsWrapper>
          <div className="selSaveWrapper alignLeft" style={{ paddingBottom: '10px' }}>
            <div className="textLabel">분류</div>
            <AntdSelect defaultValue="Y" onChange={handleSelectChange} className="select-mid mr5" style={{ width: '130px' }}>
              <AntdSelect.Option value="Y">전체</AntdSelect.Option>
              <AntdSelect.Option value="N">SAP(사용량)</AntdSelect.Option>
            </AntdSelect>
            <div className="textLabel">SAP_NO.</div>
            <AntdInput
              className="ant-input-inline ant-input-mid mr5"
              onChange={e => handleInputChange(e.target.value, 'SAP_NO')}
              style={{ width: '150px' }}
              placeholder="SAP_NO."
            />
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
            <StyledButton className="btn-primary" onClick={() => console.debug('@@EXCEL DOWNLOAD@@')}>
              엑셀 받기
            </StyledButton>
          </div>
          <div style={{ width: '100%', height: '100%' }}>
            <div className="ag-theme-balham tableWrapper" style={{ padding: '0px 20px', height: '500px' }}>
              <AgGridReact
                defaultColDef={defaultColDef}
                columnDefs={isMasterColumns ? masterColumnDefs : sapUsageColumn}
                rowData={rowData}
                suppressRowTransform
              />
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
