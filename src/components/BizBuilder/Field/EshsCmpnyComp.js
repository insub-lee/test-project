import * as PropTypes from 'prop-types';
import React from 'react';
import { Input, Modal, Select, Button } from 'antd';
import StyledVirtualizedTable from 'components/BizBuilder/styled/Table/StyledVirtualizedTable';
import { Table, Column } from 'react-virtualized';
import StyledSearchWrap from 'components/CommonStyled/StyledSearchWrap';
import StyledSearchInput from 'components/BizBuilder/styled/Form/StyledSearchInput';
import StyledSelect from 'components/BizBuilder/styled/Form/StyledSelect';
import StyledContentsModal from 'commonStyled/EshsStyled/Modal/StyledContentsModal';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';

const AntdModal = StyledContentsModal(Modal);

const { Option } = Select;
const InputGroup = Input.Group;
const AntdSearch = StyledSearchInput(Input.Search);
const AntdSelect = StyledSelect(Select);
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
  }

  componentDidMount() {
    const {
      getExtraApiData,
      sagaKey: id,
      CONFIG: {
        property: { GUBUN },
      },
    } = this.props;
    const gubun = (this.props && this.props.CONFIG && this.props.CONFIG.property && this.props.CONFIG.property.GUBUN) || 'SQ';
    const apiValue = [
      {
        key: 'cmpnyList',
        url: `/api/eshs/v1/common/EshsCmpnyList?gubun=${gubun}`,
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

  static getDerivedStateFromProps(nextProps, prevState) {
    // colData가 바뀔 때 마다 state 바꿔서 다시 렌더링
    const list = (nextProps.extraApiData && nextProps.extraApiData.cmpnyList && nextProps.extraApiData.cmpnyList.list) || [];
    const data = list.filter(c => c.WRK_CMPNY_CD === nextProps.colData);
    if (!data.length) {
      return { cmpny_cd: '', cmpny_nm: '' };
    }
    if (prevState.cmpny_cd !== nextProps.colData && data.length) {
      return { cmpny_cd: nextProps.colData, cmpny_nm: data[0].WRK_CMPNY_NM };
    }
    return null;
  }

  handleOnSearch = () => {
    const { getExtraApiData, sagaKey: id } = this.props;
    const { searchType, searchText } = this.state;
    const apiValue = [];
    const gubun = (this.props && this.props.CONFIG && this.props.CONFIG.property && this.props.CONFIG.property.GUBUN) || 'SQ';

    if (searchText) {
      apiValue.push({
        key: 'searchList',
        url: `/api/eshs/v1/common/EshsCmpnyList?searchType=${searchType}&searchText=${searchText}&gubun=${gubun}`,
        type: 'GET',
      });
      getExtraApiData(id, apiValue, this.setSearchList);
    }
  };

  // setSearchList = sagaKey => {
  setSearchList = () => {
    const { extraApiData } = this.props;
    const searchList = (extraApiData && extraApiData.searchList && extraApiData.searchList.list) || [];
    this.setState({ searchList, listType: 'search' });
  };

  getColumns = () => {
    const gubun = (this.props && this.props.CONFIG && this.props.CONFIG.property && this.props.CONFIG.property.GUBUN) || 'SQ';
    if (gubun === 'SQ') {
      return [
        { label: '코드', dataKey: 'WRK_CMPNY_CD', width: 75, ratio: 10 },
        { label: '이름', dataKey: 'WRK_CMPNY_NM', width: 375, ratio: 50 },
        { label: '사업자등록번호', dataKey: 'BIZ_REG_NO', width: 150, ratio: 20 },
        { label: '전화번호', dataKey: 'TEL', width: 150, ratio: 20 },
      ];
    }
    return [
      { label: '지역', dataKey: 'SITE', width: 75, ratio: 10 },
      { label: '년도', dataKey: 'YEAR', width: 75, ratio: 10 },
      { label: '이름', dataKey: 'WRK_CMPNY_NM', width: 375, ratio: 50 },
      { label: '코드', dataKey: 'WRK_CMPNY_CD', width: 75, ratio: 10 },
      { label: '사업자등록번호', dataKey: 'BIZ_REG_NO', width: 150, ratio: 20 },
      { label: '전화번호', dataKey: 'TEL', width: 150, ratio: 20 },
    ];
  };

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
      formData,
      setFormData,
      changeFormData,
      sagaKey: id,
      CONFIG: {
        property: { isRequired, ADD_FORMDATA, PRSDNT_NM_FIELD, ADDRESS_FIELD, TEL_FIELD },
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
    // 추가 폼데이터 옵션을 사용할시
    if (ADD_FORMDATA && ADD_FORMDATA === 'Y') {
      const pnf = PRSDNT_NM_FIELD && PRSDNT_NM_FIELD === '' ? 'PRSDNT_NM' : PRSDNT_NM_FIELD;
      const af = ADDRESS_FIELD && ADDRESS_FIELD === '' ? 'ADDRESS' : ADDRESS_FIELD;
      const tf = TEL_FIELD && TEL_FIELD === '' ? 'TEL' : TEL_FIELD;
      const nextFormData = {
        ...formData,
        [COMP_FIELD]: rowData.WRK_CMPNY_CD,
        [pnf]: rowData.PRSDNT_NM,
        [af]: rowData.ADDRESS,
        [tf]: rowData.TEL,
      };
      setFormData(id, nextFormData);
    } else {
      changeFormData(id, COMP_FIELD, rowData.WRK_CMPNY_CD);
    }
    if (eshsCmpnyCompResult) {
      eshsCmpnyCompResult(rowData, COMP_FIELD);
    }
  };

  handleOnChange = (value, target) => {
    this.setState({
      [target]: value,
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
    const { CONFIG, visible, readOnly, searchWidth, directSearchTable } = this.props;
    const { cmpnyModal, cmpny_nm, list, searchList, listType, cursor, cmpnyInfo, searchText, searchType } = this.state;
    const gubun = (this.props && this.props.CONFIG && this.props.CONFIG.property && this.props.CONFIG.property.GUBUN) || 'SQ';
    let cmpnyList = [];
    if (listType === 'search') {
      cmpnyList = searchList;
    } else {
      cmpnyList = list;
    }
    if (readOnly || CONFIG.property.readOnly) {
      return visible ? <span>&nbsp;{cmpny_nm}</span> : '';
    }
    console.debug('프롭', this.props);
    return visible ? (
      <>
        {directSearchTable ? (
          <>
            <StyledSearchWrap>
              <div className="search-group-layer mb0">
                <InputGroup className="search-item search-input-group" compact>
                  {gubun === 'SQ' && (
                    <AntdSelect className="select-sm" value={searchType} onChange={value => this.handleOnChange(value, 'searchType')}>
                      <Option value="name">이름</Option>
                      <Option value="code">코드</Option>
                    </AntdSelect>
                  )}
                  {gubun === 'SW' && (
                    <AntdSelect className="select-sm" value={searchType} onChange={value => this.handleOnChange(value, 'searchType')}>
                      <Option value="name">이름</Option>
                      <Option value="code">코드</Option>
                      <Option value="site">작업지역</Option>
                      <Option value="year">년도</Option>
                    </AntdSelect>
                  )}
                  <AntdSearch
                    className="searchInput input-search-sm"
                    name="searchName"
                    value={searchText}
                    onChange={e => this.handleOnChange(e.target.value, 'searchText')}
                    placeholder="검색어를 입력하시오"
                    onSearch={this.handleOnSearch}
                  />
                </InputGroup>
              </div>
            </StyledSearchWrap>
            <StyledVirtualizedTable>
              <Table
                width={750}
                height={500}
                headerHeight={35}
                rowHeight={30}
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
          </>
        ) : (
          <div>
            <AntdSearch
              value={this.state.cmpny_cd}
              readOnly
              placeholder={CONFIG.property.placeholder}
              className={CONFIG.property.className}
              style={{ width: searchWidth }}
              onSearch={this.handleModalVisible}
              onClick={this.handleModalVisible}
            />
            {/* <Button shape="circle" icon="search" onClick={this.handleModalVisible} /> */}
            &nbsp; <span>{cmpny_nm}</span>
            <AntdModal
              title="Vandor 검색"
              visible={cmpnyModal}
              width={800}
              height={600}
              footer={[
                <StyledButton className="btn-light btn-sm" onClick={this.handleModalVisible}>
                  닫기
                </StyledButton>,
              ]}
              onCancel={this.handleModalVisible}
            >
              <StyledSearchWrap>
                <div className="search-group-layer mb0">
                  {/* <InputGroup className="search-item search-input-group" compact>
                    <AntdSelect className="select-sm" value={searchType} onChange={this.searchTypeChange}>
                      <Option value="name">이름</Option>
                      <Option value="code">코드</Option>
                    </AntdSelect>
                    <AntdSearch
                      className="input-search-sm"
                      value={this.state.searchText}
                      name="searchName"
                      onChange={this.handleOnChange}
                      placeholder="검색어를 입력하시오"
                      onSearch={this.handleOnSearch}
                    />
                  </InputGroup> */}

                  <InputGroup className="search-item search-input-group" compact>
                    <AntdSelect className="select-sm" value={searchType} onChange={value => this.handleOnChange(value, 'searchType')}>
                      <Option value="name">이름</Option>
                      <Option value="code">코드</Option>
                    </AntdSelect>
                    <AntdSearch
                      className="searchInput input-search-sm"
                      name="searchName"
                      value={searchText}
                      onChange={e => this.handleOnChange(e.target.value, 'searchText')}
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
                  headerHeight={35}
                  rowHeight={30}
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
            </AntdModal>
          </div>
        )}
      </>
    ) : (
      ''
    );
  }
}

EshsCmpnyComp.propTypes = {
  COMP_FIELD: PropTypes.string,
  NAME_KOR: PropTypes.string,
  CONFIG: PropTypes.object,
  colData: PropTypes.string,
  changeFormData: PropTypes.func,
  setFormData: PropTypes.func,
  sagaKey: PropTypes.string,
  changeValidationData: PropTypes.func,
  readOnly: PropTypes.bool,
  eshsCmpnyCompResult: PropTypes.func,
  visible: PropTypes.bool,
  extraApiData: PropTypes.object,
  getExtraApiData: PropTypes.func,
  searchWidth: PropTypes.any,
  formData: PropTypes.object,
};

EshsCmpnyComp.defaultProps = {
  searchWidth: 150,
};

export default EshsCmpnyComp;
