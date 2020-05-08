import React from 'react';
import PropTypes from 'prop-types';

import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';

import { Input } from 'antd';
import ContentsWrapper from 'commonStyled/EshsStyled/Wrapper/ContentsWrapper';
import StyledInput from 'commonStyled/Form/StyledInput';
import StyledButton from 'commonStyled/Buttons/StyledButton';
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
    width: 250,
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
        url: `/api/eshs/v1/common/eshschemicalmaterialregiactview?CAS_NO=${CAS_NO}&KEYWORD=${KEYWORD}`,
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
        url: `/api/eshs/v1/common/eshschemicalmaterialregiactview?CAS_NO=${CAS_NO}&KEYWORD=${KEYWORD}`,
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
