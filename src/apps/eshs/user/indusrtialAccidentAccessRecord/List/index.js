/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { Modal, Select, Input, DatePicker, message } from 'antd';
import { Table, Column, AutoSizer } from 'react-virtualized';
import StyledVirtualizedTable from 'components/CommonStyled/StyledVirtualizedTable';
import StyledButton from 'components/BizBuilder/styled/StyledButton';
import moment from 'moment';
import StyledHtmlTable from 'commonStyled/MdcsStyled/Table/StyledHtmlTable';
import StyledSelect from 'commonStyled/Form/StyledSelect';
import StyledInput from 'commonStyled/Form/StyledInput';
import StyledButtonWrapper from 'commonStyled/Buttons/StyledButtonWrapper';
import ContentsWrapper from 'commonStyled/EshsStyled/Wrapper/ContentsWrapper';
import StyledContentsModal from 'commonStyled/EshsStyled/Modal/StyledContentsModal';
import NothGateCmpnyModal from '../NothGateCmpnyModal';

const { Option } = Select;
const AntdInput = StyledInput(Input);
const AntdSelect = StyledSelect(Select);
const AntdModal = StyledContentsModal(Modal);

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
    const VISIT_DATE = (rowData && rowData.VISIT_DATE) || null;
    const VISITOR_IN_DATE = (rowData && rowData.VISITOR_IN_DATE) || null;
    const VISITOR_OUT_DATE = (rowData && rowData.VISITOR_OUT_DATE) || null;
    const WORK_AREA_CD = (rowData && rowData.WORK_AREA_CD) || '';
    changeFormData(id, 'modal', {
      type: 'UPDATE',
      is_modal: true,
      info: {
        ...rowData,
        WORK_AREA_CD: WORK_AREA_CD === '청주' ? 'CJ' : 'GM',
        VISITOR_OUT_DATE: moment(`${VISIT_DATE} ${VISITOR_OUT_DATE}`).format(format),
        VISITOR_IN_DATE: moment(`${VISIT_DATE} ${VISITOR_IN_DATE}`).format(format),
      },
    });
  };

  noRowsRenderer = () => <div className="noRows">결과없음</div>;

  getColumns = () => [
    { label: '지역', dataKey: 'WORK_AREA_CD', width: 120, ratio: 8 },
    { label: '일자', dataKey: 'VISIT_DATE', width: 180, ratio: 12 },
    { label: '업체명', dataKey: 'WRK_CMPNY_NM', width: 300, ratio: 20 },
    { label: '사업자등록번호', dataKey: 'BIZ_REG_NO', width: 255, ratio: 17 },
    { label: '이름', dataKey: 'VISITOR_NAME', width: 150, ratio: 10 },
    { label: '출입시간', dataKey: 'VISITOR_IN_DATE', width: 120, ratio: 8 },
    { label: '퇴장시간', dataKey: 'VISITOR_OUT_DATE', width: 120, ratio: 8 },
    { label: '출입구분', dataKey: 'VISITOR_TYPE', width: 120, ratio: 8 },
    { label: '업체등록여부', dataKey: 'WRK_REG', width: 135, ratio: 9 },
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
      info: { WORK_AREA_CD: 'CJ', VISITOR_TYPE: 'N', VISITOR_IN_DATE: moment().format(format), VISITOR_OUT_DATE: moment(now2, format) },
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
    const { id, getCallDataHandler, formData } = this.props;
    const search = (formData && formData.search) || {};
    const apiAry = [
      {
        key: 'searchList',
        type: 'POST',
        url: '/api/eshs/v1/common/eshsAccessRecord',
        params: search,
      },
    ];
    getCallDataHandler(id, apiAry, this.onSearchCallBack);
  };

  onSearchCallBack = sagaKey => {
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
      <ContentsWrapper>
        <div>
          <StyledHtmlTable>
            <table>
              <colgroup>
                <col width="15%" />
                <col width="35%" />
                <col width="15%" />
                <col width="35%" />
              </colgroup>
              <tbody>
                <tr>
                  <th>지역</th>
                  <td colSpan={3}>
                    <AntdSelect defaultValue="" onChange={this.handleSiteOnChange} style={{ width: '10%' }}>
                      <Option value="">지역 전체</Option>
                      <Option value="청주">청주</Option>
                      <Option value="구미">구미</Option>
                    </AntdSelect>
                  </td>
                </tr>
                <tr>
                  <th>업체명</th>
                  <td>
                    <AntdInput
                      placeholder="업체명"
                      className="ant-input-inline"
                      style={{ width: '80%' }}
                      value={search.WRK_CMPNY_NM || ''}
                      name="WRK_CMPNY_NM"
                      onChange={this.handleInputOnChange}
                    />
                  </td>
                  <th>사업자등록번호</th>
                  <td>
                    <AntdInput
                      placeholder="사업자 등록번호"
                      className="ant-input-inline"
                      style={{ width: '80%' }}
                      value={search.BIZ_REG_NO || ''}
                      name="BIZ_REG_NO"
                      onChange={this.handleInputOnChange}
                    />
                  </td>
                </tr>
                <tr>
                  <th>방문자 성명</th>
                  <td>
                    <AntdInput
                      placeholder="방문자 성명"
                      value={search.VISITOR_NAME || ''}
                      name="VISITOR_NAME"
                      className="ant-input-inline"
                      style={{ width: '80%' }}
                      onChange={this.handleInputOnChange}
                    />
                  </td>
                  <th>출입구분</th>
                  <td>
                    <AntdSelect defaultValue="" onChange={this.handleTypeOnChange} style={{ width: '80%' }}>
                      <Option value="">전체</Option>
                      <Option value="일일">일일</Option>
                      <Option value="북/후문">북/후문</Option>
                      <Option value="상시">상시</Option>
                    </AntdSelect>
                  </td>
                </tr>
                <tr>
                  <th>출입기간</th>
                  <td>
                    <RangePicker onChange={this.handleDateOnChange} style={{ width: '100%' }} />
                  </td>
                  <th>업체등록여부</th>
                  <td>
                    <AntdSelect defaultValue="" onChange={this.handleRegOnChange} style={{ width: '80%' }}>
                      <Option value="">선택</Option>
                      <Option value="등록">등록</Option>
                      <Option value="미등록">미등록</Option>
                    </AntdSelect>
                  </td>
                </tr>
              </tbody>
            </table>
          </StyledHtmlTable>
          <div className="selSaveWrapper">
            <StyledButtonWrapper className="btn-wrap-inline">
              {search.VISITOR_TYPE === '북/후문' ? (
                <StyledButton className="btn-primary btn-first" onClick={this.handleModalOpen}>
                  등록
                </StyledButton>
              ) : (
                ''
              )}
              <StyledButton className="btn-primary btn-first" onClick={this.handleOnSearch}>
                검색
              </StyledButton>
              <StyledButton className="btn-primary" onClick={this.handleDwExcel}>
                액셀받기
              </StyledButton>
            </StyledButtonWrapper>
          </div>
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
          <AntdModal
            title={modalType === 'INSERT' ? '북/후문 출입기록 등록' : '출입기록 수정'}
            visible={is_modal}
            onCancel={this.handleCancel}
            width={900}
            height={600}
            footer={[null]}
          >
            <NothGateCmpnyModal {...this.props} handleAppStart={this.handleAppStart} handleModalOpen={this.handleModalOpen} />
          </AntdModal>
        </div>
      </ContentsWrapper>
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
