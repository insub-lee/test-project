import * as PropTypes from 'prop-types';
import React from 'react';
import { Input, Modal, Select } from 'antd';
import StyledVirtualizedTable from 'components/CommonStyled/StyledVirtualizedTable';
import { Table, Column } from 'react-virtualized';
import StyledSearchWrap from 'components/CommonStyled/StyledSearchWrap';
import StyledSearchInput from 'commonStyled/Form/StyledSearchInput';
import StyledContentsModal from 'commonStyled/EshsStyled/Modal/StyledContentsModal';

const AntdModal = StyledContentsModal(Modal);

const { Option } = Select;
const InputGroup = Input.Group;
const AntdSearch = StyledSearchInput(Input.Search);
class EshsCmpnyComp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cmpnyModal: false,
      list: [],
      searchType: 'name',
      searchText: '',
    };
  }

  componentDidMount() {
    // this.handleOnSearch();
  }

  handleOnSearch = () => {
    const { getCallDataHandler, sagaKey: id } = this.props;
    const { searchType, searchText } = this.state;
    const apiValue = [
      searchText
        ? {
            key: 'searchList',
            url: `/api/eshs/v1/common/EshsCmpnyList/${searchType}/${searchText}`,
            type: 'GET',
          }
        : {
            key: 'searchList',
            url: `/api/eshs/v1/common/EshsCmpnyList/null/null`,
            type: 'GET',
          },
    ];
    getCallDataHandler(id, apiValue, this.setSearchList);
  };

  setSearchList = () => {
    const { result } = this.props;
    const list = (result && result.searchList && result.searchList.list) || [];
    this.setState({ list });
  };

  getColumns = () => [
    { label: '코드', dataKey: 'WRK_CMPNY_CD', width: 75, ratio: 10 },
    { label: '이름', dataKey: 'WRK_CMPNY_NM', width: 375, ratio: 50 },
    { label: '사업자등록번호', dataKey: 'BIZ_REG_NO', width: 150, ratio: 20 },
    { label: '전화번호', dataKey: 'TEL', width: 150, ratio: 20 },
  ];

  handleModalVisible = () => {
    const { cmpnyModal } = this.state;
    if (!cmpnyModal) {
      this.handleOnSearch();
    }
    this.setState({
      cmpnyModal: !cmpnyModal,
      searchType: 'name',
      searchText: '',
    });
  };

  onRowClick = e => {
    const { rowData } = e;
    const { changeFormData, sagaKey: id } = this.props;
    this.handleModalVisible();
    changeFormData(id, 'vendor', rowData.WRK_CMPNY_CD);
  };

  handleOnChange = (name, value) => {
    this.setState({ [name]: value });
  };

  render() {
    const { cmpnyModal, list } = this.state;
    const { formData } = this.props;

    return (
      <>
        <AntdSearch
          value={(formData && formData.vendor) || ''}
          readOnly
          style={{ width: 150 }}
          className="input-search-mid"
          onSearch={this.handleModalVisible}
          onClick={this.handleModalVisible}
        />
        <AntdModal title="Vandor 검색" visible={cmpnyModal} width={800} height={600} onCancel={this.handleModalVisible} footer={[]}>
          <StyledSearchWrap>
            <div className="search-group-layer">
              <InputGroup className="search-item search-input-group" compact>
                <Select value={this.state.searchType} onChange={e => this.handleOnChange('searchType', e.target.value)}>
                  <Option value="name">이름</Option>
                  <Option value="code">코드</Option>
                </Select>
                <AntdSearch
                  value={this.state.searchText}
                  onChange={e => this.handleOnChange('searchText', e.target.value)}
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
              headerHeight={40}
              rowHeight={53}
              rowCount={list.length}
              rowGetter={({ index }) => list[index]}
              noRowsRenderer={this.noRowsRenderer}
              onRowClick={this.onRowClick}
            >
              {this.getColumns().map(({ label, dataKey, ratio }) => (
                <Column key={dataKey} label={label} dataKey={dataKey} width={(750 / 100) * ratio} />
              ))}
            </Table>
          </StyledVirtualizedTable>
        </AntdModal>
      </>
    );
  }
}

EshsCmpnyComp.propTypes = {
  changeFormData: PropTypes.func,
  sagaKey: PropTypes.string,
  result: PropTypes.object,
  getCallDataHandler: PropTypes.func,
  formData: PropTypes.object,
};

EshsCmpnyComp.defaultProps = {};

export default EshsCmpnyComp;
