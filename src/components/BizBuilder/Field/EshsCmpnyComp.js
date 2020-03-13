import * as PropTypes from 'prop-types';
import React from 'react';
// import { Input, Button, Modal, Select } from 'antd';
import { Input, Modal, Select } from 'antd';
import StyledVirtualizedTable from 'components/CommonStyled/StyledVirtualizedTable';
// import { Table, Column, AutoSizer } from 'react-virtualized';
import { Table, Column } from 'react-virtualized';
import StyledSearchWrap from 'components/CommonStyled/StyledSearchWrap';

const { Option } = Select;
const { Search } = Input;
const InputGroup = Input.Group;
class EshsCmpnyComp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cmpnyModal: false,
      cmpny_nm: '',
      cmpny_cd: '',
      list: [],
      searchList: [],
      searchType: 'name',
      searchText: '',
      listType: 'init',
      cursor: {},
    };
    // this.handleOnChange = debounce(this.handleOnChange, 300);
  }

  componentDidMount() {
    const { getExtraApiData, sagaKey: id } = this.props;
    const apiValue = [
      {
        key: 'cmpnyList',
        url: '/api/eshs/v1/common/EshsCmpnyList/null/null',
        type: 'GET',
      },
    ];
    getExtraApiData(id, apiValue, this.setList);
  }

  // onChange = () => this.props.extraApiData;

  // setList = sagaKey => {
  setList = () => {
    const { extraApiData, colData } = this.props;
    const list = (extraApiData && extraApiData.cmpnyList && extraApiData.cmpnyList.list) || [];
    const data = list.filter(c => c.WRK_CMPNY_CD === colData);
    if (data.length) {
      this.setState({
        cmpny_cd: data[0].WRK_CMPNY_CD,
        cmpny_nm: data[0].WRK_CMPNY_NM,
      });
    }
    this.setState({ list });
  };

  handleOnSearch = () => {
    const { getExtraApiData, sagaKey: id } = this.props;
    const { searchType, searchText } = this.state;
    const apiValue = [];
    if (searchText) {
      apiValue.push({
        key: 'searchList',
        url: `/api/eshs/v1/common/EshsCmpnyList/${searchType}/${searchText}`,
        type: 'GET',
      });
    } else {
      apiValue.push({
        key: 'searchList',
        url: `/api/eshs/v1/common/EshsCmpnyList/null/null`,
        type: 'GET',
      });
    }
    getExtraApiData(id, apiValue, this.setSearchList);
  };

  // setSearchList = sagaKey => {
  setSearchList = () => {
    const { extraApiData } = this.props;
    const searchList = (extraApiData && extraApiData.searchList && extraApiData.searchList.list) || [];
    this.setState({ searchList, listType: 'search' });
  };

  getColumns = () => [
    { label: '코드', dataKey: 'WRK_CMPNY_CD', width: 75, ratio: 10 },
    { label: '이름', dataKey: 'WRK_CMPNY_NM', width: 375, ratio: 50 },
    { label: '사업자등록번호', dataKey: 'BIZ_REG_NO', width: 150, ratio: 20 },
    { label: '전화번호', dataKey: 'TEL', width: 150, ratio: 20 },
  ];

  handleModalVisible = () => {
    const { readOnly } = this.props;
    if (!readOnly) {
      const { cmpnyModal } = this.state;
      this.setState({
        cmpnyModal: !cmpnyModal,
        listType: 'init',
        searchType: 'name',
        searchText: '',
      });
    }
  };

  onRowClick = e => {
    const { rowData } = e;
    this.setState({
      cmpny_cd: rowData.WRK_CMPNY_CD,
      cmpny_nm: rowData.WRK_CMPNY_NM,
      cmpnyModal: false,
      searchType: 'name',
      searchText: '',
      searchList: [],
    });

    const {
      changeFormData,
      sagaKey: id,
      CONFIG: {
        property: { isRequired },
      },
      COMP_FIELD,
      NAME_KOR,
      changeValidationData,
      eshsCmpnyCompResult,
    } = this.props;
    if (isRequired) {
      // 기본값인지 체크
      changeValidationData(id, COMP_FIELD, rowData.WRK_CMPNY_CD.trim() !== '', rowData.WRK_CMPNY_CD.trim() !== '' ? '' : `${NAME_KOR}항목은 필수 입력입니다.`);
    }
    changeFormData(id, COMP_FIELD, rowData.WRK_CMPNY_CD);
    if (eshsCmpnyCompResult) {
      eshsCmpnyCompResult(rowData, COMP_FIELD);
    }
  };

  handleOnChange = e => {
    this.setState({
      searchText: e.target.value,
    });
  };

  searchTypeChange = e => {
    this.setState({
      searchType: e,
    });
  };

  handleRowMouseOver = () => {
    this.setState({
      cursor: { cursor: 'pointer' },
    });
  };

  handleRowMouseOut = () => {
    this.setState({
      cursor: {},
    });
  };

  render() {
    const { CONFIG, visible, readOnly } = this.props;
    const { cmpnyModal, cmpny_nm, list, searchList, listType, cursor } = this.state;
    let cmpnyList = [];
    if (listType === 'search') {
      cmpnyList = searchList;
    } else {
      cmpnyList = list;
    }
    if (readOnly || CONFIG.property.readOnly) {
      return visible ? <span>&nbsp;{cmpny_nm}</span> : '';
    }
    return visible ? (
      <div>
        <Search
          value={this.state.cmpny_cd}
          readOnly
          placeholder={CONFIG.property.placeholder}
          className={CONFIG.property.className || ''}
          style={{ width: 150 }}
          onSearch={this.handleModalVisible}
        />
        {/* <Button shape="circle" icon="search" onClick={this.handleModalVisible} /> */}
        &nbsp; <span>{cmpny_nm}</span>
        <Modal title="Vandor 검색" visible={cmpnyModal} width={800} height={600} onCancel={this.handleModalVisible}>
          <StyledSearchWrap>
            <div className="search-group-layer">
              <InputGroup className="search-item search-input-group" compact>
                <Select value={this.state.searchType} onChange={this.searchTypeChange}>
                  <Option value="name">이름</Option>
                  <Option value="code">코드</Option>
                </Select>
                <Search
                  // className="search-item ant-input-group"
                  value={this.state.searchText}
                  name="searchName"
                  onChange={this.handleOnChange}
                  placeholder="검색어를 입력하시오"
                  onSearch={this.handleOnSearch}
                />
              </InputGroup>
              {/* &nbsp;&nbsp;
              <Button onClick={this.handleOnSearch}>검색</Button> */}
            </div>
          </StyledSearchWrap>
          <StyledVirtualizedTable>
            <Table
              width={750}
              height={500}
              headerHeight={40}
              rowHeight={53}
              rowCount={cmpnyList.length}
              rowGetter={({ index }) => cmpnyList[index]}
              noRowsRenderer={this.noRowsRenderer}
              onRowClick={this.onRowClick}
              onRowMouseOver={this.handleRowMouseOver}
              onRowMouseOut={this.handleRowMouseOut}
              style={cursor}
            >
              {this.getColumns().map(({ label, dataKey, ratio }) => (
                <Column key={dataKey} label={label} dataKey={dataKey} width={(750 / 100) * ratio} />
              ))}
            </Table>
          </StyledVirtualizedTable>
        </Modal>
      </div>
    ) : (
      ''
    );
  }
}

EshsCmpnyComp.propTypes = {
  COMP_FIELD: PropTypes.object,
  NAME_KOR: PropTypes.string,
  CONFIG: PropTypes.object,
  colData: PropTypes.object,
  changeFormData: PropTypes.func,
  sagaKey: PropTypes.string,
  changeValidationData: PropTypes.func,
  readOnly: PropTypes.bool,
  eshsCmpnyCompResult: PropTypes.func,
  visible: PropTypes.bool,
  extraApiData: PropTypes.object,
  getExtraApiData: PropTypes.func,
};

export default EshsCmpnyComp;
