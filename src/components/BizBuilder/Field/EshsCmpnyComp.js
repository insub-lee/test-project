import * as PropTypes from 'prop-types';
import React from 'react';
import { Input, Button, Modal, Select } from 'antd';
import StyledVirtualizedTable from 'components/CommonStyled/StyledVirtualizedTable';
import { Table, Column, AutoSizer } from 'react-virtualized';
import StyledSearchWrap from 'components/CommonStyled/StyledSearchWrap';

const { Option } = Select;

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

  setList = sagaKey => {
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
    const apiValue = [
      {
        key: 'searchList',
        url: `/api/eshs/v1/common/EshsCmpnyList/${searchType}/${searchText}`,
        type: 'GET',
      },
    ];
    getExtraApiData(id, apiValue, this.setSearchList);
  };

  setSearchList = sagaKey => {
    const { extraApiData, colData } = this.props;
    const searchList = (extraApiData && extraApiData.searchList && extraApiData.searchList.list) || [];
    this.setState({ searchList });
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
    } = this.props;
    if (isRequired) {
      // 기본값인지 체크
      changeValidationData(id, COMP_FIELD, rowData.WRK_CMPNY_CD.trim() !== '', rowData.WRK_CMPNY_CD.trim() !== '' ? '' : `${NAME_KOR}항목은 필수 입력입니다.`);
    }
    changeFormData(id, COMP_FIELD, rowData.WRK_CMPNY_CD);
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

  render() {
    const { CONFIG, visible, isSearch, searchCompRenderer } = this.props;
    const { cmpnyModal, cmpny_nm, list, searchList } = this.state;
    if (isSearch && visible && CONFIG.property.searchType !== 'CUSTOM') {
      return searchCompRenderer(this.props);
    }
    let cmpnyList = [];
    if (searchList.length) {
      cmpnyList = searchList;
    } else {
      cmpnyList = list;
    }
    return visible ? (
      <div>
        <Input value={this.state.cmpny_cd} placeholder={CONFIG.property.placeholder} className={CONFIG.property.className || ''} style={{ width: 150 }} />
        <Button shape="circle" icon="search" onClick={this.handleModalVisible} />
        &nbsp; <span>{cmpny_nm}</span>
        <Modal title="Vandor 검색" visible={cmpnyModal} width={800} height={600} onCancel={this.handleModalVisible}>
          <StyledSearchWrap>
            <div className="search-group-layer">
              <Select className="search-item input-width120" value={this.state.searchType} onChange={this.searchTypeChange}>
                <Option value="name">이름</Option>
                <Option value="code">코드</Option>
              </Select>
              <Input
                className="search-item ant-input-group"
                value={this.state.searchText}
                name="searchName"
                onChange={this.handleOnChange}
                placeholder="검색어를 입력하시오"
              />
              &nbsp;&nbsp;
              <Button onClick={this.handleOnSearch}>검색</Button>
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
  COMP_FIELD: PropTypes.any,
  NAME_KOR: PropTypes.any,
  CONFIG: PropTypes.any,
  colData: PropTypes.any,
  changeFormData: PropTypes.any,
  id: PropTypes.any,
  changeValidationData: PropTypes.any,
  readOnly: PropTypes.any,
  compProp: PropTypes.any,
  changeSearchData: PropTypes.any,
};

export default EshsCmpnyComp;
