/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { Modal, Select, Input, DatePicker, message } from 'antd';
import { Table, Column, AutoSizer } from 'react-virtualized';
import StyledVirtualizedTable from 'components/CommonStyled/StyledVirtualizedTable';
import StyledButton from 'components/BizBuilder/styled/StyledButton';
import StyledSearchWrap from 'components/CommonStyled/StyledSearchWrap';
import moment from 'moment';
import NothGateCmpnyModal from '../NothGateCmpnyModal';
import ListSearchStyled from './ListSearchStyled';

const { Option } = Select;
const { RangePicker } = DatePicker;
const format = 'YYYY-MM-DD HH:mm:ss';
moment.locale('ko');
class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recordList: [],
      nothGateModal: false,
      type: '',
    };
  }

  handleAppStart = () => {
    const { result, id, changeFormData } = this.props;
    const recordList = (result && result.recordList && result.recordList.recordList) || [];
    this.setState({
      recordList,
    });
  };

  componentDidMount = () => {
    const { id, getCallDataHandler, apiAry } = this.props;
    getCallDataHandler(id, apiAry, this.handleAppStart);
  };

  onRowClick = e => {
    const { id, changeFormData } = this.props;
    const { rowData } = e;
    const visit_date = (rowData && rowData.visit_date) || null;
    const visitor_in_date = (rowData && rowData.visitor_in_date) || null;
    const visitor_out_date = (rowData && rowData.visitor_out_date) || null;
    const work_area_cd = (rowData && rowData.work_area_cd) || '';
    changeFormData(id, 'modal', {
      type: 'UPDATE',
      is_modal: true,
      info: {
        ...rowData,
        work_area_cd: work_area_cd === '청주' ? 'CJ' : 'GM',
        visitor_out_date: moment(`${visit_date} ${visitor_out_date}`).format(format),
        visitor_in_date: moment(`${visit_date} ${visitor_in_date}`).format(format),
      },
    });
  };

  noRowsRenderer = () => <div className="noRows">결과없음</div>;

  getColumns = () => [
    { label: '지역', dataKey: 'work_area_cd', width: 120, ratio: 8 },
    { label: '일자', dataKey: 'visit_date', width: 180, ratio: 12 },
    { label: '업체명', dataKey: 'wrk_cmpny_nm', width: 300, ratio: 20 },
    { label: '사업자등록번호', dataKey: 'biz_reg_no', width: 255, ratio: 17 },
    { label: '이름', dataKey: 'visitor_name', width: 150, ratio: 10 },
    { label: '출입시간', dataKey: 'visitor_in_date', width: 120, ratio: 8 },
    { label: '퇴장시간', dataKey: 'visitor_out_date', width: 120, ratio: 8 },
    { label: '출입구분', dataKey: 'visitor_type', width: 120, ratio: 8 },
    { label: '업체등록여부', dataKey: 'wrk_reg', width: 135, ratio: 9 },
  ];

  getTablewidth = () => {
    this.getColumns()
      .map(({ width }) => width)
      .reduce((a, b) => a + b);
  };

  handleModalOpen = () => {
    const { id, changeFormData } = this.props;
    const now = new Date();
    const now2 = new Date(`${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`);

    changeFormData(id, 'modal', {
      type: 'INSERT',
      is_modal: true,
      info: { work_area_cd: 'CJ', visitor_type: 'N', visitor_in_date: moment().format(format), visitor_out_date: moment(now2, format) },
    });
  };

  handleCancel = () => {
    const { id, changeFormData } = this.props;
    changeFormData(id, 'modal', { type: '', is_modal: false, info: {} });
  };

  handleSiteOnChange = e => {
    const { id, changeFormData, formData } = this.props;
    const search = (formData && formData.search) || {};
    changeFormData(id, 'search', { ...search, WORK_AREA_CD: e });
  };

  handleDateOnChange = (data, dateString) => {
    const { id, changeFormData, formData } = this.props;
    const search = (formData && formData.search) || {};
    changeFormData(id, 'search', { ...search, FROM_DATE: dateString[0], TO_DATE: dateString[1] });
  };

  handleInputOnChange = e => {
    const { id, changeFormData, formData } = this.props;
    const search = (formData && formData.search) || {};
    changeFormData(id, 'search', { ...search, [e.target.name]: e.target.value });
  };

  handleRegOnChange = e => {
    const { id, changeFormData, formData } = this.props;
    const search = (formData && formData.search) || {};
    changeFormData(id, 'search', { ...search, WRK_REG: e });
  };

  handleOnSearch = () => {
    const { id, getCallDataHanlder, formData } = this.props;
    console.debug('getCallDataHanlder  ', getCallDataHanlder);
    const search = (formData && formData.search) || {};
    const apiAry = [
      {
        key: 'searchList',
        type: 'POST',
        url: '/api/eshs/v1/common/eshsAccessRecord',
        params: search,
      },
    ];
    getCallDataHanlder(id, apiAry, this.onSearchCallBack);
  };

  onSearchCallBack = sagaKey => {
    console.debug('asdasd');
    const { result } = this.props;

    const recordList = (result && result.searchList && result.searchList.recordList) || [];
    this.setState({
      recordList,
    });
  };

  handleTypeOnChange = e => {
    const { id, changeFormData, formData } = this.props;
    const search = (formData && formData.search) || {};
    changeFormData(id, 'search', { ...search, VISITOR_TYPE: e });
  };

  handleDwExcel = () => {
    message.warning('미구현');
  };

  render() {
    const { recordList, nothGateModal } = this.state;
    const { formData } = this.props;
    const search = (formData && formData.search) || {};
    const is_modal = (formData && formData.modal && formData.modal.is_modal) || false;
    const modalType = (formData && formData.modal && formData.modal.type) || '';

    return (
      <div>
        <ListSearchStyled>
          <div className="search-group-layer">
            <table>
              <tbody>
                <tr>
                  <td>지역</td>
                  <td colSpan={3}>
                    <Select defaultValue="" className="search-item input-width120" onChange={this.handleSiteOnChange} style={{ width: '10%' }}>
                      <Option value="">지역 전체</Option>
                      <Option value="청주">청주</Option>
                      <Option value="구미">구미</Option>
                    </Select>
                  </td>
                </tr>
                <tr>
                  <td>업체명</td>
                  <td>
                    <Input
                      placeholder="업체명"
                      value={search.WRK_CMPNY_NM || ''}
                      name="WRK_CMPNY_NM"
                      className="search-item input-width200"
                      onChange={this.handleInputOnChange}
                    />
                  </td>
                  <td>사업자등록번호</td>
                  <td>
                    <Input
                      placeholder="사업자 등록번호"
                      value={search.BIZ_REG_NO || ''}
                      name="BIZ_REG_NO"
                      className="search-item input-width200"
                      onChange={this.handleInputOnChange}
                    />
                  </td>
                </tr>
                <tr>
                  <td>방문자 성명</td>
                  <td>
                    <Input
                      placeholder="방문자 성명"
                      value={search.VISITOR_NAME || ''}
                      name="VISITOR_NAME"
                      className="search-item input-width160"
                      onChange={this.handleInputOnChange}
                    />
                  </td>
                  <td>출입구분</td>
                  <td>
                    <Select defaultValue="" className="search-item input-width120" onChange={this.handleTypeOnChange} style={{ width: '20%' }}>
                      <Option value="">전체</Option>
                      <Option value="일일">일일</Option>
                      <Option value="북/후문">북/후문</Option>
                      <Option value="상시">상시</Option>
                    </Select>
                  </td>
                </tr>
                <tr>
                  <td>출입기간</td>
                  <td>
                    <RangePicker onChange={this.handleDateOnChange} className="margin-term" style={{ width: '100%' }} />
                  </td>
                  <td>업체등록여부</td>
                  <td>
                    <Select defaultValue="" className="search-item input-width200" onChange={this.handleRegOnChange} style={{ width: '20%' }}>
                      <Option value="">선택</Option>
                      <Option value="등록">등록</Option>
                      <Option value="미등록">미등록</Option>
                    </Select>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </ListSearchStyled>
        {/* <StyledSearchWrap>
          <div className="search-group-layer">
            <Select defaultValue="" className="search-item input-width120" onChange={this.handleSiteOnChange}>
              <Option value="">지역 전체</Option>
              <Option value="청주">청주</Option>
              <Option value="구미">구미</Option>
            </Select>
            <Select defaultValue="" className="search-item input-width120" onChange={this.handleTypeOnChange}>
              <Option value="">전체</Option>
              <Option value="일일">일일</Option>
              <Option value="북/후문">북/후문</Option>
              <Option value="상시">상시</Option>
            </Select>
            <Input
              placeholder="업체명"
              value={search.WRK_CMPNY_NM || ''}
              name="WRK_CMPNY_NM"
              className="search-item input-width200"
              onChange={this.handleInputOnChange}
            />
            <Input
              placeholder="사업자 등록번호"
              value={search.BIZ_REG_NO || ''}
              name="BIZ_REG_NO"
              className="search-item input-width200"
              onChange={this.handleInputOnChange}
            />
            <Input
              placeholder="방문자 성명"
              value={search.VISITOR_NAME || ''}
              name="VISITOR_NAME"
              className="search-item input-width160"
              onChange={this.handleInputOnChange}
            />
            <Select defaultValue="" className="search-item input-width200" onChange={this.handleRegOnChange}>
              <Option value="">선택</Option>
              <Option value="등록">등록</Option>
              <Option value="미등록">미등록</Option>
            </Select>
            <RangePicker onChange={this.handleDateOnChange} className="margin-term" />
          </div>
        </StyledSearchWrap> */}
        {search.VISITOR_TYPE === '북/후문' ? (
          <StyledButton classNmae="btn-gray btn-first" onClick={this.handleModalOpen}>
            등록
          </StyledButton>
        ) : (
          ''
        )}
        <StyledButton classNmae="btn-gray" onClick={this.handleOnSearch}>
          검색
        </StyledButton>
        <StyledButton classNmae="btn-gray" onClick={this.handleDwExcel}>
          액셀받기
        </StyledButton>
        <StyledVirtualizedTable>
          <AutoSizer disableHeight>
            {({ width }) => (
              <Table
                width={width}
                height={500}
                headerHeight={40}
                rowHeight={53}
                rowCount={recordList.length}
                rowGetter={({ index }) => recordList[index]}
                noRowsRenderer={this.noRowsRenderer}
                onRowClick={this.onRowClick}
              >
                {this.getColumns().map(({ label, dataKey, ratio }) => (
                  <Column key={dataKey} label={label} dataKey={dataKey} width={(width / 100) * ratio} />
                ))}
              </Table>
            )}
          </AutoSizer>
        </StyledVirtualizedTable>
        <Modal
          title={modalType === 'INSERT' ? '북/후문 출입기록 등록' : '출입기록 수정'}
          visible={is_modal}
          onCancel={this.handleCancel}
          width={900}
          height={600}
          footer={[null]}
        >
          <NothGateCmpnyModal {...this.props} handleAppStart={this.handleAppStart} handleModalOpen={this.handleModalOpen} />
        </Modal>
      </div>
    );
  }
}

List.defaultProps = {
  id: 'EshsAccAccRecord',
  getCallDataHandler: () => {},
  result: {},
  apiAry: [
    {
      key: 'recordList',
      type: 'POST',
      url: '/api/eshs/v1/common/eshsAccessRecord',
    },
  ],
};
export default List;
