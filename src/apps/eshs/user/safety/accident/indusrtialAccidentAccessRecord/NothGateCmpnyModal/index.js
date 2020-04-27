/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { Select, Input, DatePicker, message } from 'antd';
import { Table, Column, AutoSizer } from 'react-virtualized';
import { debounce } from 'lodash';
import StyledVirtualizedTable from 'components/CommonStyled/StyledVirtualizedTable';
import StyledButton from 'commonStyled/Buttons/StyledButton';
import StyledSearchInput from 'commonStyled/Form/StyledSearchInput';
import StyledSearchWrap from 'components/CommonStyled/StyledSearchWrap';
import moment from 'moment';
import { changeFormData } from 'components/BizBuilderBase/actions';

import StyledButtonWrapper from 'commonStyled/Buttons/StyledButtonWrapper';
import StyledInput from 'commonStyled/Form/StyledInput';
import StyledSelect from 'commonStyled/Form/StyledSelect';
import StyledHtmlTable from 'commonStyled/MdcsStyled/Table/StyledHtmlTable';

const AntdInput = StyledInput(Input);
const AntdSelect = StyledSelect(Select);
const { Option } = Select;

const format = 'YYYY-MM-DD HH:mm:ss';
const AntdSearch = StyledSearchInput(Input.Search);

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
    const { id, getCallDataHandler, changeFormData } = this.props;
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
    changeFormData(id, 'nothGateSearch', { searchType: 'BIZ_REG_NO' });
    getCallDataHandler(id, apiAry, this.handleAppStart);
  };

  onRowClick = e => {
    const { id, changeFormData, formData } = this.props;
    const modal = (formData && formData.modal) || {};
    const info = (formData && formData.modal && formData.modal.info) || {};

    changeFormData(id, 'modal', {
      ...modal,
      info: { ...info, ...e.rowData, WRK_CMPNY_NM: e.rowData.biz_reg_no === '000-00-00000' ? '' : e.rowData.WRK_CMPNY_NM },
    });
  };

  noRowsRenderer = () => <div className="noRows"> </div>;

  getColumns = () => [
    { label: '사업자등록번호', dataKey: 'BIZ_REG_NO', width: 220, ratio: 25 },
    { label: '업체명', dataKey: 'WRK_CMPNY_NM', width: 310, ratio: 35 },
    { label: '사업장주소', dataKey: 'ADDRESS', width: 355, ratio: 40 },
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
    const { id, formData, getCallDataHandler } = this.props;
    const searchType = (formData && formData.nothGateSearch && formData.nothGateSearch.searchType) || '';
    const searchText = (formData && formData.nothGateSearch && formData.nothGateSearch.searchText) || '';
    const apiAry = [
      {
        key: 'NothGateCmpnyList',
        type: 'GET',
        url: `/api/eshs/v1/common/eshsNothGateCmpny?searchType=${searchType}&searchText=${searchText}`,
      },
    ];
    getCallDataHandler(id, apiAry, this.handleAppStart);
  };

  handleBtnOnClick = () => {
    const is_ok = this.validationCheck();
    if (is_ok) {
      const { id, formData, submitHandlerBySaga, changeFormData } = this.props;

      const type = (formData && formData.modal && formData.modal.type) || '';
      if (type === 'INSERT') {
        const submitData = (formData && formData.modal && formData.modal.info) || {};
        changeFormData(id, 'actionType', 'INSERT');
        submitHandlerBySaga(id, 'PUT', '/api/eshs/v1/common/eshsNothGateCmpny', submitData, this.saveComplete);
      } else if (type === 'UPDATE') {
        const submitData = (formData && formData.modal && formData.modal.info) || {};
        changeFormData(id, 'actionType', 'UPDATE');
        submitHandlerBySaga(id, 'POST', '/api/eshs/v1/common/eshsNothGateCmpny', submitData, this.saveComplete);
      } else return false;
    }
    return false;
  };

  saveComplete = sagaKey => {
    const { getCallDataHandler, apiAry, handleAppStart, formData, handleModalOpen } = this.props;
    getCallDataHandler(sagaKey, apiAry, handleAppStart);
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
    changeFormData(id, 'modal', { ...modal, info: { ...info, WORK_AREA_CD: e } });
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
    const { id, changeFormData, formData } = this.props;
    const modal = (formData && formData.modal) || {};
    const info = (formData && formData.modal && formData.modal.info) || {};
    changeFormData(id, 'modal', { ...modal, info: { ...info, VISITOR_IN_DATE: moment(value).format(format) } });
  };

  onEndChange = value => {
    this.onChange('endValue', value);
    const { id, changeFormData, formData } = this.props;
    const modal = (formData && formData.modal) || {};
    const info = (formData && formData.modal && formData.modal.info) || {};
    changeFormData(id, 'modal', { ...modal, info: { ...info, VISITOR_OUT_DATE: moment(value).format(format) } });
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
    const { id, submitHandlerBySaga, formData, changeFormData } = this.props;
    const submitData = (formData && formData.modal && formData.modal.info && formData.modal.info) || { idx: -1 };
    changeFormData(id, 'actionType', 'DELETE');
    submitHandlerBySaga(id, 'DELETE', '/api/eshs/v1/common/eshsNothGateCmpny', submitData, this.saveComplete);
  };

  businessNumberCheck = () => {
    let sum = 0;
    const getlist = new Array(10);
    const chkvalue = new Array('1', '3', '7', '1', '3', '7', '1', '3', '5');

    const { formData } = this.props;
    const BIZ_REG_NO = (formData && formData.modal && formData.modal.info && formData.modal.info.BIZ_REG_NO) || '';
    if (BIZ_REG_NO) {
      const bNum = BIZ_REG_NO.replace(/-/gi, '');
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
    const WRK_CMPNY_NM = (info && info.WRK_CMPNY_NM) || '';
    const VISITOR_NAME = (info && info.VISITOR_NAME) || '';
    const BIZ_REG_NO = (info && info.BIZ_REG_NO) || '';
    if (BIZ_REG_NO === '000-00-00000') {
      if (!WRK_CMPNY_NM) {
        message.warning('업체명을 직접 입력해 주세요.');
        return false;
      }
    }
    if (!WRK_CMPNY_NM) {
      message.warning('방문업체를 선택해 주세요.');
      return false;
    }
    if (!VISITOR_NAME) {
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
    const VISITOR_IN_DATE = formData && formData.modal && formData.modal.info && formData.modal.info.VISITOR_IN_DATE;
    const VISITOR_OUT_DATE = formData && formData.modal && formData.modal.info && formData.modal.info.VISITOR_OUT_DATE;
    const BIZ_REG_NO = (formData && formData.modal && formData.modal.info && formData.modal.info.BIZ_REG_NO) || '';
    return (
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
                <td colSpan="3">
                  <AntdSelect value={info.WORK_AREA_CD ? info.WORK_AREA_CD : 'CJ'} style={{ width: '30%' }} onChange={this.handleSiteOnChange}>
                    <Option value="CJ">청주</Option>
                    <Option value="GM">구미</Option>
                  </AntdSelect>
                </td>
              </tr>
              <tr>
                <th>업체명</th>
                <td>
                  <AntdInput
                    placeholder="업체명"
                    className="ant-input-inline"
                    name="WRK_CMPNY_NM"
                    value={info.WRK_CMPNY_NM}
                    style={{ width: '80%' }}
                    onChange={this.handleInputChange}
                    readOnly={BIZ_REG_NO !== '000-00-00000'}
                  />
                </td>
                <th>사업자등록번호</th>
                <td>
                  <AntdInput
                    placeholder="사업자등록번호"
                    className="ant-input-inline"
                    style={{ width: '80%' }}
                    name="BIZ_REG_NO"
                    value={info.BIZ_REG_NO}
                    onChange={this.handleBusinessInputChange}
                  />
                </td>
              </tr>
              <tr>
                <th>방문자 성명</th>
                <td>
                  <AntdInput
                    placeholder="방문자 성명"
                    className="ant-input-inline"
                    style={{ width: '80%' }}
                    name="VISITOR_NAME"
                    value={info.VISITOR_NAME}
                    onChange={this.handleInputChange}
                  />
                </td>
                <th>연락처</th>
                <td>
                  <AntdInput
                    placeholder="연락처"
                    className="ant-input-inline"
                    style={{ width: '80%' }}
                    name="PHONE_NUMBER"
                    value={info.PHONE_NUMBER}
                    onChange={this.handleInputChange}
                  />
                </td>
              </tr>
              <tr>
                <th>출입시간</th>
                <td>
                  <DatePicker
                    style={{ width: '100%' }}
                    disabledDate={this.disabledStartDate}
                    showTime
                    format="YYYY-MM-DD HH:mm:ss"
                    value={moment(VISITOR_IN_DATE)}
                    placeholder="Start"
                    onChange={this.onStartChange}
                    onOpenChange={this.handleStartOpenChange}
                  />
                </td>
                <th>퇴장시간</th>
                <td>
                  <DatePicker
                    disabledDate={this.disabledEndDate}
                    showTime
                    style={{ width: '50%' }}
                    format="YYYY-MM-DD HH:mm:ss"
                    value={moment(VISITOR_OUT_DATE)}
                    placeholder="End"
                    onChange={this.onEndChange}
                    open={endOpen}
                    onOpenChange={this.handleEndOpenChange}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </StyledHtmlTable>
        <div>
          <StyledButtonWrapper className="btn-wrap-center">
            <StyledButton className="btn-primary btn-first" onClick={this.handleBtnOnClick}>
              {modalType === 'INSERT' ? '등록' : '수정'}
            </StyledButton>
            {modalType !== 'INSERT' && (
              <StyledButton className="btn-primary" onClick={this.handleDeleteBtn}>
                삭제
              </StyledButton>
            )}
          </StyledButtonWrapper>
        </div>
        {modalType === 'INSERT' && (
          <>
            <StyledSearchWrap>
              <div className="selSaveWrapper">
                <AntdSelect defaultValue="사업자등록번호" onChange={this.handleSearchTypeOnChange} style={{ width: '20%' }}>
                  <Option value="BIZ_REG_NO">사업자등록번호</Option>
                  <Option value="WRK_CMPNY_NM">업체명</Option>
                </AntdSelect>
                <AntdSearch
                  placeholder=" 검색어를 입력하세요"
                  style={{ width: '30%' }}
                  onChange={this.handleSearchOnChange}
                  value={searchText}
                  className="ant-search-inline input-search-mid mr5"
                />
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
        )}
      </div>
    );
  }
}

NothGateCmpnyModal.defaultProps = {
  id: 'EshsAccAccRecord',
  getCallDataHandler: () => {},
  result: {},
};
export default NothGateCmpnyModal;
