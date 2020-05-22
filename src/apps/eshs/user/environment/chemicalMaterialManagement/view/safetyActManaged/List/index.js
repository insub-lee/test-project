import React from 'react';
import PropTypes from 'prop-types';

import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';

import { Input, Select } from 'antd';
import ContentsWrapper from 'commonStyled/EshsStyled/Wrapper/ContentsWrapper';
import StyledInput from 'commonStyled/Form/StyledInput';
import StyledButton from 'commonStyled/Buttons/StyledButton';
import { debounce } from 'lodash';
import StyledSelect from 'commonStyled/Form/StyledSelect';
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
    this.getSearchData = debounce(this.getSearchData, 300);
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
    const { getSearchData } = this;
    this.setState(
      {
        [name]: value,
      },
      getSearchData(),
    );
  };

  getSearchData = () => {
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

  render() {
    const { defaultColDef } = this;
    const { handleInputChange } = this;
    const { rowData, categories } = this.state;
    return (
      <>
        <ContentsWrapper>
          <div className="selSaveWrapper alignLeft" style={{ paddingBottom: '10px' }}>
            <AntdSelect className="select-mid mr5" defaultValue="" onChange={e => handleInputChange(e, 'CATEGORY')} style={{ width: '145px' }}>
              {categories.map(item => (
                <Select.Option value={item.NODE_ID}>{item.NAME_KOR}</Select.Option>
              ))}
              <Select.Option value="">전체 보기</Select.Option>
            </AntdSelect>
            <div className="textLabel">CAS_NO.</div>
            <AntdInput
              className="ant-input-inline ant-input-mid mr5"
              onChange={e => handleInputChange(e.target.value, 'CAS_NO')}
              style={{ width: '150px' }}
              placeholder="CAS_NO."
            />
            <div className="textLabel">화학물질명</div>
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
