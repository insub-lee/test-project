/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { Select, Input, DatePicker, message } from 'antd';
import { Table, Column, AutoSizer } from 'react-virtualized';
import debounce from 'lodash/debounce';
import StyledVirtualizedTable from 'components/CommonStyled/StyledVirtualizedTable';
import StyledButton from 'components/BizBuilder/styled/StyledButton';
import StyledSearchWrap from 'components/CommonStyled/StyledSearchWrap';
import moment from 'moment';
import { changeFormData } from 'components/BizBuilderBase/actions';
import NothGateCmpnyModalStyled from './NothGateCmpnyModalStyled';

const { Option } = Select;
const { Search } = Input;
const InputGroup = Input.Group;
const format = 'YYYY-MM-DD HH:mm:ss';
moment.locale('ko');

class NothGateCmpnyModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nothGateCmpnyList: [],
      endOpen: false,
    };

    this.handleSearchData = debounce(this.handleSearchData, 500);
  }

  handleAppStart = () => {
    const { result } = this.props;
    const nothGateCmpnyList = (result && result.NothGateCmpnyList && result.NothGateCmpnyList.List) || [];
    this.setState({
      nothGateCmpnyList,
    });
  };

  componentDidMount = () => {
    const { id, getCallDataHanlder, changeFormData } = this.props;
    const apiAry = [
      {
        key: 'NothGateCmpnyList',
        type: 'GET',
        url: '/api/eshs/v1/common/eshsNothGateCmpny',
      },
    ];
    this.setState({
      startValue: null,
      endValue: null,
      endOpen: false,
    });
    console.debug('여기는 componentDidMount');
    changeFormData(id, 'nothGateSearch', { searchType: 'BIZ_REG_NO' });
    getCallDataHanlder(id, apiAry, this.handleAppStart);
  };

  onRowClick = e => {
    const { id, changeFormData, formData } = this.props;
    const modal = (formData && formData.modal) || {};
    const info = (formData && formData.modal && formData.modal.info) || {};

    changeFormData(id, 'modal', {
      ...modal,
      info: { ...info, ...e.rowData, wrk_cmpny_nm: e.rowData.biz_reg_no === '000-00-00000' ? '' : e.rowData.wrk_cmpny_nm },
    });
    console.debug('onRowClick ', e);
  };

  noRowsRenderer = () => <div className="noRows"> </div>;

  getColumns = () => [
    { label: '사업자등록번호', dataKey: 'biz_reg_no', width: 220, ratio: 25 },
    { label: '업체명', dataKey: 'wrk_cmpny_nm', width: 310, ratio: 35 },
    { label: '사업장주소', dataKey: 'address', width: 355, ratio: 40 },
  ];

  getTablewidth = () => {
    this.getColumns()
      .map(({ width }) => width)
      .reduce((a, b) => a + b);
  };

  handleModalOpen = () => {
    this.setState = {};
  };

  handleSearchTypeOnChange = e => {
    const { id, changeFormData, formData } = this.props;
    const nothGateSearch = (formData && formData.nothGateSearch) || {};
    changeFormData(id, 'nothGateSearch', { ...nothGateSearch, searchType: e });
    this.handleSearchData();
  };

  handleSearchOnChange = e => {
    const { id, changeFormData, formData } = this.props;
    const nothGateSearch = (formData && formData.nothGateSearch) || {};
    changeFormData(id, 'nothGateSearch', { ...nothGateSearch, searchText: e.target.value });
    this.handleSearchData();
  };

  handleSearchData = () => {
    const { id, formData, getCallDataHanlder } = this.props;
    const searchType = (formData && formData.nothGateSearch && formData.nothGateSearch.searchType) || '';
    const searchText = (formData && formData.nothGateSearch && formData.nothGateSearch.searchText) || '';
    const apiAry = [
      {
        key: 'NothGateCmpnyList',
        type: 'GET',
        url: `/api/eshs/v1/common/eshsNothGateCmpny?searchType=${searchType}&searchText=${searchText}`,
      },
    ];
    getCallDataHanlder(id, apiAry, this.handleAppStart);
  };

  handleBtnOnClick = () => {
    const is_ok = this.validationCheck();
    console.debug('is_ok 1111111111111111 ', is_ok);
    if (is_ok) {
      const { id, formData, submitHadnlerBySaga, changeFormData } = this.props;

      const type = (formData && formData.modal && formData.modal.type) || '';
      if (type === 'INSERT') {
        const submitData = (formData && formData.modal && formData.modal.info) || {};
        changeFormData(id, 'actionType', 'INSERT');
        submitHadnlerBySaga(id, 'PUT', '/api/eshs/v1/common/eshsNothGateCmpny', submitData, this.saveComplete);
      } else if (type === 'UPDATE') {
        const submitData = (formData && formData.modal && formData.modal.info) || {};
        changeFormData(id, 'actionType', 'UPDATE');
        console.debug('submitData ', submitData);
        submitHadnlerBySaga(id, 'POST', '/api/eshs/v1/common/eshsNothGateCmpny', submitData, this.saveComplete);
      } else return false;
    }
    return false;
  };

  saveComplete = sagaKey => {
    const { getCallDataHanlder, apiAry, handleAppStart, formData, handleModalOpen } = this.props;
    getCallDataHanlder(sagaKey, apiAry, handleAppStart);
    const actionType = (formData && formData.actionType) || '';
    if (actionType === 'INSERT') {
      message.success('등록되었습니다.');
      handleModalOpen();
    } else if (actionType === 'UPDATE') message.success('수정되었습니다.');
    else if (actionType === 'DELETE') message.success('삭제되었습니다.');
    changeFormData(sagaKey, 'actionType', '');
  };

  handleInputChange = e => {
    const { id, changeFormData, formData } = this.props;
    const modal = (formData && formData.modal) || {};
    const info = (formData && formData.modal && formData.modal.info) || {};
    changeFormData(id, 'modal', { ...modal, info: { ...info, [e.target.name]: e.target.value } });
  };

  handleBusinessInputChange = e => {
    const bspt = /^[0-9 \-]+$/;
    if (bspt.test(e.target.value)) {
      const { id, changeFormData, formData } = this.props;
      const modal = (formData && formData.modal) || {};
      const info = (formData && formData.modal && formData.modal.info) || {};

      changeFormData(id, 'modal', { ...modal, info: { ...info, [e.target.name]: e.target.value } });
    }
    return false;
  };

  handleSiteOnChange = e => {
    const { id, changeFormData, formData } = this.props;
    const modal = (formData && formData.modal) || {};
    const info = (formData && formData.modal && formData.modal.info) || {};
    changeFormData(id, 'modal', { ...modal, info: { ...info, work_area_cd: e } });
  };

  disabledStartDate = startValue => {
    const { endValue } = this.state;
    if (!startValue || !endValue) {
      return false;
    }
    return startValue.valueOf() > endValue.valueOf();
  };

  disabledEndDate = endValue => {
    const { startValue } = this.state;
    if (!endValue || !startValue) {
      return false;
    }
    return endValue.valueOf() <= startValue.valueOf();
  };

  onChange = (field, value) => {
    this.setState({
      [field]: value,
    });
  };

  onStartChange = value => {
    this.onChange('startValue', value);
    console.debug('onStartChange ... ', value);
    console.debug('onStartChange  1111111111111111111... ', value);
    const { id, changeFormData, formData } = this.props;
    const modal = (formData && formData.modal) || {};
    const info = (formData && formData.modal && formData.modal.info) || {};
    changeFormData(id, 'modal', { ...modal, info: { ...info, visitor_in_date: moment(value).format(format) } });
  };

  onEndChange = value => {
    this.onChange('endValue', value);
    const { id, changeFormData, formData } = this.props;
    const modal = (formData && formData.modal) || {};
    const info = (formData && formData.modal && formData.modal.info) || {};
    changeFormData(id, 'modal', { ...modal, info: { ...info, visitor_out_date: moment(value).format(format) } });
  };

  handleStartOpenChange = open => {
    if (!open) {
      this.setState({ endOpen: true });
    }
  };

  handleEndOpenChange = open => {
    this.setState({ endOpen: open });
  };

  handleDeleteBtn = () => {
    const { id, submitHadnlerBySaga, formData, changeFormData } = this.props;
    const submitData = (formData && formData.modal && formData.modal.info && formData.modal.info) || { idx: -1 };
    changeFormData(id, 'actionType', 'DELETE');
    submitHadnlerBySaga(id, 'DELETE', '/api/eshs/v1/common/eshsNothGateCmpny', submitData, this.saveComplete);
  };

  businessNumberCheck = () => {
    let sum = 0;
    const getlist = new Array(10);
    const chkvalue = new Array('1', '3', '7', '1', '3', '7', '1', '3', '5');

    const { formData } = this.props;
    const biz_reg_no = (formData && formData.modal && formData.modal.info && formData.modal.info.biz_reg_no) || '';
    if (biz_reg_no) {
      const bNum = biz_reg_no.replace(/-/gi, '');
      for (let i = 0; i < 10; i++) {
        getlist[i] = bNum.substring(i, i + 1);
      }
      for (let i = 0; i < 9; i++) {
        sum += getlist[i] * chkvalue[i];
      }
      sum += parseInt((getlist[8] * 5) / 10);
      const sidliy = sum % 10;
      let sidchk = 0;
      if (sidliy != 0) {
        sidchk = 10 - sidliy;
      } else {
        sidchk = 0;
      }
      if (sidchk != getlist[9]) {
        message.warning('사업자번호를 정확히 입력해주세요.');
        return false;
      }
      return true;
    }
    message.warning('사업자번호를 정확히 입력해주세요.');
    return false;
  };

  validationCheck = () => {
    const { formData } = this.props;
    const info = (formData && formData.modal && formData.modal.info) || {};
    const wrk_cmpny_nm = (info && info.wrk_cmpny_nm) || '';
    const visitor_name = (info && info.visitor_name) || '';
    const biz_reg_no = (info && info.biz_reg_no) || '';
    if (biz_reg_no === '000-00-00000') {
      if (!wrk_cmpny_nm) {
        message.warning('업체명을 직접 입력해 주세요.');
        return false;
      }
    }
    if (!wrk_cmpny_nm) {
      message.warning('방문업체를 선택해 주세요.');
      return false;
    }
    if (!visitor_name) {
      message.warning('방문자 성함을 입력해 주세요.');
      return false;
    }
    if (!this.businessNumberCheck()) {
      return false;
    }
    return true;
  };

  render() {
    // const list = this.setList();
    const { nothGateCmpnyList, startValue, endValue, endOpen } = this.state;
    const { formData } = this.props;
    const info = (formData && formData.modal && formData.modal.info) || {};
    const modalType = (formData && formData.modal && formData.modal.type) || '';
    const searchText = (formData && formData.nothGateSearch && formData.nothGateSearch.searchText) || '';
    const visitor_in_date = formData && formData.modal && formData.modal.info && formData.modal.info.visitor_in_date;
    const visitor_out_date = formData && formData.modal && formData.modal.info && formData.modal.info.visitor_out_date;
    const biz_reg_no = (formData && formData.modal && formData.modal.info && formData.modal.info.biz_reg_no) || '';
    return (
      <div>
        <NothGateCmpnyModalStyled>
          <div className="nothGateCmpny_modal">
            <table>
              <tbody>
                <tr>
                  <td>지역</td>
                  <td colSpan="3">
                    <Select value={info.work_area_cd ? info.work_area_cd : 'CJ'} onChange={this.handleSiteOnChange}>
                      <Option value="CJ">청주</Option>
                      <Option value="GM">구미</Option>
                    </Select>
                  </td>
                </tr>
                <tr>
                  <td>업체명</td>
                  <td>
                    <Input
                      placeholder="업체명"
                      name="wrk_cmpny_nm"
                      value={info.wrk_cmpny_nm}
                      onChange={this.handleInputChange}
                      readOnly={biz_reg_no !== '000-00-00000'}
                    />
                  </td>
                  <td>사업자등록번호</td>
                  <td>
                    <Input placeholder="사업자등록번호" name="biz_reg_no" value={info.biz_reg_no} onChange={this.handleBusinessInputChange} />
                  </td>
                </tr>
                <tr>
                  <td>방문자 성명</td>
                  <td>
                    <Input placeholder="방문자 성명" name="visitor_name" value={info.visitor_name} onChange={this.handleInputChange} />
                  </td>
                  <td>연락처</td>
                  <td>
                    <Input placeholder="연락처" name="phone_number" value={info.phone_number} onChange={this.handleInputChange} />
                  </td>
                </tr>
                <tr>
                  <td>출입시간</td>
                  <td>
                    <DatePicker
                      disabledDate={this.disabledStartDate}
                      showTime
                      format="YYYY-MM-DD HH:mm:ss"
                      value={moment(visitor_in_date)}
                      placeholder="Start"
                      onChange={this.onStartChange}
                      onOpenChange={this.handleStartOpenChange}
                    />
                  </td>
                  <td>퇴장시간</td>
                  <td>
                    <DatePicker
                      disabledDate={this.disabledEndDate}
                      showTime
                      format="YYYY-MM-DD HH:mm:ss"
                      value={moment(visitor_out_date)}
                      placeholder="End"
                      onChange={this.onEndChange}
                      open={endOpen}
                      onOpenChange={this.handleEndOpenChange}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
            <div>
              <StyledButton classNmae="btn-gray btn-first" onClick={this.handleBtnOnClick}>
                {modalType === 'INSERT' ? '등록' : '수정'}
              </StyledButton>
              {modalType === 'INSERT' ? (
                ''
              ) : (
                <StyledButton classNmae="btn-gray btn-first" onClick={this.handleDeleteBtn}>
                  삭제
                </StyledButton>
              )}
            </div>
          </div>
        </NothGateCmpnyModalStyled>
        {modalType === 'INSERT' ? (
          <>
            <StyledSearchWrap>
              <div className="search-group-layer">
                <Select defaultValue="사업자등록번호" onChange={this.handleSearchTypeOnChange} className="search-item input-width160">
                  <Option value="BIZ_REG_NO">사업자등록번호</Option>
                  <Option value="WRK_CMPNY_NM">업체명</Option>
                </Select>
                <Search placeholder=" 검색어를 입력하세요" onChange={this.handleSearchOnChange} value={searchText} className="search-item input-width200" />
              </div>
            </StyledSearchWrap>

            <StyledVirtualizedTable>
              <AutoSizer disableHeight>
                {({ width }) => (
                  <Table
                    width={width}
                    height={500}
                    headerHeight={40}
                    rowHeight={53}
                    rowCount={nothGateCmpnyList.length}
                    rowGetter={({ index }) => nothGateCmpnyList[index]}
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
          </>
        ) : (
          ''
        )}
      </div>
    );
  }
}

NothGateCmpnyModal.defaultProps = {
  id: 'EshsAccAccRecord',
  getCallDataHanlder: () => {},
  result: {},
};
export default NothGateCmpnyModal;
